/* eslint-disable no-console */
/**
 * scripts/generate-pdf.js
 *
 * Regenera `public/Hoja_de_Vida_Johan_Dario_Alarcon.pdf` a partir de la misma
 * vista imprimible que usa la web (`?cv=1`), con el motor de impresión de
 * Chromium. El resultado es un PDF vectorial: texto seleccionable, buscable y
 * legible por sistemas ATS, a diferencia del capturado con html2canvas.
 *
 * Uso:
 *   npm i -D puppeteer serve-handler   (una sola vez)
 *   npm run build
 *   npm run pdf
 *
 * O contra el servidor de desarrollo ya levantado:
 *   npm start           (en otra terminal)
 *   npm run pdf -- --url=http://localhost:3000/?cv=1
 */

const http = require('http');
const path = require('path');
const fs = require('fs');

const BUILD_DIR = path.resolve(__dirname, '..', 'build');
const OUTPUT = path.resolve(__dirname, '..', 'public', 'Hoja_de_Vida_Johan_Dario_Alarcon.pdf');
const PORT = 4321;

const argUrl = process.argv.find((a) => a.startsWith('--url='))?.slice('--url='.length);

async function withStaticServer(run) {
  if (argUrl) return run(argUrl);

  if (!fs.existsSync(BUILD_DIR)) {
    throw new Error('No existe ./build. Ejecuta `npm run build` antes de `npm run pdf`.');
  }

  // `serve-handler` sirve el build tal cual, respetando index.html y rutas.
  const handler = require('serve-handler');
  const server = http.createServer((req, res) => handler(req, res, { public: BUILD_DIR }));

  await new Promise((resolve) => server.listen(PORT, resolve));
  try {
    return await run(`http://localhost:${PORT}/?cv=1`);
  } finally {
    server.close();
  }
}

(async () => {
  const puppeteer = require('puppeteer');

  await withStaticServer(async (url) => {
    console.log(`→ Renderizando ${url}`);

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle0' });
    // Las fuentes web cambian las métricas del texto: sin esto los saltos de
    // página se calculan con la fuente de reserva.
    await page.evaluate(() => document.fonts.ready);

    await page.pdf({
      path: OUTPUT,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true, // respeta el @page de print.css
      displayHeaderFooter: false,
    });

    await browser.close();
    console.log(`✓ PDF generado en ${OUTPUT}`);
  });
})().catch((err) => {
  console.error('✗ No se pudo generar el PDF:', err.message);
  process.exit(1);
});
