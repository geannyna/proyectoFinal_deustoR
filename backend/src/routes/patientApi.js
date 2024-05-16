const express = require('express');
const { patients } = require('../controllers/patientController');
const router = express.Router();

// Función de validación de datos de pacientes
function validatePatient(patient) {
  if (!patient.dni || !patient.name || !patient.lastName || !patient.address || !patient.city || !patient.postalCode || !patient.phone) {
    return false;
  }
  return true;
}

// Función para verificar si el DNI ya existe en la lista de pacientes
function isDNIUnique(dni) {
  return !patients.some(patient => patient.dni === dni);
}

/**
 * @swagger
 * components:
 *  schemas:
 *    Patient: 
 *      type: object
 *      properties:
 *        dni:
 *             type: string
 *             description: the patient's dni
 *        name:
 *             type: string
 *             description: the patient's name
 *        lastName: 
 *             type: string
 *             description: the patient's lastName
 *        address: 
 *             type: string
 *             description: the patient's address
 *        city: 
 *             type: string
 *             description: the patient's city
 *        postalCode: 
 *             type: number
 *             description: the patient's postalCode
 *        phone: 
 *             type: number
 *             description: the patient's number
 *      required:
 *        -dni
 *        -name
 *        -lastName
 *        -address
 *        -city
 *        -postalCode
 *        -phone
 *      example:
 *         dni: 099786676B 
 *         name: Juan
 *         lastName: Lopez
 *         address: calle Barraco
 *         city: Barcelona
 *         postalCode: 25503
 *         phone: 617334556
 * 
 */
/**
 * @swagger
 * /api/patients:
 *   post:
 *     summary: Create new patient
 *     description: Create new patient
 *     tags: [Patient]
 *     requestBody:
 *       required: true
 *       description: Objeto JSON que representa el paciente a agregar
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'
 *     responses:
 *       200:
 *         description: Patient created successfully
 */

// ruta POST con validación
router.post('/', (req, res) => {
  const { dni, name, lastName, address, city, postalCode, phone } = req.body;

  if (!validatePatient(req.body)) {
    return res.status(400).json({
      message: 'Missing required fields'
    });
  }
  if (!isDNIUnique(dni)) {
    return res.status(400).json({
      message: 'DNI already exists'
    });
  }

  const newPatient = {
    dni,
    name,
    lastName,
    address,
    city,
    postalCode,
    phone,
  };

  patients.push(newPatient);

  res.status(200).json({
    message: 'Patient created successfully',
    patient: newPatient
  });
});

/**
 * @swagger 
 *   /api/patients:
 *      get:
 *        summary: Return all patients
 *        tags: [Patient]
 *        responses: 
 *          200:
 *            description: Get all patients
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                $ref: '#/components/schemas/Patient'
 *          404:
 *            description: No Patients Found
 */

// get
router.get('/', (req, res) => {
  if (patients.length !== 0) {
    res.status(200).json({
      message: 'Welcome to the Patients List API',
      patients
    });
  } else {
    res.status(404).json({
      message: 'Welcome to the Patients List API',
      patients: "No Patients Found"
    });
  }
});


/**
 * @swagger 
 *   /api/patients/{dni}:
 *      get:
 *        summary: Return patient by dni
 *        tags: [Patient]
 *        parameters:
 *          - in: path
 *            name: dni
 *            required: true
 *            schema: 
 *              type: string
 *            description: the patient DNI
 *        responses: 
 *          200:
 *            description: Get patient by DNI
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Patient'
 *          404:
 *            description: Patient not found
 */

// get by DNI
router.get('/:dni', (req, res) => {
  const patientDNI = req.params.dni;
  const patient = patients.find(patient => patient.dni === patientDNI);

  if (patient) {
    res.status(200).json({
      message: 'Patient found',
      patient
    });
  } else {
    res.status(404).json({
      message: 'Patient not found'
    });
  }
});


/**
 * @swagger
 * /api/patients/{dni}:
 *   put:
 *     summary: Update patient by DNI
 *     tags: [Patient]
 *     parameters:
 *       - in: path
 *         name: dni
 *         schema:
 *           type: string
 *         required: true
 *         description: The patient DNI
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'
 *     responses:
 *       200:
 *         description: Patient updated successfully
 *       400:
 *         description: Missing required fields or DNI param required
 *       404:
 *         description: Patient not found
 */

// Ruta PUT con validación
router.put('/:dni', (req, res) => {
  const { dni } = req.params;
  const updatePatient = req.body;

      // Si se está intentando actualizar el DNI y ya existe en otro paciente, se rechaza la solicitud
      if (updatePatient.dni !== dni && !isDNIUnique(updatePatient.dni)) {
        return res.status(400).json({
          message: 'DNI already exists'
        });
      }
  if (!validatePatient(updatePatient)) {
    return res.status(400).json({
      message: 'Missing required fields'
    });
  }

  const patientIndex = patients.findIndex(el => el.dni === dni);

  if (patientIndex === -1) {
    return res.status(404).json({
      message: `Patient not found with DNI ${dni}`
    });
  }
  
    patients[patientIndex] = { ...patients[patientIndex], ...updatePatient };
  
  res.status(200).json({
    message: 'The patient was updated successfully',
    patient: patients[patientIndex]
  });
});

/**
 * @swagger 
 *   /api/patients/{dni}:
 *      delete:
 *        summary: Delete patient by DNI
 *        tags: [Patient]
 *        parameters:
 *          - in: path
 *            name: dni
 *            required: true
 *            schema: 
 *              type: string
 *            description: The patient DNI
 *        responses: 
 *          200:
 *            description: Patient deleted successfully
 *          404: 
 *            description: Patient not found
 */


// delete
router.delete('/:dni', (req, res) => {
  const { dni } = req.params;
  if (!dni) {
    return res.status(400).json({
      message: "DNI parameter required",
    });
  }

  const patientIndex = patients.findIndex(patient => patient.dni === dni);

  if (patientIndex < 0) {  
    return res.status(404).json({
      message: `There's no patient with the DNI: "${dni}" `
    });
  }

  const deletedPatient = patients.splice(patientIndex, 1)[0];
  res.status(200).json({
    message: 'The patient was deleted successfully',
    deletedPatient: deletedPatient
  });
});

module.exports = router;
