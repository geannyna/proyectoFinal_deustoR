import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const URI = 'http://localhost:3001/api/patients/';
const ComponentCreate = () => {

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [dni, setDni] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const navigate = useNavigate();

  // guardar
  const save = async (e) => {
    e.preventDefault();
    try {
      await axios.post(URI, { name, lastName, phone, dni, address, city, postalCode });
      navigate('/');
      setFormMessage('Nuevo paciente añadido con éxito');
    } catch (error) {
     
      if (error.response) {
        // El servidor respondió con un código de error
        console.log('Error:', error.response.data.message);
        // Puedes mostrar un mensaje de error al usuario
        setFormMessage('Error al crear el paciente: ' + error.response.data.message);
      } else if (error.request) {
        // La solicitud fue realizada pero no se recibió respuesta
        console.error('No se recibió respuesta del servidor');
      } else {
        // Hubo un error al configurar o realizar la solicitud
        console.error('Error al realizar la solicitud:', error.message);
      }
    }
  };
  

  const [formMessage, setFormMessage] = useState('');
 
  

  return (
    <div className='form'>
      <section>{formMessage && <p className='message-ok'>{formMessage}</p>}</section>
      <h2 className='title'>Crear Paciente</h2>
      <form onSubmit={save}>
        <table className='form-add'>
          <tbody>
            <tr>
              <td><label className='form-label'>DNI*:</label></td>
              <td><input type="text" name="dni" value={dni} onChange={ (e) => setDni(e.target.value)} required /></td>
            </tr>
            <tr>
              <td><label className='form-label'>Nombre*:</label></td>
              <td><input type="text" name="name" value={name} onChange={ (e) => setName(e.target.value)} required /></td>
            </tr>
            <tr>
              <td><label className='form-label'>Apellidos*:</label></td>
              <td ><input type="text" name="lastName" value={lastName} onChange={ (e) => setLastName(e.target.value)} required /></td>
            </tr>
            <tr>
              <td><label className='form-label'>Dirección:</label></td>
              <td><input type="text" name="address" value={address} onChange={ (e) => setAddress(e.target.value)} required /></td>
            </tr>
            <tr>
              <td><label className='form-label'>Localidad:</label></td>
              <td><input type="text" name="address" value={city} onChange={ (e) => setCity(e.target.value)} required /></td>
            </tr>
            <tr>
              <td><label className='form-label'> Código postal:</label></td>
              <td><input type="text" name="address" value={postalCode} onChange={ (e) => setPostalCode(e.target.value)} required /></td>
            </tr>
            <tr>
              <td><label className='form-label'> Teléfono*:</label></td>
              <td><input type="text" name="address" value={phone} onChange={ (e) => setPhone(e.target.value)} required /></td>
            </tr>
          </tbody>
        </table>
        <div className='update-container'>
          <button className="button" type="submit">
            Crear
          </button>
          <Link to="/">
            <button className="button-back">
              Cancelar
            </button>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default ComponentCreate;