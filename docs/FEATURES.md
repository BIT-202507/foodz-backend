# Funcionalidades y Roadmap

## Funcionalidades Desarrolladas

### Users
- [X] Registrar usuario
- [X] Obtener el listado de usuarios
- [X] Obtener un usuario por su ID
- [ ] Actualizar un usuario por su ID
- [ ] Eliminar un usuario por su ID
- [ ] **Address Book**: Permitir múltiples direcciones de envío.
- [ ] **Account Verification**: Sistema de verificación de email real.
- [ ] **Password Recovery**: Flujo para restablecer contraseñas.
- [ ] **Profile Image**: Avatar de usuario.

### Auth
- [X] Registrar usuario (Sign Up)
- [X] Login de usuario
- [X] Renovación de token (Revalidate)

### Products
- [X] Crear producto
- [X] Obtener todos los productos (con filtros: category, type, status, search)
- [X] Obtener un producto por ID
- [X] Actualizar producto
- [X] Eliminar producto (Soft Delete)
- [X] Gestionar información nutricional
- [X] Gestionar ingredientes
- [ ] **Inventory/Stock**: Control de cantidades disponibles.
- [ ] **Reviews & Ratings**: Calificaciones y comentarios.
- [ ] **Favorites/Wishlist**: Lista de deseos.
- [ ] **Variants**: Soporte para variantes (tamaños, precios).

### Categories
- [X] Crear categoría (con autocalculo de nivel)
- [X] Obtener todas las categorías (filtros: level, parent_id, is_active, search)
- [X] Obtener categoría por ID
- [X] Actualizar categoría
- [ ] Eliminar categoría
- [ ] **Slug**: Identificador amigable para URLs.
- [ ] **Category Image**: Imagen representativa.

### Units
- [X] Crear unidad
- [X] Obtener todas las unidades
- [X] Obtener unidad por ID
- [X] Actualizar unidad
- [X] Eliminar unidad

### Unit Types
- [X] Registrar tipos de unidad
- [X] Obtener todos los tipos de unidad
- [X] Obtener tipo de unidad por ID
- [X] Actualizar tipo de unidad
- [X] Eliminar tipo de unidad

## Roadmap Futuro

### Shopping Cart
- [ ] Persistencia del carrito de compras.

### Orders (Pedidos)
- [ ] Modelo central del negocio (Historial, Estados).
- [ ] Integración de cálculo de costos de envío.

### Payments
- [ ] Integración con pasarelas de pago.
- [ ] Registro de transacciones.

### Memberships (Membresías)
- [ ] Modelado de planes de suscripción.
- [ ] Lógica para descuentos automáticos.
