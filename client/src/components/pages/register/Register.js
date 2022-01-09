import React from 'react';
import './register.scss';
import {Link} from 'react-router-dom';

const Register = () => {
    return (
        <div className='register'>
            <form>
                <h3>register now</h3>
                <input type="text" placeholder="enter your name" className="box"/>
                <input type="email" placeholder="enter your email" className="box"/>
                <input type="password" placeholder="enter your password" className="box"/>
                <button  type='submit' className='btn'>
                    register now
                </button>
                <p>already have an account?</p>
                <Link to='/login' className="btn link">login now</Link>
            </form>
        </div>
    )
}

export default Register;
