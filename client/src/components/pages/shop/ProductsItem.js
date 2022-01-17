import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./productsItem.scss";
import { GlobalState } from "../../../GlobalState";

const ProductsItem = ({ product, isAdmin, deleteProduct, handleCheck }) => {
  const state = useContext(GlobalState);
  const addCart = state.userApi.addCart;

  return (
    <div className="box">
      {isAdmin && (
        <input
          type="checkbox"
          checked={product.checked}
          onChange={() => handleCheck(product._id)}
        />
      )}
      <div className="image">
        <img
          src={product.images.url}
          alt="product_images"
          className="main-img"
        />
        <div className="icons">
          {isAdmin ? (
            <>
              <Link
                to="#!"
                className="fas fa-trash"
                onClick={() =>
                  deleteProduct(product._id, product.images.public_id)
                }
              ></Link>
              <Link
                to={`/editProduct/${product._id}`}
                className="fas fa-edit"
              ></Link>
            </>
          ) :

          // when you're not admin this will be displayed
          (
            <>
              <Link
                to="#!"
                className="fas fa-shopping-cart"
                onClick={() => addCart(product)}
              ></Link>
              <Link to={`/detail/${product._id}`} className="far fa-eye"></Link>
            </>
          )}
        </div>
      </div>
      <div className="content">
        <h3>{product.title}</h3>
        <div className="price">{product.price}.00TND</div>
        <span className="desc">{product.description}</span>
      </div>
    </div>
  );
};

export default ProductsItem;
