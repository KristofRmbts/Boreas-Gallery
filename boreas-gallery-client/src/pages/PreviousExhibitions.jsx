import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5005";

function PreviousExhibitionsPage() {
  const [exhibitions, setExhibitions] = useState([]);

  const getAllExhibitions = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/exhibitions`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setExhibitions(response.data.slice(0, -1)))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllExhibitions();
  }, []);

  if (exhibitions === null) {
    return <div></div>;
  }

  return (
    <div className="body-container">
      <div className="page-height-container">
      <div className="text-center">
        {exhibitions? <p><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>There are currently no previous exhibitions.</p> : <p></p>}
      </div>
        {exhibitions.map((exhibition) => (
          <div key={exhibition._id}>
            <div className="current-exhibition-container">
              <h1>{exhibition.artist}</h1>
              <h3>{exhibition.title}</h3>
              <br />
              <br />
              <br />
              <br />
              <Link
                to={`/exhibitions/${exhibition._id}`}
                className="link-normal"
              >
                <p className="link-black text-s align-right">VIEW HERE</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PreviousExhibitionsPage;
