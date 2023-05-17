import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
const API_URL = import.meta.env.FRONTEND_URL || "http://localhost:5005";
 
function AddItem(props) {
  const [title, setTitle] = useState("");
  const [exhibition, setExhibition] = useState("");
  const [artist, setArtist] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [size, setSize] = useState("");
  const [material, setMaterial] = useState("");
  const [border, setBorder] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // IMG File upload 
  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
 
    const uploadData = new FormData();
 
    // imageUrl => this name has to be the same as in the model since we pass
    uploadData.append("imageUrl", e.target.files[0]);
 
    axios
      .post(`${API_URL}/upload`, uploadData)
      .then(response => {
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.data.fileUrl);
        showMessage("Images uploaded successfully!");
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };

  // Upload successful message
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  // Size
  const handleSizeChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSize(selectedOptions);
  };

  // Materials
  const handleMaterialChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setMaterial(selectedOptions);
  };

  // Border
  const handleBorderChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setBorder(selectedOptions);
  };

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault();
 
    // const requestBody = { title, exhibition, description, price, size, material, border, imageUrl };
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${API_URL}/shop`, { title, exhibition, artist, description, quantity, size, material, border, imageUrl }, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        // Reset the state
        setTitle("");
        setExhibition("");
        setArtist("");
        setDescription("");
        setQuantity("");
        setSize("");
        setMaterial("");
        setBorder("");
        setImageUrl("")

        navigate('/shop');
      })
      .catch((error) => console.log(error));
  };
 
  return (
    <div className="shop-add-container">
      <h3>Add Item</h3>
        <br />
        <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-outer-container">
        <div className="form-container margin-right">
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

            <label className="form-label">Artist name</label><br />
            <input
            type="text"
            name="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
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

            <label className="form-label">Quantity</label><br />
            <input
            type="text"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="form-input"
            />
            <br /><br />
            </div>

            <div className="form-container">
            <label className="form-label">Size</label><br />
            <select
            name="size"
            onChange={handleSizeChange}
            className="form-select"
            multiple
            >
            <option value="8x12">8x12</option>
            <option value="10x15">10x15</option>
            <option value="12x18">12x18</option>
            <option value="16x24">16x24</option>
            </select>
            <br /><br />

            <div className="form-container">
            <label className="form-label">Material</label><br />
            <select
            name="material"
            onChange={handleMaterialChange}
            className="form-select"
            multiple
            >
            <option value="Professional paper">Professional paper</option>
            <option value="Fine art paper">Fine art paper</option>
            </select>
            <br /><br />

            <label className="form-label">Border</label><br />
            <select 
                name="border"
                onChange={handleBorderChange}
                className="form-select"
                multiple
            >
            <option value="No border">No border</option>
            <option value="White border">White border</option>
            </select> 
            <br /><br />

            <label className="form-label">Image</label><br />
            <input 
                type="file" 
                name="imageUrl" 
                // className="form-input"
                onChange={(e) => handleFileUpload(e)}
            />
            <br /><br />
            {message && <p>{message}</p>}
            </div>
        </div>
        </div>
        <button type="submit" className="form-button">Save</button>
        </form>
        <br /><br />
    </div>
  );
}
 
export default AddItem;