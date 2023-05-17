import { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
// import AddItem from "../../components/AddItem";
import ItemCard from "../../components/ItemCard";

const API_URL = import.meta.env.FRONTEND_URL || "http://localhost:5005";

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
        <br />
          {/* <AddItem refreshItems={getAllItems} /> */}
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