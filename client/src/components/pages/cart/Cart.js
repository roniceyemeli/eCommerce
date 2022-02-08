import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import "./cart.scss";
import { Link } from "react-router-dom";

const Cart = () => {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userApi.cart;
  const [total, setTotal] = useState(0);
  const [token] = state.token;
  console.log(cart);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
      setTotal(total);
    };

    getTotal();
  }, [cart]);

  const addToCart = async (cart) => {
    await axios.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });
    setCart([...cart]);
    addToCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });
    setCart([...cart]);
    addToCart(cart);
  };

  const deleteItem = (id) => {
    if (window.confirm("Do you want to delete this item")) {
      cart.forEach((item, index) => {
        if (item._id === id) { 
          cart.splice(index, 1);
        }
      });
      setCart([...cart]);
      addToCart(cart);
    }
  };

  if (cart.length === 0)
    return (
      <h2 className="empty_cart"
        style={{
          textAlign: "center",
          marginTop: "20%",
          textTransform: "uppercase",
        }}
      >
        Your cart is empty
      </h2>
    );
  return (
    <div className="cartPage">
      <div className="blck">
        {cart.map((product) => (
          <div className="box-container" key={product._id}>
            <div className="box">
              <i
                className="fas fa-trash"
                onClick={() => deleteItem(product._id)}
              ></i>
              <Link to={`/detail/${product._id}`}>
                <img
                  src={product.images.url}
                  alt="product_image"
                />
              </Link>
              <div className="content">
                <h3>{product.title}</h3>
                <div className="form">
                  <i
                    className="fas fa-minus-circle"
                    onClick={() => decrement(product._id)}
                  ></i>
                  <span>{product.quantity}</span>
                  <i
                    className="fas fa-plus-circle"
                    onClick={() => increment(product._id)}
                  ></i>
                </div>
                <div className="price">
                  price : <span>{product.price * product.quantity}.00TND</span>
                </div>
                {product.sold > 0 && (
                  <>
                  <div className="price">
                  sold : <span>{product.sold}%</span>
                  </div>
                  <div className="price">
                  new price : <span>{product.price - product.price * product.sold * 0.01}.00TND</span>
                  </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <h3>
          total : <span>{total}.00TND</span>
        </h3>
        <Link to="#" className="btn">
          proceed to checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
