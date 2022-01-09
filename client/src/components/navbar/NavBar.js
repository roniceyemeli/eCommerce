import React from 'react';
import { Link } from 'react-router-dom';
import "./navBar.scss"

const NavBar = ({openMenu, setOpenMenu}) => {


    return (
        <div className = "header">
            <Link to = '/'
                className='logo'><i className="fas fa-store"></i> freestore
            </Link>
                <form className="search-form">
                    <input type="search" id='search-box' placeholder="Type your search..." />
                    <label htmlFor="search-box" className="fas fa-search"></label>
                </form>
            
            <div className="icons">
                <div id="menu-btn" className="fas fa-bars" onClick={()=> setOpenMenu(!openMenu)}></div>
                <div id="search-btn" className="fas fa-search"></div>
                <Link to="/register" className="fas fa-user"></Link>
                <Link to="#" className="fas fa-shopping-cart"></Link>
            </div>
        </div>
    )
}

export default NavBar
