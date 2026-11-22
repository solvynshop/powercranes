# Power Cranes — site de location de grues (Tanger, Maroc)

Vite + React + TypeScript + Tailwind. Trilingue FR / EN / AR (RTL), langue détectée depuis l'appareil.

## Lancer en local
```bash
npm install          # nécessaire (nouvelle dépendance @vercel/analytics)
npm run dev          # http://localhost:5173
npm run build        # TypeScript + build de production
npm run preview      # tester la vitesse réelle (build), pas le mode dev
```

## Mettre en ligne
```bash
git add -A && git commit -m "v3" && git push
```
Vercel redéploie automatiquement.

## Pages
`/` accueil · `/privacy` confidentialité · `/terms` conditions · `/thank-you` après envoi du devis · 404 personnalisée (`public/404.html`).
SEO : titres/descriptions par page (`src/lib/meta.ts`), `robots.txt`, `sitemap.xml`, image Open Graph, jeu de favicons, JSON-LD.

## Variables d'environnement (Vercel → Settings → Environment Variables)
- `VITE_FORM_ENDPOINT` — URL Formspree/Getform : les demandes de devis arrivent par e-mail. Sans elle, repli WhatsApp / e-mail.
- `VITE_GA_ID` — id Google Analytics 4 (`G-XXXXXXXXXX`). Chargé uniquement après consentement. Sans lui, seul Vercel Analytics (sans cookie) tourne ; activez-le dans Vercel → Analytics.

## À personnaliser
- `src/lib/config.ts` — coordonnées, identifiants légaux (RC, ICE, IF, TP), domaine.
- `src/lib/fleet.ts` — grue 100 t ; la flèche de 52 m est une valeur provisoire à confirmer.
- `public/brand/` — logos et image de la grue.
- `src/i18n/*` — textes ; l'arabe doit être relu par un locuteur natif.
- `src/lib/lift.ts` — modèle de levage **indicatif**, ne remplace pas un plan de levage.
- Pages légales : à faire valider par un juriste.
