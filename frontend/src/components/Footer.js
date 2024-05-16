import React from 'react';
import { Link } from 'react-router-dom';

const FooterComponent = () => {

  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className='row'>
          <div className='col-md-2 col-4 mb-3'>
            <h5>Servicios</h5>
            <ul className="list-unstyled text-small flex-column">
              <li className='nav-item mb-2'>
                <Link to='/' className='nav-link p-0 text-light'>Privacidad y cookies</Link>
              </li>
              <li className='nav-item mb-2'>
                <Link to='/' className='nav-link p-0 text-light'>Contacto</Link>
              </li>
              <li className='nav-item mb-2'>
                <Link to='/' className='nav-link p-0 text-light'>Términos y condiciones</Link>
              </li>
              <li className='nav-item mb-2'>
                <Link to='/' className='nav-link p-0 text-light'>Socios</Link>
              </li>
            </ul>
          </div>
          <div className='col-md-2 col-4 mb-3'>
            <h5>Para pacientes </h5>
            <ul className="list-unstyled text-small flex-column">
              <li className='nav-item mb-2'>
                <Link to='/' className='nav-link p-0 text-light'>Especialistas</Link>
              </li>
              <li className='nav-item mb-2'>
                <Link to='/' className='nav-link p-0 text-light'>Seguro medico</Link>
              </li>
              <li className='nav-item mb-2'>
                <Link to='/' className='nav-link p-0 text-light'>Pregunta a un especialista</Link>
              </li>
              <li className='nav-item mb-2'>
                <Link to='/' className='nav-link p-0 text-light'>Preguntas frecuentes</Link>
              </li>
              <li className='nav-item mb-2'>
                <Link to='/' className='nav-link p-0 text-light'>Blog para pacientes</Link>
              </li>
              <li className='nav-item mb-2'>
                <Link to='/' className='nav-link p-0 text-light'>Clinicas</Link>
              </li>
            </ul>
          </div>
          <div className='col-md-2 col-4 mb-3'>
            <h5>Tratamientos</h5>
            <ul className="list-unstyled text-small flex-column">
              <li className='nav-item mb-2'>
                <Link to='/' className='nav-link p-0 text-light'>Blanqueamiento</Link>
              </li>
              <li className='nav-item mb-2'>
                <Link to='/' className='nav-link p-0 text-light'>Implantes dentales</Link>
              </li>
              <li className='nav-item mb-2'>
                <Link to='/' className='nav-link p-0 text-light'>Ortodoncias</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-6">
            <form>
              <h5>Subscríbete a nuestro boletín informativo</h5>
              <div className="d-flex flex-column w-100 gap-2">
                <label htmlFor="newsletter1"></label>
                <input id="newsletter1" type="text" className="form-control h-25" placeholder="Email..." />
                <button className='button-sub' type="button">Suscríbete</button>
              </div>
            </form>
          </div>
            <span className="clinic-name">Dental Time </span>
          <div className="col-12 mt-3 text-center">
            <span className='mt-2'> www.dentalTime.es &copy; {new Date().getFullYear()}  - Encuentra tu especialista y pide cita.</span>
            <ul className="d-flex justify-content-center text-light mt-3">
              <li className="ms-3"><Link to="/">
                <img src="/img/whatssapp.png" alt="WhatsApp" /></Link>
              </li>
              <li className="ms-3"><Link to="/">
                <img src={'/img/facebook.png'} alt="Facebook" /></Link>
              </li>
              <li className="ms-3"><Link to="/">
                <img src={'/img/telegram.png'} alt="Telegram" /></Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
