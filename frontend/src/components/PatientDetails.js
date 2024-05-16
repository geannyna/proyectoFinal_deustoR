import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './PatientDetails.css';


const URI = 'http://localhost:3001/api/patients/';

const PatientDetails = () => {
  const [patient, setPatient] = useState(null);
  const { dni } = useParams();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`${URI}${dni}`);
        setPatient(response.data.patient);
      } catch (error) {
        console.error('Error fetching patient:', error);
      }
    };

    fetchPatient();
  }, [dni]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className='title-det'>Detalles del paciente</h2>
      <div>
        <table className='container-details'>
          <tbody>
            <tr>
              <td><strong>DNI:</strong></td>
              <td>{patient.dni}</td>
            </tr>
            <tr>
              <td><strong>Nombre:</strong></td>
              <td>{patient.name}</td>
            </tr>
            <tr>
              <td><strong>Apellidos:</strong></td>
              <td>{patient.lastName}</td>
            </tr>
            <tr>
              <td><strong>Dirección:</strong></td>
              <td>{patient.address}, {patient.city}, {patient.postalCode}</td>
            </tr>
            <tr>
              <td><strong>Teléfono:</strong></td>
              <td>{patient.phone}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className='button-det'>
        <Link to="/" className="button">
          Volver
        </Link>
      </div>
    </div>
    
  );
};

export default PatientDetails;
