import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5005";

function EditArtistPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [social1, setSocial1] = useState("");
  const [social2, setSocial2] = useState("");
  const [social3, setSocial3] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  const { artistId } = useParams();
  const navigate = useNavigate();

  // IMG File upload
  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    axios
      .post(`${API_URL}/artist/upload`, uploadData)
      .then((response) => {
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.data.fileUrl);
        showMessage("Images uploaded successfully!");
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  // Upload successful message
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/artists/${artistId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        /* 
          We update the state with the project data coming from the response.
          This way we set inputs to show the actual title and description of the project
        */
        const oneArtist = response.data;
        setFirstName(oneArtist.firstName);
        setLastName(oneArtist.lastName);
        setDescription(oneArtist.description);
        setEmail(oneArtist.email);
        setSocial1(oneArtist.social1);
        setSocial2(oneArtist.social2);
        setSocial3(oneArtist.social3);
        setImageUrl(oneArtist.imageUrl);
      })
      .catch((error) => console.log(error));
  }, [artistId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = {
      firstName,
      lastName,
      description,
      email,
      social1,
      social2,
      social3,
      imageUrl,
    };
    const storedToken = localStorage.getItem("authToken");

    // Make a PUT request to update the artist
    axios
      .put(`${API_URL}/artists/${artistId}/edit`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Once the request is resolved successfully and the project
        // is updated we navigate back to the details page
        navigate(`/artists/${artistId}`);
      });
  };

  // Delete artist

  const deleteArtist = () => {
    // Make a DELETE request to delete the artist
    const storedToken = localStorage.getItem("authToken");

    axios
      .delete(`${API_URL}/artists/${artistId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        // Once the delete request is resolved successfully
        // navigate back to the list of artists.
        navigate("/artists");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="body-container">
      <div className="shop-add-container">
        <h3>Edit Artist</h3>
        <br />
        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
          <div className="form-outer-container d-flex flex-wrap">
            <div className="col-sm-12 col-md-6 col-lg-4">
              <label className="form-label">First name</label>
              <br />
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="form-input"
              />
              <br />
              <br />

              <label className="form-label">Last name</label>
              <br />
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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

              <label className="form-label">Email address</label>
              <br />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
              <br />
              <br />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-4">
              <label className="form-label">Social media link 1</label>
              <br />
              <input
                type="text"
                name="social1"
                value={social1}
                onChange={(e) => setSocial1(e.target.value)}
                className="form-input"
              />
              <br />
              <br />

              <label className="form-label">Social media link 2</label>
              <br />
              <input
                type="text"
                name="social2"
                value={social2}
                onChange={(e) => setSocial2(e.target.value)}
                className="form-input"
              />
              <br />
              <br />

              <label className="form-label">Social media link 3</label>
              <br />
              <input
                type="text"
                name="social3"
                value={social3}
                onChange={(e) => setSocial3(e.target.value)}
                className="form-input"
              />
              <br />
              <br />

              <label className="form-label">Image</label>
              <br />
              <input
                type="file"
                name="imageUrl"
                onChange={(e) => handleFileUpload(e)}
              />
              <br />
              <br />
              {message && <p>{message}</p>}
            </div>
          </div>
          <button type="submit" className="form-button">
            Save
          </button>
          <span className="text-xs">
            &nbsp;&nbsp;&nbsp;OR&nbsp;&nbsp;&nbsp;
          </span>
          <button onClick={deleteArtist} className="form-button">
            Delete
          </button>
        </form>
        <br />
        <br />
      </div>
    </div>
  );
}

export default EditArtistPage;
