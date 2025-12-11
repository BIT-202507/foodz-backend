const authorizationUser = ( req, res, next ) => {
    console.log( 'Hola soy el Middleware de Autorizacion' );

    next();
}


export default authorizationUser;