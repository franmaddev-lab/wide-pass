'use client'

import { useOptimistic, useTransition } from 'react'
import { toggleVote } from '@/app/actions/community'

export default function VoteButton({
  id,
  votes,
  voted,
}: {
  id: string
  votes: number
  voted: boolean
}) {
  const [state, setState] = useOptimistic({ votes, voted })
  const [, startTransition] = useTransition()

  function click() {
    const on = !state.voted
    startTransition(async () => {
      setState({ voted: on, votes: Math.max(0, state.votes + (on ? 1 : -1)) })
      await toggleVote(id, on)
    })
  }

  return (
    <button
      type="button"
      onClick={click}
      aria-pressed={state.voted}
      aria-label={`${state.voted ? 'Remove your vote' : 'Vote'} (${state.votes} ${
        state.votes === 1 ? 'vote' : 'votes'
      })`}
      className={`flex min-w-16 shrink-0 flex-col items-center rounded-xl border-2 border-ink px-3 py-1.5 font-bold ${
        state.voted ? 'bg-volt shadow-[3px_3px_0_var(--color-ink)]' : 'bg-white hover:bg-volt'
      }`}
    >
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <path
          d="M12 4 L20 14 H15 V20 H9 V14 H4 Z"
          fill={state.voted ? '#141414' : 'none'}
          stroke="#141414"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      <span>{state.votes}</span>
    </button>
  )
}
