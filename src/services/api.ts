import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PokemonItem, RickAndMortyItem, ApiResponse } from '../types/schema';
import { DatasetType } from '../types/enums';

// Mock data for Rick & Morty (keeping this as fallback)
import { mockRickAndMortyData } from '../data/resourceExplorerMockData';

// PokéAPI response interfaces
interface PokeApiPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<{
    type: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  sprites: {
    front_default: string;
  };
}

interface PokeApiListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

// PokéAPI Type response interface
interface PokeApiTypeResponse {
  id: number;
  name: string;
  pokemon: Array<{
    pokemon: {
      name: string;
      url: string;
    };
  }>;
}

// Transform PokéAPI data to our format
const transformPokemonData = (pokeApiData: PokeApiPokemon): PokemonItem => {
  const stats = pokeApiData.stats.reduce((acc, stat) => {
    switch (stat.stat.name) {
      case 'hp':
        acc.hp = stat.base_stat;
        break;
      case 'attack':
        acc.attack = stat.base_stat;
        break;
      case 'defense':
        acc.defense = stat.base_stat;
        break;
      case 'speed':
        acc.speed = stat.base_stat;
        break;
    }
    return acc;
  }, { hp: 0, attack: 0, defense: 0, speed: 0 });

  return {
    id: pokeApiData.id,
    name: pokeApiData.name,
    url: `https://pokeapi.co/api/v2/pokemon/${pokeApiData.id}/`,
    type: pokeApiData.types.map(t => t.type.name),
    height: pokeApiData.height,
    weight: pokeApiData.weight,
    abilities: pokeApiData.abilities.map(a => a.ability.name),
    stats,
    sprite: pokeApiData.sprites.front_default || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeApiData.id}.png`
  };
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/'
  }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<ApiResponse<PokemonItem>, {
      page?: number;
      limit?: number;
      search?: string;
      type?: string;
    }>({
      queryFn: async (params, { signal }) => {
        try {
          const page = params.page || 1;
          const limit = params.limit || 20;
          const offset = (page - 1) * limit;

          // Handle type filtering using PokéAPI's type endpoint
          if (params.type && !params.search) {
            const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${params.type}/`, { signal });
            if (!typeResponse.ok) throw new Error(`Failed to fetch ${params.type} type Pokemon`);
            
            const typeData: PokeApiTypeResponse = await typeResponse.json();
            const typePokemon = typeData.pokemon.map(p => p.pokemon);
            
            // Apply pagination to type-filtered results
            const paginatedResults = typePokemon.slice(offset, offset + limit);
            
            // Fetch detailed data for paginated type-filtered Pokemon
            const detailedPokemon = await Promise.all(
              paginatedResults.map(async (pokemon) => {
                const detailResponse = await fetch(pokemon.url, { signal });
                if (!detailResponse.ok) throw new Error(`Failed to fetch ${pokemon.name}`);
                const detailData: PokeApiPokemon = await detailResponse.json();
                return transformPokemonData(detailData);
              })
            );

            return {
              data: {
                count: typePokemon.length,
                next: offset + limit < typePokemon.length ? `page=${page + 1}` : null,
                previous: page > 1 ? `page=${page - 1}` : null,
                results: detailedPokemon
              }
            };
          }

          // Handle search with optional type filtering
          if (params.search) {
            let pokemonToSearch: Array<{ name: string; url: string }> = [];
            
            if (params.type) {
              // Search within a specific type
              const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${params.type}/`, { signal });
              if (!typeResponse.ok) throw new Error(`Failed to fetch ${params.type} type Pokemon`);
              
              const typeData: PokeApiTypeResponse = await typeResponse.json();
              pokemonToSearch = typeData.pokemon.map(p => p.pokemon);
            } else {
              // Search all Pokemon
              const searchResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0`, { signal });
              if (!searchResponse.ok) throw new Error('Failed to fetch Pokemon list');
              
              const searchData: PokeApiListResponse = await searchResponse.json();
              pokemonToSearch = searchData.results;
            }

            // Filter by search term
            const filteredResults = pokemonToSearch.filter(pokemon =>
              pokemon.name.toLowerCase().includes(params.search!.toLowerCase())
            );

            // Apply pagination to search results
            const paginatedResults = filteredResults.slice(offset, offset + limit);
            
            // Fetch detailed data for paginated search results
            const detailedPokemon = await Promise.all(
              paginatedResults.map(async (pokemon) => {
                const detailResponse = await fetch(pokemon.url, { signal });
                if (!detailResponse.ok) throw new Error(`Failed to fetch ${pokemon.name}`);
                const detailData: PokeApiPokemon = await detailResponse.json();
                return transformPokemonData(detailData);
              })
            );

            return {
              data: {
                count: filteredResults.length,
                next: offset + limit < filteredResults.length ? `page=${page + 1}` : null,
                previous: page > 1 ? `page=${page - 1}` : null,
                results: detailedPokemon
              }
            };
          }

          // Regular pagination without filters
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`, { signal });
          if (!response.ok) throw new Error('Failed to fetch Pokemon list');
          
          const data: PokeApiListResponse = await response.json();

          // Fetch detailed data for each Pokemon
          const detailedPokemon = await Promise.all(
            data.results.map(async (pokemon) => {
              const detailResponse = await fetch(pokemon.url, { signal });
              if (!detailResponse.ok) throw new Error(`Failed to fetch ${pokemon.name}`);
              const detailData: PokeApiPokemon = await detailResponse.json();
              return transformPokemonData(detailData);
            })
          );

          return {
            data: {
              count: data.count,
              next: data.next ? `page=${page + 1}` : null,
              previous: data.previous ? `page=${page - 1}` : null,
              results: detailedPokemon
            }
          };
        } catch (error) {
          return {
            error: {
              status: 'FETCH_ERROR',
              data: error instanceof Error ? error.message : 'Failed to fetch Pokemon data'
            }
          };
        }
      }
    }),
    
    getPokemonDetail: builder.query<PokemonItem, number>({
      queryFn: async (id, { signal }) => {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`, { signal });
          if (!response.ok) {
            if (response.status === 404) {
              return { error: { status: 404, data: 'Pokemon not found' } };
            }
            throw new Error('Failed to fetch Pokemon details');
          }
          
          const data: PokeApiPokemon = await response.json();
          return { data: transformPokemonData(data) };
        } catch (error) {
          return {
            error: {
              status: 'FETCH_ERROR',
              data: error instanceof Error ? error.message : 'Failed to fetch Pokemon details'
            }
          };
        }
      }
    }),
    
    getRickAndMortyList: builder.query<ApiResponse<RickAndMortyItem>, {
      page?: number;
      name?: string;
      status?: string;
      species?: string;
    }>({
      queryFn: async (params) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let filteredData = [...mockRickAndMortyData];
        
        if (params.name) {
          filteredData = filteredData.filter(character =>
            character.name.toLowerCase().includes(params.name!.toLowerCase())
          );
        }
        
        if (params.status) {
          filteredData = filteredData.filter(character =>
            character.status.toLowerCase() === params.status!.toLowerCase()
          );
        }
        
        if (params.species) {
          filteredData = filteredData.filter(character =>
            character.species.toLowerCase().includes(params.species!.toLowerCase())
          );
        }
        
        const page = params.page || 1;
        const limit = 20;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        
        return {
          data: {
            info: {
              count: filteredData.length,
              pages: Math.ceil(filteredData.length / limit),
              next: endIndex < filteredData.length ? `page=${page + 1}` : null,
              prev: page > 1 ? `page=${page - 1}` : null
            },
            results: filteredData.slice(startIndex, endIndex)
          }
        };
      }
    }),
    
    getRickAndMortyDetail: builder.query<RickAndMortyItem, number>({
      queryFn: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const character = mockRickAndMortyData.find(c => c.id === id);
        if (!character) {
          return { error: { status: 404, data: 'Character not found' } };
        }
        
        return { data: character };
      }
    })
  })
});

export const {
  useGetPokemonListQuery,
  useGetPokemonDetailQuery,
  useGetRickAndMortyListQuery,
  useGetRickAndMortyDetailQuery
} = api;