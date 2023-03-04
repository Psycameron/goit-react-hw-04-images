import css from './Button.module.css';

export function Button({ handlerLoadMore }) {
  return (
    <button type="button" onClick={handlerLoadMore} className={css.Button}>
      Load more
    </button>
  );
}
