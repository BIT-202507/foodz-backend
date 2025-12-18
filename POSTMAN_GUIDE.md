# Guía Maestra de Datos para Pruebas (Postman)

Esta guía te permite poblar la base de datos completa con una estructura de restaurante/catering realista. Sigue el orden estricto para mantener la integridad de las relaciones (IDs).

---

## 📅 HITO 1: CONFIGURACIÓN DE UNIDADES
*Antes de crear recetas, necesitamos definir cómo medimos las cosas.*

### 1.1 Obtener Tipos de Unidad (Sistema)
*Endpoint:* `GET /api/unit-types`
> **🛑 ACCIÓN CRÍTICA:** De la respuesta, identifica y copia los `_id` para:
> *   `mass` (Masa) -> Lo llamaremos `ID_TYPE_MASA`
> *   `volume` (Volumen) -> Lo llamaremos `ID_TYPE_VOLUMEN`
> *   `culinary` (Culinaria) -> Lo llamaremos `ID_TYPE_CULINARIA`

### 1.2 Crear Unidades de Medida
*Endpoint:* `POST /api/units`

**A. Gramos (Para ingredientes sólidos)**
```json
{ "name": "Gramo", "symbol": "g", "type": "PEGA_AQUI_ID_TYPE_MASA" }
```
> **Copia el ID:** `ID_UNIT_GRAMO`

**B. Mililitros (Para líquidos)**
```json
{ "name": "Mililitro", "symbol": "ml", "type": "PEGA_AQUI_ID_TYPE_VOLUMEN" }
```
> **Copia el ID:** `ID_UNIT_ML`

**C. Unidad/Pieza (Para conteo, ej: 1 Huevo)**
```json
{ "name": "Unidad", "symbol": "u", "type": "PEGA_AQUI_ID_TYPE_CULINARIA" }
```
> **Copia el ID:** `ID_UNIT_UNIDAD`

---

## 📅 HITO 2: ÁRBOL DE CATEGORÍAS
*Estructura del Menú dividida en secciones claras.*

*Endpoint General:* `POST /api/categories`

### 2.1 Categorías Raíz (Nivel 0)

**A. Menú de Sal**
```json
{ "name": "Menú de Sal", "description": "Platos fuertes y entradas", "level": 0 }
```
> **Copia ID:** `ID_CAT_SAL`

**B. El Bar**
```json
{ "name": "El Bar", "description": "Bebidas de todo tipo", "level": 0 }
```
> **Copia ID:** `ID_CAT_BAR`

### 2.2 Subcategorías (Nivel 1)

**A. Comida Rápida (Hijo de Menú de Sal)**
```json
{ "name": "Rápidas Urbanas", "description": "Burgers y Pizzas", "parent_id": "PEGA_ID_CAT_SAL", "level": 1 }
```
> **Copia ID:** `ID_CAT_RAPIDAS`

**B. Cocina Tradicional (Hijo de Menú de Sal)**
```json
{ "name": "Tradición Local", "description": "Sazasón casera", "parent_id": "PEGA_ID_CAT_SAL", "level": 1 }
```
> **Copia ID:** `ID_CAT_TRADICIONAL`

**C. Vida Sana / Especial (Hijo de Menú de Sal)**
```json
{ "name": "Bienestar & Salud", "description": "Opciones Veganas y Funcionales", "parent_id": "PEGA_ID_CAT_SAL", "level": 1 }
```
> **Copia ID:** `ID_CAT_SANA`

**D. Bebidas Naturales (Hijo de El Bar)**
```json
{ "name": "Frescura Frutal", "description": "Jugos y Batidos", "parent_id": "PEGA_ID_CAT_BAR", "level": 1 }
```
> **Copia ID:** `ID_CAT_FRUTAS`

### 2.3 Subcategorías Específicas (Nivel 2 - Hojas)

**A. Hamburguesas (Hijo de Rápidas)**
```json
{ "name": "Mundo Burger", "parent_id": "PEGA_ID_CAT_RAPIDAS", "level": 2 }
```
> **Copia ID:** `ID_CAT_BURGER`

**B. Platos Típicos (Hijo de Tradicional)**
```json
{ "name": "Platos de la Abuela", "parent_id": "PEGA_ID_CAT_TRADICIONAL", "level": 2 }
```
> **Copia ID:** `ID_CAT_ABUELA`

**C. Bowls Funcionales (Hijo de Vida Sana)**
```json
{ "name": "Bowls de Poder", "parent_id": "PEGA_ID_CAT_SANA", "level": 2 }
```
> **Copia ID:** `ID_CAT_BOWLS`

**D. Jugos (Hijo de Frescura Frutal)**
```json
{ "name": "Jugos del Día", "parent_id": "PEGA_ID_CAT_FRUTAS", "level": 2 }
```
> **Copia ID:** `ID_CAT_JUGOS`

---

## 📅 HITO 3: ALMACÉN DE INSUMOS (INGREDIENTES)
*Registramos la materia prima. Recuerda: `type: "ingredient"`.*

*Endpoint General:* `POST /api/products`

**1. Pan Artesanal**
```json
{ "name": "Pan Brioche", "type": "ingredient", "price": 800, "status": "active" }
```
> **Copia ID:** `ID_ING_PAN`

**2. Carne de Res Molida**
```json
{ "name": "Carne Res Premium", "type": "ingredient", "price": 4000, "status": "active" }
```
> **Copia ID:** `ID_ING_CARNE`

**3. Quinoa Cocida**
```json
{ "name": "Quinoa Blanca", "type": "ingredient", "price": 2000, "status": "active" }
```
> **Copia ID:** `ID_ING_QUINOA`

**4. Vegetales Variados**
```json
{ "name": "Mix de Vegetales", "type": "ingredient", "price": 1500, "status": "active" }
```
> **Copia ID:** `ID_ING_VEGETALES`

**5. Lentejas (Para opción Vegana)**
```json
{ "name": "Lenteja Guisada", "type": "ingredient", "price": 1000, "status": "active" }
```
> **Copia ID:** `ID_ING_LENTEJA`

**6. Naranja**
```json
{ "name": "Naranja Tangelo", "type": "ingredient", "price": 500, "status": "active" }
```
> **Copia ID:** `ID_ING_NARANJA`

---

## 📅 HITO 4: CARTA DE PLATOS (PRODUCTOS FINALES)
*Registramos lo que se vende. Recuerda: `type: "dish"`.*

*Endpoint General:* `POST /api/products`

### Categoría: Hamburguesas
**4.1 Hamburguesa Clásica**
```json
{
  "name": "La Clásica",
  "description": "Pan brioche, 150g de res y vegetales",
  "category": "PEGA_ID_CAT_BURGER",
  "price": 18000,
  "type": "dish",
  "preparation_time": 15
}
```
> **Copia ID:** `ID_PLATO_CLASICA`

**4.2 Hamburguesa Vegana de Lenteja**
```json
{
  "name": "Burger Veggie",
  "description": "Medallón de lentejas y pan integral",
  "category": "PEGA_ID_CAT_BURGER",
  "price": 20000,
  "type": "dish",
  "dietary_tags": ["Vegetariano"],
  "preparation_time": 20
}
```
> **Copia ID:** `ID_PLATO_VEGGIE`

### Categoría: Platos Típicos
**4.3 Bandeja Típica**
```json
{
  "name": "Bandeja Montañera",
  "description": "Frijoles, arroz, carne molida",
  "category": "PEGA_ID_CAT_ABUELA",
  "price": 25000,
  "type": "dish",
  "preparation_time": 25
}
```
> **Copia ID:** `ID_PLATO_TIPICO`

### Categoría: Bowls
**4.4 Bowl de Quinoa (Vegano)**
```json
{
  "name": "Super Bowl Vital",
  "description": "Base de quinoa con mix de vegetales al vapor",
  "category": "PEGA_ID_CAT_BOWLS",
  "price": 22000,
  "type": "dish",
  "dietary_tags": ["Vegano", "Sin Gluten"],
  "preparation_time": 10
}
```
> **Copia ID:** `ID_PLATO_BOWL`

### Categoría: Jugos
**4.5 Jugo de Naranja**
```json
{
  "name": "Naranja 100% Natural",
  "category": "PEGA_ID_CAT_JUGOS",
  "price": 8000,
  "type": "dish"
}
```
> **Copia ID:** `ID_PLATO_JUGO`

---

## 📅 HITO 5: EL LIBRO DE RECETAS (ProductIngredients)
*Aquí conectamos el Plato con sus Insumos + Cantidades + Unidades.*

*Endpoint General:* `POST /api/products/:id/ingredients`

### Receta: Hamburguesa Clásica
*URL:* Reemplazar `:id` por `ID_PLATO_CLASICA`

**Ingrediente 1: Pan**
```json
{
  "ingredient_id": "PEGA_ID_ING_PAN",
  "quantity": 1,
  "unitType": "PEGA_ID_TYPE_CULINARIA",
  "unit": "PEGA_ID_UNIT_UNIDAD"
}
```

**Ingrediente 2: Carne**
```json
{
  "ingredient_id": "PEGA_ID_ING_CARNE",
  "quantity": 150,
  "unitType": "PEGA_ID_TYPE_MASA",
  "unit": "PEGA_ID_UNIT_GRAMO"
}
```

### Receta: Bowl de Quinoa
*URL:* Reemplazar `:id` por `ID_PLATO_BOWL`

**Ingrediente 1: Quinoa**
```json
{
  "ingredient_id": "PEGA_ID_ING_QUINOA",
  "quantity": 200,
  "unitType": "PEGA_ID_TYPE_MASA",
  "unit": "PEGA_ID_UNIT_GRAMO"
}
```

**Ingrediente 2: Vegetales**
```json
{
  "ingredient_id": "PEGA_ID_ING_VEGETALES",
  "quantity": 100,
  "unitType": "PEGA_ID_TYPE_MASA",
  "unit": "PEGA_ID_UNIT_GRAMO"
}
```

---

## 📅 HITO 6: INFORMACIÓN NUTRICIONAL
*Endpoint General:* `PATCH /api/products/:id/nutrition`

**Nutrición: Hamburguesa Clásica**
*URL:* Reemplazar `:id` por `ID_PLATO_CLASICA`
```json
{
  "calories": 650,
  "protein": 35,
  "carbs": 50,
  "fat": 30,
  "sodium": 800
}
```

**Nutrición: Bowl de Quinoa**
*URL:* Reemplazar `:id` por `ID_PLATO_BOWL`
```json
{
  "calories": 400,
  "protein": 15,
  "carbs": 60,
  "fat": 10,
  "fiber": 12,
  "sodium": 150
}
```

---
¡Listo! Con esto tienes un ecosistema completo para probar filtrado por categorías, cálculo de recetas, diferentes tipos de unidades y variantes dietarias.
