"use client";

import { useState } from "react";
import Image from "next/image";
import type { Funko } from "@/data/funkos";
import { FunkoViewer3D } from "@/components/FunkoViewer3D";

export function FunkoDetail({ funko }: { funko: Funko }) {
  const [mode, setMode] = useState<"2d" | "3d">("2d");

  return (
    <div>
      <div className="mb-4 inline-flex rounded-full border border-[#c9a25c]/20 bg-[#141210] p-1">
        <button
          onClick={() => setMode("2d")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            mode === "2d"
              ? "bg-[var(--gold)] text-[#141210]"
              : "text-[#e8e3d8]/50 hover:text-[#e8e3d8]"
          }`}
        >
          Imagen
        </button>
        <button
          onClick={() => setMode("3d")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            mode === "3d"
              ? "bg-[var(--gold)] text-[#141210]"
              : "text-[#e8e3d8]/50 hover:text-[#e8e3d8]"
          }`}
        >
          Vista 3D
        </button>
      </div>

      {mode === "2d" ? (
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#0d0c0a]">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 42%, ${funko.accentColor}33, transparent 65%)`,
            }}
          />
          <Image
            src={funko.image}
            alt={`Funko Pop de ${funko.name}`}
            fill
            className="relative object-contain p-4"
            sizes="(max-width: 768px) 100vw, 480px"
          />
        </div>
      ) : (
        <FunkoViewer3D accentColor={funko.accentColor} modelUrl={funko.modelUrl} />
      )}
    </div>
  );
}
