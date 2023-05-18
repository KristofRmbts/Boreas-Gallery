import { useEffect, useState } from 'react';
import axios from 'axios';

import ExhibitionDetails from '../components/ExhibitionDetails';
import { useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5005";

function ExhibitionDetailPage() {
  const [exhibition, setExhibition] = useState(null)
  const { exhibitionId } = useParams()
 
  const getExhibition = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/exhibitions/${exhibitionId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => setExhibition(response.data))
      .catch((error) => console.log(error));
  };
 
  useEffect(() => {
    getExhibition();
  }, []);

  if (exhibition === null) {
    return <div></div>;
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