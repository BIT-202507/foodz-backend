## Consultas que podemos realizar para obtener todos los productos

### Obtener todos los productos (Sin filtros)
```http
GET /api/v1/products
```

### Obtener todos los productos (Con filtros)
1. **Por Categoría:** (Asumiendo que envías el ID de la categoría)
```http
GET /api/v1/products?category=ID_CATEGORIA
```

2. **Por Tipo:** (Asumiendo que envías el ID del tipo)
```http
GET /api/v1/products?type=general
```
(O el tipo que tengas definido: 'prepared', 'packaged', etc.)

3. **Por Estado:** (Asumiendo que envías el ID del estado)
```http
GET /api/v1/products?status=active
```

4. **Búsqueda por nombre:** (Asumiendo que envías el texto de busqueda). Búsqueda parcial e insensible a mayúsculas/minúsculas
```http
GET /api/v1/products?search=ensalada
```

### Combinaciones Comunes

1. Buscar dentro de una categoría específica:
```http:
GET /api/v1/products?category=ID_CATEGORIA&search=pollo
```

2. Listar productos activos de cierto tipo:
```http
GET /api/v1/products?status=active&type=prepared
```

3. Filtrar por categoría y estado (Asumiendo que envías el ID de la categoría):
```http
GET /api/v1/products?category=ID_CATEGORIA&status=active
```

### Combinación Completa (Todos los filtros)
Para una búsqueda muy específica:

```http
GET /api/v1/products?category=ID_CATEGORIA&type=prepared&status=active&search=pollo
```