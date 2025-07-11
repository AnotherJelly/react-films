import { useCallback, useEffect, useState } from 'react';
import { addFavorite, isFavorite, removeFavorite } from '../../utils/favorites';

export function useFavorite(id: number) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(isFavorite(id));
  }, [id]);

  const toggleFavorite = useCallback(() => {
    if (isFav) {
      removeFavorite(id);
      setIsFav(false);
    } else {
      addFavorite(id);
      setIsFav(true);
    }
  }, [id, isFav]);

  return { isFav, toggleFavorite };
}
