const authorizationUser = (req, res, next) => {
    console.log('Middleware de autorizacion');
    next();
}


export {
    authorizationUser
}