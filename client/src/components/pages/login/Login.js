import "./login.scss";
import React, { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const showPassword = () => {
    let x = document.getElementById("inputPassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  const loginSubmit = async(e) =>{
    e.preventDefault()
    try {
      await axios.post('/user/login', {email, password});

      localStorage.setItem('firstLogin', true);

      window.location.href='/'
    } catch (error) {
      alert(error.response.data.msg)
    }
  }

  return (
    <div className="login">
      <form autoComplete="off" onSubmit={loginSubmit}>
        <h3>login</h3>
        <input
          type="email"
          placeholder="type your email"
          required
          className="box"
          value={email}
          onChange={(e) =>setEmail(e.target.value)}
        />
        <input
          type="password"
          id="inputPassword"
          placeholder="type your password"
          className="box"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="show">
          <input type="checkbox" id="see-me" onClick={showPassword} />
          <label htmlFor="see-me"> show the password</label>
        </div>
        <button type="submit" className="btn">
          login
        </button>
        <p>don't have an account yet?</p>
        <Link to="/register" className="btn link">
          register now
        </Link>
      </form>
    </div>
  );
};

export default Login;
