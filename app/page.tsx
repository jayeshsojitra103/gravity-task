import { getAllPokemon, getPokemonTypes } from "./actions";
import { PokemonList } from "../components/pokemon-list";

export default async function Home() {
  const [pokemon, types] = await Promise.all([
    getAllPokemon(),
    getPokemonTypes(),
  ]);

  return (
    <main className="container mx-auto p-4">
      <h1 className="mb-8 text-center text-4xl font-bold">Pokemon</h1>
      <PokemonList initialPokemon={pokemon} types={types} />
    </main>
  );
}
