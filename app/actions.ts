'use server'

import type { Pokemon, PokemonType } from '@/types/pokemon'

const url = 'https://pokeapi.co/api/v2';

export async function getPokemonTypes(): Promise<PokemonType[]> {
    const response = await fetch(`${url}/type`, {
        next: {
            // request comes in, at most once every 60 seconds.
            revalidate: 60
        }
    })
    const data = await response.json()
    return data.results
}

export async function getAllPokemon(): Promise<Pokemon[]> {

    const response = await fetch(`${url}/pokemon?limit=50`)
    const data = await response.json()

    const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon: { url: string }) => {
            const res = await fetch(pokemon.url, {
                next: {
                    // request comes in, at most once every 60 seconds.
                    revalidate: 60
                }
            })
            return res.json()
        })
    )


    return pokemonDetails
}


export async function getPokemonByName(name: string): Promise<Pokemon> {
    const response = await fetch(`${url}/pokemon/${name}`, {
        next: {
            // request comes in, at most once every 60 seconds.
            revalidate: 60
        }
    });
    if (!response.ok) {
        throw new Error('Pokemon not found');
    }
    const data = await response.json();
    return data;
}


