import { Film } from "../types/film";
import { getFavorites } from "../utils/favorites";
import { API } from "../constants/filmApi";

export async function getFilms(
  page = 1,
  limit = 50,
  filters: {
    genres?: string[];
    ratingFrom?: number;
    ratingTo?: number;
    yearFrom?: number;
    yearTo?: number;
  } = {}
): Promise<Film[]> {
  const {
    genres = [],
    ratingFrom = 0,
    ratingTo = 10,
    yearFrom = 1990,
    yearTo = 2025,
  } = filters;

  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("limit", String(limit));
  params.append("releaseYears.start", `${yearFrom}-${yearTo}`);
  params.append("rating.kp", `${ratingFrom}-${ratingTo}`);
  params.append("sortField", 'rating.kp');
  params.append("sortType", '-1');

  genres.forEach((genre) => {
    params.append("genres.name", genre);
  });

  const url = `${API.API_URL}?${params.toString()}`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': `${API.API_KEY}`,
    },
  };

  try {
    const res = await fetch(url, options);
    const json = await res.json();

    if (!json.docs || !Array.isArray(json.docs)) {
      throw new Error('Invalid response format');
    }

    return json.docs.map(mapApiFilmToFilm);
  } catch (err) {
    console.error("Ошибка получения фильмов:", err);
    return [];
  }
}

function mapApiFilmToFilm(apiFilm: any): Film {
  return {
    id: apiFilm.id,
    title: apiFilm.name || 'Без названия',
    slogan: apiFilm.slogan || '',
    year: apiFilm.year || 0,
    ratingOverall: apiFilm.rating?.kp.toFixed(1) || 0,
    description: apiFilm.description || "",
    img: apiFilm.poster?.url || 'https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE=',
    genres: apiFilm.genres?.map((g: any) => g.name) || [],
    premiere: formatDate(apiFilm.premiere?.world || apiFilm.premiere?.russia || ''),
  };
}

function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export async function getFilmById(id: number): Promise<Film | undefined> {
  try {
    const response = await fetch(`${API.API_URL}/${id}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-API-KEY': API.API_KEY
      }
    });

    if (!response.ok) {
      console.error(`Ошибка загрузки фильма с id=${id}:`, response.statusText);
      return undefined;
    }

    const data = await response.json();

    const film: Film = mapApiFilmToFilm(data);

    return film;
  } catch (error) {
    console.error(`Ошибка запроса фильма с id=${id}:`, error);
    return undefined;
  }
}

export async function getFavoritesApi(): Promise<Film[]> {
  const ids = getFavorites();

  if (!ids.length) return [];

  const results = await Promise.allSettled(ids.map(id => getFilmById(id)));

  const validFilms: Film[] = results
    .filter(
      r =>
        r.status === 'fulfilled' &&
        r.value !== undefined &&
        r.value !== null
    )
    .map(r => (r as PromiseFulfilledResult<Film>).value);

  return validFilms;
}
