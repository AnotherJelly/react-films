import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFilmById } from "../../api/films";
import { Film } from "../../types/film";
import style from './FilmPage.module.css';
import { TypingText } from "../../components/TypingText/TypingText";
import { FilmDetailsRow } from "../../components/FilmDetailsRow/FilmDetailsRow";
import { ButtonFavorite } from "../../components/ButtonFavorite/ButtonFavorite";

export function FilmPage() {
  const { id } = useParams<{ id: string }>();
  const [film, setFilm] = useState<Film | null>(null);

  useEffect(() => {
    if (!id) return;

    getFilmById(Number(id)).then((data) => {
      setFilm(data || null);
    });
  }, [id]);

  if (!film) return (
    <div className={style.overlay}>
      <div className={style.spinner}></div>
    </div>
  );

  return (
      <div className={style.filmContent}>
        <div className={style.filmBlock}>
          <div className={style.filmHeader}>
            <img src={film.img} alt={film.title} width={200} className={style.img}/>
            <span className={style.filmSlogan}><TypingText value={film.slogan} duration={3000} /></span>
          </div>
          <div className={style.filmBlock__title}>
            <h2 className={style.filmTitle}>{film.title}</h2>
            <ButtonFavorite id={id}/>
          </div>
          <div className={style.filmElement}>
            <div className={style.filmElementSvg}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" >
                <path fillRule="evenodd" clipRule="evenodd" d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM7 8H6V6H9V11H10V13H7V8ZM9 5V3H7V5H9Z" />
              </svg>
              инфо
            </div>
            <div>{film.premiere !== "" ? film.premiere : film.year} • {film.ratingOverall}</div>
          </div>
          <div>
            <div className={style.filmElement__subtitle}>
              О фильме
            </div>
            <div className={style.filmElement}>
              <FilmDetailsRow title='Описание' value={film.description} animate={true}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" >
                  <path d="M15 1H1V3H15V1Z" />
                  <path d="M1 5H3V15H1V5Z" />
                  <path d="M5 13H15V15H5V13Z" />
                  <path d="M15 9H5V11H15V9Z" />
                  <path d="M5 5H15V7H5V5Z" />
                </svg>
              </FilmDetailsRow>
              <FilmDetailsRow title='Жанры' value={film.genres.join(', ')} animate={true}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" >
                    <path d="M3 1H1V3H3V1Z" />
                    <path d="M3 5H1V7H3V5Z" />
                    <path d="M1 9H3V11H1V9Z" />
                    <path d="M3 13H1V15H3V13Z" />
                    <path d="M15 1H5V3H15V1Z" />
                    <path d="M15 5H5V7H15V5Z" />
                    <path d="M5 9H15V11H5V9Z" />
                    <path d="M15 13H5V15H15V13Z" />
                  </svg>
              </FilmDetailsRow>
            </div>
          </div>
        </div>
      </div>
  );
}