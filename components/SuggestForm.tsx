'use client'

import { useActionState, useRef } from 'react'
import { submitSuggestion, type SuggestState } from '@/app/actions/community'

export default function SuggestForm() {
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
      className="mt-4 space-y-4 rounded-2xl border-2 border-ink bg-white p-5"
    >
      <div>
        <label htmlFor="text" className="font-bold">
          Your slogan
        </label>
        <textarea
          id="text"
          name="text"
          required
          rows={3}
          minLength={4}
          maxLength={60}
          placeholder="e.g. My mum knows your number plate"
          className="mt-1 block w-full resize-none rounded-lg border-2 border-ink bg-white px-3 py-2 text-lg"
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full border-2 border-ink bg-ink px-6 py-5 font-display text-xl text-volt uppercase hover:bg-asphalt disabled:opacity-60"
        >
          {pending ? 'Posting…' : 'Post my idea'}
        </button>
        {state.status !== 'idle' && (
          <p
            role={state.status === 'error' ? 'alert' : 'status'}
            className="mt-3 text-center font-semibold"
          >
            {state.message}
          </p>
        )}
      </div>
    </form>
  )
}
