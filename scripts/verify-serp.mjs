import { readFile, stat } from 'node:fs/promises';
import assert from 'node:assert/strict';
const host = process.env.VERCEL === '1'
  ? 'https://faxina-gray.vercel.app/'
  : 'https://sebastisnzoth.github.io/faxina/';
const html = await readFile('dist/index.html', 'utf8');
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
const robots = await readFile('dist/robots.txt', 'utf8');
const title = 'Diarista em Florianópolis | Faxina e Limpeza – FloriClean';
const description = 'Precisa de diarista em Florianópolis? Solicite orçamento de faxina residencial, limpeza de temporada, comercial ou pós-obra com a FloriClean pelo WhatsApp.';
assert.ok(html.includes('<title>' + title + '</title>'), 'Home SEO title mismatch');
assert.ok(html.includes('<meta name="description" content="' + description + '"'), 'Description mismatch');
assert.ok(html.includes('<meta property="og:site_name" content="FloriClean"'), 'Brand missing from OG');
assert.ok(html.includes('<meta property="og:title" content="' + title + '"'), 'OG title mismatch');
assert.ok(html.includes('<link rel="canonical" href="' + host + '"'), 'Wrong canonical hostname');
assert.ok(html.includes('rel="icon"'), 'Favicon missing');
const match = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/);
assert.ok(match, 'WebSite structured data missing');
const graph = JSON.parse(match[1])['@graph'];
const site = graph.find(item => item['@type'] === 'WebSite');
assert.ok(site && site.name === 'FloriClean' && site.url === host, 'WebSite identity mismatch');
assert.ok(sitemap.includes('<loc>' + host + '</loc>'), 'Sitemap homepage missing');
assert.ok(sitemap.includes('<loc>' + host + 'diarista/</loc>'), 'Sitemap service route missing');
assert.ok(robots.includes('Sitemap: ' + host + 'sitemap.xml'), 'Robots sitemap hostname mismatch');
assert.ok((await stat('dist/favicon.png')).size > 100, 'Favicon file missing');
console.log('SERP metadata PASS for ' + host + ': title, description, brand, canonical, JSON-LD, sitemap, robots, favicon');
