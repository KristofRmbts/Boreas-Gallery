import { useState, useEffect } from "react";
import axios from "axios";
import { useParams} from "react-router-dom";

const API_URL = import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5005";
 
function ArtistDetailsPage () {
  const [artist, setArtist] = useState(null);

  const { artistId } = useParams();        

  const getArtist = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/artists/${artistId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        const oneArtist = response.data;
        setArtist(oneArtist);
      })
      .catch((error) => console.log(error));
  };

  useEffect(()=> {
    getArtist();
  }, []);

  return (
    <div className="body-container">
      <h1>Coming soon</h1>
      <h2>Details of:</h2>
      <br />
      {artist && (
        <div>
            <p>{artist.firstName} {artist.lastName}</p>
            <p>{artist.description}</p>
            <p>{artist.email}</p>
            <p>{artist.social1}</p>
            <p>{artist.social2}</p>
            <p>{artist.social3}</p>
        </div>
      )}
      <br /><br />
    </div>
  );
}
 
export default ArtistDetailsPage;