const Modal = ({ image, onClose }) => {
  return (
    <div className="slideshow-zoom" onClick={onClose}>
      <div className="slideshow-zoom-img-frame">
        <img
          src={image}
          alt="Zoomed Image"
          onClick={onClose}
          className="slideshow-zoom-img-passpartout"
        />
      </div>
    </div>
  );
};

export default Modal;
