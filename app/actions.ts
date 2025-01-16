'use server'

import type { Pokemon, PokemonType } from '@/types/pokemon'

const url = 'https://pokeapi.co/api/v2'
export async function getPokemonTypes(): Promise<PokemonType[]> {
    const response = await fetch(`${url}/type`)
    const data = await response.json()
    return data.results
}

export async function getAllPokemon(): Promise<Pokemon[]> {

    const response = await fetch(`${url}/pokemon?limit=151`)
    const data = await response.json()

    const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon: { url: string }) => {
            const res = await fetch(pokemon.url)
            return res.json()
        })
    )


    return pokemonDetails
}


export async function getPokemonByName(name: string): Promise<Pokemon> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) {
        throw new Error('Pokemon not found');
    }
    const data = await response.json();
    return data;
}


