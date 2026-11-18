# Power Cranes — site de location de grues (Tanger, Maroc)

Vite + React + TypeScript + Tailwind. Trilingue FR / EN / AR (RTL).

## Lancer en local
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # vérifie TypeScript + build de production
```

## Mettre en ligne
```bash
git add -A && git commit -m "Redesign: site de location de grues" && git push
```
Vercel redéploie automatiquement à chaque push.

## À personnaliser (avant la mise en ligne)
- `src/lib/config.ts` — **téléphone** et **WhatsApp** (vides = boutons masqués, le devis part par e-mail), e-mail, adresse.
- `src/lib/fleet.ts` — **flotte** : valeurs PLACEHOLDER (tonnage, flèche, essieux) à remplacer par la vraie flotte.
- `src/i18n/fr.ts | en.ts | ar.ts` — tous les textes. L'arabe doit être relu par un locuteur natif.
- `public/og-image.png` — image de partage, peut encore afficher l'ancienne identité.
- Le planificateur de levage (`src/lib/lift.ts`) est un modèle **indicatif** (avertissement affiché) ; il ne remplace pas un plan de levage.
