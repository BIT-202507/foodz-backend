const authorizationUser = (req, res, next) => {
    // TODO: Implementar solucion para filtrar permisos por rol
    console.log('Middleware de autorizacion');
    next();
}


export {
    authorizationUser
}