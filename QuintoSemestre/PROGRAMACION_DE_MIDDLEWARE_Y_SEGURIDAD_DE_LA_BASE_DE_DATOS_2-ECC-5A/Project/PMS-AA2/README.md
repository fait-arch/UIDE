# Aprendizaje Autónomo 2

Ejercicio de Microservicios con Django, SQLite y React

##  Objetivo del Ejercicio
- Crear una API REST con Django (utilizando Django REST Framework) conectada a SQLite.
- Trabajar únicamente con un modelo simple (por ejemplo, un modelo de Usuarios).
- Así, el estudiante comprenderá los fundamentos de: 
- Cómo configurar una base de datos SQLite en Django
- Cómo exponer endpoints (GET y POST) con Django REST Framework.
- Cómo consumir esos endpoints desde un frontend en React.

##  Diagrama APIRest
```mermaid
graph TD
    A[API REST] -->|GET| B[GET /api/users/]
    A -->|POST| C[POST /api/users/]
    A -->|GET| D[GET /api/users/id/]
    A -->|PUT| E[PUT /api/users/id/]
    A -->|DELETE| F[DELETE /api/users/id/]

    B -->|Listar todos los usuarios| G[UserList View]
    C -->|Crear un nuevo usuario| G
    D -->|Obtener un usuario específico| H[UserDetail View]
    E -->|Actualizar un usuario específico| H
    F -->|Eliminar un usuario específico| H

    G -->|Serializa/Deserializa| I[UserSerializer]
    H -->|Serializa/Deserializa| I
    I -->|Convierte a/desde JSON| J[User Model]
```

##  Diagrama UML 
```mermaid
erDiagram
    USUARIOS {
        int id PK
        string Nombre_Completo
        string Nombre_Usuario
        string Email
        string Mensaje
    }
```

## Diagrama de Carpetas

```mermaid


```

##  Ejecucion 

