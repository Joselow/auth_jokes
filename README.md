"# auth_jokes" 

# Guía basica para Usar la API de Autenticación y Chistes

| **Endpoint**                       | **Descripción**                                                   |
|------------------------------------|-------------------------------------------------------------------|
| `POST /api/register`               | Registrar un nuevo usuario.                                       |
| `POST /api/login`                  | Iniciar sesión con un usuario existente.                          |
| `GET /api/my-joke`                 | Ver algunos chistes.                                              |
| `GET /api/profile`                 | Ver el perfil del usuario autenticado.                            |
| `GET /api/users`                   | Ver la lista de usuarios (solo administradores).                  |
| `PUT /api/change-role/:uuid`       | Cambiar el rol de un usuario (solo administradores).              |

## 🌟 Cómo interactuar con la API

### 1. **Registrarse** (POST a `/api/register`) 🚀
**Objetivo**: Crear un nuevo usuario.

Este endpoint permite a un usuario registrarse proporcionando un nombre de usuario, correo electrónico y contraseña. Si el registro es exitoso, se devolverá un token de autenticación.
En esta api existen dos roles ADMINS(1) y REGULARS(2) 

#### Ejemplo de Código:

<details>
<summary>Ver código</summary>

```javascript
function registerUser(username, email, password) {
  fetch('https://https://auth-jokes.onrender.com/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',  
      'Accept': 'application/json'  
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        console.log('Usuario registrado exitosamente y token guardado');
      } else {
        console.error('Error en el registro:', data.message);
      }
    })
    .catch(error => {
      console.error('Error al hacer la solicitud:', error);
    });
}
  ```
</details>
<details>
<summary>Ver respuesta esperada</summary>

```json
{
  "success": true,
  "token": "your_token_here"
}
  ```
</details>


### 2. Iniciar sesión (POST a /api/login) 🚀
**Objetivo**: Permitir que un usuario se loguee utilizando su nombre de usuario y contraseña.

Este endpoint permite a los usuarios registrados iniciar sesión. Si las credenciales son correctas, se devolverá un token de autenticación (Bearer Token).

#### Ejemplo de Código:


<details>
<summary>Ver código</summary>

```javascript
function loginUser(username, password) {
  fetch('https://https://auth-jokes.onrender.com/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        // Guarda el token en localStorage
        localStorage.setItem('authToken', data.token);
        console.log('Usuario logueado exitosamente y token guardado');
      } else {
        console.error('Error en el login:', data.message);
      }
    })
    .catch(error => {
      console.error('Error al hacer la solicitud:', error);
    });
} 
```
</details>
<details>
<summary>Ver respuesta esperada</summary>

```json
{
  "success": true,
  "token": "your_token_here"
}
  ```
</details>

### 3. Ver Chistes (GET a /api/my-joke) 🚀
**Objetivo**:  Obtener chistes 

Este endpoint permite al usuario autenticado ver algunso chistes. Requiere autenticación (el token debe ser enviado en la cabecera de la solicitud).

#### Ejemplo de Código:


<details>
<summary>Ver código</summary>

```javascript
function getMyJoke() {
  const token = localStorage.getItem('authToken');  // Obtener el token guardado

  fetch('https://https://auth-jokes.onrender.com/api/my-joke', {
    method: 'GET',
    headers: {
      'Authorization': Bearer ${token},  // Se incluye el token de autenticación
      'Content-Type': 'application/json',  // Especificamos que el cuerpo de la solicitud será en formato JSON.
      'Accept': 'application/json'  // Especificamos que esperamos una respuesta en formato JSON.
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log('Chistes obtenidos:', data);
    })
    .catch(error => {
      console.error('Error al obtener los chistes:', error);
    });
}
```
</details>
<details>
<summary>Ver respuesta esperada</summary>

```json
{
  "success": true,
  "data": "Why do programmers prefer dark mode? Because light attracts bugs!"
}
  ```
</details>

### 4. Ver Perfil (GET a /api/profile) 🚀
**Objetivo**: Obtener el perfil del usuario autenticado.

Este endpoint devuelve la información del perfil del usuario. Requiere autenticación (el token debe ser enviado en la cabecera de la solicitud).

#### Ejemplo de Código:


<details>
<summary>Ver código</summary>

```javascript
function getUserProfile() {
  const token = localStorage.getItem('authToken');  // Obtener el token guardado

  fetch('https://https://auth-jokes.onrender.com/api/profile', {
    method: 'GET',
    headers: {
      'Authorization': Bearer ${token},  // Se incluye el token de autenticación
      'Content-Type': 'application/json',  // Especificamos que el cuerpo de la solicitud será en formato JSON.
      'Accept': 'application/json'  // Especificamos que esperamos una respuesta en formato JSON.
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log('Perfil del usuario:', data);
    })
    .catch(error => {
      console.error('Error al obtener el perfil:', error);
    });
}

```
</details>
<details>
<summary>Ver respuesta esperada</summary>

```json
{
  "success": true,
  "data": {
    "username": "nuevoUsuario",
    "email": "nuevo@ejemplo.com",
    ...
  }
}
  ```
</details>

### 5. Ver Usuarios (GET a /api/users) 🚀
**Objetivo**: Ver la lista de usuarios (solo disponible para administradores).

Este endpoint devuelve una lista de todos los usuarios. Solo los administradores pueden acceder a este endpoint. Requiere autenticación y privilegios de administrador.

#### Ejemplo de Código:


<details>
<summary>Ver código</summary>

```javascript
function getUsersList() {
  const token = localStorage.getItem('authToken');  // Obtener el token guardado

  fetch('https://https://auth-jokes.onrender.com/api/users', {
    method: 'GET',
    headers: {
      'Authorization': Bearer ${token},  // Se incluye el token de autenticación
      'Content-Type': 'application/json',  // Especificamos que el cuerpo de la solicitud será en formato JSON.
      'Accept': 'application/json'  // Especificamos que esperamos una respuesta en formato JSON.
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log('Lista de usuarios:', data);
    })
    .catch(error => {
      console.error('Error al obtener la lista de usuarios:', error);
    });
}
```
</details>
<details>
<summary>Ver respuesta esperada</summary>

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "username": "nuevoUsuario",
      "email": "nuevo@ejemplo.com"
    },
    {
      "id": 2,
      "username": "admin",
      "email": "admin@ejemplo.com"
    }
  ]
}
  ```
</details>

### 6. Cambiar Rol de Usuario (PUT a /api/change-role/:uuid) 🚀
**Objetivo**:  Cambiar el rol de un usuario (solo disponible para administradores).

Este endpoint permite a un administrador cambiar el rol de un usuario. El administrador debe proporcionar el UUID del usuario cuya rol se desea cambiar.


#### Ejemplo de Código:


<details>
<summary>Ver código</summary>

```javascript
function changeUserRole(uuid, newRole) {
  const token = localStorage.getItem('authToken');  // Obtener el token guardado

  fetch(`https://https://auth-jokes.onrender.com/api/change-role/${uuid}`, {
    method: 'PUT',
    headers: {
      'Authorization': Bearer ${token},  // Se incluye el token de autenticación
      'Content-Type': 'application/json',  // Especificamos que el cuerpo de la solicitud será en formato JSON.
      'Accept': 'application/json'  // Especificamos que esperamos una respuesta en formato JSON.
    },
    body: JSON.stringify({
      role: newRole
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log('Rol cambiado exitosamente:', data);
    })
    .catch(error => {
      console.error('Error al cambiar el rol:', error);
    });
    }

```
</details>
<details>
<summary>Ver respuesta esperada</summary>

```json
{
  "success": true,
  "message": "Role updated successfully"
}
  ```
</details>
