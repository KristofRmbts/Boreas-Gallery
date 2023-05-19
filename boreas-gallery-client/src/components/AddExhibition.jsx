import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5005";

function AddExhibition() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [description, setDescription] = useState("");
  const [subtext1, setSubtext1] = useState("");
  const [subtext2, setSubtext2] = useState("");
  const [subtext3, setSubtext3] = useState("");
  const [runningTime, setRunningTime] = useState("");
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // IMG File upload
  const handleFileUpload = (e) => {
    const files = e.target.files;

    const uploadData = new FormData();

    for (let i = 0; i < files.length; i++) {
      uploadData.append("images", files[i]);
    }

    axios
      .post(`${API_URL}/exhibitions/upload`, uploadData)
      .then((response) => {
        console.log(response.data);
        setImages((prevImages) => [...prevImages, ...response.data.fileUrls]);
        showMessage("Images uploaded successfully!");
      })
      .catch((err) => console.log("Error while uploading the files: ", err));
  };

  // Upload successful message
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // const requestBody = { title, exhibition, description, price, size, material, border, imageUrl };
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(
        `${API_URL}/exhibitions`,
        {
          title,
          artist,
          description,
          subtext1,
          subtext2,
          subtext3,
          runningTime,
          images,
        },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        // Reset the state
        setTitle("");
        setArtist("");
        setDescription("");
        setSubtext1("");
        setSubtext2("");
        setSubtext3("");
        setRunningTime("");
        setImages([]);

        navigate("/exhibitions");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="shop-add-container">
      <h3>Add Exhibition</h3>
      <br />
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-outer-container">
          <div className="form-container margin-right">
            <label className="form-label">Title</label>
            <br />
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
            />
            <br />
            <br />

            <label className="form-label">Artist name</label>
            <br />
            <input
              type="text"
              name="artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              className="form-input"
            />
            <br />
            <br />

            <label className="form-label">Description</label>
            <br />
            <textarea
              type="textarea"
              style={{ resize: "none" }}
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input form-input-textarea"
            />
            <br />
            <br />

            <label className="form-label">Running Time</label>
            <br />
            <input
              type="text"
              name="runningTime"
              value={runningTime}
              onChange={(e) => setRunningTime(e.target.value)}
              className="form-input"
            />
            <br />
            <br />

            <label className="form-label">Image</label>
            <br />
            <input
              type="file"
              name="imageUrl"
              multiple
              onChange={(e) => handleFileUpload(e)}
            />
            <br />
            <br />
            {message && <p>{message}</p>}
          </div>

          <div className="form-container">
            <label className="form-label">Subtext 1</label>
            <br />
            <textarea
              type="textarea"
              style={{ resize: "none" }}
              name="subtext1"
              value={subtext1}
              onChange={(e) => setSubtext1(e.target.value)}
              className="form-input form-input-textarea"
            />
            <br />
            <br />

            <label className="form-label">Subtext 2</label>
            <br />
            <textarea
              type="textarea"
              style={{ resize: "none" }}
              name="subtext2"
              value={subtext2}
              onChange={(e) => setSubtext2(e.target.value)}
              className="form-input form-input-textarea"
            />
            <br />
            <br />

            <label className="form-label">Subtext 3</label>
            <br />
            <textarea
              type="textarea"
              style={{ resize: "none" }}
              name="subtext3"
              value={subtext3}
              onChange={(e) => setSubtext3(e.target.value)}
              className="form-input form-input-textarea"
            />
            <br />
            <br />
          </div>
        </div>
        <button type="submit" className="form-button">
          Save
        </button>
      </form>
      <br />
      <br />
    </div>
  );
}

export default AddExhibition;
