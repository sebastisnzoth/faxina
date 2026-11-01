import { createServer } from 'vite';
import { renderToString } from 'react-dom/server';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

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
  if (!body.includes('Faxina em Florianópolis')) throw new Error('Expected local SEO content not found in rendered HTML');
  await writeFile(target, html.replace(marker, '<div id="root">' + body + '</div>'), 'utf8');
  console.log('Pre-rendered FloriClean HTML for search engines');
} finally {
  await server.close();
}
