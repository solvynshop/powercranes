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
Chaque page existe en 3 langues : `/` (FR), `/en/`, `/ar/`. Accueil, `/privacy/`, `/terms/`, `/thank-you/`, et une page par ville `/location-grue/<ville>/` (Tanger, Tanger-Med, Casablanca, Rabat, Marrakech, Agadir, Fès) + 404 personnalisée.
Au premier passage, le visiteur est dirigé vers la langue de son téléphone (son choix manuel est mémorisé ; les robots ne sont jamais redirigés).
SEO : `npm run build` génère un vrai fichier HTML par page et par langue (`scripts/prerender.mjs`) avec titre, description, canonical, hreflang, FAQ structurée et `sitemap.xml`. Ajouter une ville : `src/seo/cities.ts` + une phrase dans `cityNotes` (3 langues).

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

## Hébergement sur le serveur du client (Apache / cPanel)
1. Créer un fichier `.env.production` (non versionné) avec `VITE_FORM_ENDPOINT=https://formspree.io/f/XXXX` (et `VITE_GA_ID` si besoin). Ces valeurs sont intégrées au moment du build.
2. `npm run build`
3. Envoyer **le contenu** du dossier `dist/` (y compris `.htaccess`) dans `public_html/`.
4. Activer le HTTPS (certificat SSL gratuit dans cPanel).

## Offre affichée
Grue mobile 100 t, location **longue durée uniquement (à partir de 3 mois)**, partout au Maroc.

## Galerie « Réalisations » (photos / vidéos)
Pour ajouter une photo : la copier dans `public/gallery/` en la nommant `NUMERO-VILLE.jpg` (ex. `01-tanger-med.jpg`, `02-casablanca.mp4`), puis `npm run build`. Les légendes FR/EN/AR, le lien de menu et les données Google sont générés automatiquement. Détails dans `public/gallery/LISEZ-MOI.txt`. La section reste masquée tant que le dossier est vide.
