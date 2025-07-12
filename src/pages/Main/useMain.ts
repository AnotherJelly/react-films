import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Film } from "../../types/film";
import { DEFAULT_VALUES, SEARCH_KEYS } from "../../constants/searchParams";
import { validateRange } from "../../utils/validate";
import { getFilms } from "../../api/films";
import { API } from "../../constants/filmApi";

export function useMain () {
  const [searchParams] = useSearchParams();
  const [films, setFilms] = useState<Film[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const selectedGenres = useMemo(() => {
    const param = searchParams.get(SEARCH_KEYS.GENRES);
    return param ? param.split(",") : [];
  }, [searchParams]);

  const [ratingFrom, ratingTo] = useMemo(() =>
    validateRange(
      searchParams,
      SEARCH_KEYS.RATING.FROM,
      SEARCH_KEYS.RATING.TO,
      DEFAULT_VALUES.RATING.FROM,
      DEFAULT_VALUES.RATING.TO
    )
  , [searchParams]);

  const [yearFrom, yearTo] = useMemo(() =>
    validateRange(
      searchParams,
      SEARCH_KEYS.YEAR.FROM,
      SEARCH_KEYS.YEAR.TO,
      DEFAULT_VALUES.YEAR.FROM,
      DEFAULT_VALUES.YEAR.TO
    )
  , [searchParams]);

const loadFilms = useCallback(async () => {
  if (loading || !hasMore) return;

  setLoading(true);
  try {
    const newFilms = await getFilms(
      page,
      API.FILMS_PER_PAGE,
      {
        genres: selectedGenres,
        ratingFrom,
        ratingTo,
        yearFrom,
        yearTo,
      }
    );

    if (newFilms.length === 0) {
      setHasMore(false);
    } else {
      setFilms(prev => [...prev, ...newFilms]);
      setPage(prev => prev + 1);
    }
  } catch (err) {
    console.error("Ошибка загрузки фильмов:", err);
  } finally {
    setLoading(false);
  }
}, [page, loading, hasMore, selectedGenres, ratingFrom, ratingTo, yearFrom, yearTo]);

  useEffect(() => {
    if (!observerRef.current || loading) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadFilms();
      }
    });

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loadFilms, loading]);

  useEffect(() => {
    setFilms([]);
    setPage(1);
    setHasMore(true);
  }, [searchParams]);

  const genres = useMemo(() => {
    const genresSet = new Set(films.flatMap((film) => film.genres));
    return Array.from(genresSet);
  }, [films]);

  return {
    genres, 
    selectedGenres, 
    ratingFrom, 
    ratingTo, 
    yearFrom, 
    yearTo, 
    films, 
    loading, 
    observerRef, 
    hasMore
  }
}