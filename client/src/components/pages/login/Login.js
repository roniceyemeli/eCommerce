import "./login.scss";
import {Link} from 'react-router-dom';

const Login = () =>{

  return (
    <div className="login">
        <form>
            <h3>login</h3>
            <input type="email" placeholder="type your email" className='box' />
            <input type="password" placeholder="type your password" className='box' />
            <div className="show">
                <input type="checkbox" id='see-me' />
                <label htmlFor="see-me"> show the password</label>
            </div>
            <button type="submit" className="btn">
                login
            </button>
            <p>don't have an account yet?</p>
            <Link to='/register' className="btn link">register now</Link>
        </form>
    </div>
  );
};

export default Login;
