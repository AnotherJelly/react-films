import { useEffect, useState } from "react";
import { getFavoritesApi } from "../../api/films";
import { SkeletonCards } from "../../components/SkeletonCards/SkeletonCards";
import { FilmList } from "../../components/FilmList/FilmList";
import { Film } from "../../types/film";
import style from './Favorites.module.css';

export function Favorites() {
  const [films, setFilms] = useState<Film[] | null>(null);

  useEffect(() => {
    getFavoritesApi().then((validFilms) => {
      setFilms(validFilms);
    });
  }, []);

  if (films === null) {
    return (
      <div className="cardWrapper">
        <SkeletonCards />
      </div>
    );
  }

  if (films.length === 0) {
    return <div className={style.empty}>У вас нет избранных фильмов</div>;
  }

  return (
    <div className={style.mainContent}>
      <div className="cardWrapper">
        <FilmList films={films} />
      </div>
    </div>
  );
}
