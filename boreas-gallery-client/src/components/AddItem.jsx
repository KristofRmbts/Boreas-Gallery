import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
const API_URL = "http://localhost:5005";
 
function AddItem(props) {
  const [title, setTitle] = useState("");
  const [exhibition, setExhibition] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState([]);
  const [material, setMaterial] = useState("");
  const [border, setBorder] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  // File upload 
  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
 
    const uploadData = new FormData();
 
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);
 
    axios
      .post(`${API_URL}/upload`, uploadData)
      .then(response => {
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.data.fileUrl);
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault();
 
    // const requestBody = { title, exhibition, description, price, size, material, border, imageUrl };
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${API_URL}/shop`, { title, exhibition, description, price, size, material, border, imageUrl }, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        // Reset the state
        setTitle("");
        setExhibition("");
        setDescription("");
        setPrice(0);
        setSize([]);
        setMaterial("");
        setBorder([]);
        setImageUrl("")

        navigate('/shop');
      })
      .catch((error) => console.log(error));
  };
 
  return (
    <div className="shop-add-container">
      <h3>Add Item</h3>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-outer-container">
        <div className="form-container">
            <label className="form-label">Title</label><br />
            <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            />
            <br /><br />

            <label className="form-label">Exhibition name</label><br />
            <input
            type="text"
            name="exhibition"
            value={exhibition}
            onChange={(e) => setExhibition(e.target.value)}
            className="form-input"
            />
            <br /><br />

            <label className="form-label">Description</label><br />
            <textarea
            type="textarea"
            style={{resize:"none"}}
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input form-input-textarea"
            />
            <br /><br />

            <label className="form-label">Price</label><br />
            <input
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-input"
            />
            <br /><br />
            </div>

            <div className="form-container">
            <label className="form-label">Size</label><br />
            <input
            type="text"
            name="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="form-input"
            />
            <br /><br />

            <div className="form-container">
            <label className="form-label">Material</label><br />
            <input
            type="text"
            name="material"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="form-input"
            />
            <br /><br />

            <label className="form-label">Border</label><br />
            <select 
                // value={border}
                // name="border"
                onChange={(e) => setBorder(e.target.value)}
                className="form-input"
                multiple
            >
            <option value="No border">No border</option>
            <option value="Border">Border</option>
            </select> 
            <br /><br />

            <label className="form-label">Image</label><br />
            <input 
                type="file" 
                name="imageUrl" 
                className="form-input"
                onChange={(e) => handleFileUpload(e)}
            />
            <br /><br />
            </div>
        </div>
        </div>
        <button type="submit" className="form-button">Save</button>
        </form>
    </div>
  );
}
 
export default AddItem;