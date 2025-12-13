import bcrypt from 'bcrypt';


const encryptedPassword = (originalPassword) => {
    // Paso 1: Generar una cadena aleatoria para agregar complejidad a la generacion de la encriptacion de la contrasenia
    const salt = bcrypt.genSaltSync(9);

    // Paso 2: Encriptar la contrasenia (usa salt mezclar este con password original)
    const hashPassword = bcrypt.hashSync(
        originalPassword,   // Password Original (123456789)
        salt                // Cadena aleatoria (Salt)
    );

    // Paso 3: Retornamos el password encriptado
    return hashPassword;
}


export {
    encryptedPassword
}
