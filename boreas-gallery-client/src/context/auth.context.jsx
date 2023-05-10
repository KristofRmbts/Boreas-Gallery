import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";
import authService from "./../services/auth.service";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  const storeToken = (token) => {
    // Save in local storage
    localStorage.setItem('authToken', token);
  }

  const authenticateUser = () => { 
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem('authToken');
    
    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      authService.verify()
      .then((response) => {
        // If the server verifies that the JWT token is valid  
        const user = response.data;
       // Update state variables        
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(user);        
      })
      .catch((error) => {
        // If the server sends an error response (invalid token) 
        // Update state variables         
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);        
      });      
    } else {
      // If the token is not available (or is removed)
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);      
    }   
  }

  // Remove token when logged out

  const removeToken = () => {
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem("authToken");
  }

  const logOutUser = () => {
    // To log out the user, remove the token
    removeToken();
    // and update the state variables    
    authenticateUser();
  }  

  useEffect(() => {                                
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken, authenticateUser, logOutUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext };