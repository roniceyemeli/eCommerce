import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import "./navBar.scss";

const NavBar = ({ openMenu, setOpenMenu }) => {

    const state = useContext(GlobalState);
    const [search, setSearch] = state.ProductsApi.search;
    const[cart] =state.userApi.cart;

  return (
    <div className="header">

      <Link to="/" className="logo">
        <i className="fas fa-store"></i> freestore
      </Link>

      <form className="search-form">
        <input
          type="search"
          id="search-box"
          value={search}
          placeholder="Type your search..."
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        <label htmlFor="search-box" className="fas fa-search"></label>
      </form>

      <div className="icons">
        <div
          id="menu-btn"
          className="fas fa-bars"
          onClick={() => setOpenMenu(!openMenu)}
        ></div>
        <div id="search-btn" className="fas fa-search"></div>
        <Link to="/register" className="fas fa-user"></Link>
        <span className="cart_icon">
          <span>{cart.length}</span>
          <Link to="/cart" className="fas fa-shopping-cart"></Link>
        </span>
      </div>
    </div>
  );
};

export default NavBar;
