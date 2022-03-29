import React, { useContext } from 'react';

import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import AuthContext from '../../context/auth/AuthContext';

import ContactContext from '../../context/contact/ContactContext';

import logo from '../../../src/logo.png';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user } = authContext;

  const contactContext = useContext(ContactContext);

  const { clearContacts } =  contactContext;

  const logoutUser = () => {
    logout();
    clearContacts();
  };

  const authLinks = (
    <>
      <li><span className="nav-link text-white">{user && user.name}</span></li>
      <li><a href="#!" className="nav-link text-white" onClick={logoutUser}>Logout</a></li>
    </>
  );

  const guestLinks = (
    <>
      <li><Link to="/login" className="nav-link text-white">Login</Link></li>
      <li><Link to="/register" className="nav-link text-white">Register</Link></li>
    </>
  );

  return (
    <header className="mb-4">
      <div className="px-3 py-3 bg-primary text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
              <h1 className="h3 mb-0 d-flex"><img src={logo} alt={title} height={30} />{' '}<span className="ps-2">{title}</span></h1>
            </a>

            <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
              {isAuthenticated ? authLinks : guestLinks}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'W3Contacts',
  icon: 'fa fa-address-book-o'
};

export default Navbar;