import { useState } from "react";
import "./register.scss";
import { Link} from "react-router-dom";
import axios from "axios";


const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");


        const registerSubmit = async(e) =>{
          e.preventDefault()
          try {
        
              await axios.post('/user/register', {name, email, password})

              localStorage.setItem('firstLogin', true);
              
              window.location.href='/'
          } catch (error) {
              alert(error.response.data.msg)
          }
      }

      const verify = () => {
        if (password === password2){
          document.getElementById('message').style.color = 'green';
          document.getElementById('message').innerHTML = ' matching';
        } 
        else {
          document.getElementById('message').style.color = 'red';
          document.getElementById('message').innerHTML = 'not matching';
        }
      }


  return (

    <div className="register">
      <form autoComplete="off" onSubmit={registerSubmit}>
        <h3>register now</h3>
        <input
          type="text"
          placeholder="enter your user userName"
          className="box"
          required
          value={name}
          onChange={(e) =>setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="enter your email"
          className="box"
          required
          value={email}
          onChange={(e) =>setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="enter your password"
          className="box"
          required
          onKeyUp={verify}
          value={password}
          onChange={(e) =>setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="confirm your password"
          className="box"
          required
          onKeyUp={verify}
          id='confirm_password'
          value={password2}
          onChange={(e) =>setPassword2(e.target.value)}
        />
        <span id='message'></span>
        <button type="submit" className="btn">
          register now
        </button>
        <p>already have an account?</p>
        <Link to="/login" className="btn link">
          login now
        </Link>
      </form>
    </div>
  );
};

export default Register;
