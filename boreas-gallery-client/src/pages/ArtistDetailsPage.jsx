import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import IG from "./../assets/icons/ig.png";

const API_URL = import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5005";

function ArtistDetailsPage() {
  const [artist, setArtist] = useState(null);

  const { artistId } = useParams();

  const getArtist = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/artists/${artistId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneArtist = response.data;
        setArtist(oneArtist);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getArtist();
  }, []);

  if (artist === null) {
    return <div></div>;
  }

  return (
    <div className="body-container">
      {artist && (
        <div>
          <div className="admin-container d-flex flex-wrap-reverse">
            <div className="col-sm-12 col-md-6 col-lg-8">
              <h3 className="font-N27">About</h3>
              <br />
              <p className="justify-text">{artist.description}</p>
              <br />
              <p className="justify-text"></p>
              <br />
              <p className="justify-text"></p>
              <br />
              <p className="justify-text"></p>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4">
              <img src={artist.imageUrl} alt="Artist image" width={300} />
              <br />
              <br />
              <h3 className="font-N27">Name</h3>
              <p>
                {artist.firstName} {artist.lastName}
              </p>
              <br />
              <h3 className="font-N27">Contact</h3>
              <a href={`mailto:${artist.email}`} className="link-normal">
                <p>{artist.email}</p>
              </a>
              <br />
              <h3 className="font-N27">Follow on Social Media</h3>
              <a href={`${artist.social1}`} className="link-normal">
                <img
                  src={IG}
                  alt="Instagram"
                  height={20}
                  className="social-icon"
                />
              </a>
              <br />
              <br />
            </div>
          </div>
          <br />
          <br />
        </div>
      )}
    </div>
  );
}

export default ArtistDetailsPage;
