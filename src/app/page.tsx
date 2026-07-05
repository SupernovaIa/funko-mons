import { funkos } from "@/data/funkos";
import { FunkoCard } from "@/components/FunkoCard";
import { FunkoPlaceholderCard } from "@/components/FunkoPlaceholderCard";

const PLACEHOLDER_COUNT = 5;

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0a09]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(201,162,92,0.16),transparent_70%)]"
      />

      <main className="relative mx-auto max-w-6xl px-6 py-20">
        <header className="mb-16 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[var(--gold)]/70">
            Colección privada · Piezas imaginadas con IA
          </p>
          <h1 className="font-serif text-6xl font-semibold tracking-tight text-[#f3efe4]">
            Funko Mons
          </h1>
          <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-[var(--gold)]/60 to-transparent" />
          <p className="mx-auto mt-5 max-w-md text-base text-[#e8e3d8]/50">
            Figuras de vinilo de Pokémon que no existen. Cada pieza, diseñada
            y esculpida digitalmente.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {funkos.map((funko) => (
            <FunkoCard key={funko.slug} funko={funko} />
          ))}
          {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
            <FunkoPlaceholderCard key={`placeholder-${i}`} />
          ))}
        </div>
      </main>
    </div>
  );
}
