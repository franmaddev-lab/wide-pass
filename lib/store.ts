// Shared storage for votes, suggestions and favourite counts.
//
// Uses Upstash Redis over its REST API when configured (add the Upstash integration
// in Vercel, which sets KV_REST_API_URL/KV_REST_API_TOKEN or UPSTASH_REDIS_REST_*).
// Without it, falls back to in-memory storage that resets whenever the server restarts.

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN

export const persistent = Boolean(REDIS_URL && TOKEN)

type Cmd = (string | number)[]

async function redis(commands: Cmd[]): Promise<unknown[]> {
  const res = await fetch(`${REDIS_URL}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify(commands),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Storage error ${res.status}`)
  const out = (await res.json()) as { result?: unknown; error?: string }[]
  return out.map((r) => {
    if (r.error) throw new Error(r.error)
    return r.result
  })
}

// --- in-memory fallback -----------------------------------------------------

type Mem = {
  hashes: Map<string, Map<string, string>>
  zsets: Map<string, Map<string, number>>
  sets: Map<string, Set<string>>
  counters: Map<string, { n: number; until: number }>
}
const g = globalThis as unknown as { __wpStore?: Mem }
const mem: Mem = (g.__wpStore ??= {
  hashes: new Map(),
  zsets: new Map(),
  sets: new Map(),
  counters: new Map(),
})
const memGet = <T>(m: Map<string, T>, k: string, make: () => T) => {
  if (!m.has(k)) m.set(k, make())
  return m.get(k)!
}

// --- primitives ---------------------------------------------------------------

async function sadd(key: string, member: string) {
  if (persistent) return ((await redis([['SADD', key, member]]))[0] as number) === 1
  const s = memGet(mem.sets, key, () => new Set<string>())
  if (s.has(member)) return false
  s.add(member)
  return true
}

async function srem(key: string, member: string) {
  if (persistent) return ((await redis([['SREM', key, member]]))[0] as number) === 1
  return memGet(mem.sets, key, () => new Set<string>()).delete(member)
}

async function smembers(key: string): Promise<string[]> {
  if (persistent) return (await redis([['SMEMBERS', key]]))[0] as string[]
  return [...memGet(mem.sets, key, () => new Set<string>())]
}

async function zincrby(key: string, by: number, member: string) {
  if (persistent) return void (await redis([['ZINCRBY', key, by, member]]))
  const z = memGet(mem.zsets, key, () => new Map<string, number>())
  z.set(member, Math.max(0, (z.get(member) ?? 0) + by))
}

async function zscores(key: string): Promise<Record<string, number>> {
  if (persistent) {
    const flat = (await redis([['ZRANGE', key, 0, -1, 'WITHSCORES']]))[0] as string[]
    const out: Record<string, number> = {}
    for (let i = 0; i < flat.length; i += 2) out[flat[i]] = Number(flat[i + 1])
    return out
  }
  return Object.fromEntries(memGet(mem.zsets, key, () => new Map<string, number>()))
}

async function hset(key: string, field: string, value: string) {
  if (persistent) return void (await redis([['HSET', key, field, value]]))
  memGet(mem.hashes, key, () => new Map<string, string>()).set(field, value)
}

async function hdel(key: string, field: string) {
  if (persistent) return void (await redis([['HDEL', key, field]]))
  memGet(mem.hashes, key, () => new Map<string, string>()).delete(field)
}

async function hvals(key: string): Promise<string[]> {
  if (persistent) return (await redis([['HVALS', key]]))[0] as string[]
  return [...memGet(mem.hashes, key, () => new Map<string, string>()).values()]
}

// Counts calls per key within a window; returns the new count
async function hit(key: string, windowSeconds: number) {
  if (persistent) {
    const [n] = await redis([
      ['INCR', key],
      ['EXPIRE', key, windowSeconds, 'NX'],
    ])
    return n as number
  }
  const now = Date.now()
  const c = mem.counters.get(key)
  const next =
    c && c.until > now ? { ...c, n: c.n + 1 } : { n: 1, until: now + windowSeconds * 1000 }
  mem.counters.set(key, next)
  return next.n
}

// --- likes (favourites) on catalogue items ---------------------------------------

const LIKES = 'wp:likes'

export async function setLike(voter: string, item: string, on: boolean) {
  const changed = on ? await sadd(`wp:l:${voter}`, item) : await srem(`wp:l:${voter}`, item)
  if (changed) await zincrby(LIKES, on ? 1 : -1, item)
}

export function likeCounts() {
  return zscores(LIKES)
}

// --- suggestions and votes ----------------------------------------------------------

export type Suggestion = {
  id: string
  text: string
  collection: string
  createdAt: number
}

const SUGGESTIONS = 'wp:s:data'
const VOTES = 'wp:s:votes'

export async function addSuggestion(s: Suggestion) {
  await hset(SUGGESTIONS, s.id, JSON.stringify(s))
}

export async function removeSuggestion(id: string) {
  await hdel(SUGGESTIONS, id)
}

export async function listSuggestions() {
  const [raw, votes] = await Promise.all([hvals(SUGGESTIONS), zscores(VOTES)])
  return raw.map((r) => JSON.parse(r) as Suggestion).map((s) => ({ ...s, votes: votes[s.id] ?? 0 }))
}

export async function setVote(voter: string, id: string, on: boolean) {
  const changed = on ? await sadd(`wp:v:${voter}`, id) : await srem(`wp:v:${voter}`, id)
  if (changed) await zincrby(VOTES, on ? 1 : -1, id)
}

export function votedBy(voter: string) {
  return smembers(`wp:v:${voter}`)
}

export function countSuggestionBy(voter: string) {
  return hit(`wp:rl:${voter}`, 24 * 60 * 60)
}
