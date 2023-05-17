import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../context/auth.context"; 

// Image asserts:
import BoreasLogoVerticalWhite from "./../assets/logos/BoreasLogo-vertical-white.png"
 
function Footer() {
  const { isLoggedIn, logOutUser, isAdmin } = useContext(AuthContext); 

  return (
    <div className="footer-container">
        <div className="footer-inner-container">
            <br />
            <nav className="footer-links-container">
                <div className="footer-container-left">
                    <Link to="/about" className="link-white link-margin"> About us </Link>
                    <Link to="/takepart" className="link-orange link-margin"> Take part </Link>
                    <Link to="/contact" className="link-white link-margin"> Contact us </Link>
                    <Link to="/shop" className="link-white"> Shop </Link>
                </div>
                <div className="footer-container-right">
                    {isAdmin && (<Link to="/admin" className="link-white link-margin"> Admin Portal </Link>)}
                    {!isLoggedIn && (<Link to="/login" className="link-white"> Login </Link>)}
                    {isLoggedIn && (<Link onClick={logOutUser} className="link-white"> Logout </Link>)}
                </div>
            </nav>
            <br /><br /><br />
            <div className="footer-links-container">
                <div className="footer-container-left">
                    <div className="footer-logo">
                        <Link to="/">
                            <img src={BoreasLogoVerticalWhite} alt="Logo" height={107} />
                        </Link>
                    </div>
                </div>
                <div className="footer-container-right">
                    <p className="text-white text-xs">©️ 2023 Boreas<br />All rights reserved</p>
                </div>
            </div>
            <br />
        </div>
    </div>
  );
}
 
export default Footer;