import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "./../services/auth.service";

import ArrowIcon from "../assets/icons/arrow-right.png"

const API_URL = import.meta.env.FRONTEND_URL || "http://localhost:5005";
 
function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  
  const navigate = useNavigate();
 
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
 
  const { storeToken, authenticateUser } = useContext(AuthContext);  
  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
 
    authService.login(requestBody)
      .then((response) => {
      // Request to the server's endpoint `/auth/login` returns a response
      // with the JWT string ->  response.data.authToken
        console.log('JWT token', response.data.authToken );

        storeToken(response.data.authToken);
        authenticateUser();

        navigate('/');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };
  
  return (
    <div className="body-container">
      <br /><br />
      <div className="login-container">
        <h2>Log in to your account with<br />your email and password.</h2>
        <br /><br /><br />

        <form onSubmit={handleLoginSubmit}>
          <label className="form-label">Email address</label><br />
          <input 
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
            className="form-input"
          />
          <br /><br />

          <label className="form-label">Password</label><br />
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            className="form-input"
          />
          <br /><br />

          <button type="submit" className="form-button">Log in</button>
        </form>
        { errorMessage && <p className="error-message">{errorMessage}</p> }
        <br /><br /><br />

        <p className="text-s">Not a member? Get exclusive access to<br />exhibitions and events, free admission every<br />day, and much more.</p><br />
        <Link to={"/signup"} className="link-black"> Join today <img src={ArrowIcon} alt="Arrow" height={10} className="icon" /></Link>
      </div>
    </div>
  )
}
 
export default LoginPage;