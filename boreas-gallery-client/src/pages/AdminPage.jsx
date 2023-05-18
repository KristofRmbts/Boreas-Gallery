import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5005";

function AdminPage() {
  const [exhibitions, setExhibitions] = useState([]);
  const [items, setItems] = useState([]);
  const [artists, setArtists] = useState([]);

   
  // Get all exhibitions
  const getAllExhibitions = () => {
    const storedToken = localStorage.getItem("authToken");
  
    axios
      .get(`${API_URL}/exhibitions`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) =>  setExhibitions(response.data))
      .catch((error) => console.log(error));
  };

  // Get all shop items
  const getAllItems = () => {
    const storedToken = localStorage.getItem("authToken");

  axios
  .get(`${API_URL}/shop`, { headers: { Authorization: `Bearer ${storedToken}` } })
  .then((response) =>  setItems(response.data))
  .catch((error) => console.log(error));
  };

    // Get all shop artists
    const getAllArtists = () => {
      const storedToken = localStorage.getItem("authToken");
  
    axios
    .get(`${API_URL}/artists`, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then((response) =>  setArtists(response.data))
    .catch((error) => console.log(error));
    };

  useEffect(() => {
    getAllExhibitions();
    getAllItems();
    getAllArtists();
  }, []);

  if (exhibitions === null || artists === null) {
    return <div></div>;
  }

    return (
      <div className="body-container">
        <h1>Admin portal</h1>
        <br />
        <div className="admin-container">
          <div className="admin-inner-container border">
            <h2>Artists:</h2>
            <hr />
            <br />
            <p>List of artists:</p>
            {artists.map((artist) => (
              <div key={artist._id}>
                <ul className="admin-listitem">
                  <li>
                  <Link to={`/artists/${artist._id}`} className="admin-links"><span>{artist.firstName} {artist.last}</span></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to={`/artists/${artist._id}/edit`}><button className="small-button">EDIT</button></Link>&nbsp;&nbsp;
                  </li>
                </ul>
              </div>
            ))}
            <br />
            <Link to={`/artists/add`}><button className="small-button">ADD ARTIST</button></Link>
            <br /><br />
          </div>
          <div className="admin-inner-container border">
            <h2>Exhibitions:</h2>
            <hr />
            <br />
            <p>Active exhibitions:</p>
            {exhibitions.map((exhibition) => (
              <div key={exhibition._id}>
                <ul className="admin-listitem">
                  <li>
                  <Link to={`/exhibitions/${exhibition._id}`} className="admin-links"><span>{exhibition.title}</span></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to={`/exhibitions/${exhibition._id}/edit`}><button className="small-button">EDIT</button></Link>&nbsp;&nbsp;
                  </li>
                </ul>
              </div>
            ))}
            <br />
            <Link to={`/exhibitions/add`}><button className="small-button">ADD EXHIBITION</button></Link>
            <br /><br />
          </div>
          <div className="admin-inner-container border">
            <h2>Shop:</h2>
            <hr />
            <br />
            <p>Articles on sale:</p>
            {items.map((item) => (
              <div key={item._id}>
                <ul className="admin-listitem">
                  <li>
                  <Link to={`/shop/${item._id}`} className="admin-links"><span>{item.title}</span></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to={`/shop/${item._id}/edit`}><button className="small-button">EDIT</button></Link>&nbsp;&nbsp;
                  </li>
                </ul>
              </div>
            ))}
            <br />
            <Link to={`/shop/add`}><button className="small-button">ADD ITEM</button></Link>
            <br /><br />
          </div>
        </div>
      </div>
    );
  }
   
  export default AdminPage;