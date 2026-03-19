import { SkeletonCards } from "../../components/SkeletonCards/SkeletonCards";
import { FilmList } from "../../components/FilmList/FilmList";
import { SortingPanel } from "../../components/SortingPanel/SortingPanel";
import style from './Main.module.css';
import { useMain } from "./useMain";

export function Main() {
  const { 
    genres, 
    selectedGenres, 
    ratingFrom, 
    ratingTo, 
    yearFrom, 
    yearTo, 
    films, 
    loading, 
    observerRef, 
    hasMore 
  } = useMain();

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
