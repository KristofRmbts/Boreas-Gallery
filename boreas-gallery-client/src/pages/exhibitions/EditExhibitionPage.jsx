import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"

const API_URL = "http://localhost:5005";

function EditExhibitionPage(props) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [description, setDescription] = useState("");
  const [subtext1, setSubtext1] = useState("");
  const [subtext2, setSubtext2] = useState("");
  const [subtext3, setSubtext3] = useState("");
  const [runningTime, setRunningTime] = useState("");
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");

  const { exhibitionId } = useParams();  
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
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/exhibitions/${exhibitionId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        // Reset the state
        const oneExhibition = response.data;
        setTitle(oneExhibition.title);
        setArtist(oneExhibition.artist);
        setDescription(oneExhibition.description);
        setRunningTime(oneExhibition.runningTime);
        setSubtext1(oneExhibition.subtext1);
        setSubtext2(oneExhibition.subtext2);
        setSubtext3(oneExhibition.subtext3);
        setImages(oneExhibition.images)
      })
      .catch((error) => console.log(error));
    }, [exhibitionId]);

    const handleFormSubmit = (e) => {
      e.preventDefault();
      // Create an object representing the body of the PUT request
      const requestBody = { title, artist, description, runningTime, subtext1, subtext2, subtext3, images };
      const storedToken = localStorage.getItem("authToken");
   
      // Make a PUT request to update the project
      axios
      .put(`${API_URL}/exhibitions/${exhibitionId}/edit`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then((response) => {
          // Once the request is resolved successfully and the project
          // is updated we navigate back to the details page
          navigate(`/exhibitions`)
        });
      }

  // Delete exhibition

  const deleteExhibition = () => {
  // Make a DELETE request to delete the project
  const storedToken = localStorage.getItem("authToken");

  axios
  .delete(`${API_URL}/exhibition/${itemId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(() => {
      // Once the delete request is resolved successfully
      // navigate back to the list of projects.
      navigate("/exhibitions");
    })
    .catch((err) => console.log(err));
};  
 
  return (
    <div className="body-container">
      <div className="shop-add-container">
        <br />
        <h3>Edit Exhibition</h3>
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

              <label className="form-label">Running Time</label><br />
              <input
              type="text"
              name="runningTime"
              value={runningTime}
              onChange={(e) => setRunningTime(e.target.value)}
              className="form-input"
              />
              <br /><br />
              </div>

              <div className="form-container">
              <label className="form-label">Subtext 1</label><br />
              <input
              type="text"
              name="subtext1"
              value={subtext1}
              onChange={(e) => setSubtext1(e.target.value)}
              className="form-input"
              />
              <br /><br />

              <label className="form-label">Subtext 2</label><br />
              <input
              type="text"
              name="subtext2"
              value={subtext2}
              onChange={(e) => setSubtext2(e.target.value)}
              className="form-input"
              />
              <br /><br />

              <label className="form-label">Subtext 3</label><br />
              <input
              type="text"
              name="subtext3"
              value={subtext3}
              onChange={(e) => setSubtext3(e.target.value)}
              className="form-input"
              />
              <br /><br />

              <label className="form-label">Image</label><br />
              <input
              type="file"
              name="imageUrl"
              multiple
              onChange={(e) => handleFileUpload(e)}
              />
              <br /><br />
              </div>
          </div>
          <button type="submit" className="form-button">Save</button><span className="text-xs">&nbsp;&nbsp;&nbsp;OR&nbsp;&nbsp;&nbsp;</span><button onClick={deleteExhibition} className="form-button">Delete</button>
          </form>

          {message && <p>{message}</p>}
      </div>
    </div>
  );
}
 
export default EditExhibitionPage;