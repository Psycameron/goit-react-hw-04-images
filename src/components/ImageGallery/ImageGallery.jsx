import { useState, useEffect } from 'react';

import { Button } from 'components/Button';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

import { fetchImg } from 'components/serveces/fetchImg';

import css from './ImageGallery.module.css';

export default function ImageGallery({ query, page, setPage }) {
  const [hits, setHits] = useState([]);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImg, setLargeImg] = useState('');

  useEffect(() => {
    if (!query) {
      return;
    }

    setStatus('pending');

    const fetchData = async () => {
      try {
        const request = await fetchImg(page, query);
        setHits(request.hits);
        setTotalHits(request.totalHits);
        setStatus('resolved');
      } catch (error) {
        console.log(`🚀 ~ fetchData ~ error:`, error);
      }
    };

    fetchData();

    // Альтернатива

    // fetchImg(page, query)
    //   .then(res => {
    //     setHits(res.hits);
    //     setTotalHits(res.totalHits);
    //     setStatus('resolved');
    //   })
    //   .catch(er => {
    //     console.log(er);
    //   });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (page === 1) {
      return;
    }

    setStatus('pending');

    const fetchData = async () => {
      try {
        const request = await fetchImg(page, query);
        setHits([...hits, ...request.hits]);
        setStatus('resolved');
      } catch (error) {
        console.log(`🚀 ~ fetchData ~ error:`, error);
      }
    };

    fetchData();

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
