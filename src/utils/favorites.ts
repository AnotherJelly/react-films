import { FAVORITES_KEY } from "../constants/favorites";

export function getFavorites(): number[] {
  const data = localStorage.getItem(FAVORITES_KEY);
  try {
    const parsed = data ? JSON.parse(data) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function isFavorite(id: number): boolean {
  return getFavorites().includes(id);
}

export function addFavorite(id: number): void {
  const favs = getFavorites();
  if (!favs.includes(id)) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favs, id]));
  }
}

export function removeFavorite(id: number): void {
  const favs = getFavorites().filter(favId => favId !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
}
