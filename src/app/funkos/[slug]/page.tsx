import { notFound } from "next/navigation";
import Link from "next/link";
import { getFunko } from "@/data/funkos";
import { FunkoDetail } from "@/components/FunkoDetail";

export default async function FunkoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const funko = getFunko(slug);

  if (!funko) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0b0a09]">
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-[#e8e3d8]/40 transition hover:text-[var(--gold)]"
        >
          ← Volver a la galería
        </Link>

        <FunkoDetail funko={funko} />

        <div className="mt-8 flex items-baseline justify-between gap-2 border-t border-[#c9a25c]/15 pt-6">
          <h1 className="font-serif text-4xl font-semibold text-[#f3efe4]">
            {funko.name}
          </h1>
          <span className="font-mono text-sm tracking-wide text-[var(--gold)]/60">
            {funko.number}
          </span>
        </div>
        <p className="mt-3 text-[#e8e3d8]/50">{funko.description}</p>
      </main>
    </div>
  );
}
