# FoodZ Backend API

FoodZ es una API RESTful desarrollada para gestionar una plataforma de venta de platillos fríos precocidos. Este backend maneja la autenticación de usuarios, gestión de productos, categorías y unidades de medida.

## 🛠️ Tecnologías Utilizadas

El proyecto está construido con un stack robusto de JavaScript:

*   **Runtime**: [Node.js](https://nodejs.org/) (Entorno de ejecución)
*   **Framework**: [Express.js](https://expressjs.com/) (Servidor web)
*   **Base de Datos**: [MongoDB](https://www.mongodb.com/) (NoSQL)
*   **ODM**: [Mongoose](https://mongoosejs.com/) (Modelado de datos)
*   **Autenticación**: [JWT (JSON Web Tokens)](https://jwt.io/)
*   **Seguridad**: [Bcrypt](https://www.npmjs.com/package/bcrypt) (Hashing de contraseñas)

## 📋 Pre-requisitos

Antes de comenzar, asegúrate de tener instalado:

1.  **Node.js** (v18 o superior recomendado)
2.  **npm** (Gestor de paquetes)
3.  **MongoDB** (Instancia local o cluster en MongoDB Atlas)

## 🚀 Instalación y Configuración

Sigue estos pasos para levantar el proyecto en local:

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/BIT-202507/foodz-backend.git
    cd foodz-backend
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno:**
    Crea un archivo `.env` en la raíz del proyecto (puedes basarte en `.env.example` si existe) y define las siguientes variables:
    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/foodz_db
    JWT_SECRET=tu_secreto_super_seguro
    ```

4.  **Ejecutar el servidor en modo desarrollo:**
    ```bash
    npm run dev
    ```
    El servidor iniciará (por defecto) en `http://localhost:3000`.

## 📂 Estructura del Proyecto

El código fuente se encuentra en la carpeta `src/`.

```
src/
├── config/         # Configuraciones globales (DB, constantes)
├── controllers/    # Lógica de negocio (Respuesta a peticiones)
├── helpers/        # Funciones de utilidad (JWT, Bcrypt)
├── middlewares/    # Validaciones y autenticación
├── models/         # Esquemas de Mongoose
├── routes/         # Definición de rutas de la API
└── services/       # Comunicación con la base de datos
```

## 📖 Documentación Adicional

*   **[Funcionalidades y Roadmap](docs/FEATURES.md)**: Listado detallado de lo que está implementado y lo que falta.
*   **[Guía de Productos](docs/PRODUCTS.md)**: Ejemplos de consultas y filtros para la API de productos.
*   **[Metadatos](docs/METADATOS.md)**: Explicación técnica sobre configuraciones de modelos (index, unique, etc.).

## 👥 Autores

*   **Juan Carlos Jiménez Gutiérrez** - *Lead Developer*
*   **Nilson Lopez** - *Contributor*
*   **Felipe Cardenas** - *Contributor*

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.
