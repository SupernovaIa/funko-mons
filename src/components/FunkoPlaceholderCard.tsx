export function FunkoPlaceholderCard() {
  return (
    <div className="rounded-2xl border border-dashed border-[#c9a25c]/12 bg-[#0f0e0c]/60 p-4">
      <div className="relative mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-[#0d0c0a]">
        <svg
          viewBox="0 0 24 24"
          className="h-12 w-12 text-[#c9a25c]/20"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.25}
        >
          <circle cx="12" cy="12" r="9" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
        </svg>
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="font-serif text-xl text-[#e8e3d8]/25">???</h2>
        <span className="font-mono text-xs uppercase tracking-wide text-[#c9a25c]/30">
          Próximamente
        </span>
      </div>
      <p className="mt-1 text-sm text-[#e8e3d8]/20">
        Una nueva pieza está en camino.
      </p>
    </div>
  );
}
