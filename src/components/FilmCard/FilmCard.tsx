import { Link } from "react-router-dom";
import { Film } from "../../types/film";
import { ButtonFavorite } from "../ButtonFavorite/ButtonFavorite";
import style from './FilmCard.module.css';

export function FilmCard(film: Film) {
  return (
    <div className="card">
      <div className={style.cardFavorite}>
        <ButtonFavorite id={film.id.toString()} />
      </div>

      <Link to={`/film/${film.id}`} className="card-link" title={film.title}>
        <img src={film.img} alt={film.title} />
        <div className="card-description">
          <div className="card-title">{film.title}</div>
          <div className="card-year">{film.year}</div>
          <div className="card-rating">{film.ratingOverall}</div>
        </div>
      </Link>
    </div>
  );
}
