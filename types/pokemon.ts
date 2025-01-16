export interface Pokemon {
    id: number
    name: string
    types: Types[]
    sprites: Sprites
    height: number
    weight: number
    abilities: Abilities[]
    stats: Stats[]
}

export interface PokemonType {
    name: string
    url: string
}

export interface Types {
    type: {
        name: string
    }
}
export interface Sprites {
    other: {
        'official-artwork': {
            front_default: string
        }
    }
}

export interface Stats {
    base_stat: number
    stat: {
        name: string
    }
}

export interface Abilities {
    ability: {
        name: string
    }
}