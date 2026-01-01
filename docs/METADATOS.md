# METADATO
`index` es una Opción de Configuración (o metadato) para la base de datos.

Es una Instrucción de Infraestructura. Le estás diciendo al motor de la base de datos (MongoDB): "Oye, cuando guardes estos datos, por favor mantenlos organizados en una estructura especial aparte para que pueda encontrarlos rápido después".

# REGLAS
Son condiciones que los datos deben cumplir para poder guardarse. Si no se cumplen, Mongoose lanza un error y detiene el proceso.

Ejemplo: `required: true`, `min: 0`, `enum: ['a', 'b']`.

**¿`index` encaja aquí?** No, porque (salvo que sea `unique`) poner `index: true` no te impide guardar ningún dato, sea cual sea.

# MODIFICADORES (Transformaciones)
Son instrucciones que alteran o cambian el dato antes de guardarlo.

Ejemplo: `trim: true` (quita espacios), `lowercase: true` (pasa a minúsculas).

**¿`index` encaja aquí?** No, porque el índice no toca ni cambia el valor de tu dato; tu dato entra y sale intacto.

# Conclusiones
Resumen para tu documentación:
- **Regla**: "El dato debe ser así".
- **Modificador**: "Cambia el dato para que sea así".
- **Index**: "Organiza el dato de esta forma para encontrarlo rápido".
Digamos que es una característica de Nivel de Arquitectura/Performance, no de Nivel de Lógica de Negocio.

# Otros Metadatos
¡Claro! Sí existen otros, y siguen la misma lógica: son instrucciones para Mongoose o MongoDB sobre cómo tratar ese campo, no sobre qué valor debe tener.

Aquí tienes los más útiles para tu "cheat sheet" de documentación:

## `select` (Visibilidad)
Le dice a Mongoose si debe incluir este campo por defecto cuando haces una consulta (`find`).

- Uso común: `select: false` en el campo `password`.
- Para qué sirve: Para seguridad y rendimiento. Evita que envíes por accidente la contraseña al frontend. Si la necesitas, tienes que pedirla explícitamente `(.select('+password'))`.

## `immutable` (Inmutabilidad) 🔒
Le dice a Mongoose que este campo nunca debe cambiar una vez creado.

- Uso común: `immutable: true` en campos como `createdAt` o el `sku` de un producto que no debería cambiar.
- Para qué sirve: Protege la integridad de datos críticos. Si intentas actualizarlo, Mongoose ignorará el cambio silenciosamente.

## `ref` (Referencia) 🔗
Le dice a Mongoose que el `ObjectId` que guardas aquí pertenece a otra colección.

- Uso común: `ref: 'Category'` en el campo category.
- Para qué sirve: Permite usar `.populate('category')` para que Mongoose vaya automáticamente a la otra colección y traiga los datos "pegados". Es la base de las relaciones.

## expires (TTL - Time To Live) ⏳
Le dice a MongoDB que elimine el documento automáticamente después de cierto tiempo. Solo funciona en fechas (`Date`).

- Uso común: `expires: '1h'` en tokens de sesión o códigos de verificación temporal.
- Para qué sirve: Limpieza automática. "Crea este dato, y bórralo en 1 hora".

## sparse (Índice disperso) 🕳️
Es un "compañero" de `unique`. Le dice al índice que ignore los documentos donde este campo no existe.

- Uso común: `sparse: true` junto con `unique: true`.
- Para qué sirve: Imagina que tienes un campo `email_secundario` que es único, pero no todos los usuarios lo tienen. Sin `sparse`, MongoDB daría error al intentar guardar dos usuarios sin email secundario (porque `null == null`). Con `sparse`, ignora los nulos y solo chequea unicidad si el dato existe.

# GENERADORES (Defaults)
No son reglas (porque no prohíben nada), no son modificadores (porque no transforman lo que tú envías) y no son metadatos (porque afectan al valor del documento).

`default`: Sirve para crear información cuando el usuario no la envía.
Ejemplo: `default: Date.now` o `default: 'active'`.

# GETTERS & SETTERS (Accesores y Modificadores)

Técnicamente `trim` y `lowercase` son "Setters prefabricados" (modificadores simples), pero Mongoose te permite crear los tuyos propios para lógica compleja.

- `set` (Setter): Función que se ejecuta **antes** de guardar.
Ejemplo: Una función que reciba "100.5678" y lo redondee a "100.57" antes de guardarlo.
- `get` (Getter): Función que se ejecuta **al leer el dato de la base de datos** (cuando haces un `.find()`).
Ejemplo: Guardas un precio en centavos (2500) pero quieres que al leerlo te devuelva (25.00).

# ALIAS (Sobrenombres)
`alias`: Permite llamar a una propiedad con otro nombre.
Ejemplo: En la base de datos se llama n (para ahorrar espacio), pero en tu código lo usas como name.


**NOTA:** Esas 3 categorías (Reglas, Modificadores, Metadatos) son un modelo mental excelente que cubre el 90% de lo que usarás. Sin embargo, para ser técnicamente precisos