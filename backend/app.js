const express = require('express');
const cors = require('cors');
const path = require('path');
const patientsRouter = require('./src/routes/patientApi');
const swaggerUi = require('swagger-ui-express');
const swaggerConfig = require('./swagger');
const swaggerSpec = swaggerConfig; // Usar la configuración de Swagger directamente
const app = express();
const port = 3001; // Cambiar el puerto si es necesario

// Configurar middleware CORS antes de definir las rutas
app.use(cors());

// Middleware para manejar datos en formato JSON
app.use(express.json());

// Rutas de la API
app.use('/api/patients', patientsRouter);
app.use('/patients', patientsRouter);

// Ruta para la documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


//  Middleware para servir el archivo HTML principal de React
app.use(express.static(path.join(__dirname, '../frontend/build')));


// Ruta para manejar cualquier otra ruta no definida
app.use('/*', (req, res) => {
  res.status(404).json({
    message: 'Route or params not found',
  });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
