import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

import BB1 from "../assets/images/BB1.png"
import BB2 from "../assets/images/BB2.png"
import BB3 from "../assets/images/BB3.png"

const API_URL = import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5005";

function HomePage() {
  const [exhibition, setExhibition] = useState([]);
 
  const getLatestExhibitions = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/exhibitions/latest`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) =>  setExhibition(response.data.latestExhibition))
      .catch((error) => console.log(error));
  };
 
  useEffect(() => {
    getLatestExhibitions();
  }, []);

  // function getRandomNumber(images) {
  //   return Math.floor(Math.random() * images.length);
  // }

  // const Number = getRandomNumber(exhibition.images)

  if (!exhibition.images) {
    return (
    <></>
    )
  }
    return (
      <div className="body-container">
        <div className="home-container">
          <div className="home-inner-container home-margin" height={900}>
            <h1 className='exhibition-title-home'>{exhibition.title}</h1>
            <br /><br />
            <p className="justify-text">{exhibition.description}</p>
          </div>
          <div className="home-inner-container">
          <Link to={`/exhibitions/${exhibition._id}`}><img src={exhibition.images[7]} alt="" height={900} /></Link>
            <br />
          </div>
        </div>
        <Link to={`/exhibitions/${exhibition._id}`} className='link-black'><p className='moveup'>NOW ON VIEW</p></Link>
        <br />
        <div className="home-container">
          <div className="home-inner-container home-margin-s home-link-box-orange">
            <Link to={`/shop`} className='link-normal'>
            <img src={BB3} alt="Link img" className='home-link-box-img' />
            <br /><br />
            <h2 className="font-N27 justify-text">Support Photographers</h2>
            <br />
            <p className="justify-text">Buy a print (or more) of your favourite exhibit and directly support the artist.</p>
            </Link>
          </div>
          <div className="home-inner-container home-margin-s home-link-box-white">
          <Link to={`exhibitions/previous`} className='link-normal'>
            <img src={BB2} alt="Link img" className='home-link-box-img' />
            <br /><br />
            <h2 className="font-N27 justify-text">Previous Exhibitions</h2>
            <br />
            <p className="justify-text">Check out the amazing exhibitions that have come before.</p>
            </Link>
          </div>
          <div className="home-inner-container home-link-box-grey">
            <Link to={`/takepart`} className='link-normal'>
            <img src={BB1} alt="Link img" className='home-link-box-img' />
            <br /><br />
            <h2 className="font-N27 justify-text">Take Part</h2>
            <br />
            <p className="justify-text">Want your work displayed here? Reach out to us and maybe you will be the artist to exhibit next!</p>
            </Link>
          </div>
        </div>
        <br /><br />
    </div>
    );
}
   
export default HomePage;