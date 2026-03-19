import style from './SortingPanel.module.css';
import { Collapsible } from '../Collapsible/Collapsible';
import { InputRange } from '../InputRange/InputRange';
import { DEFAULT_VALUES } from '../../constants/searchParams';
import { useSortingPanelLogic } from './useSortingPanelLogic';
import { memo } from 'react';

function SortingPanelComponent({
  genres, selectedGenres, ratingFrom, ratingTo, yearFrom, yearTo
}: {
  genres: string[]; selectedGenres: string[]; ratingFrom: number; ratingTo: number; yearFrom: number; yearTo: number;
}) {
  const {
    localGenres,
    localRating,
    localYear,
    isChanged,
    handleChangeGenre,
    handleChangeRange,
    applyFilters,
  } = useSortingPanelLogic(selectedGenres, ratingFrom, ratingTo, yearFrom, yearTo);

  return (
    <div className={style.sortingPanel}>
      <Collapsible title='Жанры'>
        {genres.map((genre, i) => (
          <div key={i} className={style.checkbox}>
            <input
              type="checkbox"
              id={`sort-${genre + i}`}
              onChange={() => handleChangeGenre(genre)}
              checked={localGenres.includes(genre)}
            />
            <label htmlFor={`sort-${genre + i}`}>{genre}</label>
          </div>
        ))}
      </Collapsible>

      <Collapsible title='Рейтинг'>
        <InputRange
          min={DEFAULT_VALUES.RATING.FROM}
          max={DEFAULT_VALUES.RATING.TO}
          selectedFrom={localRating[0]}
          selectedTo={localRating[1]}
          step={0.1}
          onChange={(from, to) => handleChangeRange(from, to, 'rating')}
        />
      </Collapsible>

      <Collapsible title='Год'>
        <InputRange
          min={DEFAULT_VALUES.YEAR.FROM}
          max={DEFAULT_VALUES.YEAR.TO}
          selectedFrom={localYear[0]}
          selectedTo={localYear[1]}
          step={1}
          onChange={(from, to) => handleChangeRange(from, to, 'year')}
        />
      </Collapsible>

      {isChanged && (
        <button className={style.applyButton} onClick={applyFilters}>
          Применить
        </button>
      )}
    </div>
  );
}

export const SortingPanel = memo(SortingPanelComponent);