export type FunkoImage = { label: string; src: string };

export type Funko = {
  slug: string;
  name: string;
  number: string;
  description: string;
  images: FunkoImage[];
  accentColor: string;
  modelUrl?: string;
};

export const funkos: Funko[] = [
  {
    slug: "latias",
    name: "Latias",
    number: "#641",
    description:
      "Un Funko Pop que no existe realmente, imaginado con IA para este Pokémon.",
    images: [
      { label: "Vista frontal", src: "/funkos/latias/front.png" },
      { label: "Caja", src: "/funkos/latias/box.png" },
      { label: "Vista lateral", src: "/funkos/latias/side.png" },
      { label: "Vista trasera", src: "/funkos/latias/back.png" },
    ],
    accentColor: "#d81f2a",
    modelUrl: "/models/latias.glb",
  },
  {
    slug: "flygon",
    name: "Flygon",
    number: "#330",
    description:
      "Un Funko Pop que no existe realmente, imaginado con IA para este Pokémon.",
    images: [
      { label: "Vista frontal", src: "/funkos/flygon/front.png" },
      { label: "Caja", src: "/funkos/flygon/box.png" },
      { label: "Vista izquierda", src: "/funkos/flygon/left.png" },
      { label: "Vista trasera", src: "/funkos/flygon/back.png" },
      { label: "Vista derecha", src: "/funkos/flygon/right.png" },
    ],
    accentColor: "#5a8f3c",
    modelUrl: "/models/flygon.glb",
  },
];

export function getFunko(slug: string) {
  return funkos.find((funko) => funko.slug === slug);
}
