import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/auth.context"; 

// Image asserts:
import BoreasLogoHorizontalBlack from "../assets/logos/BoreasLogo-horizontal-black.png"
 
function Header() {
  // const { isLoggedIn, user, logOutUser } = useContext(AuthContext); 

  return (
    <div className="header-container">
        <div className="header-logo">
            <Link to="/">
                <img src={BoreasLogoHorizontalBlack} alt="Logo" width={150} />
            </Link>
        </div>
        <nav className="header-links-container margin-topbottom">
            <div className="links-container-left">
                <Link to="/exhibitions" className="link-black link-margin"> Exhibitions </Link>
                <Link to="/artists" className="link-black link-margin"> Artists </Link>
                <Link to="/shop" className="link-black"> Shop </Link>
            </div>
            <div className="links-container-right">
                <Link to="/about" className="link-black link-margin"> About us </Link>
                <a href="https://www.instagram.com/boreasgallery/" target="_blank" rel="noreferrer" className="link-orange"> Follow </a>
            </div>
        </nav>
        <hr />    
    </div>
  );
}
 
export default Header;