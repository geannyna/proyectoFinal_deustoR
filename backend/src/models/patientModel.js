class PatientModel {
  constructor(dni, name, lastName, address, city, postalCode, phone) {
    this.dni = dni;
    this.name = name;
    this.lastName = lastName;
    this.address = address;
    this.city = city;
    this.postalCode = postalCode;
    this.phone = phone;
  }
  static validatePatient(patient) {
    if (!patient.dni || !patient.name || !patient.lastName || !patient.address || !patient.city || !patient.postalCode || !patient.phone) {
      return false;
    }
    return true;
  }
}

const Patient = require('../models/patientModel');
const { patients } = require('../controllers/patientController');

const createPatient = (req, res) => {
  const {
    dni, name, lastName, address, city, postalCode, phone
  } = req.body;

  // Validar datos usando el modelo
  const newPatient = new Patient({
    dni, name, lastName, address, city, postalCode, phone
  });

  if (!newPatient.validatePatient()) {
    return res.status(400).json({ message: 'Datos del paciente no válidos' });
  }

  // Verificar si el DNI del paciente ya existe
  const existingPatient = patients.find(patient => patient.dni === newPatient.dni);
  if (existingPatient) {
    return res.status(400).json({ message: 'El paciente ya existe' });
  }

  // Almacenar paciente
  patients.push(newPatient);
  res.status(200).json({ message: 'Paciente creado correctamente', patient: newPatient });
};

module.exports = { PatientModel, createPatient };
