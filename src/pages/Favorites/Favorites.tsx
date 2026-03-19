import { FilmList } from "../../components/FilmList/FilmList";
import style from './Favorites.module.css';
import { useStore } from "../../store/store";

export function Favorites() {

  const films = useStore((state) => state.films);

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
