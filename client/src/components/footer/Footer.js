import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";


//while down in the footer an we want to scroll directly at the top of the page 
const scrollToTop = (e) =>{
  e.preventDefault();
  window.scroll(0,0)
}


const Footer = () => {
  return (
    <div className="footbar">
      <div className="foot_text">
        <Link to="/" className="footer_logo" onClick={scrollToTop}>
          <i className="fas fa-store"></i>
          <span>freestore</span>
        </Link>
        <div className="cols">
          <h2>about us</h2>
          <ul>
            <li>
              <Link to="#">story</Link>
            </li>
            <li>
              <Link to="#">clients</Link>
            </li>
            <li>
              <Link to="#">testimonials</Link>
            </li>
          </ul>
        </div>
        <div className="cols">
          <h2>services</h2>
          <ul>
            <li>
              <Link to="#">marketing</Link>
            </li>
            <li>
              <Link to="#">consulting</Link>
            </li>
            <li>
              <Link to="#">develpment</Link>
            </li>
          </ul>
        </div>
        <div className="cols">
          <h2>social</h2>
          <ul className="share">
            <li>
              <i className="fab fa-facebook-f"></i>
              <a href="https://www.facebook.com/">facebook</a>
            </li>
            <li>
              <i className="fab fa-instagram"></i>
              <a href="https://www.instagram.com/">instagram</a>
            </li>
            <li>
              <i className="fab fa-youtube"></i>
              <a href="https://www.youtube.com">youtube</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="webmaster">
        <p>
          &copy;roniceyemeli {new Date().getFullYear()} | All rights reserved |
          Terms Of Service | Privacy
        </p>
      </div>
    </div>
  );
};

export default Footer;
