import { useState, useEffect } from 'react';

import { Button } from 'components/Button';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

import css from './ImageGallery.module.css';

const API_KEY = '33411658-9504db49656fc0db308898fd3';

export default function ImageGallery({ query }) {
  const [hits, setHits] = useState([]);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImg, setLargeImg] = useState('');

  useEffect(() => {
    if (!query) {
      return;
    }

    setStatus('pending');
    setHits([]);
    setPage(1);

    fetch(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(query => {
        setHits(query.hits);
        setTotalHits(query.totalHits);
        setStatus('resolved');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (page === 1) {
      return;
    }

    setStatus('pending');

    fetch(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(query => {
        setHits([...hits, ...query.hits]);
        setStatus('resolved');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handlerLoadMore = () => {
    setPage(page + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handlerModalImage = url => {
    setShowModal(!showModal);
    setLargeImg(url);
  };

  return (
    <div>
      {totalHits === 0 ? (
        <div className={css.ImageFail}>
          <span>По вашему запросу ничего не найдено</span>
        </div>
      ) : (
        <ul className={css.ImageGallery}>
          <ImageGalleryItem hits={hits} onClick={handlerModalImage} />
        </ul>
      )}

      {status === 'pending' && <Loader />}
      {totalHits > 12 * page && status === 'resolved' && (
        <Button handlerLoadMore={handlerLoadMore} />
      )}

      {showModal && <Modal largeImg={largeImg} onClose={toggleModal} />}
    </div>
  );
}
