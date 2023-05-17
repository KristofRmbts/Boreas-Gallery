import Slideshow from "./Slideshow";
 
function ExhibitionDetails ( {exhibition} ) {
  
  return (
    <div id='current'>
        <h1 className='exhibition-title'>{exhibition.title}</h1>
        <Slideshow images={exhibition.images} />
        <br /><br />
        <div className="admin-container">
          <div className="admin-inner-container">
          <h2 className="font-N27">About</h2>
          <br />
          <p className="justify-text">{exhibition.description}</p>
          <br />
          <p className="justify-text">{exhibition.subtext1}</p>
          <br />
          <p className="justify-text">{exhibition.subtext2}</p>
          <br />
          <p className="justify-text">{exhibition.subtext3}</p>
          </div>
          <div className="admin-inner-container">
          <br /><br />
          <h3 className="font-N27">Artist</h3>
          <p>{exhibition.artist}</p>
          <br />
          <h3 className="font-N27">Running time</h3>
          <p>{exhibition.runningTime}</p>
          <br /><br />
          <h3 className="font-N27">Contact</h3>
          <a href={`mailto:contact@boreasgallery.com?subject=${exhibition.title}`} className="link-normal"><p>contact@boreasgallery.com</p></a>
          <br />
          </div>
        </div>
        <br /><br />
    </div>
  );
}
 
export default ExhibitionDetails;