import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5005";

function ItemDetailsPage(props) {
  const [item, setItem] = useState(null);
  const [size, setSize] = useState("");
  const [material, setMaterial] = useState("");
  const [border, setBorder] = useState("");
  const { itemId } = useParams();

  const getItem = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/shop/${itemId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneItem = response.data;
        setItem(oneItem);
      })
      .catch((error) => console.log(error));
  };

  // Size
  const handleSizeChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSize(selectedOptions);
  };

  // Materials
  const handleMaterialChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setMaterial(selectedOptions);
  };

  // Border
  const handleBorderChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setBorder(selectedOptions);
  };

  useEffect(() => {
    getItem();
  }, []);

  if (item === null) {
    return <div></div>;
  }

  return (
    <div className="body-container">
      {item && (
        <div className="item-container d-flex flex-wrap">
          <div className="col-sm-12 col-md-6 col-lg-5">
            <img src={item.imageUrl} alt="Item preview" className="img-fluid" />
            <br />
            <br />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-5 ms-auto text-end">
            <h2 className="item-title">{item.title}</h2>
            <br />
            <p className="shop-item-info link-black">DETAILS</p>
            <p className="shop-item-info">{item.exhibition}</p>
            <p className="shop-item-info">by {item.artist}</p>
            <br />
            <p className="shop-item-info">{item.description}</p>
            <br />
            <p className="shop-item-info">{item.quantity}</p>
            <p className="shop-item-info">Numbered and signed</p>
            <br />
            <div className="text-end">
              <label className="form-label">Size</label>
              <br />
              <select
                name="size"
                className="shop-form-select"
                onChange={handleSizeChange}
              >
                {item.size.map((size) => (
                  <option value={size} key={size._id}>
                    {size}
                  </option>
                ))}
              </select>
              <br />
              <br />

              <label className="form-label">Material</label>
              <br />
              <select
                name="material"
                className="shop-form-select"
                onChange={handleMaterialChange}
              >
                {item.material.map((material) => (
                  <option value={material} key={material._id}>
                    {material}
                  </option>
                ))}
              </select>
              <br />
              <br />

              <label className="form-label">Border</label>
              <br />
              <select
                name="border"
                className="shop-form-select"
                onChange={handleBorderChange}
              >
                {item.border.map((border) => (
                  <option value={border} key={border._id}>
                    {border}
                  </option>
                ))}
              </select>
              <br />
              <br />
            </div>
            <br />
            <a
              href={`mailto:request@boreasgallery.com?subject=Purchase%20request&body=Hello%20Boreas%2C%0D%0A%0D%0AI%20would%20like%20to%20enquire%20price%20and%20shipping%20information%20about%20the%20following%20print%3A%0D%0A%0D%0ATitle%3A%20${item.title}%0D%0ASize%3A%20${size}%0D%0AMaterial%3A%20${material}%0D%0ABorder%3A%20${border}%0D%0A%0D%0AThank%20you%2C%0D%0AX`}
            >
              <button className="form-button">Price on request</button>
            </a>
          </div>
        </div>
      )}
      <br />
      <br />
      <div className="col-sm-12 col-md-6 col-lg-4">
        <p className="text-s link-black">DELIVERY AND RETURNS</p>
        <br />
        <p className="text-s justify-text">
          Orders are handled directly by the artist, and ship promptly after
          printing. All domestic orders are insured and trackable. International
          orders are insured and optionally trackable. No returns as all prints
          are custom made.
          <br />
          <br />
          An email containing tracking information will be sent once the order
          ships.
        </p>
      </div>
      <br />
      <br />
    </div>
  );
}

export default ItemDetailsPage;
