Manual de uso - Panel administrador Rutas del Alma

Este manual explica como usar el sitio demo y el panel privado de administracion de la agencia de viajes.
La marca, el WhatsApp, el email, los textos y los viajes se pueden cambiar para adaptarlo a una nueva clienta.

Accesos

- Web publica: configurar el dominio definitivo en Vercel.
- Panel administrador: `/admin/login`.
- Usuario administrador: se crea y se cambia desde Supabase, en Authentication > Users.

Importante: no entregues claves reales dentro de este manual. Para cada nueva venta, crear o actualizar el usuario administrador desde Supabase.

1. Cambiar datos de la agencia

Entrar al panel administrador y abrir Configuracion.
Desde ahi se puede cambiar:

- Nombre de la agencia.
- WhatsApp.
- Email de contacto.
- Redes sociales.
- Direccion.
- Textos principales de la portada.

Guardar los cambios y revisar la web publica.

2. Crear o editar viajes

Entrar a Viajes.
Desde esa seccion se puede:

- Crear un viaje nuevo.
- Editar titulo, slug, destino, fechas, precio y descripcion.
- Agregar imagenes.
- Completar lo incluido y lo no incluido.
- Publicar o despublicar el viaje.

Ejemplo de viajes demo:

- Patagonia Esencial.
- Marruecos Sensorial.
- Grecia Azul.

3. Ver consultas de clientes

Entrar a Mis Leads.
Cada formulario enviado desde la web genera un lead con:

- Nombre.
- Email.
- Telefono.
- Viaje consultado.
- Cantidad de pasajeros.
- Etapa de compra.
- Mensaje.

Desde el detalle del lead se puede abrir WhatsApp y responderle al cliente.

4. Seguimientos

Entrar a Seguimientos.
Usar esta seccion para registrar notas y proximo contacto comercial.
Sirve para no perder consultas pendientes.

5. Reservas

Entrar a Reservas.
Cuando una consulta avanza, se puede cargar una reserva con:

- Nombre del pasajero.
- Viaje.
- Cantidad de pasajeros.
- Importe total.
- Sena pagada.
- Estado de reserva.

6. Adaptar para una nueva clienta

Antes de venderlo o mostrarlo como plantilla:

- Cambiar nombre de marca.
- Cambiar WhatsApp.
- Cambiar email.
- Cambiar redes sociales.
- Revisar colores y textos.
- Cargar viajes reales o viajes demo de prueba.
- Crear el usuario administrador real en Supabase.
- Revisar que el formulario guarde leads en Supabase.

7. Prueba final

Antes de entregar:

1. Abrir la web publica.
2. Enviar una consulta de prueba.
3. Verificar que aparece en Supabase, tabla `leads`.
4. Entrar al panel admin.
5. Verificar que el lead aparece en Mis Leads.
6. Probar el boton de WhatsApp.

Si la consulta llega a la tabla `leads`, la conexion con Supabase esta funcionando.
