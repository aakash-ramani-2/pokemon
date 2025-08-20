import { useCallback } from 'react';
import { DatasetType, SortOption, FilterType } from '../types/enums';

interface URLState {
  dataset?: DatasetType;
  search?: string;
  sort?: SortOption;
  filter?: FilterType;
  page?: number;
}

export function useURLSync() {
  const syncToURL = useCallback((state: URLState) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams();

    if (state.dataset) params.set('dataset', state.dataset);
    if (state.search) params.set('q', state.search);
    if (state.sort) params.set('sort', state.sort);
    if (state.filter && state.filter !== FilterType.ALL) params.set('filter', state.filter);
    if (state.page && state.page > 1) params.set('page', state.page.toString());

    url.search = params.toString();
    window.history.replaceState({}, '', url.toString());
  }, []);

  const getStateFromURL = useCallback((): URLState => {
    const params = new URLSearchParams(window.location.search);
    
    return {
      dataset: params.get('dataset') as DatasetType || DatasetType.POKEMON,
      search: params.get('q') || '',
      sort: params.get('sort') as SortOption || SortOption.NAME_ASC,
      filter: params.get('filter') as FilterType || FilterType.ALL,
      page: parseInt(params.get('page') || '1', 10)
    };
  }, []);

  return {
    syncToURL,
    getStateFromURL
  };
}