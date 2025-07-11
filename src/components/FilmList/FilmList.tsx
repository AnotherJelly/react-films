import { Film } from "../../types/film";
import { FilmCard } from "../FilmCard/FilmCard";

export function FilmList({ films }: { films: Film[] }) {
  return (
    <>
      {films.map((film) => (
        <FilmCard key={film.id} {...film} />
      ))}
    </>
  );
}