import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import "./navBar.scss";

const NavBar = ({ openMenu, setOpenMenu }) => {

    const state = useContext(GlobalState);
    // const [categories] = state.categoriesApi.categories;

    // const [category, setCategory] = state.ProductsApi.category;
    // console.log("category is", category)
    const [search, setSearch] = state.ProductsApi.search;

    // const handleCategory=(e)=>{
    //     setCategory(e.target.value);
    //     setSearch('')
    // }


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

      {/* <div className="filterMenu">
          <span>categories:</span>
          <select name='category' value={category} onChange={handleCategory}>
                    <option value=''>All Products</option>
                    {   
                        categories.map(category => (
                            <option value={'category=' + category._id} key={category._id}>
                                {category.name}
                            </option>
                        )) 
                    }
                </select>
      </div> */}

      <div className="icons">
        <div
          id="menu-btn"
          className="fas fa-bars"
          onClick={() => setOpenMenu(!openMenu)}
        ></div>
        <div id="search-btn" className="fas fa-search"></div>
        <Link to="/register" className="fas fa-user"></Link>
        <Link to="#" className="fas fa-shopping-cart"></Link>
      </div>
    </div>
  );
};

export default NavBar;
