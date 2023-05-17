import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import authService from "./../services/auth.service";

import ArrowIcon from "../assets/icons/arrow-right.png"

const API_URL = "http://localhost:5005";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password };
 
    // Make an axios request to the API
    // If the POST request is a successful redirect to the login page
    // If the request resolves with an error, set the error message in the state
    authService.signup(requestBody)
      .then((response) => {
        navigate('/login');
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
      <h2>Sign up with your name,<br />email and password.</h2>
      <br /><br /><br />

      <form onSubmit={handleSignupSubmit}>
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

        <button type="submit" className="form-button">Sign up</button>
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }
      <br /><br /><br />

      <p className="text-s">Already have account?</p><br />
      <Link to={"/login"} className="link-black"> Log in <img src={ArrowIcon} alt="Arrow" height={10} className="icon" /></Link>
      </div>
    </div>
  )
}

export default SignupPage;