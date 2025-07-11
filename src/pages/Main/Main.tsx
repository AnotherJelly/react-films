import { useEffect, useRef, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { getFilms } from "../../api/films";
import { SkeletonCards } from "../../components/SkeletonCards/SkeletonCards";
import { FilmList } from "../../components/FilmList/FilmList";
import { SortingPanel } from "../../components/SortingPanel/SortingPanel";
import { validateRange } from "../../utils/validate";
import { Film } from "../../types/film";
import { SEARCH_KEYS, DEFAULT_VALUES } from "../../constants/searchParams";
import style from './Main.module.css';
import { API } from "../../constants/filmApi";

export function Main() {
  const [searchParams] = useSearchParams();
  const [films, setFilms] = useState<Film[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const selectedGenresParam = searchParams.get(SEARCH_KEYS.GENRES);
  const selectedGenres = selectedGenresParam ? selectedGenresParam.split(",") : [];

  const [ratingFrom, ratingTo] = validateRange(
    searchParams,
    SEARCH_KEYS.RATING.FROM,
    SEARCH_KEYS.RATING.TO,
    DEFAULT_VALUES.RATING.FROM,
    DEFAULT_VALUES.RATING.TO
  );

  const [yearFrom, yearTo] = validateRange(
    searchParams,
    SEARCH_KEYS.YEAR.FROM,
    SEARCH_KEYS.YEAR.TO,
    DEFAULT_VALUES.YEAR.FROM,
    DEFAULT_VALUES.YEAR.TO
  );

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

  const genresSet = new Set(films.flatMap((film) => film.genres));
  const genres = Array.from(genresSet);

  return (
    <div className={style.mainContent}>
      <SortingPanel
        genres={genres}
        selectedGenres={selectedGenres}
        ratingFrom={ratingFrom}
        ratingTo={ratingTo}
        yearFrom={yearFrom}
        yearTo={yearTo}
      />
      <div>
        <div className="cardWrapper">
          <FilmList films={films} />
          {loading && <SkeletonCards />}
        </div>
        <div ref={observerRef} style={{ height: 1 }}></div>
        {!hasMore && <p style={{ textAlign: 'center', marginTop: 20 }}>Фильмы отсутсвуют</p>}
      </div>
    </div>
  );
}
