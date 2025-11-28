// Importando la dependencia 'express' usando CommonJS
import express from 'express';

const router = express.Router();

// Definicion de las rutas (EndPoints)
router.get( '/', ( req, res ) => {
    res.json({ msg: 'Obtiene todos los usuarios' });
} );

router.post( '/', ( req, res ) => {
    res.json({ msg: 'Crear un usuario' });
} );

router.put( '/', ( req, res ) => {
    res.json({ msg: 'Actualiza todos las propiedades del usuario' });
} );

router.patch( '/', ( req, res ) => {
    res.json({ msg: 'Actualiza parcialmente 1 o todas las propiedades del usuario' });
} );

router.delete( '/', ( req, res ) => {
    res.json({ msg: 'Elimina un usuario' });
} );


// Exportando el router usando CommonJS
export default router;