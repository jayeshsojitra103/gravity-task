import Link from "next/link";
import Image from "next/image";
import type { Pokemon } from "../types/pokemon";
import { Card, CardContent, CardFooter } from "./ui/card";

export function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg cursor-pointer">
      <CardContent className="p-0">
        <div className="aspect-square bg-gray-50 transition-all hover:scale-100 ">
          <Image
            src={
              pokemon.sprites.other["official-artwork"].front_default ||
              "/placeholder.svg"
            }
            alt={pokemon.name}
            width={200}
            height={200}
            loading="lazy"
            className="h-full w-full object-contain p-4"
          />
        </div>
        <div className="p-4 transition">
          <h2 className="text-lg font-semibold capitalize text-gray-900">
            {pokemon.name}
          </h2>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/pokemon/${pokemon.name}`}>
          <span className="text-sm text-blue-600 hover:underline">
            Details →
          </span>
        </Link>
      </CardFooter>
    </Card>
  );
}
