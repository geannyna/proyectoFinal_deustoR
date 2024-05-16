import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrash, FaInfoCircle } from 'react-icons/fa';

const URI = 'http://localhost:3001/api/patients';

const ComponentShow = () => {
  const [patients, setPatient] = useState([]);
  const [searchDNI, setSearchDNI] = useState('');

  useEffect(() => {
    getPatient();
  }, []);

  const getPatient = async () => {
    try {
      const res = await axios.get(URI);
      setPatient(res.data.patients);
    } catch (error) {
      console.log('No se han encontrado datos.', error);
    }
  }

  const deletePatient = async (dni) => {
    try {
      await axios.delete(`${URI}/${dni}`);
      const remainingPatients = patients.filter(patient => patient.dni !== dni);
      setPatient(remainingPatients);
    } catch (error) {
      console.log('Error en show', error);
    }
  }

  const handleSearchChange = (e) => {
    setSearchDNI(e.target.value);
  };

  const filteredPatients = patients ? patients.filter(patient => {
    return typeof patient.dni === 'string' && patient.dni.toLowerCase().includes(searchDNI.toLowerCase());
  }) : [];

  return (
    <div className='form container-fluid'>
      <div className='row'>
        <div className='col-12 d-flex justify-content-between'>
          <input
            className='buscar'
            type="text"
            placeholder=" Buscar por DNI..."
            value={searchDNI}
            onChange={handleSearchChange}
          />
          <Link to={`/create`} className='button'>Crear</Link>
        </div>
        <div className='d-flex justify-content-center mt-3'>
          <table className='table-show'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>DNI</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <tr key={patient.dni}>
                    <td>{patient.name}</td>
                    <td>{patient.lastName}</td>
                    <td>{patient.dni}</td>
                    <td>
                      <Link to={`/edit/${patient.dni}`}>
                        <FaEdit className='update-icon' title="Editar" />
                      </Link>
                      <Link to={`/view/${patient.dni}`}>
                        <FaInfoCircle className="details-icon" title="Info" />
                      </Link>
                      <Link to="/" onClick={() => deletePatient(patient.dni)} className="details-link">
                        <FaTrash className='delete-icon' title="Borrar" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='4' className='text-center'>No se encontraron pacientes</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComponentShow;
