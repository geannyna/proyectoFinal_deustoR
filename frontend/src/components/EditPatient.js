import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const URI = 'http://localhost:3001/api/patients/';

const ComponentEdit = () => {

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  
  const navigate = useNavigate();
  const { dni: dniParam } = useParams(); 

  // Modificar datos
  const update = async (e) => {
    e.preventDefault();
   
    try {
       await axios.put(`${URI}${dniParam}`, { name, lastName, phone, dni: dniParam, address, city, postalCode });
      navigate('/');
      setFormMessage('Paciente actualizado correctamente.');
    } catch (error) {
      console.log('Error al actualizar paciente:', error);
    }
  }

  useEffect (() => {
    getPatientByDni();
  }, []);

  const getPatientByDni = async () => {
    try {
      const res = await axios.get(`${URI}${dniParam}`);
      setName(res.data.patient.name);
      setLastName(res.data.patient.lastName);
      setPhone(res.data.patient.phone);
      setAddress(res.data.patient.address);
      setCity(res.data.patient.city);
      setPostalCode(res.data.patient.postalCode);
    } catch (error) {
      console.log('Error al obtener paciente por DNI:', error);
    }
  }

  const [formMessage, setFormMessage] = useState('');

  return (
    <div className='form container-fluid'>
      <section>{formMessage && <p className='message-ok'>{formMessage}</p>}</section>
      <h2 className='title'>Editar paciente</h2>
      <form onSubmit={update}>
        <table className='form-add'>
          <tbody>
            <tr>
              <td><label className='form-label'>Nombre*:</label></td>
              <td><input type="text" name="name" value={name} onChange={ (e) => setName(e.target.value)} required /></td>
            </tr>
            <tr>
              <td><label className='form-label'>Apellido*:</label></td>
              <td><input type="text" name="lastName" value={lastName} onChange={ (e) => setLastName(e.target.value)} required /></td>
            </tr>
            <tr>
              <td><label className='form-label'>Dirección:</label></td>
              <td><input type="text" name="address" value={address} onChange={ (e) => setAddress(e.target.value)} required /></td>
            </tr>
            <tr>
              <td><label className='form-label'>Ciudad:</label></td>
              <td><input type="text" name="city" value={city} onChange={ (e) => setCity(e.target.value)} required /></td>
            </tr>
            <tr>
              <td><label className='form-label'>Código Postal:</label></td>
              <td><input type="text" name="postalCode" value={postalCode} onChange={ (e) => setPostalCode(e.target.value)} required /></td>
            </tr>
            <tr>
              <td><label className='form-label'>Teléfono*:</label></td>
              <td><input type="text" name="phone" value={phone} onChange={ (e) => setPhone(e.target.value)} required /></td>
            </tr>
          </tbody>
        </table>
        <div className='update-container'>
          <button className="button" type="submit">
            Editar
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

export default ComponentEdit;
