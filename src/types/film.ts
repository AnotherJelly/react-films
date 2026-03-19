export type Film = {
  id: number;
  title: string;
  year: number;
  ratingOverall: number;
  img: string;
  genres: string[];
  description: string;
  slogan: string;
  premiere: string;
};

export type FilmApi = {
  id: number;
  name: string;
  year: number;
  rating?: { kp: number };
  poster?: { url: string };
  genres: { name: string }[];
  description: string;
  slogan: string;
  premiere: { world?: string, russia?: string};
}