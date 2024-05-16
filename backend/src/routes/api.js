const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Crear un nuevo paciente
router.post('/api/patients', patientController.createPatient);

// Obtener todos los pacientes
router.get('/api/patients', patientController.getAllPatients);

// Obtener un paciente por DNI
router.get('/api/patients/:dni', patientController.getPatientByDNI);

// Actualizar un paciente por DNI
router.put('/api/patients/edit/:dni', patientController.updatePatientByDNI);

// Borrar un paciente por DNI
router.delete('/api/patients/:dni', patientController.deletePatientByDNI);

module.exports = router;
