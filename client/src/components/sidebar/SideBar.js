import React from 'react';
import './sideBar.scss';
import { Link } from 'react-router-dom';

const SideBar = ({openMenu, setOpenMenu}) => {
    return (
        <div className="side-bar">

            <div id="close-side-bar" className="fas fa-times" onClick={()=> setOpenMenu(!openMenu)}></div>

            <div className="user">
                <i className="fas fa-store"></i>
                <h3>welcome</h3>
                <Link to="#">login</Link>
            </div>

            <nav className='navbar'>
                <Link to='#'>shop</Link>
                <Link to='/login'>login</Link>
                <Link to='/register'>register</Link>
                <Link to='#'>cart</Link>
                <Link to='#'>contact</Link>
            </nav>
        </div>
    )
}

export default SideBar
