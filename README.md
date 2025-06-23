# Documentación del Proyecto

## Paso 1: Configurar MongoDB Atlas
- **Descripción**: Crea una cuenta en MongoDB Atlas, configura el acceso a la base de datos y obtén la URI de conexión.
- **Capturas de pantalla**:
  - ![Creación del clúster](./documentation/Creacion-del-cluster.png)
  - ![Configuración del usuario parte 1](./documentation/Configuracion-usuario1.png)
  - ![Configuración del usuario parte 2](./documentation/Configuracion-usuario2.png)
  - ![URI de conexión](./documentation/URI-conexion.png)

## Paso 2: Instalar y Configurar MongoDB Compass
- **Descripción**: Descarga e instala MongoDB Compass y conéctate a MongoDB Atlas.
- **Capturas de pantalla**:
  - ![Conexión exitosa en MongoDB Compass](./documentation/conexion-mongodb-compas1.png)
  - ![Conexión exitosa en MongoDB Compass](./documentation/conexion-mongodb-compas2.png)

## Paso 3: Configurar el Proyecto en VS Code
- **Descripción**: Crea un nuevo proyecto en VS Code e instala las dependencias necesarias.
- **Capturas de pantalla**:
  - ![Instalación de dependencias](./documentation/instalacion-dependencias.png)

## Paso 4: Configurar la Conexión a MongoDB
- **Descripción**: Crea el archivo `.env` y el archivo `database.js` para configurar la conexión a MongoDB.
- **Capturas de pantalla**:
  - ![Archivo .env](./documentation/env.png)
  - ![Archivo database.js](./documentation/database-js.png)

## Paso 5: Definir el Modelo de Tarea
- **Descripción**: Crea el archivo `task.model.js` para definir el modelo de tarea.
- **Capturas de pantalla**:
  - ![Archivo task.model.js](./documentation/taskmodel-js.png)

## Paso 6: Inicializar el Repositorio en GitHub
- **Descripción**: Crea un nuevo repositorio en GitHub y configura Git en tu proyecto.
- **Comandos Git**: git init
                    git add .
                    git commit -m "Initial commit: Database setup and task model"
                    git branch -M main
                    git remote add origin URL_DEL_REPOSITORIO#cambiar esto con lo del repo
                    git push -u origin main
- **Capturas de pantalla**:
  - ![Creación del repositorio en GitHub](./documentation/creacion-repositorio.png)
  - ![Actualizar repositorio en GitHub](./documentation/git-actualizar.png)

## Paso 7: Probar la Conexión y el Modelo
- **Descripción**: Crea un archivo `test.js` y ejecútalo para probar la conexión y el modelo.
- **Capturas de pantalla**:
  - ![Resultado en Terminal](./documentation/test-1.png)
  - ![Tarea en MongoDB Compass](./documentation/reflejo-test-mongo.png)

## Paso 8: Implementar el Endpoint GET `/tareas`
- **Descripción**: Implementa el endpoint para obtener todas las tareas de la base de datos.
- **Capturas de pantalla**:
  - ![Archivo tasks.controller.js](./documentation/tasks-controller-js.png)
  - ![Archivo tasks.routes.js](./documentation/tasks-routes-js.png)
  - ![Archivo app.js](./documentation/app-js.png)
  - ![Prueba con Postman](./documentation/postman-get-tareas.png)

## Paso 9: Implementar el Endpoint POST `/tareas`

- **Descripción**: Implementa el endpoint POST `/tareas` para crear nuevas tareas en la base de datos.
- **Controlador**: Se actualizó el archivo `tasks.controller.js` para incluir la función `createTask`, que valida los datos de entrada y guarda una nueva tarea en la base de datos.
  - **Capturas de pantalla**:
    - ![Controlador de Tareas Actualizado](./documentation/tasks-controller-update.png)
- **Rutas**: Se modificó el archivo `tasks.routes.js` para incluir el nuevo endpoint POST `/tareas`.
  - **Capturas de pantalla**:
    - ![Rutas Actualizadas](./documentation/tasks-routes-update.png)
- **Middleware**: Se aseguró que `app.js` tenga el middleware `express.json()` para parsear el cuerpo de las solicitudes.
  - **Capturas de pantalla**:
    - ![Middleware JSON en app.js](./documentation/app-json-middleware.png)
- **Pruebas con Postman**: Se realizó una solicitud POST a `http://localhost:3000/api/tareas` para verificar que el endpoint funciona correctamente.
  - **Capturas de pantalla**:
    - ![Prueba con Postman](./documentation/postman-post-tareas.png)

## Paso 10: Implementar el Endpoint PUT `/tareas/:id`

- **Descripción**: Implementa el endpoint PUT `/tareas/:id` para actualizar tareas existentes en la base de datos.
- **Controlador**: Se actualizó el archivo `tasks.controller.js` para incluir la función `updateTask`, que busca una tarea por su ID, actualiza los campos proporcionados y guarda los cambios en la base de datos.
  - **Capturas de pantalla**:
    - ![Controlador de Tareas Actualizado con PUT](./documentation/tasks-controller-put-update.png)
- **Rutas**: Se modificó el archivo `tasks.routes.js` para incluir el nuevo endpoint PUT `/tareas/:id`.
  - **Capturas de pantalla**:
    - ![Rutas Actualizadas con PUT](./documentation/tasks-routes-put-update.png)
- **Ejecutar servidor**: Se ejecuto `app.js` para que se ejecutara el servidor.
  - **Capturas de pantalla**:
    - ![Servidor de app.js](./documentation/app-ejecucion-servidor.png)
- **Pruebas con Postman**: Se realizó una solicitud PUT a `http://localhost:3000/api/tareas/ID_DE_LA_TAREA` para verificar que el endpoint funciona correctamente.
  - **Capturas de pantalla**:
    - ![Prueba con Postman para PUT](./documentation/postman-put-tareas.png)

## Paso 11: Implementar el Endpoint DELETE `/tareas/:id`

- **Descripción**: Implementa el endpoint DELETE `/tareas/:id` para eliminar tareas existentes de la base de datos.
- **Controlador**: Se actualizó el archivo `tasks.controller.js` para incluir la función `deleteTask`, que busca y elimina una tarea por su ID.
  - **Capturas de pantalla**:
    - ![Controlador de Tareas Actualizado con DELETE](./documentation/tasks-controller-delete-update.png)
- **Rutas**: Se modificó el archivo `tasks.routes.js` para incluir el nuevo endpoint DELETE `/tareas/:id`.
  - **Capturas de pantalla**:
    - ![Rutas Actualizadas con DELETE](./documentation/tasks-routes-delete-update.png)
- **Pruebas con Postman**: Se realizó una solicitud DELETE a `http://localhost:3000/api/tareas/ID_DE_LA_TAREA` para verificar que el endpoint funciona correctamente.
  - **Capturas de pantalla**:
    - ![Prueba con Postman para DELETE](./documentation/postman-delete-tareas.png)

## Paso 12: Implementar el Endpoint GET `/tareas/:id`

- **Descripción**: Implementa el endpoint GET `/tareas/:id` para obtener detalles específicos de una tarea existente en la base de datos.
- **Controlador**: Se actualizó el archivo `tasks.controller.js` para incluir la función `getTaskById`, que busca una tarea por su ID y devuelve sus detalles.
  - **Capturas de pantalla**:
    - ![Controlador de Tareas Actualizado con GET por ID](./documentation/tasks-controller-getById-update.png)
- **Rutas**: Se modificó el archivo `tasks.routes.js` para incluir el nuevo endpoint GET `/tareas/:id`.
  - **Capturas de pantalla**:
    - ![Rutas Actualizadas con GET por ID](./documentation/tasks-routes-getById-update.png)
- **Pruebas con Postman**: Se realizó una solicitud GET a `http://localhost:3000/api/tareas/ID_DE_LA_TAREA` para verificar que el endpoint funciona correctamente.
  - **Capturas de pantalla**:
    - ![Prueba con Postman para GET por ID](./documentation/postman-getById-tareas.png)

## Paso 13: Implementar Emisión de Eventos WebSocket

- **Descripción**: Implementa la emisión de eventos WebSocket tras operaciones CRUD para notificar cambios en tiempo real y se modificaron `app.js` & `task.controller.js`.
- **Instalar Socket.IO**:
  - Se instaló Socket.IO para manejar la comunicación en tiempo real.
  ```bash
  npm install socket.io

## Paso 14: Despliegue en Render

- **Descripción**: Despliegue del backend en Render, configuración de variables de entorno y conexión a la base de datos remota.
- **Actualizar `package.json`**:
  - Se añadió el script `start` al archivo `package.json`.
  - **Capturas de pantalla**:
    - ![Script de Inicio en package.json](./documentation/package-json-start.png)
- **Crear Cuenta en Render**:
  - Se creó una cuenta en Render y se configuró un nuevo servicio web.
  - **Capturas de pantalla**:
    - ![Creación de Servicio Web en Render](./documentation/render-new-service.png)
- **Configurar Variables de Entorno**:
  - Se configuraron las variables de entorno en Render para la conexión a MongoDB Atlas.
  - **Capturas de pantalla**:
    - ![Configuración de Variables de Entorno en Render](./documentation/render-env-vars.png)
- **Conectar con GitHub**:
  - Se vinculó el repositorio de GitHub con Render para el despliegue continuo.
  - **Capturas de pantalla**:
    - ![Conexión con GitHub en Render](./documentation/render-github-integration.png)
- **Revisar `package.json`**:
  - Se aseguró que `package.json` tenga el script `start` para iniciar la aplicación.
- **Desplegar y Verificar**:
  - Render inició el despliegue automáticamente y se verificó la ausencia de errores en los logs.
  - **Capturas de pantalla**:
    - ![Logs de Despliegue en Render](./documentation/render-deploy-logs.png)
