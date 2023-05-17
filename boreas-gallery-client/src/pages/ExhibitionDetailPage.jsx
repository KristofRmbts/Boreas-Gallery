import { useEffect, useState } from 'react';
import axios from 'axios';

import ExhibitionDetails from '../components/ExhibitionDetails';

const API_URL = import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5005";

function ExhibitionDetailPage() {
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

  if (!exhibition.images) {
    return (
    <></>
    )
  }

    return (
      <div className="body-container">
        <div className='page-height-container'>
        <ExhibitionDetails exhibition={exhibition} />
        </div>
      </div>
    );
  }
   
  export default ExhibitionDetailPage;