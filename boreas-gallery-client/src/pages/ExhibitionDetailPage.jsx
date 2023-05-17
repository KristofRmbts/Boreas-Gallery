import { useEffect, useState } from 'react';
import axios from 'axios';

import ExhibitionDetails from '../components/ExhibitionDetails';
import { useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5005";

function ExhibitionDetailPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [exhibition, setExhibition] = useState(null);
  const { exhibitionId } = useParams();

  const getExhibition = async () => {
    const storedToken = localStorage.getItem("authToken");
    try {
      const response = await axios.get(`${API_URL}/exhibitions/${exhibitionId}`, {
        headers: { Authorization: `Bearer ${storedToken}` }
      });
      setExhibition(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getExhibition();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
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
