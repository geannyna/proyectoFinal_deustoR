
const PatientModel = require('../models/patientModel');

// Array para almacenar pacientes (sustituir por base de datos en un entorno real)
const patients = [];

// Obtener todos los pacientes
const getAllPatients = (req, res) => {
  res.json({ message: 'Welcome to the Patients API', patients });
};

// Obtener un paciente por DNI
const getPatientByDni = (req, res) => {
  const { dni } = req.params;
  const patient = patients.find(patient => patient.dni === dni);

  if (patient) {
    res.json({ patient });
  } else {
    res.status(404).json({ message: 'Paciente no encontrado' });
  }
};

// Crear un nuevo paciente
const createPatient = (req, res) => {
  const {
    dni, name, lastName, address, city, postalCode, phone
  } = req.body;

  // Crear instancia del modelo de paciente y validar
  const newPatient = new PatientModel({
    dni, name, lastName, address, city, postalCode, phone
  });

  if (!PatientModel.validatePatient(newPatient)) {
    return res.status(400).json({ message: 'Datos del paciente no válidos' });
  }

  // Almacenar paciente
  patients.push(newPatient);
  res.status(200).json({ message: 'Paciente creado correctamente', patient: newPatient });
};

// Actualizar un paciente por DNI
const updatePatientByDni = (req, res) => {
  const { dni } = req.params;
  const {
    name, lastName, address, city, postalCode, phone
  } = req.body;

  // Encontrar el paciente en el array
  const patientToUpdate = patients.find(patient => patient.dni === dni);

  if (!patientToUpdate) {
    return res.status(404).json({ message: 'Paciente no encontrado' });
  }

  // Actualizar propiedades del paciente
  patientToUpdate.name = name;
  patientToUpdate.lastName = lastName;
  patientToUpdate.address = address;
  patientToUpdate.city = city;
  patientToUpdate.postalCode = postalCode;
  patientToUpdate.phone = phone;

  res.status(200).json({ message: 'Paciente actualizado correctamente', patient: patientToUpdate });
};

// Borrar un paciente por DNI
const deletePatientByDni = (req, res) => {
  const { dni } = req.params;

  const index = patients.findIndex(patient => patient.dni === dni);

  if (index === -1) {
    return res.status(404).json({ message: 'Paciente no encontrado' });
  }

  const deletedPatient = patients.splice(index, 1)[0];

  // Después de borrar, obtener la lista actualizada de pacientes
  const updatedPatientsList = patients;

  res.status(200).json({
    message: 'Paciente eliminado correctamente',
    deletedPatient,
    updatedPatientsList
  });
};

module.exports = {
  patients,
  createPatient,
  getAllPatients,
  getPatientByDni,
  updatePatientByDni,
  deletePatientByDni
};
