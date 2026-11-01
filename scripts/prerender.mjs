import { createServer } from 'vite';
import { renderToString } from 'react-dom/server';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const pagesUrl = 'https://sebastisnzoth.github.io/faxina/';
const siteUrl = process.env.VERCEL === '1'
  ? 'https://faxina-gray.vercel.app/'
  : pagesUrl;

const server = await createServer({
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
  logLevel: 'error'
});

try {
  const { default: App } = await server.ssrLoadModule('/src/App.tsx');
  const React = await import('react');
  const body = renderToString(React.createElement(App));
  const target = resolve('dist/index.html');
  const html = await readFile(target, 'utf8');
  const marker = '<div id="root"></div>';
  if (!html.includes(marker)) throw new Error('Root marker missing from built HTML');
  if (!body.includes('Faxina em Florianópolis')) throw new Error('Expected local SEO content missing');

  // Canonical, social metadata and JSON-LD must reflect the deployed hostname.
  const rendered = html.replace(marker, '<div id="root">' + body + '</div>')
    .replaceAll(pagesUrl, siteUrl);
  await writeFile(target, rendered, 'utf8');

  // Only real, independently addressable pages belong in the sitemap.
  const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    '  <url><loc>' + siteUrl + '</loc></url>\n' +
    '</urlset>\n';
  await writeFile(resolve('dist/sitemap.xml'), sitemap, 'utf8');
  await writeFile(resolve('dist/robots.txt'),
    'User-agent: *\nAllow: /\nSitemap: ' + siteUrl + 'sitemap.xml\n', 'utf8');
  console.log('Prerender and sitemap created for ' + siteUrl);
} finally {
  await server.close();
}
