import { cookies } from 'next/headers'

const VOTER_COOKIE = 'wp_voter'
const VALID = /^[a-f0-9-]{36}$/

// An anonymous id per browser, so each person gets one vote and one like per item.
// Creating it sets a cookie, so only call voterId() from a Server Function.
export async function voterId() {
  const jar = await cookies()
  const existing = jar.get(VOTER_COOKIE)?.value
  if (existing && VALID.test(existing)) return existing
  const id = crypto.randomUUID()
  jar.set(VOTER_COOKIE, id, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
  })
  return id
}

// Read-only: safe in Server Components
export async function currentVoter() {
  const v = (await cookies()).get(VOTER_COOKIE)?.value
  return v && VALID.test(v) ? v : undefined
}
