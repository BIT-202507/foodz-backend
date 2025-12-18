const withoutRole = (req, res, next) => {
    console.log('Middleware que elimina la propiedad role del body');

    // Paso 1: Eliminar la propiedad role del body
    delete req.body.role;

    // Paso 2: Continuar con el siguiente middleware
    next();
}


export {
    withoutRole
}