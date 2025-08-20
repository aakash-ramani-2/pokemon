import { DatasetType, SortOption, FilterType, LoadingState, ThemeMode } from '../types/enums';

// Mock Pokemon data
export const mockPokemonData = [
  {
    id: 1,
    name: 'Bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
    type: ['grass', 'poison'],
    height: 7,
    weight: 69,
    abilities: ['overgrow', 'chlorophyll'],
    stats: { hp: 45, attack: 49, defense: 49, speed: 45 },
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
  },
  {
    id: 2,
    name: 'Ivysaur',
    url: 'https://pokeapi.co/api/v2/pokemon/2/',
    type: ['grass', 'poison'],
    height: 10,
    weight: 130,
    abilities: ['overgrow', 'chlorophyll'],
    stats: { hp: 60, attack: 62, defense: 63, speed: 60 },
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png'
  },
  {
    id: 3,
    name: 'Venusaur',
    url: 'https://pokeapi.co/api/v2/pokemon/3/',
    type: ['grass', 'poison'],
    height: 20,
    weight: 1000,
    abilities: ['overgrow', 'chlorophyll'],
    stats: { hp: 80, attack: 82, defense: 83, speed: 80 },
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png'
  },
  {
    id: 4,
    name: 'Charmander',
    url: 'https://pokeapi.co/api/v2/pokemon/4/',
    type: ['fire'],
    height: 6,
    weight: 85,
    abilities: ['blaze', 'solar-power'],
    stats: { hp: 39, attack: 52, defense: 43, speed: 65 },
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png'
  },
  {
    id: 5,
    name: 'Charmeleon',
    url: 'https://pokeapi.co/api/v2/pokemon/5/',
    type: ['fire'],
    height: 11,
    weight: 190,
    abilities: ['blaze', 'solar-power'],
    stats: { hp: 58, attack: 64, defense: 58, speed: 80 },
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png'
  },
  {
    id: 6,
    name: 'Charizard',
    url: 'https://pokeapi.co/api/v2/pokemon/6/',
    type: ['fire', 'flying'],
    height: 17,
    weight: 905,
    abilities: ['blaze', 'solar-power'],
    stats: { hp: 78, attack: 84, defense: 78, speed: 100 },
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png'
  },
  {
    id: 7,
    name: 'Squirtle',
    url: 'https://pokeapi.co/api/v2/pokemon/7/',
    type: ['water'],
    height: 5,
    weight: 90,
    abilities: ['torrent', 'rain-dish'],
    stats: { hp: 44, attack: 48, defense: 65, speed: 43 },
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png'
  },
  {
    id: 8,
    name: 'Wartortle',
    url: 'https://pokeapi.co/api/v2/pokemon/8/',
    type: ['water'],
    height: 10,
    weight: 225,
    abilities: ['torrent', 'rain-dish'],
    stats: { hp: 59, attack: 63, defense: 80, speed: 58 },
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png'
  },
  {
    id: 9,
    name: 'Blastoise',
    url: 'https://pokeapi.co/api/v2/pokemon/9/',
    type: ['water'],
    height: 16,
    weight: 855,
    abilities: ['torrent', 'rain-dish'],
    stats: { hp: 79, attack: 83, defense: 100, speed: 78 },
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png'
  },
  {
    id: 10,
    name: 'Caterpie',
    url: 'https://pokeapi.co/api/v2/pokemon/10/',
    type: ['bug'],
    height: 3,
    weight: 29,
    abilities: ['shield-dust', 'run-away'],
    stats: { hp: 45, attack: 30, defense: 35, speed: 45 },
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png'
  },
  {
    id: 11,
    name: 'Metapod',
    url: 'https://pokeapi.co/api/v2/pokemon/11/',
    type: ['bug'],
    height: 7,
    weight: 99,
    abilities: ['shed-skin'],
    stats: { hp: 50, attack: 20, defense: 55, speed: 30 },
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png'
  },
  {
    id: 12,
    name: 'Butterfree',
    url: 'https://pokeapi.co/api/v2/pokemon/12/',
    type: ['bug', 'flying'],
    height: 11,
    weight: 320,
    abilities: ['compound-eyes', 'tinted-lens'],
    stats: { hp: 60, attack: 45, defense: 50, speed: 70 },
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png'
  },
  {
    id: 13,
    name: 'Weedle',
    url: 'https://pokeapi.co/api/v2/pokemon/13/',
    type: ['bug', 'poison'],
    height: 3,
    weight: 32,
    abilities: ['shield-dust', 'run-away'],
    stats: { hp: 40, attack: 35, defense: 30, speed: 50 },
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png'
  },
  {
    id: 14,
    name: 'Kakuna',
    url: 'https://pokeapi.co/api/v2/pokemon/14/',
    type: ['bug', 'poison'],
    height: 6,
    weight: 100,
    abilities: ['shed-skin'],
    stats: { hp: 45, attack: 25, defense: 50, speed: 35 },
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png'
  },
  {
    id: 15,
    name: 'Beedrill',
    url: 'https://pokeapi.co/api/v2/pokemon/15/',
    type: ['bug', 'poison'],
    height: 10,
    weight: 295,
    abilities: ['swarm', 'sniper'],
    stats: { hp: 65, attack: 90, defense: 40, speed: 75 },
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png'
  },
  {
    id: 16,
    name: 'Pidgey',
    url: 'https://pokeapi.co/api/v2/pokemon/16/',
    type: ['normal', 'flying'],
    height: 3,
    weight: 18,
    abilities: ['keen-eye', 'tangled-feet', 'big-pecks'],
    stats: { hp: 40, attack: 45, defense: 40, speed: 56 },
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png'
  },
  {
    id: 17,
    name: 'Pidgeotto',
    url: 'https://pokeapi.co/api/v2/pokemon/17/',
    type: ['normal', 'flying'],
    height: 11,
    weight: 300,
    abilities: ['keen-eye', 'tangled-feet', 'big-pecks'],
    stats: { hp: 63, attack: 60, defense: 55, speed: 71 },
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png'
  },
  {
    id: 18,
    name: 'Pidgeot',
    url: 'https://pokeapi.co/api/v2/pokemon/18/',
    type: ['normal', 'flying'],
    height: 15,
    weight: 395,
    abilities: ['keen-eye', 'tangled-feet', 'big-pecks'],
    stats: { hp: 83, attack: 80, defense: 75, speed: 101 },
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png'
  },
  {
    id: 19,
    name: 'Rattata',
    url: 'https://pokeapi.co/api/v2/pokemon/19/',
    type: ['normal'],
    height: 3,
    weight: 35,
    abilities: ['run-away', 'guts', 'hustle'],
    stats: { hp: 30, attack: 56, defense: 35, speed: 72 },
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png'
  },
  {
    id: 20,
    name: 'Raticate',
    url: 'https://pokeapi.co/api/v2/pokemon/20/',
    type: ['normal'],
    height: 7,
    weight: 185,
    abilities: ['run-away', 'guts', 'hustle'],
    stats: { hp: 55, attack: 81, defense: 60, speed: 97 },
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png'
  },
  {
    id: 25,
    name: 'Pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25/',
    type: ['electric'],
    height: 4,
    weight: 60,
    abilities: ['static', 'lightning-rod'],
    stats: { hp: 35, attack: 55, defense: 40, speed: 90 },
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
  },
  {
    id: 26,
    name: 'Raichu',
    url: 'https://pokeapi.co/api/v2/pokemon/26/',
    type: ['electric'],
    height: 8,
    weight: 300,
    abilities: ['static', 'lightning-rod'],
    stats: { hp: 60, attack: 90, defense: 55, speed: 110 },
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png'
  },
  {
    id: 27,
    name: 'Sandshrew',
    url: 'https://pokeapi.co/api/v2/pokemon/27/',
    type: ['ground'],
    height: 6,
    weight: 120,
    abilities: ['sand-veil', 'sand-rush'],
    stats: { hp: 50, attack: 75, defense: 85, speed: 40 },
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/27.png'
  },
  {
    id: 28,
    name: 'Sandslash',
    url: 'https://pokeapi.co/api/v2/pokemon/28/',
    type: ['ground'],
    height: 10,
    weight: 295,
    abilities: ['sand-veil', 'sand-rush'],
    stats: { hp: 75, attack: 100, defense: 110, speed: 65 },
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/28.png'
  }
] as const;

// Mock Rick & Morty data
export const mockRickAndMortyData = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive' as const,
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' },
    location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: ['https://rickandmortyapi.com/api/episode/1'],
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04T18:48:46.250Z'
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive' as const,
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'unknown', url: '' },
    location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    episode: ['https://rickandmortyapi.com/api/episode/1'],
    url: 'https://rickandmortyapi.com/api/character/2',
    created: '2017-11-04T18:50:21.651Z'
  }
] as const;

// Mock application state
export const mockStore = {
  currentDataset: DatasetType.POKEMON,
  searchQuery: '',
  currentPage: 1,
  itemsPerPage: 24,
  totalItems: 24,
  sortBy: SortOption.NAME_ASC,
  filterBy: FilterType.ALL,
  selectedFilters: [],
  favorites: [1, 25],
  themeMode: ThemeMode.LIGHT,
  loadingState: LoadingState.IDLE,
  error: null
};

// Mock API response structure
export const mockQuery = {
  pokemonListResponse: {
    count: 24,
    next: null,
    previous: null,
    results: mockPokemonData
  },
  rickAndMortyListResponse: {
    info: {
      count: 826,
      pages: 42,
      next: 'https://rickandmortyapi.com/api/character?page=2',
      prev: null
    },
    results: mockRickAndMortyData
  }
};

// Mock props for root component
export const mockRootProps = {
  initialDataset: DatasetType.POKEMON,
  initialTheme: ThemeMode.LIGHT,
  enableAnalytics: false,
  debugMode: false
};