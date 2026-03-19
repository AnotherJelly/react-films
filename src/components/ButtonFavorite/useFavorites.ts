import { useStore } from '../../store/store';
import { useShallow } from 'zustand/shallow';
import type { Film } from '../../types/film';

export function useFavorite(film: Film) {

  const { addFavorite, removeFavorite, isFavorite } = useStore(useShallow((state) => ({
      addFavorite: state.addFavorite,
      removeFavorite: state.removeFavorite,
      isFavorite: state.hasFavoriteById(film.id),
    }))
  );

  function toggleFavorite() {
    if (isFavorite) {
      removeFavorite(film.id);
    } else {
      addFavorite(film);
    }
  }

  return { isFavorite, toggleFavorite };
}
