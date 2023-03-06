import React, { useState } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';

export default function App() {
  const [query, setQuery] = useState('');
  const [totalHits, setTotalHits] = useState(null);

  return (
    <div>
      <Searchbar onSubmit={setQuery} />
      <ImageGallery query={query} totalHits={totalHits} />
    </div>
  );
}
