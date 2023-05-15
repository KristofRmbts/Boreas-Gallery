import React, { useState } from 'react';

const Slideshow = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div>
      <div style={{ textAlign: 'center' }} className='slideshow'>
      <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <div className='slideshow-img-frame'>
            <img
            src={images[currentImageIndex]}
            alt={`Slideshow Image ${currentImageIndex}`}
            className='slideshow-img'
            />
        </div>
        <br /><br /><br /><br /><br /><br /><br />
        <button onClick={goToPreviousImage} className='form-button'>&lt;</button><span>&nbsp;&nbsp;&nbsp;</span>
        <button onClick={goToNextImage} className='form-button'>&gt;</button>
        <br /><br />
      </div>
    </div>
  );
};

export default Slideshow;