import style from "./Collapsible.module.css";

export function Collapsible({ title, children }: { title: string; children: React.ReactNode }) {

  return (
    <div className={style.block}>
      <details className={style.collapsible}>
        <summary>
          <span>{title}</span>
          <svg
            className={style.arrow}
            width="16"
            height="16"
            viewBox="0 0 24 24"
          >
            <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </summary>
      </details>
      <div className={style.content} >
        {children}
      </div>
    </div>
  );
}
