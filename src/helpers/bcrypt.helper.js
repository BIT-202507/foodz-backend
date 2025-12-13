import bcrypt from 'bcrypt';


const encryptedPassword = (originalPassword) => {
    try {
        // Paso 1: Generar una cadena aleatoria para agregar complejidad a la generacion de la encriptacion de la contrasenia
        const salt = bcrypt.genSaltSync(9);

        // Paso 2: Encriptar la contrasenia (usa salt mezclar este con password original)
        const hashPassword = bcrypt.hashSync(
            originalPassword,   // Password Original (123456789)
            salt                // Cadena aleatoria (Salt)
        );

        // Paso 3: Retornamos el password encriptado
        return hashPassword;
    } catch (error) {
        console.error(error);
        return null;
    }

}

const validatePassword = (originalPassword, hashPassword) => {
    try {
        const isValid = bcrypt.compareSync(
            originalPassword,  // Password Original (123456789)
            hashPassword       // Password Encriptado (viene de la base de datos)
        );

        return isValid;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export {
    encryptedPassword,
    validatePassword
}
