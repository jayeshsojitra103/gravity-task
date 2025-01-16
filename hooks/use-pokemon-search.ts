'use client'

import { useState, useEffect } from 'react'
import type { Pokemon } from '@/types/pokemon'

export function usePokemonSearch(initialPokemon: Pokemon[], selectedType: string) {
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>(initialPokemon)

    useEffect(() => {
        const filtered = initialPokemon.filter((pokemon) => {
            const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesType =
                selectedType === 'all' || pokemon.types.some((type) => type.type.name === selectedType)
            return matchesSearch && matchesType
        })

        setFilteredPokemon(filtered)
    }, [searchTerm, selectedType, initialPokemon])

    return {
        searchTerm,
        setSearchTerm,
        filteredPokemon,
    }
}

