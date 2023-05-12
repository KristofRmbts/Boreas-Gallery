import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams} from "react-router-dom";

const API_URL = "http://localhost:5005";   
 
function ItemDetailsPage (props) {
  const [item, setItem] = useState(null);
  const { itemId } = useParams();        

  const getItem = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/shop/${itemId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        const oneItem = response.data;
        setItem(oneItem);
      })
      .catch((error) => console.log(error));
  };

  useEffect(()=> {
    getItem();
  }, []);
  
  return (
    <div className="body-container">
      {item && (
        <div className="item-container">
          <div className="item-container-left">
          <br />
          <img src={item.imageUrl} alt="Item preview" className="item-image" />
          <br /><br /><br /><br />
          <p className="text-s link-black">DELIVERY AND RETURNS</p>
          <p className="text-s justify-text">Orders ship promptly after printing. All domestic orders are insured and trackable. International orders are insured and optionally trackable. No returns as all prints are custom made. An email containing tracking information will be sent once the order ships.</p>
          </div>
          <div className="item-container-right">
            <h2 className="item-title">{item.title}</h2>
            <br />
            <p className="shop-item-info link-black">DETAILS</p>
            <p className="shop-item-info">{item.price}.00€</p>
            <br />
            <p className="shop-item-info">{item.description}</p>
            <br />
            <p className="shop-item-info">Limited edition of 20</p>
            <p className="shop-item-info">Numbered and signed</p>
            <br />
            <p className="shop-item-info">Printing info 1</p>
            <p className="shop-item-info">Printing info 2</p>
            <p className="shop-item-info">Printing info 3</p>
            <p className="shop-item-info">Printing info 4</p>
            <p className="shop-item-info">Printing info 5</p>
            <br />
            <div className="form-container">
              <label className="form-label">Size</label><br />
              <select
              name="border"
              className="form-select"
              >
              {item.size.map((size) => (
                <>
                  <option value={size}>{size}</option>
                </>
              ))}
              </select>
              <br /><br />

              <label className="form-label">Material</label><br />
              <select
              name="material"
              className="form-select"
              >
              {item.material.map((material) => (
                <>
                  <option value={material}>{material}</option>
                </>
              ))}
              </select>
              <br /><br />

              <label className="form-label">Border</label><br />
              <select
              name="border"
              className="form-select"
              >
              {item.border.map((border) => (
                <>
                  <option value={border}>{border}</option>
                </>
              ))}
              </select>
              <br /><br />
            </div>
            <br />
            <button type="submit" className="form-button">Send request</button>
          </div>
        </div>
      )}
      <br /><br />
      {/* <Link to={`/shop/${itemId}/edit`}>
        <button>Edit</button>
      </Link>     */}
    </div>
  );
}
 
export default ItemDetailsPage;