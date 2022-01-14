import axios from "axios";
import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import "./categories.scss";

const Categories = () => {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesApi.categories;
  const [category, setCategory] = useState("");
  const [token] = state.token;
  const [callback, setCallBack] = state.categoriesApi.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");

  const addCategory = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/category/${id}`,
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
      } else {
        const res = await axios.post(
          "/api/category",
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
      }
      setOnEdit(false);
      setCategory("");
      setCallBack(!callback);
    } catch (error) {
      alert(error.message.data.msg);
    }
  };

  const editCategory = async (id, name) => {
    setID(id);
    setCategory(name);
    setOnEdit(true);
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`/api/category/${id}`, {
        headers: { Authorization: token },
      });
      alert(res.data.msg);
      setCallBack(!callback);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <div className="categories">
      <form onSubmit={addCategory}>
        <label htmlFor="category">category name</label>
        <input
          type="text"
          name="category"
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
          autoComplete="off"
        />

        <button type="submit">
          {onEdit ? (
            <i className="far fa-check-circle"></i>
          ) : (
            <i className="fas fa-plus-circle"></i>
          )}
        </button>
      </form>

      <div className="right">
        {categories.map((category) => (
          <div className="roww" key={category._id}>
            <p>{category.name}</p>
            <div className="btn2">
              <button onClick={() => editCategory(category._id, category.name)}>
                <i className="fas fa-edit" id="edit"></i>
              </button>
              <button onClick={() => deleteCategory(category._id)}>
                <i className="fas fa-trash" id="del"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
