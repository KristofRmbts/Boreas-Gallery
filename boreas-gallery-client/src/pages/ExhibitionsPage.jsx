import Slideshow from '../components/Slideshow'

function ExhibitionsPage() {
  const images = [
    'https://res.cloudinary.com/boreasgallery/image/upload/v1684158339/boreas-product-photos/w7alhyfzxpxd5cm7nzcp.png',
    'https://res.cloudinary.com/boreasgallery/image/upload/v1684158339/boreas-product-photos/w7alhyfzxpxd5cm7nzcp.png',
    'https://res.cloudinary.com/boreasgallery/image/upload/v1684158339/boreas-product-photos/w7alhyfzxpxd5cm7nzcp.png',  
  ];

    return (
      <div className="body-container">
        {/* <h1>Exhibitions</h1> */}
          <div>
            <Slideshow images={images} />
          </div>
      </div>
    );
  }
   
  export default ExhibitionsPage;