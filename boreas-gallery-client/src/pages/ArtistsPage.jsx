import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5005";

function ArtistsPage() {
  const [artists, setArtists] = useState([]);
 
  const getArtists = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/artists`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) =>  setArtists(response.data))
      .catch((error) => console.log(error));
  };
 
  useEffect(() => {
    getArtists();
  }, []);

  function chunkArray(array, size) {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      const chunk = array.slice(i, i + size);
      chunkedArray.push(chunk);
    }
    return chunkedArray;
  }

  function sortArtistsAlphabetically(artists) {
    return artists.sort((a, b) => {
      const nameA = `${a.firstName} ${a.lastName}`.toUpperCase();
      const nameB = `${b.firstName} ${b.lastName}`.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  if (artists === null) {
    return <div></div>;
  }

    return (
      <div className="body-container">
        <h1>Artists</h1>
        <div className='artist-container'>
          {artists.map((artist) => (
            <div key={artist._id}>
              <div className='artist-inner-container'>
                <Link to={`/artists/${artist._id}`} className='link-normal'>
                  <div className='artist-image-container'>
                    <img src={artist.imageUrl} alt="Artist image" width={250} className='artist-img' />
                    <p className='artist-name'>{artist.firstName} {artist.lastName}</p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <br />
        <hr />
        <br />
        <div className='artist-list-container'>
          {chunkArray(sortArtistsAlphabetically(artists), 4).map((row, rowIndex) => (
            <div key={rowIndex} className='artist-row'>
              {row.map((artist) => (
                <div key={artist._id} className='artist-item'>
                  <Link to={`/artists/${artist._id}`} className='link-normal'>
                    <p className='link-normal'>{artist.firstName} {artist.lastName}</p>
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
        <br /><br />
      </div>
    );
  }
   
  export default ArtistsPage;