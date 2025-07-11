import { TypingText } from '../TypingText/TypingText';
import style from './FilmDetailsRow.module.css';

export function FilmDetailsRow ({ children, title, value, animate = false }: 
  {children: React.ReactNode; title: string; value: string | number; animate?: boolean;}) {

  return (
    <div className={style.filmElement__row}>
      <span className={style.filmElementSvg}>
        {children}
        {title}
      </span>
      <span >
        {animate ? (
          <TypingText value={value.toString()} duration={3000} />
        ) : (
          value
        )}
      </span>
    </div>
  );
}