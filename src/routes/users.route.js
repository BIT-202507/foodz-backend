// Importando la dependencia 'express' usando CommonJS
import express from 'express';

const router = express.Router();

// Definicion de las rutas (EndPoints)
router.post( '/', ( req, res ) => {
    const data = req.body;         // Extraer el cuerpo de la peticion

    // Mostrar en consola el cuerpo de la peticion
    console.log( data );           // Imprimir en consola el cuerpo de la peticion

    // Responder al cliente
    res.json({ 
        msg: 'Crear un usuario',
        // data: data,             // Forma tradicional   
        data                       // ECMAScript 2015   
    });
} );


// Exportando el router usando CommonJS
export default router;