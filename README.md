Decidi utilizar Javascript como lenguaje. Sobres las tecnologías usadas:
  * Express para crear la API
  * Sequelize como ORM para conectar con MySQL
  * Redis para crear un publisher/subscriber para una arquitectura event-driven de las notificaciones
  * nodemailer con mailtrap para enviar los mails
  * dotenv para manejar el .env

<br>

**Otras observaciones**
* Dejo el .env commiteado para que lo tengan rápido
* Se corren dos procesos: index.js y EmailNotification.js
* Deje una colección de Postman básica con una imagen ya encodeada en base64
* El tamaño máximo del payload esta seteado a 5mb, por si quieren cambiar la imagen

<br>

**Validaciones:**
Todos los campos son obligatorios
* Name:
  * Solo letras (sin números, símbolos, ni puntuación), y se permiten varias palabras separadas por espacio

* Email:
  - Debe empezar con caracteres que no sean espacios ni "@"
  - Luego debe estar el "@"
  - Le debe seguir uno o más caracteres que no sean espacios ni "@"
  - Luego un "."
  - Finaliza con uno o más caracteres que no sean espacios ni "@"
  - Es el único campo por el que sea chequean repetidos
 
* Phone Number:
  * Debe coincidir con exactamente 9 digitos del 0 al 9
