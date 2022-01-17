import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import Loading from "../../utils/loading/Loading";
import "./addProducts.scss";

const initialState = {
  productId: "",
  title: "",
  price: 0,
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio illo quo ipsam a, fugiat voluptatibus cum nostrum ex dolores nemo est repellat quis facere quae. Repellendus nulla cupiditate tempore expedita.",
  category: "",
  _id: "",
};

const AddProducts = () => {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoriesApi.categories;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isAdmin] = state.userApi.isAdmin;
  const [token] = state.token;

  const navigate = useNavigate();
  const param = useParams();

  const [products] = state.ProductsApi.products;
  console.log(products);
  const [onEdit, setOnEdit] = useState(false);
  const [callback, setCallback] = state.ProductsApi.callback;

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product);
          setImages(product.images);
        }
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages(false);
    }
  }, [param.id, products]);

  const handleErase = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You are not an Admin :)");
      setLoading(true);
      await axios.post(
        "/api/erase",
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImages(false);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You are not an Admin :)");
      const file = e.target.files[0];

      if (!file) return alert("File not uploaded");

      if (file.size > 1024 * 1024) return alert("Size too large !");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return alert("File format not supported");

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setImages(res.data);
    } catch (error) {
      alert(error.repsonse.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You are not an Admin :)");
      if (!images) return alert(" No image Uploaded");

      if (onEdit) {
        await axios.put(
          `/api/products/${product._id}`,
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
      } else {
        await axios.post(
          "/api/products",
          { ...product, images},
          {
            headers: { Authorization: token },
          }
        );
      }

      setCallback(!callback);
      navigate("/");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const styleUpload = {
    display: images ? "block" : "none",
  };

  return (
    <div className="createProduct">
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleUpload} />
        {loading ? (
          <div id="file_img" style={styleUpload}>
            <Loading />
          </div>
        ) : (
          <div id="file_img">
            <img src={images ? images.url : ""} alt="" />
            <span onClick={handleErase}>
              <i className="fas fa-trash"></i>
            </span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="rows">
          <label htmlFor="productId">Product ID</label>
          <input
            type="text"
            name="productId"
            id="productId"
            required
            value={product.productId}
            onChange={handleChangeInput}
            disabled={onEdit}
          />
        </div>

        <div className="rows">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={product.title}
            onChange={handleChangeInput}
          />
        </div>

        <div className="rows">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            required
            value={product.price}
            onChange={handleChangeInput}
          />
        </div>

        <div className="rows">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            required
            value={product.description}
            rows="4"
            onChange={handleChangeInput}
          />
        </div>

        <div className="rows">
          <label htmlFor="categories">Categories: </label>
          <select
            type="text"
            name="category"
            value={product.category}
            onChange={handleChangeInput}
          >
            <option value=""> Please select a category</option>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">{onEdit ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default AddProducts;
