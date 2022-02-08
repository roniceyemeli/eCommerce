import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { GlobalState } from "../GlobalState";
import Products from "./pages/shop/Products";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import NotFound from "./utils/notfound/NotFound";
import Categories from "./pages/category/Categories";
import AddProducts from "./pages/addProducts/AddProducts";
import DetailProduct from "./pages/detailProduct/DetailProduct";
import Cart from './pages/cart/Cart';
import Contact from "./pages/contact/Contact";
import Footer from './footer/Footer'

const Home = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userApi.isLogged;
  const [isAdmin] = state.userApi.isAdmin;

  return (
    <div>


    <Routes>
      <Route exact path="/" element={<Products />} />

      <Route
        exact
        path="/login"
        element={isLogged ? <NotFound /> : <Login />}
        />

      <Route
        exact
        path="/register"
        element={isLogged ? <NotFound /> : <Register />}
        />

      <Route exact path="*" element={<NotFound />} />

      <Route
        exact
        path="/category"
        element={isAdmin ? <Categories /> : <NotFound />}
        />

      <Route
        exact
        path="/addProduct"
        element={isAdmin ? <AddProducts /> : <NotFound />}
      />

      <Route
        exact
        path="/editProduct/:id"
        element={isAdmin ? <AddProducts /> : <NotFound />}
        />

      <Route
        exact
        path="/detail/:id"
        element={isAdmin ? <NotFound/> : <DetailProduct/> }
        />

      <Route
        exact
        path="/cart"
        element={isAdmin ? <NotFound/> : <Cart/> }
        />

      <Route
        exact
        path="/contact"
        element={<Contact/>}
        />

    </Routes>
     {/* //our footbar component */}
    <Footer/>
    
    </div>
  );
};

export default Home;
