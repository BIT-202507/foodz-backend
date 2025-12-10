import express from 'express';

import dbConnection from './config/mongo.config.js';
import authRoute from './routes/auth.route.js';
import usersRoute from './routes/users.route.js';
import unitTypesRoute from './routes/unit-types.route.js';
import productsRoute from './routes/products.route.js';

const app = express();                  // Invocando core Express
const PORT = 3000;                      // Definiendo el puerto de escucha

import seedUnitTypes from './config/initialSetup.js';

// Ejecuta la conexion a la base de datos y luego el seeding
dbConnection().then(async () => {
    await seedUnitTypes();
});     

app.use(express.json()); // Habilita el parseo de JSON en el body de las peticiones

app.get('/health', (req, res) => {
    res.json({
        path: '/health',
        msg: 'Welcome to FoodZ'
    });
});

// Middlewares Express separar las rutas por entidad
app.use( '/api/v1/auth', authRoute );                // Login/Register/RenewToken
app.use('/api/v1/users', usersRoute);           // CRUD (Users): Autenticado
app.use('/api/v1/unit-types', unitTypesRoute);
app.use('/api/v1/products', productsRoute);


// Lanzando el servidor web usando Express
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} :)`);
});