'use server'

import { revalidatePath } from 'next/cache'
import { COLLECTIONS, getGadget, getSlogan, sloganTemplate, slogans } from '@/lib/catalog'
import {
  addSuggestion,
  countSuggestionBy,
  listSuggestions,
  removeSuggestion,
  setLike,
  setVote,
} from '@/lib/store'
import { voterId } from '@/lib/voter'

// Favourite keys look like "slogan:<id>" or "gadget:<slug>"
export async function toggleLike(item: string, on: boolean) {
  const [kind, id] = item.split(':')
  const valid = (kind === 'slogan' && getSlogan(id)) || (kind === 'gadget' && getGadget(id))
  if (!valid) return
  await setLike(await voterId(), item, on)
  revalidatePath('/slogans')
}

// ---------------------------------------------------------------------------------

export type SuggestState =
  | { status: 'idle' }
  | { status: 'error'; message: string }
  | { status: 'ok'; message: string }

const ALLOWED = /^[\p{L}\p{N} .,'’!?&:;"“”()/%€-]+$/u
// A small first line of defence; review suggestions before printing anything
const BLOCKED = [
  'fuck',
  'shit',
  'cunt',
  'bitch',
  'bastard',
  'nigg',
  'retard',
  'whore',
  'slut',
  'cazzo',
  'vaffanculo',
  'stronz',
  'puttana',
  'troia',
  'merda',
  'coglion',
  'frocio',
]

const normalise = (t: string) =>
  t
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()

export async function submitSuggestion(_prev: SuggestState, form: FormData): Promise<SuggestState> {
  const text = String(form.get('text') ?? '')
    .replace(/\s+/g, ' ')
    .trim()
  const collection = String(form.get('collection') ?? '')

  if (text.length < 4 || text.length > 60) {
    return { status: 'error', message: 'Keep it between 4 and 60 characters.' }
  }
  if (!ALLOWED.test(text)) {
    return { status: 'error', message: 'Letters, numbers and normal punctuation only, please.' }
  }
  if (!COLLECTIONS.includes(collection as (typeof COLLECTIONS)[number])) {
    return { status: 'error', message: 'Pick a collection.' }
  }
  const n = normalise(text)
  if (BLOCKED.some((w) => n.replace(/ /g, '').includes(w))) {
    return { status: 'error', message: 'Let’s keep it friendly. Try different words.' }
  }
  const existing = await listSuggestions()
  const taken = [...slogans.map((s) => sloganTemplate(s)), ...existing.map((s) => s.text)]
  if (taken.some((t) => normalise(t) === n)) {
    return { status: 'error', message: 'That one already exists. Give it a vote instead!' }
  }

  const voter = await voterId()
  if ((await countSuggestionBy(voter)) > 5) {
    return { status: 'error', message: 'That’s 5 ideas today. Come back tomorrow!' }
  }

  const id = crypto.randomUUID().slice(0, 8)
  await addSuggestion({ id, text, collection, createdAt: Date.now() })
  await setVote(voter, id, true) // you vote for your own idea
  revalidatePath('/suggest')
  return { status: 'ok', message: 'Thanks! Your idea is up. Share it and get votes.' }
}

export async function toggleVote(id: string, on: boolean) {
  if (!/^[a-f0-9]{8}$/.test(id)) return
  await setVote(await voterId(), id, on)
  revalidatePath('/suggest')
}

// Moderation: set ADMIN_KEY in the environment, then open /suggest?key=<ADMIN_KEY>
export async function deleteSuggestion(form: FormData) {
  const key = String(form.get('key') ?? '')
  const id = String(form.get('id') ?? '')
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) return
  await removeSuggestion(id)
  revalidatePath('/suggest')
}
