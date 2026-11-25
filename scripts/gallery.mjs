// Reads public/gallery/ and writes src/lib/gallery.generated.json, so adding a photo = dropping a file in the folder.
// File name:  <number>-<city>.<ext>   e.g.  01-tanger-med.jpg   02-casablanca.mp4   03-rabat.webp
// Video preview picture (optional):  02-casablanca-poster.jpg
// Custom captions (optional): public/gallery/captions.json  ->  { "01-tanger-med.jpg": { "fr": "...", "en": "...", "ar": "..." } }
import { build } from 'esbuild';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'public', 'gallery');
const out = join(root, 'src', 'lib', 'gallery.generated.json');
const tmp = join(root, 'node_modules', '.gallery-cities.mjs');

await build({ entryPoints: [join(root, 'src/seo/cities.ts')], bundle: true, format: 'esm', platform: 'node', outfile: tmp, logLevel: 'error' });
const { CITIES } = await import(pathToFileURL(tmp).href + `?t=${Date.now()}`);
rmSync(tmp, { force: true });

const IMAGES = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const VIDEOS = new Set(['.mp4', '.webm']);
const titleCase = (s) => s.split('-').filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
const TEMPLATE = {
  fr: (c) => `Grue mobile 100 t en action · ${c}`,
  en: (c) => `100 t mobile crane at work · ${c}`,
  ar: (c) => `رافعة متنقلة 100 طن أثناء العمل · ${c}`,
};

mkdirSync(dir, { recursive: true });
const files = readdirSync(dir).sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
const captions = existsSync(join(dir, 'captions.json')) ? JSON.parse(readFileSync(join(dir, 'captions.json'), 'utf8')) : {};
const posters = new Map(files.filter((f) => /-poster\.[a-z]+$/i.test(f)).map((f) => [f.replace(/-poster\.[a-z]+$/i, ''), f]));

const items = [];
for (const file of files) {
  const ext = extname(file).toLowerCase();
  const base = file.slice(0, -ext.length);
  if (/-poster$/i.test(base) || !(IMAGES.has(ext) || VIDEOS.has(ext))) continue;
  const slug = base.replace(/^\d+[-_]?/, '').toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '');
  const known = CITIES.find((c) => c.slug === slug);
  const city = known ? known.names : { fr: titleCase(slug) || 'Maroc', en: titleCase(slug) || 'Morocco', ar: titleCase(slug) || 'المغرب' };
  const custom = captions[file] ?? {};
  const caption = {}, alt = {};
  for (const l of ['fr', 'en', 'ar']) {
    caption[l] = custom[l] ?? TEMPLATE[l](city[l]);
    alt[l] = custom[l] ?? TEMPLATE[l](city[l]);
  }
  const video = VIDEOS.has(ext);
  items.push({ type: video ? 'video' : 'image', src: `/gallery/${file}`, poster: video && posters.has(base) ? `/gallery/${posters.get(base)}` : undefined, city, alt, caption });
}
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(items, null, 2) + '\n');
console.log(`gallery: ${items.length} item(s) found in public/gallery`);
