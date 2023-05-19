import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5005";

function AddArtist() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [social1, setSocial1] = useState("");
  const [social2, setSocial2] = useState("");
  const [social3, setSocial3] = useState("");
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

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const storedToken = localStorage.getItem("authToken");

    axios
      .post(
        `${API_URL}/artists`,
        {
          firstName,
          lastName,
          description,
          email,
          social1,
          social2,
          social3,
          imageUrl,
        },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        // Reset the state
        setFirstName("");
        setLastName("");
        setDescription("");
        setEmail("");
        setSocial1("");
        setSocial2("");
        setSocial3("");
        setImageUrl("");

        navigate("/artists");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="shop-add-container">
      <h3>Add Artist</h3>
      <br />
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-outer-container">
          <div className="form-container margin-right">
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

          <div className="form-container">
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
      </form>
      <br />
      <br />
    </div>
  );
}

export default AddArtist;
