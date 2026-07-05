"use client";

import { useState } from "react";
import Image from "next/image";
import type { Funko } from "@/data/funkos";
import { FunkoViewer3D } from "@/components/FunkoViewer3D";

export function FunkoDetail({ funko }: { funko: Funko }) {
  const [mode, setMode] = useState<"2d" | "3d">("2d");
  const [imageIndex, setImageIndex] = useState(0);
  const activeImage = funko.images[imageIndex];

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
        <div>
          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#0d0c0a]">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 50% 42%, ${funko.accentColor}33, transparent 65%)`,
              }}
            />
            <Image
              src={activeImage.src}
              alt={`Funko Pop de ${funko.name} — ${activeImage.label}`}
              fill
              className="relative object-contain p-4"
              sizes="(max-width: 768px) 100vw, 480px"
            />
          </div>
          <div className="mt-3 flex gap-2">
            {funko.images.map((image, index) => (
              <button
                key={image.src}
                onClick={() => setImageIndex(index)}
                aria-label={image.label}
                aria-current={index === imageIndex}
                className={`relative aspect-square w-16 shrink-0 overflow-hidden rounded-lg border bg-[#0d0c0a] transition ${
                  index === imageIndex
                    ? "border-[var(--gold)]"
                    : "border-[#c9a25c]/15 hover:border-[#c9a25c]/40"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.label}
                  fill
                  className="object-contain p-1.5"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <FunkoViewer3D accentColor={funko.accentColor} modelUrl={funko.modelUrl} />
      )}
    </div>
  );
}
