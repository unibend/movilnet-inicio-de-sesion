# Movilnet en Línea - Arreglos para el Inicio de Sesión

Movilnet tiene una aplicación web para consultar tu saldo, cambiar de plan y otras operaciones. El problema es que, sencillamente, la página de inicio de sesión no sirve. Para entrar, te envían una clave de 8 caracteres, pero el campo de la clave solo acepta 7. Además, tanto ese campo como el botón de "Iniciar Sesión" están desactivados por defecto.

Este script soluciona estos problemas de la manera más sencilla posible, con menos de 100 líneas de código, para que puedas entrar a tu cuenta sin dolores de cabeza.

## ¿Qué hace este script?

-   **Corrige el campo de la clave:** Aumenta el límite de caracteres a 8, lo activa y permite que tu gestor de contraseñas lo autocomplete.
-   **Activa el botón de "Iniciar Sesión":** El botón se activa automáticamente al cargar la página.
-   **Resuelve el Captcha:** Calcula y rellena automáticamente la suma del captcha para que no tengas que hacerlo tú.
-   **Evita la pestaña duplicada:** Intenta cerrar la pestaña extra que a veces se abre después de iniciar sesión.

## Instalación

**1. Instala un gestor de Userscripts**

Necesitas una extensión en tu navegador para poder usar este script. La más recomendada es **Tampermonkey**.

-   [Instalar para Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
-   [Instalar para Firefox](https://addons.mozilla.org/es/firefox/addon/tampermonkey/)
-   (Visita el [sitio web de Tampermonkey](https://www.tampermonkey.net/) para otros navegadores como Edge o Safari)

**2. Instala el script**

Una vez que tengas Tampermonkey, haz clic en el siguiente enlace para instalar el script.

-   **[➡️ Instalar el script desde GitHub](https://raw.githubusercontent.com/unibend/movilnet-inicio-de-sesion/main/movilnet.user.js)**

Tampermonkey abrirá una nueva pestaña para confirmar la instalación. Simplemente haz clic en el botón **"Instalar"** y listo.

Para dudas o sugerencias puedes [abrir un issue](https://github.com/unibend/movilnet-inicio-de-sesion/issues/new/choose)
