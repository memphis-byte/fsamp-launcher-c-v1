import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Server } from '../../types';

interface ServersState {
  list: Server[];
  favorites: Server[];
  selected: Server | null;
  loading: boolean;
  error: string | null;
  filteredList: Server[];
  searchQuery: string;
}

const initialState: ServersState = {
  list: [],
  favorites: [],
  selected: null,
  loading: false,
  error: null,
  filteredList: [],
  searchQuery: '',
};

export const serversSlice = createSlice({
  name: 'servers',
  initialState,
  reducers: {
    setServers: (state, action: PayloadAction<Server[]>) => {
      state.list = action.payload;
      const query = state.searchQuery.toLowerCase();
      if (query) {
        state.filteredList = state.list.filter(
          s => s.name.toLowerCase().includes(query) || s.mode.toLowerCase().includes(query)
        );
      } else {
        state.filteredList = state.list;
      }
    },
    setSelectedServer: (state, action: PayloadAction<Server>) => {
      state.selected = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<Server>) => {
      const index = state.favorites.findIndex(s => s.id === action.payload.id);
      if (index > -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(action.payload);
      }
    },
    setSearchQueryAndFilter: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      const query = action.payload.toLowerCase();
      state.filteredList = state.list.filter(
        s => s.name.toLowerCase().includes(query) || s.mode.toLowerCase().includes(query)
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setServers,
  setSelectedServer,
  toggleFavorite,
  setSearchQueryAndFilter,
  setLoading,
  setError,
} = serversSlice.actions;
export default serversSlice.reducer;