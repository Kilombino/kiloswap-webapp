# Términos de uso

**Última actualización:** 25 de noviembre de 2026

### 1. Quién ofrece el servicio

Kiloswap (swap.kilombino.com y su dirección .onion) lo ofrece y opera
**Kilombino** ("el operador"), a título personal. Contacto: Telegram [@Kilombino](https://t.me/Kilombino), X [@Kilombino_](https://x.com/Kilombino_), Matrix [@kilombino:matrix.org](https://matrix.to/#/@kilombino:matrix.org), Nostr `npub1qqqqqqzs0udz0dpa93ra5thgycmcmwsqw5qave53ltdrd75nrptqv5h62x`, y los canales de Signal y SimpleX que aparecen en [kilombino.com](https://kilombino.com).

Kiloswap usa software libre: el backend de Boltz y la web de Boltz,
adaptados a la cadena Bitcoin BLAKE2b, y un guardián propio que vigila cada
operación. El código está publicado en [github.com/Kilombino/kiloswap](https://github.com/Kilombino/kiloswap), [kiloswap-backend](https://github.com/Kilombino/kiloswap-backend) y [kiloswap-webapp](https://github.com/Kilombino/kiloswap-webapp).

### 2. Qué hace Kiloswap

Kiloswap intercambia bitcoin de la cadena Bitcoin BLAKE2b entre Lightning y
on-chain, en los dos sentidos:

- **On-chain → Lightning:** envías monedas a una dirección de contrato y
  Kiloswap paga tu factura Lightning.
- **Lightning → on-chain:** pagas una factura Lightning y Kiloswap envía
  las monedas a un contrato del que cobras tú, en tu dirección.

Kiloswap **solo** funciona con la cadena Bitcoin BLAKE2b. No envíes monedas
de otra cadena: se perderían.

### 3. Sin custodia

Kiloswap **no custodia tu dinero en ningún momento**. Cada swap usa un
contrato on-chain con plazo (un "atomic swap"):

- O el swap se completa para las dos partes, o, al vencer el plazo,
  recuperas tus monedas **tú solo**, con tu clave de rescate, aunque el
  servicio ya no exista.
- Tus claves se generan en tu navegador. El operador nunca las ve.

Eres responsable de guardar **tu clave de rescate** (el archivo que la web
te ofrece descargar) hasta que el swap termine. Sin ella, y si borras los
datos de tu navegador, puede que no puedas recuperar un swap fallido.

### 4. Comisiones

| | |
|---|---|
| On-chain → Lightning | 0,01 % + la comisión de red (la del cobro del operador) |
| Lightning → on-chain | 0,15 % + la comisión de red (el depósito y un posible reembolso) |
| Comisión de enrutado Lightning (on-chain → Lightning) | la paga el operador, hasta max(121 sats, 0,01 % de la factura) |

La web muestra el importe exacto **antes** de que confirmes. Las
comisiones de red dependen del momento y no las cobra el operador sino los
mineros.

### 5. Límites

- Por swap: de **10 000 sats a 1 BTC**.
- Todos los swaps juntos: **2 BTC cada 24 horas**.
- Confirmaciones de tu depósito on-chain antes de que se pague tu factura (on-chain → Lightning): **1 hasta 0,01 BTC, 2 hasta 0,1 BTC y 3 por encima**. Cuentan todos los swaps pendientes a la vez, así que con varios swaps simultáneos puede pedir el escalón siguiente (como mucho 3).
- Puede haber límites temporales adicionales (por ejemplo, cuántos swaps
  se atienden a la vez). Si se alcanza uno, la web no deja crear el swap o
  el swap se rechaza antes de que pagues.

El operador puede cambiar los límites o pausar los swaps nuevos en
cualquier momento. Los swaps ya empezados se pueden seguir reembolsando y
rescatando.

### 6. Si un swap falla: reembolso tras el plazo

- **On-chain → Lightning:** si Kiloswap no consigue pagar tu factura (por
  ejemplo, no hay ruta dentro del límite de comisión de enrutado), el swap
  queda como fallido y **recuperas tus monedas cuando vence el plazo del
  contrato** (unos **3 días**), desde la web ("Reembolso") o con tu clave de
  rescate en la página de rescate. No hay reembolso inmediato: el
  servidor no firma reembolsos anticipados.
- **Lightning → on-chain:** si no cobras las monedas a tiempo, el pago
  Lightning vuelve a ti automáticamente cuando vence el plazo.

El reembolso solo cuesta la comisión de red de la transacción de
reembolso.

### 7. Lo que no se garantiza

- El servicio se ofrece **tal cual**, sin garantía de disponibilidad ni de
  que siempre haya ruta o liquidez.
- Los plazos dependen de la cadena (bloques), no del reloj.
- El operador no responde de pérdidas causadas por enviar a una dirección
  equivocada, por usar otra cadena, por perder la clave de rescate o por
  fallos de tu cartera. En la medida en que la ley lo permita, la responsabilidad del operador se limita, como máximo, a las comisiones que hayas pagado por el swap afectado.

### 8. Uso aceptable

No uses Kiloswap para actividades ilícitas en tu jurisdicción. El operador
puede dejar de atender swaps que parezcan abusivos (por ejemplo, intentos
de agotar la liquidez o de perjudicar a otros usuarios).

### 9. Sin KYC

Kiloswap no pide nombre, correo, documento ni cuenta. Cada swap es
independiente.

### 10. Cambios

Estos términos pueden cambiar. La versión vigente es la publicada en la web
con su fecha. Un swap ya empezado se rige por los términos vigentes al
crearlo.

### 11. Jurisdicción

Kiloswap es un servicio en internet y se rige por la legislación del ciberespacio: no se somete a la jurisdicción de ningún país en particular. El servicio lo ofrece una persona
física, no una empresa. Ninguna disposición de estos términos limita los
derechos que la ley de tu país te reconozca como consumidor.
