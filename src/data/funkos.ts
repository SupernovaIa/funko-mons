export type Funko = {
  slug: string;
  name: string;
  number: string;
  description: string;
  image: string;
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
    image: "/funkos/latias-641.png",
    accentColor: "#d81f2a",
    modelUrl: "/models/latias.glb",
  },
];

export function getFunko(slug: string) {
  return funkos.find((funko) => funko.slug === slug);
}
