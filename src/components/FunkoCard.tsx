import Image from "next/image";
import Link from "next/link";
import type { Funko } from "@/data/funkos";

export function FunkoCard({ funko }: { funko: Funko }) {
  return (
    <Link
      href={`/funkos/${funko.slug}`}
      className="group relative rounded-2xl border border-[#c9a25c]/15 bg-[#141210] p-4 shadow-[0_1px_0_rgba(255,255,255,0.03)_inset] transition duration-300 hover:-translate-y-1 hover:border-[#c9a25c]/35"
    >
      <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-[#0d0c0a]">
        <div
          aria-hidden
          className="absolute inset-0 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at 50% 42%, ${funko.accentColor}33, transparent 65%)`,
          }}
        />
        <Image
          src={funko.images[0].src}
          alt={`Funko Pop de ${funko.name}`}
          fill
          className="relative object-contain p-3 transition duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 320px"
        />
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="font-serif text-xl font-semibold text-[#f3efe4]">
          {funko.name}
        </h2>
        <span className="font-mono text-xs tracking-wide text-[var(--gold)]/60">
          {funko.number}
        </span>
      </div>
      <p className="mt-1 text-sm text-[#e8e3d8]/40">{funko.description}</p>
    </Link>
  );
}
