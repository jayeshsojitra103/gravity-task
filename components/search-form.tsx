"use client";

import type { PokemonType } from "@/types/pokemon";
import SearchInput from "./Search-Input";
import { Select } from "./Select";

interface SearchFormProps {
  types: PokemonType[];
  searchTerm: string;
  onSearch: (value: string) => void;
  selectedType: string;
  onTypeChange: (value: string) => void;
}

export function SearchForm({
  types,
  searchTerm,
  onSearch,
  selectedType,
  onTypeChange,
}: SearchFormProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full bg-gray-100 p-6 rounded-lg shadow-md border border-gray-200">
      {/* Search Input */}
      <div className="w-full max-w-md">
        <label
          htmlFor="search"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Search Pokémon
        </label>
        <SearchInput {...{ searchTerm, onSearch }} />
      </div>

      {/* Select Dropdown */}
      <div className="w-full max-w-md">
        <label
          htmlFor="type"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Filter by Type
        </label>
        <Select {...{ types, selectedType, onTypeChange }} />
      </div>
    </div>
  );
}
