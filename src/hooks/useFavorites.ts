import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'resource-explorer-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, [favorites]);

  const toggleFavorite = useCallback((id: number) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        return prev.filter(fav => fav !== id);
      } else {
        return [...prev, id];
      }
    });
  }, []);

  const isFavorite = useCallback((id: number) => {
    return favorites.includes(id);
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites
  };
}