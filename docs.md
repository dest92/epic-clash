# Docs

 Es importante que usemos la información de esta documentación, ya que nos va a servir tanto como para avanzar más rápido, como para aprender y tener todo en un solo lugar. 

## Tecnologías

Las tecnologías que vamos a usar para este TP son las siguientes: 

- Next.js [nextjs.org](http://nextjs.org/)
- Excalibur.js  [excaliburjs.com](http://excaliburjs.com/)
- Typescript [typescriptlang.org](http://typescriptlang.org/)
- React [React](https://es.react.dev/)

Es necesario que usemos si o si estas tecnologías específicas para asegurar que nuestro trabajo sea coherente y efectivo. Si estás pensando en explorar y usar otras herramientas o recursos, como una nueva librería de diseño, **pregunten antes**. Siguiendo este enfoque, podemos mantener el equilibrio y asegurarnos de que todos estemos en sintonía.

En el caso de que quieran ahorrarse usar Typescript y sientan que es mejor hacerlo con JavaScript, pregunten también, ya que hay ocasiones en la que usar directamente javascript nos puede ahorrar tiempo.

## Pautas de trabajo

### Criterios de codificación

- Utilizar camelCase para nombrar las variables y funciones. En el caso de los componentes de react, deben seguir las convenciones para componentes de React que más abajo voy a detallar.
- Utilizar EsLint y Prettier para legibilidad del código, clean code y para que todos mantengamos un mismo formato. Van a tener que instalarse los plugins desde el workshop de VS CODE.
- Hacer lo mismo que los demás, con esto me refiero, a que si todos estamos usando typescript, sigamos usando typescript.
- Tratar de reutilizar el código lo más que se pueda.
- Comunicar siempre las cosas, tengan problemas o no tengan problemas tienen que ir diciendo como van, especialmente si tienen problemas, ya que si uno se atrasa, todos nos atrasamos. Tenemos que trabajar como team para hacer el trabajo bien y rápido.
- Comentar todo lo posible dentro del código, no importa si es generado con ChatGPT, lo importa es que el código que hagan esté comentado.

### Criterios de GitHub

- Antes de subir el código a GitHub, deben utilizar el comando `npm run lint` y verificar que no haya errores. Además, si están haciendo alguna funcionalidad, pruébenla bien antes de subir.
- Para subir el código a GitHub, solo usen `git add .` si trabajaron sobre muchas carpetas y archivos, sino, solo suban el archivo o la carpeta en donde trabajaron.
- Una rama por tarea, no hagan varias tareas dentro de una misma rama a menos que sea algo muy chiquito, y en ese caso, avisen.
- Commits descriptivos. Cuando vayan a commitear, sean descriptivos con lo que hicieron, por ejemplo, si estuviste haciendo un componente de un botón, no pongas `git commit -m "some changes"` sino lo que deben poner es `git commit -m "add button component"` en donde los verbos tienen que estar en infinitivo, ya sea en español o en inglés.
- Respetemos el idioma, si estamos trabajando en un idioma, todo el proyecto debe estar en el mismo idioma.
- Hagan las tareas en tiempo y forma, así tenemos tiempo de probar todo.
- Una vez que terminen de probar toda su rama, hagan un Pull Request a development, no a main.

## Configuración del entorno

Para arrancar con el proyecto de Next es bastante rápido y sencillo

1. **Instalación de Node.js**: Lo primero que necesitamos es tener `Node.js` en nuestro sistema. Node.js nos permite correr JavaScript en el servidor y es super necesario para el desarrollo en Next.js. Si todavía no lo tienes instalado, te recomiendo que te des una vuelta por el sitio oficial de Node.js y sigas las instrucciones de instalación.
2. **Instalación de dependencias**: Ya con Node.js en tu sistema, lo que sigue es instalar todas las dependencias del proyecto. Las dependencias son como los ingredientes de una receta, nos dan las funcionalidades que necesitamos para que todo funcione correctamente. Para instalarlas todas, solo tienes que usar el comando `npm i` en la línea de comandos. `npm` es el jefe de paquetes de Node.js y `i` es como decir install pero en cortito.
3. **Actualización de dependencias**: A lo largo del desarrollo del proyecto es probable que lleguen nuevas dependencias. Pueden ser nuevos paquetes o bibliotecas que nos den más funcionalidades o mejoren las que ya tenemos. Cuando eso pase, es importantísimo que cada uno de nosotros instale estas nuevas dependencias en su espacio local. Para hacer eso, solo necesitas usar el comando `npm i` otra vez. Recuerda hacer esto cada vez que hagas pull de una rama o inicies una nueva, para estar seguro de que tienes todas las dependencias al día y evitar cualquier problemilla con el código.

Estos pasos son la clave para preparar tu espacio de trabajo y arrancar con el proyecto de Next. Tener todo bien configurado es esencial para que el desarrollo sea eficiente y sin tropiezos. Asegúrate de seguir estos pasos y mantener tu espacio de trabajo al día. Si tienes algún problemilla o duda, no te cortes y pedí ayuda o busca en la documentación oficial de las tecnologías que estamos usando.

## Ejecución

Para ejecutar el proyecto, solo tienen que poner `npm run dev`

## Estructura del proyecto

La estructura del proyecto, es algo que puede ir variando según lo que vayamos viendo, pero la principal y la más importante ya está, que está basada en las recomendaciones de **********************Next.js 13********************** con el nuevo sistema de **App Router.** 

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/5142b49c-15ed-4cff-bcaf-c2a660b12103/ee605d78-4c79-49b7-b2ea-e85c2a99e563/Untitled.png)

- `.next`: Es la carpeta del caché de Next.
- `node_modules`: Carpeta en la que se instalan todas las librerías y paquetes.
- `public`: No presten atención a esta carpeta.
- `next.config.js`: Configuración del entorno de Next. Si necesitan cambiar algo de esta configuración, consulten antes.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/5142b49c-15ed-4cff-bcaf-c2a660b12103/0badc712-725d-4355-9cd7-7530c001e381/Untitled.png)

Dentro de la carpeta app, que es en la que más vamos a trabajar, se encuentra lo siguiente:

- **assets**: Aquí almacenaremos todo lo relacionado con sonidos, imágenes, etc. Todo lo que sea necesario y no sea código.
- **components**: Carpeta en la que guardaremos los componentes de React que creemos.
- **utils**: Carpeta donde almacenaremos utilidades de código, es decir, código que se puede reutilizar y demás.

Como pueden ver, hay dos carpetas más que son **************config**************  y ************game.************ Estas carpetas representan las páginas de Next, por lo que les recomiendo que lean la documentación de Next.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/5142b49c-15ed-4cff-bcaf-c2a660b12103/f771eb1f-cf58-4be7-a4a4-a1b59e638be4/Untitled.png)

[Routing: Pages and Layouts | Next.js (nextjs.org)](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)

Donde les recomiendo que revisen toda esta sección [Building Your Application: Routing | Next.js (nextjs.org)](https://nextjs.org/docs/app/building-your-application/routing)
