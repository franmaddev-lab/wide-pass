// The Wide Pass bike mark (same drawing as the favicon)
export default function BikeLogo({ className = 'size-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <circle cx="8" cy="21" r="5.5" />
      <circle cx="24" cy="21" r="5.5" />
      <path d="M8 21 L13.5 11.5 L20.5 11.5 L24 21 M13.5 11.5 L17 21 L20.5 11.5 M12 8 L15 8 M20.5 11.5 L19.5 7.5 L22.5 7.5" />
    </svg>
  )
}
