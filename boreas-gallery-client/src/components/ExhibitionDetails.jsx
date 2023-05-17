import Slideshow from "./Slideshow";
 
function ExhibitionDetails ( {exhibition} ) {
  
  return (
    <div id='current'>
        <h1 className='exhibition-title'>{exhibition.title}</h1>
        <Slideshow images={exhibition.images} />
        <br /><br />
    </div>
  );
}
 
export default ExhibitionDetails;