import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

const Navbar = ({ title, icon }) => {
  return (
    <header className="mb-4">
      <div className="px-3 py-3 bg-primary text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
              <h1 className="h3 mb-0"><i className={icon} /><span className="ps-2">{title}</span></h1>
            </a>

            <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
              {/* <li><Link to="/" className="nav-link text-secondary">Home</Link></li> */}
              <li><Link to="/" className="nav-link text-white">Home</Link></li>
              <li><Link to="/about" className="nav-link text-white">About</Link></li>
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