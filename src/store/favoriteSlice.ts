import type { StateCreator } from "zustand";
import type { Film } from "../types/film";
import type { Store } from "../types/store";

interface FavoriteState {
  films: Film[];
}

interface FavoriteActions {
  addFavorite: (film: Film) => void;
  removeFavorite: (id: number) => void;
  getFavoriteById: (id: number) => Film | null;
  hasFavoriteById: (id: number) => boolean;
  resetFavorite: () => void;
}

export type FavoriteSlice = FavoriteState & FavoriteActions;

const initialState: FavoriteState = {
  films: []
}

export const createFavoriteSlice: StateCreator<
  Store,
  [['zustand/immer', never]],
  [],
  FavoriteSlice
> = (set, get) => ({
  ...initialState,

  addFavorite: (film) =>
    set((state) => {
      if (!state.films.some(f => f.id === film.id)) {
        state.films.push(film);
      }
    }),

  removeFavorite: (filmId) => 
    set((state) => {
      const index = state.films.findIndex(f => f.id === filmId);
      if (index !== -1) state.films.splice(index, 1);
    }),
  
  getFavoriteById: (filmId) => 
    get().films.find((film) => film.id === filmId) ?? null,

  hasFavoriteById: (filmId) =>
    get().films.some((film) => film.id === filmId),
  
  resetFavorite: () => set(() => initialState),
})