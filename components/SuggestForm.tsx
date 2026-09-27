'use client'

import { useActionState, useRef } from 'react'
import { submitSuggestion, type SuggestState } from '@/app/actions/community'

export default function SuggestForm({
  collections,
}: {
  collections: { value: string; label: string }[]
}) {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, action, pending] = useActionState(
    async (prev: SuggestState, form: FormData) => {
      const result = await submitSuggestion(prev, form)
      if (result.status === 'ok') formRef.current?.reset()
      return result
    },
    { status: 'idle' }
  )

  return (
    <form
      ref={formRef}
      action={action}
      className="mt-6 space-y-4 rounded-2xl border-2 border-ink bg-volt p-5"
    >
      <div>
        <label htmlFor="text" className="font-bold">
          Your slogan
        </label>
        <input
          id="text"
          name="text"
          required
          minLength={4}
          maxLength={60}
          placeholder="e.g. My mum knows your number plate"
          className="mt-1 block w-full rounded-lg border-2 border-ink bg-white px-3 py-2 text-lg"
        />
      </div>
      <fieldset>
        <legend className="font-bold">Which collection?</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {collections.map((c, i) => (
            <label
              key={c.value}
              className="cursor-pointer rounded-full border-2 border-ink bg-white px-4 py-1.5 text-sm font-semibold has-[:checked]:bg-ink has-[:checked]:text-volt has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-signal"
            >
              <input
                type="radio"
                name="collection"
                value={c.value}
                defaultChecked={i === 0}
                className="sr-only"
              />
              {c.label}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full border-2 border-ink bg-ink px-6 py-3 font-display uppercase text-volt disabled:opacity-60"
        >
          {pending ? 'Posting…' : 'Post my idea'}
        </button>
        {state.status !== 'idle' && (
          <p role={state.status === 'error' ? 'alert' : 'status'} className="font-semibold">
            {state.message}
          </p>
        )}
      </div>
    </form>
  )
}
