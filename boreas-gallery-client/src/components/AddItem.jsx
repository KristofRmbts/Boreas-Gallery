import { useState } from "react";
import axios from "axios";
 
const API_URL = "http://localhost:5005";
 
function AddItem(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState("8x12");
  const [border, setBorder] = useState("No border");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
 
    const requestBody = { name, description, price, size, border, image };
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${API_URL}/shop`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        // Reset the state
        setName("");
        setDescription("");
        setPrice(0);
        setSize("8x12");
        setBorder("No border");
        setImage("")

        props.refreshItems();
      })
      .catch((error) => console.log(error));
  };
 
  return (
    <div className="AddProject">
      <h3>Add Item</h3>
 
      <div className="form-container">
        <form onSubmit={handleSubmit}>
            <label className="form-label">Name</label><br />
            <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            />
            <br /><br />

            <label className="form-label">Description</label><br />
            <textarea
            type="textarea"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input"
            />
            <br /><br />

            <label className="form-label">Price</label><br />
            <textarea
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-input"
            />
            <br /><br />

            <label className="form-label">Size</label><br />
            <textarea
            type="text"
            name="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="form-input"
            />
            <br /><br />

            <label className="form-label">Border</label><br />
            <textarea
            type="text"
            name="border"
            value={border}
            onChange={(e) => setBorder(e.target.value)}
            className="form-input"
            />
            <br /><br />

            <label className="form-label">Image</label><br />
            <textarea
            type="text"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="form-input"
            />
            <br /><br />

            <button type="submit" className="form-button">Save</button>
        </form>
        </div>
    </div>
  );
}
 
export default AddItem;