import React from 'react';
import {Link} from 'react-router-dom';
import './footer.scss';

const Footer = () => {
    return (
        <div className='quick-links'>
        <Link to="/" className="logo"> 
            <i className="fas fa-store"></i>
            <span>freeshop</span>
        </Link>

            <div className="webmaster">
                @roniceyemeli
            </div>
        <div className="share">
            <Link to="https://www.facebook.com/yemelironice/" className="fab fa-facebook-f"></Link>
            <Link to="https://twitter.com/roniceyemeli" className="fab fa-twitter"></Link>
            <Link to="https://www.instagram.com/roniceyemeli/" className="fab fa-instagram"></Link>
            <Link to="https://www.linkedin.com/in/ronice-yemeli-26127114a/" className="fab fa-linkedin"></Link>
        </div>
        </div>
    )
}

export default Footer;
