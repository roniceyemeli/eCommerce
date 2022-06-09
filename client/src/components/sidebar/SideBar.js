import React, { Fragment, useContext } from 'react';
import './sideBar.scss';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import axios from 'axios';

const SideBar = ({ openMenu, setOpenMenu }) => {
	const state = useContext(GlobalState);
	const [ isLogged ] = state.userApi.isLogged;
	const [ isAdmin ] = state.userApi.isAdmin;

	const closeMenu = () => {
		setOpenMenu(!openMenu);
	};
	const adminRoutes = () => {
		return (
			<Fragment>
				<Link to="/addProduct" onClick={closeMenu}>
					<i className="fas fa-angle-right" />add products
				</Link>
				<Link to="/category" onClick={closeMenu}>
					<i className="fas fa-angle-right" />categories
				</Link>
			</Fragment>
		);
	};

	const logoutUser = async () => {
		try {
			await axios.get('/user/logout');
			localStorage.clear();
			window.location.href = '/';
		} catch (error) {
			alert(error.response.data.msg);
		}
	};

	const loggedRoutes = () => {
		return (
			<Fragment>
				<Link to="/" onClick={closeMenu}>
					<i className="fas fa-angle-right" />shop
				</Link>

				<Link to="/cart" onClick={closeMenu}>
					<i className="fas fa-angle-right" />cart
				</Link>

				<Link to="/" onClick={logoutUser}>
					<i className="fas fa-angle-right" />Logout
				</Link>

				<Link to="/contact" onClick={closeMenu}>
					<i className="fas fa-angle-right" />contact
				</Link>
			</Fragment>
		);
	};

	return (
		<div className={'side-bar ' + (openMenu && 'side-bar active')}>
			<div id='container'>
      <div id="close-side-bar" onClick={() => setOpenMenu(!openMenu)}>
				<i className="fas fa-times" />
			</div>
			<div className="user">
				<i className="fas fa-store" />
				<h3>{isAdmin ? 'admin' : 'welcome'}</h3>
				<Link to="#">{isLogged ? 'Dashboard' : 'please sign in'}</Link>
			</div>
			<div className="navbar">
				{isAdmin && adminRoutes()}
				{isLogged ? (
					loggedRoutes()
				) : (
					<Fragment>
						<Link to="/" onClick={closeMenu}>
							<i className="fas fa-angle-right" />shop
						</Link>
						<Link to="/login" onClick={closeMenu}>
							<i className="fas fa-angle-right" />login
						</Link>
						<Link to="/register" onClick={closeMenu}>
							<i className="fas fa-angle-right" />register
						</Link>
						<Link to="/contact" onClick={closeMenu}>
							<i className="fas fa-angle-right" />contact
						</Link>
					</Fragment>
				)}
			</div>
			<div className="copyright">
				<p>&copy;roniceyemeli {new Date().getFullYear()}</p>
			</div>
      </div>
		</div>
	);
};

export default SideBar;
