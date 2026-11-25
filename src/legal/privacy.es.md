# Política de privacidad

**Última actualización:** 25 de noviembre de 2026

### Lo que el servicio guarda

Para que un swap funcione y para poder ayudarte a rescatarlo, el servicio
guarda, por cada swap:

- su identificador, estado, importes y comisiones;
- las direcciones y transacciones on-chain del contrato;
- la factura Lightning y su hash de pago;
- las **claves públicas** del contrato (nunca tus claves privadas);
- las fechas y los plazos.

Esa base de datos se copia **cifrada**, fuera de la máquina, para no perder
la información que te permite recuperar un swap. Los swaps terminados se conservan 12 meses para poder ayudar con rescates y reclamaciones, y después se borran.

El guardián lleva su propio registro de operaciones (importes, hashes,
transacciones) y avisa al operador (por Telegram) de cada movimiento.

### Lo que el servicio no guarda

- **Direcciones IP:** el servidor web registra solo fecha, método, ruta,
  código de respuesta, tamaño y tiempo de cada petición, **sin IP ni
  navegador**. Los registros de los contenedores rotan (5 × 20 MB).
- Ningún dato personal: no hay cuentas, correos ni formularios.
- Tus claves privadas ni tu clave de rescate: se quedan en tu navegador.

### Terceros que ven parte del tráfico

- **Cloudflare:** swap.kilombino.com pasa por Cloudflare, que ve tu IP y
  las peticiones según su propia política. Para evitarlo, usa la dirección
  **.onion** con Tor Browser.
- **La cadena de bloques y la red Lightning:** las transacciones on-chain
  son públicas, y los nodos por los que pasa un pago Lightning ven parte
  de él, como en cualquier pago.

### Datos en tu navegador

La web guarda en tu navegador (almacenamiento local) los datos de tus swaps
y tus claves, para que puedas volver a ellos. No se usan cookies de
seguimiento ni analítica. Puedes borrarlos cuando quieras (guarda antes la
clave de rescate de los swaps sin terminar).

### Tus derechos

Como no se guardan datos personales, en general no hay nada que
identificarte. Si quieres que se borre un swap concreto ya terminado,
escribe por cualquiera de los canales de contacto de arriba con su identificador.
