import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import ProductsItem from "../../pages/shop/ProductsItem";
import "./detailProduct.scss";

const DetailProduct = () => {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.ProductsApi.products;
  const addCart = state.userApi.addCart;
  const [detailProduct, setDetailProduct] = useState([]);

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) return setDetailProduct(product);
      });
    }
  }, [params.id, products]);

  if (detailProduct.length === 0) return null;

  return (
    <>
      <div className="detail">
        <img src={detailProduct.images.url} alt="" />
        <div className="box-detail">
          <div className="row">
            <h4>{detailProduct.title}</h4>
            <span>#{detailProduct.productId}</span>
          </div>
          <h6>
            Price: <span className="price">{detailProduct.price}.00TND</span>
          </h6>
          <p>
            Description:{" "}
            <span className="desc">{detailProduct.description}</span>
          </p>
          <p>Sold: {detailProduct.sold}</p>
          <Link
            to="/cart"
            className="cart"
            onClick={() => addCart(detailProduct)}
          >
            <i className="fas fa-cart-plus" title="purchase this product"></i>
          </Link>
        </div>
      </div>
      <div>
        <h4 className="down">Related Products</h4>
        <div className="products">
          {products.map((product) => {
            return product.category === detailProduct.category ? (
              <ProductsItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
