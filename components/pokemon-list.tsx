"use client";

import { useState } from "react";
import { PokemonCard } from "./pokemon-card";
import { SearchForm } from "./search-form";
import { usePokemonSearch } from "../hooks/use-pokemon-search";
import type { Pokemon, PokemonType } from "../types/pokemon";

interface PokemonListProps {
  initialPokemon: Pokemon[];
  types: PokemonType[];
}

export function PokemonList({ initialPokemon, types }: PokemonListProps) {
  const [selectedType, setSelectedType] = useState("all");

  const { searchTerm, setSearchTerm, filteredPokemon } = usePokemonSearch(
    initialPokemon,
    selectedType
  );

  return (
    <>
      <div className="mb-8 flex rounded-lg">
        <SearchForm
          types={types}
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
        />
      </div>

      <>
        {searchTerm && filteredPokemon.length === 0 ? (
          <div className="flex justify-center align-center">
            <h1 className="text-xl font-bold">{`No Pokemon found : ${searchTerm}`}</h1>
          </div>
        ) : (
          <div className="grid gap-4 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 ">
            {filteredPokemon.map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))}
          </div>
        )}
      </>
    </>
  );
}
