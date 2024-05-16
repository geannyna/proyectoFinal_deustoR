
const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

// Definir la configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Gestionar pacientes',
      version: '1.0.0',
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
 apis: [`${path.join(__dirname, "./src/routes/*.js")}`],  // Rutas donde se encuentran las definiciones de Swagger
  
};

 const swaggerSpec = swaggerJSDoc(swaggerOptions);


 module.exports = swaggerSpec;

// const swaggerSpec = swaggerJSDoc(swaggerOptions);

// module.exports = {
//   serve: swaggerUi.serve,
//   setup: swaggerUi.setup(swaggerSpec),
// }; 
 //--- con eso da error
