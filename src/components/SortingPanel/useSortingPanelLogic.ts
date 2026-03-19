import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SEARCH_KEYS, DEFAULT_VALUES } from '../../constants/searchParams';

export function useSortingPanelLogic(
  selectedGenres: string[], ratingFrom: number, ratingTo: number, yearFrom: number, yearTo: number
) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [localGenres, setLocalGenres] = useState<string[]>(selectedGenres);
  const [localRating, setLocalRating] = useState<[number, number]>([ratingFrom, ratingTo]);
  const [localYear, setLocalYear] = useState<[number, number]>([yearFrom, yearTo]);

  const isChanged = useMemo(() => {
    return (
      localGenres.slice().sort().join(',') !== selectedGenres.slice().sort().join(',') ||
      localRating[0] !== ratingFrom || localRating[1] !== ratingTo ||
      localYear[0] !== yearFrom || localYear[1] !== yearTo
    );
  }, [localGenres, localRating, localYear, selectedGenres, ratingFrom, ratingTo, yearFrom, yearTo]);

  const handleChangeGenre = (value: string) => {
    setLocalGenres(prev =>
      prev.includes(value) ? prev.filter(g => g !== value) : [...prev, value]
    );
  };

  const handleChangeRange = (
    from: number, to: number, type: 'rating' | 'year'
  ) => {
    if (type === 'rating') setLocalRating([from, to]);
    if (type === 'year') setLocalYear([from, to]);
  };

  const applyFilters = () => {
    let newParams = new URLSearchParams(searchParams.toString());

    // Жанры
    if (localGenres.length > 0) {
      newParams.set(SEARCH_KEYS.GENRES, localGenres.join(','));
    } else {
      newParams.delete(SEARCH_KEYS.GENRES);
    }

    // Рейтинг
    newParams = validateFilters(
      newParams, localRating[0], DEFAULT_VALUES.RATING.FROM, SEARCH_KEYS.RATING.FROM, localRating[1], DEFAULT_VALUES.RATING.TO, SEARCH_KEYS.RATING.TO, 1,
    )

    // Год
    newParams = validateFilters(
      newParams, localYear[0], DEFAULT_VALUES.YEAR.FROM, SEARCH_KEYS.YEAR.FROM, localYear[1], DEFAULT_VALUES.YEAR.TO, SEARCH_KEYS.YEAR.TO, 0,
    )

    setSearchParams(newParams);
  };

  return {
    localGenres,
    localRating,
    localYear,
    isChanged,
    handleChangeGenre,
    handleChangeRange,
    applyFilters,
  };
}

function validateFilters(
  params: URLSearchParams, 
  currentFrom: number, defaultFrom: number, keyFrom: string, 
  currentTo: number, defaultTo: number, keyTo: string, 
  precision: number,
): URLSearchParams {
    if (currentFrom !== defaultFrom) {
      params.set(keyFrom, currentFrom.toFixed(precision));
    } else {
      params.delete(keyFrom);
    }
    if (currentTo !== defaultTo) {
      params.set(keyTo, currentTo.toFixed(precision));
    } else {
      params.delete(keyTo);
    }
    return params;
}