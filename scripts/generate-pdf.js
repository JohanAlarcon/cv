/* eslint-disable no-console */
/**
 * scripts/generate-pdf.js
 *
 * Regenera `public/Hoja_de_Vida_Johan_Dario_Alarcon.pdf` a partir de la misma
 * vista imprimible que usa la web (`?cv=1`).
 *
 * Por qué no `chrome --print-to-pdf`: esa bandera IGNORA los márgenes `@page`
 * del CSS y aplica los suyos (~1 pulgada), lo que estrecha la caja de impresión,
 * reflowea el texto y parte la hoja en dos páginas. El DevTools Protocol sí los
 * respeta con `preferCSSPageSize: true`, así que hablamos directamente con él.
 *
 * Por qué no Puppeteer: son ~300 MB de descarga para lo mismo. Aquí se usa el
 * Chrome ya instalado y el paquete `ws` que el proyecto ya tiene.
 *
 * Uso:
 *   npm run pdf
 *   npm run pdf -- --url=http://localhost:3000/cv/?cv=1   (contra `npm start`)
 *   CHROME_PATH="C:\\ruta\\chrome.exe" npm run pdf
 *
 * El PDF resultante lleva texto vectorial: seleccionable, buscable y legible
 * por los sistemas ATS de las convocatorias.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const http = require('http');
const { spawn, spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT = path.join(ROOT, 'public', 'Hoja_de_Vida_Johan_Dario_Alarcon.pdf');
const BASE_PATH = '/cv';
const PORT = 4321;

const arg = (name) => {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : undefined;
};

// ─── Localizar Chrome ────────────────────────────────────────────────────────
function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;

  const candidates =
    process.platform === 'win32'
      ? [
          'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
          'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
          path.join(os.homedir(), 'AppData\\Local\\Google\\Chrome\\Application\\chrome.exe'),
          'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
          'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
        ]
      : process.platform === 'darwin'
        ? [
            '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            '/Applications/Chromium.app/Contents/MacOS/Chromium',
          ]
        : ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'];

  const found = candidates.find((c) => fs.existsSync(c));
  if (!found) {
    throw new Error(
      'No se encontró Chrome. Indícalo con CHROME_PATH="/ruta/a/chrome".'
    );
  }
  return found;
}

// ─── Build temporal con rutas relativas al host local ────────────────────────
function buildForPdf() {
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cv-pdf-build-'));
  console.log('→ Compilando la app para el PDF…');

  // PUBLIC_URL en .env apunta a GitHub Pages; si no lo sobreescribimos, el PDF
  // se generaría a partir del sitio YA PUBLICADO en vez de tu código local.
  const res = spawnSync(
    process.execPath,
    [path.join(ROOT, 'node_modules', 'react-scripts', 'bin', 'react-scripts.js'), 'build'],
    {
      cwd: ROOT,
      env: { ...process.env, PUBLIC_URL: BASE_PATH, BUILD_PATH: outDir, CI: 'true' },
      stdio: ['ignore', 'pipe', 'inherit'],
      encoding: 'utf8',
    }
  );

  if (res.status !== 0) {
    throw new Error('El build falló; revisa los errores de compilación.');
  }
  return outDir;
}

// ─── Servidor estático mínimo ────────────────────────────────────────────────
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
};

function serve(dir) {
  const server = http.createServer((req, res) => {
    let pathname = decodeURIComponent(req.url.split('?')[0]);
    if (pathname.startsWith(BASE_PATH)) pathname = pathname.slice(BASE_PATH.length);
    if (!pathname || pathname === '/') pathname = '/index.html';

    // Nada de path traversal: resolvemos y comprobamos que siga dentro de dir.
    const file = path.resolve(dir, '.' + pathname);
    const target = file.startsWith(path.resolve(dir))
      ? file
      : path.join(dir, 'index.html');

    fs.readFile(target, (err, data) => {
      if (err) {
        // Fallback SPA
        fs.readFile(path.join(dir, 'index.html'), (e2, html) => {
          if (e2) {
            res.writeHead(404);
            res.end('not found');
            return;
          }
          res.writeHead(200, { 'Content-Type': MIME['.html'] });
          res.end(html);
        });
        return;
      }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(target)] || 'application/octet-stream' });
      res.end(data);
    });
  });

  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

// ─── Cliente mínimo de DevTools Protocol ─────────────────────────────────────
function cdp(wsUrl) {
  const WebSocket = require('ws');
  const ws = new WebSocket(wsUrl, { perMessageDeflate: false, maxPayload: 256 * 1024 * 1024 });
  const pending = new Map();
  const waiters = [];
  let id = 0;

  ws.on('message', (raw) => {
    const msg = JSON.parse(raw);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(`${msg.error.message} (${JSON.stringify(msg.error.data ?? '')})`));
      else resolve(msg.result);
    } else if (msg.method) {
      for (let i = waiters.length - 1; i >= 0; i--) {
        if (waiters[i].method === msg.method) {
          waiters[i].resolve(msg.params);
          waiters.splice(i, 1);
        }
      }
    }
  });

  return {
    ready: new Promise((resolve, reject) => {
      ws.once('open', resolve);
      ws.once('error', reject);
    }),
    send: (method, params = {}) =>
      new Promise((resolve, reject) => {
        id += 1;
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      }),
    once: (method, timeoutMs = 30000) =>
      new Promise((resolve, reject) => {
        const w = { method, resolve };
        waiters.push(w);
        setTimeout(() => {
          const i = waiters.indexOf(w);
          if (i >= 0) {
            waiters.splice(i, 1);
            reject(new Error(`Timeout esperando ${method}`));
          }
        }, timeoutMs);
      }),
    close: () => ws.close(),
  };
}

const getJson = (url) =>
  new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        let body = '';
        res.on('data', (c) => (body += c));
        res.on('end', () => {
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on('error', reject);
  });

const waitFor = async (fn, { tries = 60, delay = 250 } = {}) => {
  let lastErr;
  for (let i = 0; i < tries; i++) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw lastErr;
};

// ─── Principal ───────────────────────────────────────────────────────────────
(async () => {
  const chrome = findChrome();
  const customUrl = arg('url');

  let server = null;
  let buildDir = null;
  let url = customUrl;

  if (!url) {
    buildDir = buildForPdf();
    server = await serve(buildDir);
    url = `http://localhost:${PORT}${BASE_PATH}/?cv=1`;
  }

  const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cv-pdf-chrome-'));
  const browser = spawn(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--no-first-run',
      '--no-default-browser-check',
      '--remote-debugging-port=0',
      `--user-data-dir=${profileDir}`,
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  const cleanup = () => {
    try {
      browser.kill();
    } catch (e) {
      /* ya cerrado */
    }
    if (server) server.close();
    for (const dir of [profileDir, buildDir]) {
      if (dir) {
        try {
          fs.rmSync(dir, { recursive: true, force: true });
        } catch (e) {
          /* Windows a veces retiene el perfil; no es crítico */
        }
      }
    }
  };

  try {
    // Chrome escribe el puerto real en DevToolsActivePort al arrancar.
    const port = await waitFor(async () => {
      const raw = fs.readFileSync(path.join(profileDir, 'DevToolsActivePort'), 'utf8');
      const p = raw.split('\n')[0].trim();
      if (!p) throw new Error('sin puerto todavía');
      return p;
    });

    const targets = await waitFor(async () => {
      const list = await getJson(`http://127.0.0.1:${port}/json/list`);
      const page = list.find((t) => t.type === 'page');
      if (!page) throw new Error('sin target de página');
      return page;
    });

    const client = cdp(targets.webSocketDebuggerUrl);
    await client.ready;

    await client.send('Page.enable');

    // Sin esto el viewport headless por defecto (800×600) es más estrecho que
    // la hoja de 210 mm, `max-width: 100%` la encoge y el texto reflowea.
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 1600,
      deviceScaleFactor: 1,
      mobile: false,
    });

    console.log(`→ Renderizando ${url}`);
    const loaded = client.once('Page.loadEventFired', 60000);
    await client.send('Page.navigate', { url });
    await loaded;

    // Las fuentes web cambian las métricas del texto: sin esperarlas, los
    // saltos de página se calculan con la fuente de reserva.
    // Se devuelve como cadena JSON: la serialización de objetos por valor del
    // protocolo es inconsistente entre versiones de Chrome.
    const probe = await client.send('Runtime.evaluate', {
      expression: `
        (async () => {
          // ORDEN IMPORTANTE: primero esperar a que React monte la hoja. Las
          // fuentes solo se descargan cuando hay texto que las use, así que
          // esperar \`fonts.ready\` antes del render la resuelve en vacío.
          for (let i = 0; i < 200 && !document.querySelector('.cv-page'); i++) {
            await new Promise((r) => setTimeout(r, 50));
          }
          const el = document.querySelector('.cv-page');
          if (!el) return JSON.stringify({ heightMm: null });

          // Forzar la descarga de cada familia y esperar a que termine.
          await Promise.all([
            document.fonts.load('600 19pt "Space Grotesk"'),
            document.fonts.load('400 10pt "Inter"'),
            document.fonts.load('500 10pt "Inter"'),
            document.fonts.load('400 8pt "JetBrains Mono"'),
          ]);
          await document.fonts.ready;

          return JSON.stringify({
            grotesk: document.fonts.check('600 19pt "Space Grotesk"'),
            inter: document.fonts.check('400 10pt "Inter"'),
            mono: document.fonts.check('400 8pt "JetBrains Mono"'),
            heightMm: el.getBoundingClientRect().height / 3.779528,
          });
        })()
      `,
      awaitPromise: true,
      returnByValue: true,
    });

    if (probe.exceptionDetails) {
      throw new Error(
        `Fallo al inspeccionar la página: ${probe.exceptionDetails.exception?.description ?? probe.exceptionDetails.text}`
      );
    }

    const info = JSON.parse(probe.result.value);
    if (info.heightMm == null) throw new Error('No se encontró .cv-page en la página renderizada.');

    if (!info.grotesk || !info.inter || !info.mono) {
      console.warn(
        `⚠ Alguna tipografía no cargó (¿sin conexión?): ${JSON.stringify(info)}\n` +
          '  El PDF usará fuentes de reserva y el diseño puede desplazarse.'
      );
    } else {
      console.log('  tipografías cargadas correctamente');
    }
    console.log(`  alto del contenido ≈ ${info.heightMm.toFixed(1)} mm`);

    const { data } = await client.send('Page.printToPDF', {
      printBackground: true,
      preferCSSPageSize: true, // toma el tamaño A4 del @page de print.css
      displayHeaderFooter: false,
      transferMode: 'ReturnAsBase64',
      // Los márgenes de la API se SUMAN a los del @page (por defecto 1 cm cada
      // uno), lo que robaba ~18 mm y partía la hoja en dos. A cero: manda el CSS.
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
    });

    fs.writeFileSync(OUTPUT, Buffer.from(data, 'base64'));
    client.close();

    // Verificación: número de páginas y que el texto sea extraíble (ATS).
    const pdf = fs.readFileSync(OUTPUT, 'latin1');
    const count = /\/Count\s+(\d+)/.exec(pdf);
    const pages = count ? count[1] : '?';
    const hasText = /\/Type\s*\/Font/.test(pdf);

    console.log(`✓ PDF generado: ${OUTPUT}`);
    console.log(`  ${(fs.statSync(OUTPUT).size / 1024).toFixed(0)} KB · ${pages} página(s) · texto vectorial: ${hasText ? 'sí' : 'NO'}`);
    if (pages !== '1') {
      console.warn('⚠ Se esperaba 1 página. Revisa el alto del contenido en print.css.');
    }
  } finally {
    cleanup();
  }
})().catch((err) => {
  console.error('✗ No se pudo generar el PDF:', err.message);
  process.exit(1);
});
