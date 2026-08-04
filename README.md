# CV / Portafolio — Johan Darío Alarcón

Portafolio en React + MUI con hoja de vida imprimible. Publicado en
<https://johanalarcon.github.io/cv>.

## Estructura

```
src/
├─ data/cv.js          ← fuente única de verdad (perfil, experiencia, skills, proyectos…)
├─ theme.js            ← design system: paleta, tipografía, componentes
├─ ColorMode.jsx       ← tema claro/oscuro con persistencia
├─ App.js              ← composición de secciones del portafolio
├─ components/         ← Nav, Hero, Perfil, Experiencia, Educación, Skills, Proyectos…
└─ cv/
   ├─ CvDocument.jsx   ← hoja de vida imprimible (ruta ?cv=1)
   └─ print.css        ← estilos print-first (A4, saltos de página, @page)
```

**Para actualizar el CV se edita un solo archivo: `src/data/cv.js`.** La web y el
PDF se generan a partir de él, así que no pueden quedar desincronizados.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm start` | Servidor de desarrollo |
| `npm test` | Tests |
| `npm run build` | Build de producción |
| `npm run deploy` | Publica `build/` en GitHub Pages |
| `npm run pdf` | Regenera el PDF estático (requiere Puppeteer, ver abajo) |

## Hoja de vida en PDF

El documento vive en la propia app, en `?cv=1`:

- <https://johanalarcon.github.io/cv/?cv=1> — vista imprimible
- <https://johanalarcon.github.io/cv/?cv=1&print=1> — abre el diálogo de impresión

Se genera **por impresión del navegador** (Ctrl/Cmd + P → *Guardar como PDF*), no
con html2canvas. El texto queda vectorial: seleccionable, buscable y legible por
los sistemas ATS que filtran hojas de vida en convocatorias públicas. Ajustes
recomendados en el diálogo: **A4**, márgenes **predeterminados**, **gráficos de
fondo** activados. El documento está calibrado para caber en **una página**
(259 mm de contenido sobre 279 mm útiles).

### Regenerar el PDF publicado

`public/Hoja_de_Vida_Johan_Dario_Alarcon.pdf` es el archivo que descarga el botón
principal. Para actualizarlo tras cambiar `src/data/cv.js`:

```bash
npm i -D puppeteer serve-handler   # una sola vez
npm run build
npm run pdf
```

El script usa `preferCSSPageSize`, así que respeta el `@page` de `print.css`.
También acepta apuntar al servidor de desarrollo:

```bash
npm start                                   # en otra terminal
npm run pdf -- --url=http://localhost:3000/?cv=1
```

## Despliegue

```bash
git add .
git commit -m "Mejoras X"
git push
npm run deploy
```
