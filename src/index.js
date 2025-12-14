import express from 'express';

import dbConnection from './config/mongo.config.js';
import usersRoute from './routes/users.route.js';
import productsRoute from './routes/products.route.js';
import authRoute from './routes/auth.route.js';

const app = express();                  // Invocando core Express
const PORT = process.env.PORT || 3030;  // Definiendo el puerto de escucha por defecto el puerto 3030 si no puede leer la variable de entorno

dbConnection();     // Ejecuta la conexion a la base de datos

app.get('/health', (req, res) => {
    res.json({
        path: '/health',
        msg: 'Welcome to FoodZ'
    });
});

// Middlewares Express separar las rutas por entidad
app.use(express.json());    // Middleware para parsear JSON

app.use('/api/v1/users', usersRoute);
app.use('/api/v1/products', productsRoute);
app.use('/api/v1/auth', authRoute);


// Lanzando el servidor web usando Express
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} :)`);
});