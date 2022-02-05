import React, { useContext } from "react";
import "./sideBar.scss";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import axios from "axios";

const SideBar = ({ openMenu, setOpenMenu }) => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userApi.isLogged;
  const [isAdmin] = state.userApi.isAdmin;

  const closeMenu = () => {
    setOpenMenu(!openMenu);
  };
  const adminRoutes = () => {
    return (
      <>

        <Link to="/addProduct" onClick={closeMenu}>
          <i className="fas fa-angle-right"></i>add products
        </Link>
        <Link to="/category" onClick={closeMenu}>
          <i className="fas fa-angle-right"></i>categories
        </Link>

      </>
    );
  };

  const logoutUser = async () => {
    try {
      await axios.get("/user/logout");
      localStorage.clear();
      window.location.href = "/";
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const loggedRoutes = () => {
    return (
      <>
        <Link to="/" onClick={closeMenu}>
              <i className="fas fa-angle-right"></i>shop
        </Link>

        <Link to="/cart" onClick={closeMenu}>
              <i className="fas fa-angle-right"></i>cart
        </Link>
        
        <Link to="/" onClick={logoutUser}>
          <i className="fas fa-angle-right"></i>Logout
        </Link>

        <Link to="/contact" onClick={closeMenu}>
              <i className="fas fa-angle-right"></i>contact
        </Link>
      </>
    );
  };

  return (
    <div className="side-bar active">
      <div
        id="close-side-bar"
        className="fas fa-times"
        onClick={() => setOpenMenu(!openMenu)}
      ></div>

      <div className="user">
        <i className="fas fa-store"></i>
        <h3>{isAdmin ? "admin" : "welcome"}</h3>
        <Link to="#">
          {isLogged ? "Dashboard" : "please sign in"}
        </Link>
      </div>

      <nav className="navbar">
        {isAdmin && adminRoutes()}
        {isLogged ? (
          loggedRoutes()
        ) : (
          <>
            <Link to="/" onClick={closeMenu}>
              <i className="fas fa-angle-right"></i>shop
            </Link>
            <Link to="/login" onClick={closeMenu}>
              <i className="fas fa-angle-right"></i>login
            </Link>
            <Link to="/register" onClick={closeMenu}>
              <i className="fas fa-angle-right"></i>register
            </Link>
            <Link to="/contact" onClick={closeMenu}>
              <i className="fas fa-angle-right"></i>contact
            </Link>
          </>
        )}
      </nav>
      <p className="copyright">&copy;roniceyemeli {new Date().getFullYear()}</p> 
    </div>
  );
};

export default SideBar;
