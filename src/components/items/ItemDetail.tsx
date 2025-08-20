import React from 'react';
import { 
  Paper, 
  Typography, 
  Stack, 
  Button, 
  Chip, 
  Box,
  Divider,
  LinearProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PokemonItem, RickAndMortyItem } from '../../types/schema';
import { DatasetType } from '../../types/enums';
import { FavoriteButton } from '../common/FavoriteButton';

interface ItemDetailProps {
  item: PokemonItem | RickAndMortyItem;
  dataset: DatasetType;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  onBack: () => void;
}

export const ItemDetail: React.FC<ItemDetailProps> = ({
  item,
  dataset,
  isFavorite,
  onFavoriteToggle,
  onBack
}) => {
  const renderPokemonDetail = (pokemon: PokemonItem) => (
    <Stack spacing={3}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 200,
          backgroundColor: 'grey.50',
          borderRadius: 1
        }}
      >
        <img
          src={pokemon.sprite}
          alt={pokemon.name}
          style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
        />
      </Box>

      <Stack spacing={2}>
        <Typography variant="h4" sx={{ textTransform: 'capitalize', fontWeight: 600 }}>
          {pokemon.name}
        </Typography>
        
        <Typography variant="h6" color="text.secondary">
          #{pokemon.id.toString().padStart(3, '0')}
        </Typography>

        <Stack direction="row" spacing={1}>
          {pokemon.type.map((type) => (
            <Chip
              key={type}
              label={type}
              color="primary"
              sx={{ textTransform: 'capitalize' }}
            />
          ))}
        </Stack>
      </Stack>

      <Divider />

      <Stack spacing={2}>
        <Typography variant="h6">Physical Stats</Typography>
        <Stack direction="row" spacing={4}>
          <Box>
            <Typography variant="body2" color="text.secondary">Height</Typography>
            <Typography variant="h6">{pokemon.height / 10}m</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Weight</Typography>
            <Typography variant="h6">{pokemon.weight / 10}kg</Typography>
          </Box>
        </Stack>
      </Stack>

      <Divider />

      <Stack spacing={2}>
        <Typography variant="h6">Abilities</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {pokemon.abilities.map((ability) => (
            <Chip
              key={ability}
              label={ability.replace('-', ' ')}
              variant="outlined"
              sx={{ textTransform: 'capitalize' }}
            />
          ))}
        </Stack>
      </Stack>

      <Divider />

      <Stack spacing={2}>
        <Typography variant="h6">Base Stats</Typography>
        {Object.entries(pokemon.stats).map(([stat, value]) => (
          <Box key={stat}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                {stat}
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {value}
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={(value / 150) * 100}
              sx={{ height: 6, borderRadius: 3 }}
            />
          </Box>
        ))}
      </Stack>
    </Stack>
  );

  const renderRickAndMortyDetail = (character: RickAndMortyItem) => (
    <Stack spacing={3}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 200
        }}
      >
        <img
          src={character.image}
          alt={character.name}
          style={{ 
            maxWidth: '200px', 
            maxHeight: '200px', 
            borderRadius: '8px',
            objectFit: 'cover'
          }}
        />
      </Box>

      <Stack spacing={2}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          {character.name}
        </Typography>

        <Stack direction="row" spacing={1}>
          <Chip
            label={character.status}
            color={
              character.status === 'Alive' ? 'success' : 
              character.status === 'Dead' ? 'error' : 'default'
            }
          />
          <Chip
            label={character.species}
            variant="outlined"
          />
          <Chip
            label={character.gender}
            variant="outlined"
          />
        </Stack>
      </Stack>

      <Divider />

      <Stack spacing={2}>
        <Typography variant="h6">Origin & Location</Typography>
        <Stack spacing={1}>
          <Box>
            <Typography variant="body2" color="text.secondary">Origin</Typography>
            <Typography variant="body1">{character.origin.name}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Last known location</Typography>
            <Typography variant="body1">{character.location.name}</Typography>
          </Box>
        </Stack>
      </Stack>

      <Divider />

      <Stack spacing={2}>
        <Typography variant="h6">Additional Info</Typography>
        <Stack spacing={1}>
          <Box>
            <Typography variant="body2" color="text.secondary">Episodes</Typography>
            <Typography variant="body1">{character.episode.length} episodes</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Created</Typography>
            <Typography variant="body1">
              {new Date(character.created).toLocaleDateString()}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={onBack}
            variant="outlined"
          >
            Back to list
          </Button>
          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={onFavoriteToggle}
          />
        </Stack>

        {dataset === DatasetType.POKEMON && renderPokemonDetail(item as PokemonItem)}
        {dataset === DatasetType.RICK_AND_MORTY && renderRickAndMortyDetail(item as RickAndMortyItem)}
      </Stack>
    </Paper>
  );
};