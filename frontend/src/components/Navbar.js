import React from 'react';
import { Link } from 'react-router-dom';
//import logo from '../img/logo.png'; 

const NavbarComponent = () => {
  return (
    <nav className="navbar navbar-expand-sm justify-content-between mi-nav">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          {/* <img src={logo} alt="Dental Time" className="logo" /> */}
          <span className="clinic-name">Dental Time</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className='nav-link fw-semibold' to="/">Contacto</Link>
              </li>
              <li className="nav-item me-3">
                <Link className='nav-link fw-semibold' to="/">Sobre nosotros</Link>
              </li>
              <li className="nav-item me-3">
                <Link className='nav-link fw-semibold' to="/">Servicios</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
