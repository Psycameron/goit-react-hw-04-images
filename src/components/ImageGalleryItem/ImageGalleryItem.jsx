import React from 'react';

import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ hits, onClick }) {
  return hits.map(({ id, webformatURL, tags, largeImageURL }) => {
    return (
      <li className={css.ImageGalleryItem} key={id}>
        <img
          className={css.ImageGalleryItemImage}
          src={webformatURL}
          alt={tags}
          onClick={() => onClick(largeImageURL)}
        />
      </li>
    );
  });
}
