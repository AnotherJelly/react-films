import style from './SkeletonCards.module.css'

function SkeletonCard () {
  return (
    <div className={`card ${style.skeletonCard}`}>
      <div className={style.skeletonImg} />
      <div className="card-description">
        <div className={`${style.skeletonLine} ${style.title}`} />
        <div className={`${style.skeletonLine} ${style.year}`} />
        <div className={`${style.skeletonLine} ${style.rating}`} />
      </div>
    </div>
  );
}

export function SkeletonCards () {
  return (
    <>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </>
  );
}