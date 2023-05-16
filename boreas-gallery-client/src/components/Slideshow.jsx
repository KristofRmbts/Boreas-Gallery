import React, { useState } from 'react';
import Modal from './Modal';

const Slideshow = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 2 + images.length) % images.length);
    setAnimate(true);
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 2) % images.length);
    setAnimate(true);
  };

  const handleAnimationEnd = () => {
    setAnimate(false);
  };

  const openModal = (imageIndex) => {
    setModalImageIndex(imageIndex);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className='slideshow'>
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <div
          className={`slideshow-images ${animate ? 'animate' : ''}`}
          onAnimationEnd={handleAnimationEnd}
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div className='slideshow-img-frame'>
            <div className='slideshow-img-passpartout'>
              <img
                src={images[currentImageIndex]}
                alt={`Slideshow Image ${currentImageIndex}`}
                className='slideshow-img'
                onClick={() => openModal(currentImageIndex)}
              />
            </div>
          </div>
          <div className='slideshow-img-frame'>
            <div className='slideshow-img-passpartout'>
              <img
                src={images[(currentImageIndex + 1) % images.length]}
                alt={`Slideshow Image ${(currentImageIndex + 1) % images.length}`}
                className='slideshow-img'
                onClick={() => openModal((currentImageIndex + 1) % images.length)}
              />
            </div>
          </div>
        </div>
        <br /><br /><br /><br /><br />
        <button onClick={goToPreviousImage} className='form-button'>&lt;</button><span>&nbsp;&nbsp;&nbsp;</span>
        <button onClick={goToNextImage} className='form-button'>&gt;</button>
        <br /><br />
      </div>
      {showModal && (
        <Modal
          image={images[modalImageIndex]}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Slideshow;
