import bcrypt from 'bcrypt';

// Encriptar la contrasenia
const encryptedPassword = ( passwordUser ) => {
    const salt = bcrypt.genSaltSync(9);      // Generar un fragmento o cadena aleatoria

    console.log( salt );

    // Combinar la clave del usuario, con el salt
    const hashPassword = bcrypt.hashSync(
        passwordUser,       // La contrasenia del usuario sin encriptar (123456789)
        salt                // Cadena que se genera aleatoriamente
    );

    return hashPassword;    // Devuelve la contrasenia encriptada
}

// Verificar la contrasenia
const verifyEncriptedPassword = () => {}


export {
    encryptedPassword,
    verifyEncriptedPassword
}