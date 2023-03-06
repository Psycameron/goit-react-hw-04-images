import React, { useState } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const onSubmit = value => {
    setQuery(value);
    setPage(1);
  };

  return (
    <div>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery query={query} page={page} setPage={setPage} />
    </div>
  );
}
