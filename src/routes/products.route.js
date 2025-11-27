const express  = require( 'express' );
const router = express.Router();

// Definicion de las rutas de productos
router.get( '/', function( req, res ) {
    // paso la lista directamente al objeto de respuesta
    res.json([
        { name: 'iPhone 17 Pro Max', price: 3000 }
    ]);
} );


module.exports = router;