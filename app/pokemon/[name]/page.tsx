import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb";
import { getPokemonByName } from "@/app/actions";
import Image from "next/image";
import { Abilities, Stats, Types } from "@/types/pokemon";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const pokemon = await getPokemonByName(resolvedParams.name);
    return {
      title: `Pokémon - ${pokemon.name}`,
      description: `${pokemon.name} is a Pokémon of type(s) ${pokemon.types
        .map((type: Types) => type.type.name)
        .join(", ")}. Check out its stats, abilities, and more!`,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Pokémon Not Found",
      description: "The Pokémon you are looking for does not exist.",
    };
  }
}

interface Params {
  name: string;
}

export default async function PokemonPage({ params }: { params: Params }) {
  let pokemon;

  try {
    const resolvedParams = await params;
    pokemon = await getPokemonByName((resolvedParams as Params).name);
  } catch (error) {
    console.log(error);
    notFound();
  }

  return (
    <main className="container mx-auto max-w-5xl px-6 py-10 font-serif">
      {/* Breadcrumb Navigation */}
      <div className="mb-10">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: pokemon.name, href: `/pokemon/${pokemon.name}` },
          ]}
        />
      </div>

      {/* Main Content */}
      <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
        {/* Pokémon Image */}
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 shadow-lg">
          <Image
            src={
              pokemon.sprites.other["official-artwork"].front_default ||
              "/placeholder.svg"
            }
            alt={pokemon.name}
            fill
            loading="eager"
            className="object-contain p-8"
          />
        </div>

        {/* Pokémon Details */}
        <div className="space-y-10">
          {/* Header Section */}
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-bold capitalize text-gray-800">
              {pokemon.name}
            </h1>
            <div className="mt-4 flex justify-center md:justify-start gap-3 flex-wrap">
              {pokemon.types.map((type: Types) => (
                <span
                  key={type.type.name}
                  className={`inline-block rounded-full px-4 py-2 text-sm font-medium text-white capitalize ${
                    type.type.name === "fire"
                      ? "bg-red-600"
                      : type.type.name === "water"
                      ? "bg-blue-600"
                      : type.type.name === "grass"
                      ? "bg-green-600"
                      : "bg-gray-600"
                  }`}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Stats
            </h2>
            <dl className="grid gap-4">
              {pokemon.stats.map((stat: Stats) => (
                <div key={stat.stat.name} className="flex justify-between">
                  <dt className="text-gray-600 capitalize">{stat.stat.name}</dt>
                  <dd className="font-medium text-gray-800">
                    {stat.base_stat}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Details Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Details
            </h2>
            <dl className="grid gap-4">
              <div className="flex justify-between">
                <dt className="text-gray-600">Height</dt>
                <dd className="font-medium text-gray-800">
                  {pokemon.height / 10}m
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Weight</dt>
                <dd className="font-medium text-gray-800">
                  {pokemon.weight / 10}kg
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Abilities</dt>
                <dd className="font-medium text-gray-800 capitalize">
                  {pokemon.abilities
                    .map((ability: Abilities) => ability.ability.name)
                    .join(", ")}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </main>
  );
}
