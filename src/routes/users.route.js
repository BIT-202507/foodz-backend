// Importando la dependencia 'express' usando CommonJS
const express  = require( 'express' );

const router = express.Router();

// Definicion de las rutas (EndPoints)
router.get( '/', ( req, res ) => {
    // lista en una constante
    const users = [
        { name: 'Ramiro', age: 23 },
        { name: 'Sofanor', age: 48 },
    ];

    res.json( users );
} );


// Exportando el router usando CommonJS
module.exports = router;