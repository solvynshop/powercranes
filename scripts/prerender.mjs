// Post-build step: writes one real HTML file per page and language (dist/en/index.html, dist/location-grue/tanger/index.html...)
// with the right <title>, description, canonical, hreflang, FAQ data and a crawler-readable summary, then generates sitemap.xml.
// No extra dependency: it bundles src/seo/pages.ts with esbuild, which Vite already ships.
import { build } from 'esbuild';
import { mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const SITE = 'https://powercranesma.com';
const tmp = join(root, 'node_modules', '.prerender.mjs');

await build({
  entryPoints: [join(root, 'src/seo/pages.ts')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: tmp,
  alias: { '@': join(root, 'src') },
  logLevel: 'error',
});
const { allPages, dicts, localize } = await import(pathToFileURL(tmp).href + `?t=${Date.now()}`);
rmSync(tmp, { force: true });

const template = readFileSync(join(dist, 'index.html'), 'utf8');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const LOCALE = { fr: 'fr_MA', en: 'en_US', ar: 'ar_MA' };
const LANGS = ['fr', 'en', 'ar'];

function setHead(html, re, replacement) {
  if (!re.test(html)) throw new Error(`prerender: template is missing ${re}`);
  return html.replace(re, replacement);
}

const pages = allPages();
const sitemap = [];

for (const p of pages) {
  const url = `${SITE}${localize(p.route, p.lang)}`;
  const t = dicts[p.lang];
  let html = template;
  html = setHead(html, /<html lang="[^"]*"[^>]*>/, `<html lang="${p.lang}" dir="${p.lang === 'ar' ? 'rtl' : 'ltr'}">`);
  html = setHead(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(p.title)}</title>`);
  html = setHead(html, /<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${esc(p.description)}" />`);
  html = setHead(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`);
  html = setHead(html, /<meta property="og:locale" content="[^"]*" \/>/, `<meta property="og:locale" content="${LOCALE[p.lang]}" />`);
  html = setHead(html, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`);
  html = setHead(html, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(p.title)}" />`);
  html = setHead(html, /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${esc(p.description)}" />`);

  let extra = `<meta name="robots" content="${p.noindex ? 'noindex, nofollow' : 'index, follow'}" />\n`;
  if (!p.noindex) {
    for (const l of LANGS) extra += `    <link rel="alternate" hreflang="${l}" href="${SITE}${localize(p.route, l)}" />\n`;
    extra += `    <link rel="alternate" hreflang="x-default" href="${SITE}${localize(p.route, 'fr')}" />\n`;
  }
  if (p.faq) {
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: p.lang,
      mainEntity: t.faq.items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
    };
    extra += `    <script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>\n`;
  }
  if (p.images?.length) {
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'ImageGallery',
      inLanguage: p.lang,
      name: t.gallery.title,
      image: p.images.map((i) => ({ '@type': 'ImageObject', contentUrl: `${SITE}${i.src}`, caption: i.caption, contentLocation: { '@type': 'Place', name: i.city, address: { '@type': 'PostalAddress', addressCountry: 'MA' } } })),
    };
    extra += `    <script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>\n`;
  }
  html = html.replace('</head>', `    ${extra}  </head>`);

  // Crawler-readable summary inside #root: it looks like the dark loading screen and is replaced as soon as React renders.
  const navLinks = LANGS.map((l) => `<a href="${localize(p.route, l)}" hreflang="${l}" style="color:#F89008;margin-inline-end:14px">${l.toUpperCase()}</a>`).join('');
  const splash =
    `<div style="min-height:100vh;background:#08183C;color:#fff;padding:120px 24px 40px;font-family:system-ui,sans-serif">` +
    `<h1 style="font-size:clamp(28px,6vw,52px);line-height:1.05;max-width:820px;margin:0 0 20px">${esc(p.h1)}</h1>` +
    `<p style="max-width:680px;font-size:18px;line-height:1.6;color:#C9D3E8">${esc(p.intro)}</p>` +
    `<p style="margin-top:24px">${navLinks}</p></div>`;
  html = setHead(html, /<div id="root"><\/div>/, `<div id="root">${splash}</div>`);

  const out = p.route === '/' && p.lang === 'fr' ? join(dist, 'index.html') : join(dist, localize(p.route, p.lang), 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);

  if (!p.noindex) sitemap.push(p);
}

const today = new Date().toISOString().slice(0, 10);
const entry = (p) => {
  const alts = LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE}${localize(p.route, l)}"/>`).join('\n') +
    `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${localize(p.route, 'fr')}"/>`;
  const prio = p.route === '/' ? '1.0' : p.route.startsWith('/location-grue') ? '0.8' : '0.3';
  return `  <url>\n    <loc>${SITE}${localize(p.route, p.lang)}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${prio}</priority>\n${alts}\n  </url>`;
};
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sitemap.map(entry).join('\n')}\n</urlset>\n`
);
console.log(`prerender: ${pages.length} pages written, ${sitemap.length} in sitemap.xml`);
