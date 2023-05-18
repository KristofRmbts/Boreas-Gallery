import { useState, useEffect } from "react";
import axios from "axios";

import ItemCard from "./../components/ItemCard";

const API_URL = import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5005";

function ShopPage() {
  const [items, setItems] = useState([]);
 
  const getAllItems = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/shop`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) =>  setItems(response.data))
      .catch((error) => console.log(error));
  };
 
  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllItems();
  }, []);

    return (
      <div className="body-container">
        <h1>Shop</h1>
        <p>Shop the latest goodies from Boreas, including recent exhibition<br />prints, merchandise and artist’s books.</p>
        <br />
        <br />
        <div className="items-list-container">
        {items.map((item) => (
          <ItemCard key={item._id} {...item} />
        ))}
        </div>  
        <br /><br />
      </div>
    );
  }
   
  export default ShopPage;