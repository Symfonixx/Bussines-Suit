import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const docsRoot = resolve(root, 'docs');
const pdfRoot = resolve(docsRoot, 'pdf');

const pages = [
  { source: 'index.html', output: 'symfonix-docs-en.pdf' },
  { source: 'ar/index.html', output: 'symfonix-docs-ar.pdf' },
  { source: 'de/index.html', output: 'symfonix-docs-de.pdf' },
  { source: 'tr/index.html', output: 'symfonix-docs-tr.pdf' },
];

await mkdir(pdfRoot, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage();

for (const doc of pages) {
  const sourcePath = resolve(docsRoot, doc.source);
  const outputPath = resolve(pdfRoot, doc.output);

  await page.goto(pathToFileURL(sourcePath).href, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print' });
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: {
      top: '14mm',
      right: '14mm',
      bottom: '14mm',
      left: '14mm',
    },
  });

  console.log(`Generated ${outputPath}`);
}

await browser.close();
