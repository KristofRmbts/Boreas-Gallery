import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"
 
const API_URL = import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5005";
 
function EditItemPage() {
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

  const { itemId } = useParams();  
  const navigate = useNavigate(); 

  // IMG File upload 
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

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    axios
    .get(`${API_URL}/shop/${itemId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then((response) => {
        /* 
          We update the state with the project data coming from the response.
          This way we set inputs to show the actual title and description of the item
        */
        const oneItem = response.data;
        setTitle(oneItem.title);
        setDescription(oneItem.description);
        setExhibition(oneItem.exhibition);
        setArtist(oneItem.artist);
        setQuantity(oneItem.quantity);
        setSize(oneItem.size);
        setMaterial(oneItem.material);
        setBorder(oneItem.border);
        setImageUrl(oneItem.imageUrl);
      })
      .catch((error) => console.log(error));
    
    }, [itemId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = { title, exhibition, artist, quantity, description, size, material, border, imageUrl };
    const storedToken = localStorage.getItem("authToken");
 
    // Make a PUT request to update the project
    axios
    .put(`${API_URL}/shop/${itemId}/edit`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        // Once the request is resolved successfully and the item
        // is updated we navigate back to the details page
        navigate(`/shop/${itemId}`)
      });
};

// Delete item

const deleteItem = () => {
    // Make a DELETE request to delete the item
    const storedToken = localStorage.getItem("authToken");

    axios
    .delete(`${API_URL}/shop/${itemId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(() => {
        // Once the delete request is resolved successfully
        // navigate back to the list of items.
        navigate("/shop");
      })
      .catch((err) => console.log(err));
};  
  
return (
    <div className="body-container">
    <div className="shop-add-container">
      <h3>Edit Item</h3>
        <br />
        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
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
            <option value="professional paper">Professional paper</option>
            <option value="fine art paper">Fine art paper</option>
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
            <option value="Border">White border</option>
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
        <button type="submit" className="form-button">Save</button><span className="text-xs">&nbsp;&nbsp;&nbsp;OR&nbsp;&nbsp;&nbsp;</span><button onClick={deleteItem} className="form-button">Delete</button>
        </form>
        <br /><br />
    </div>
    </div>
  );
}
 
export default EditItemPage;