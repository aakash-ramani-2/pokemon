import React from 'react';
import { Card, CardContent, CardMedia, Typography, Stack, Chip, Box } from '@mui/material';
import { PokemonItem, RickAndMortyItem } from '../../types/schema';
import { FavoriteButton } from '../common/FavoriteButton';
import { DatasetType } from '../../types/enums';

interface ItemCardProps {
  item: PokemonItem | RickAndMortyItem;
  dataset: DatasetType;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  onClick: () => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  dataset,
  isFavorite,
  onFavoriteToggle,
  onClick
}) => {
  const renderPokemonCard = (pokemon: PokemonItem) => (
    <>
      <CardMedia
        component="img"
        height="160"
        image={pokemon.sprite}
        alt={pokemon.name}
        sx={{ 
          objectFit: 'contain',
          backgroundColor: 'grey.50'
        }}
      />
      <CardContent>
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Typography variant="h6" component="h3" sx={{ textTransform: 'capitalize' }}>
              {pokemon.name}
            </Typography>
            <FavoriteButton
              isFavorite={isFavorite}
              onToggle={onFavoriteToggle}
              size="small"
            />
          </Stack>
          
          <Typography variant="body2" color="text.secondary">
            #{pokemon.id.toString().padStart(3, '0')}
          </Typography>
          
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {pokemon.type.map((type) => (
              <Chip
                key={type}
                label={type}
                size="small"
                variant="outlined"
                sx={{ textTransform: 'capitalize' }}
              />
            ))}
          </Stack>
          
          <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Height: {pokemon.height / 10}m
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Weight: {pokemon.weight / 10}kg
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </>
  );

  const renderRickAndMortyCard = (character: RickAndMortyItem) => (
    <>
      <CardMedia
        component="img"
        height="160"
        image={character.image}
        alt={character.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Typography variant="h6" component="h3">
              {character.name}
            </Typography>
            <FavoriteButton
              isFavorite={isFavorite}
              onToggle={onFavoriteToggle}
              size="small"
            />
          </Stack>
          
          <Stack direction="row" spacing={1}>
            <Chip
              label={character.status}
              size="small"
              color={
                character.status === 'Alive' ? 'success' : 
                character.status === 'Dead' ? 'error' : 'default'
              }
            />
            <Chip
              label={character.species}
              size="small"
              variant="outlined"
            />
          </Stack>
          
          <Typography variant="body2" color="text.secondary">
            {character.gender} • {character.origin.name}
          </Typography>
        </Stack>
      </CardContent>
    </>
  );

  return (
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3
        }
      }}
      onClick={onClick}
    >
      {dataset === DatasetType.POKEMON && renderPokemonCard(item as PokemonItem)}
      {dataset === DatasetType.RICK_AND_MORTY && renderRickAndMortyCard(item as RickAndMortyItem)}
    </Card>
  );
};