import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import ArrowIcon from "./../assets/icons/arrow-right.png";
import ExhibitionDetails from "./../components/ExhibitionDetails";

const API_URL = import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5005";

function ExhibitionsPage() {
  const [exhibition, setExhibition] = useState([]);

  const getLatestExhibitions = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/exhibitions/latest`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setExhibition(response.data.latestExhibition))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getLatestExhibitions();
  }, []);

  const scroll = () => {
    const section = document.querySelector("#current");
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!exhibition.images) {
    return <></>;
  }

  return (
    <div className="body-container">
      <div className="page-height-container">
        <div className="current-exhibition-container">
          <h2 onClick={scroll}>
            Current exhibition{" "}
            <img src={ArrowIcon} alt="arrow right" className="arrow-down" />
          </h2>
          <br />
          <h1>{exhibition.artist}</h1>
          <h3>{exhibition.title}</h3>
          <br />
          <br />
          <br />
          <br />
          <p className="link-black text-s align-right">RUNNING TIME</p>
          <p className="link-black align-right">{exhibition.runningTime}</p>
        </div>
        <br />
        <Link to={`/exhibitions/previous`} className="link-normal">
          <h2 className="align-right">
            Previous exhibitions{" "}
            <img src={ArrowIcon} alt="arrow right" height={13} />
          </h2>
        </Link>
      </div>
      <br />
      <ExhibitionDetails exhibition={exhibition} />
    </div>
  );
}

export default ExhibitionsPage;
