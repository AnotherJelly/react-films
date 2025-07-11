import { Film } from "../types/film";

export function filterFilms (
  films: Film[], genres: string[], ratingFrom: number, ratingTo: number, yearFrom: number, yearTo: number,
) {
  let filteredFilms = genres.length > 0
    ? films.filter((film) =>
        film.genres.some((tag) => genres.includes(tag))
      )
    : films;
  filteredFilms = filteredFilms.filter(
    (film) => 
      film.ratingOverall >= ratingFrom && film.ratingOverall <= ratingTo &&
      film.year >= yearFrom && film.year <= yearTo 
  );

  return filteredFilms;
}