/**
 * French is the source of truth: `Dict` is derived from this object, so en.ts
 * and ar.ts must provide exactly the same keys (TypeScript enforces it).
 */
export const fr = {
  meta: {
    title: 'Location de grues mobiles à Tanger et partout au Maroc | Power Cranes',
    description:
      'Power Cranes loue des grues mobiles avec opérateur à Tanger et partout au Maroc. Décrivez votre levage, nous vous recommandons la grue adaptée et vous envoyons un devis.',
  },
  units: { t: 't', m: 'm' },
  nav: {
    fleet: 'Notre parc',
    planner: 'Simulateur',
    services: 'Services',
    process: 'Méthode',
    coverage: 'Zones',
    contact: 'Contact',
    quote: 'Devis gratuit',
    menu: 'Menu',
    close: 'Fermer',
    language: 'Langue',
  },
  hero: {
    eyebrow: 'Location de grues mobiles · Tanger, Maroc',
    title: 'Location de grues mobiles',
    accent: 'à Tanger et partout au Maroc',
    sub: 'Dites-nous votre levage : charge, portée, hauteur. Nous vous recommandons la grue adaptée et vous envoyons un devis, opérateur qualifié inclus.',
    ctaQuote: 'Demander un devis',
    ctaPlanner: 'Calculer mon levage',
    badges: [
      'Opérateur qualifié inclus',
      'Livraison sur chantier',
      'Plan de levage sur demande',
      'À la demi-journée, au jour ou au mois',
    ],
    alt: 'Grue mobile Power Cranes de 100 tonnes',
  },
  fleet: {
    tag: 'Notre grue',
    title: 'Une grue mobile de 100 tonnes',
    intro:
      'Puissante et polyvalente : du levage de précision en ville aux charges industrielles. Louée avec son opérateur qualifié.',
    capacity: 'Capacité max.',
    boom: 'Flèche max.',
    axles: 'Essieux',
    bestFor: 'Idéale pour',
    cta: 'Louer cette grue',
    note: 'Illustrations indicatives. Le modèle exact et la disponibilité sont confirmés à la réservation.',
    use: {
      c100: 'Chantiers du bâtiment, charpentes métalliques, poutres, transformateurs, cuves et équipements lourds.',
    },
  },
  planner: {
    tag: 'Simulateur de levage',
    title: 'Quelle grue pour votre levage ?',
    intro:
      'Entrez la charge, la portée et la hauteur. Le simulateur vérifie si notre grue de 100 t peut réaliser l’opération en sécurité.',
    load: 'Charge à lever',
    radius: 'Portée (distance horizontale)',
    height: 'Hauteur de pose',
    recommended: 'Réalisable avec notre grue de',
    capacityAt: 'Capacité à {r} m',
    utilisation: 'Taux d’utilisation',
    boomNeeded: 'Flèche nécessaire',
    boomAngle: 'Angle de flèche',
    alternatives: 'Aussi possible avec',
    none: 'Au-delà de notre grue de 100 t',
    noneLoad:
      'Cette charge dépasse la capacité de notre grue de 100 t à cette portée. Contactez-nous : nous étudierons une solution sur mesure.',
    noneReach:
      'Cette portée ou cette hauteur dépasse la flèche de notre grue de 100 t. Contactez-nous : nous étudierons une solution sur mesure.',
    disclaimer:
      'Estimation indicative avec une marge de sécurité de 25 % et 3,5 m d’élingage. Le choix final est confirmé par un plan de levage établi par nos équipes.',
    cta: 'Demander un devis pour ce levage',
    chart: 'Courbe de charge',
    radiusAxis: 'Portée (m)',
    capacityAxis: 'Capacité (t)',
    yourLift: 'Votre levage',
    sceneAlt: 'Schéma de votre levage',
  },
  services: {
    tag: 'Inclus dans la location',
    title: 'Louer une grue, sans mauvaise surprise',
    intro: 'Une offre claire : la grue, l’opérateur et l’organisation du levage.',
    items: [
      { title: 'Opérateur qualifié inclus', text: 'Chaque grue est louée avec son opérateur expérimenté.' },
      { title: 'Livraison et mise en place', text: 'Transport, positionnement et calage sur votre site.' },
      { title: 'Plan de levage', text: 'Analyse du site, du sol et de la charge avant toute opération.' },
      { title: 'Durées flexibles', text: 'De la demi-journée à plusieurs mois, selon votre chantier.' },
      { title: 'Accessoires d’élingage', text: 'Élingues, manilles et palonniers disponibles sur demande.' },
      { title: 'Intervention nationale', text: 'Basés à Tanger, nous nous déplaçons partout au Maroc.' },
    ],
  },
  process: {
    tag: 'Comment ça marche',
    title: 'De votre demande au levage en 4 étapes',
    steps: [
      { title: 'Décrivez votre levage', text: 'Charge, portée, hauteur, lieu et dates. Le simulateur vous aide.' },
      { title: 'Recevez votre devis', text: 'Nous confirmons la grue adaptée et vous envoyons un devis clair.' },
      { title: 'Livraison et mise en place', text: 'La grue et son opérateur arrivent sur site, calés et prêts.' },
      { title: 'Levage et repli', text: 'L’opération est réalisée, puis le matériel est démobilisé.' },
    ],
  },
  sectors: {
    tag: 'Secteurs',
    title: 'Là où le Maroc se construit',
    intro: 'Des chantiers publics aux zones industrielles, nos grues interviennent là où il faut lever lourd.',
    items: [
      { title: 'Travaux publics', text: 'Routes, ponts, barrages et grands équipements de l’État.' },
      { title: 'Ports et logistique', text: 'Terminaux, zones franches et plateformes de Tanger-Med.' },
      { title: 'Industrie', text: 'Mise en place de machines, maintenance, usines automobiles et manufacturières.' },
      { title: 'Bâtiment et construction', text: 'Charpentes métalliques, préfabriqué, façades et équipements de toiture.' },
      { title: 'Énergie', text: 'Éolien, solaire, transformateurs et postes électriques.' },
    ],
  },
  safety: {
    tag: 'Sécurité',
    title: 'Un levage réussi est un levage maîtrisé',
    intro: 'La sécurité n’est pas une option : elle se prépare avant l’arrivée de la grue.',
    items: [
      { title: 'Opérateurs formés', text: 'Des opérateurs qualifiés et rompus à tous les types de levage.' },
      { title: 'Matériel contrôlé', text: 'Des grues vérifiées et entretenues avant chaque sortie sur chantier.' },
      { title: 'Plan de levage', text: 'Chaque opération est préparée en amont : sol, calage, trajectoires.' },
      { title: 'Chantier sécurisé', text: 'Périmètre, calage et signalisation conformes aux règles de sécurité du site.' },
    ],
    docs: 'Pièces administratives (RC, ICE, attestations) disponibles sur demande pour vos dossiers et appels d’offres.',
  },
  coverage: {
    tag: 'Zones d’intervention',
    title: 'Basés à Tanger, présents partout au Maroc',
    text: 'Notre siège est à Tanger-Médina, au cœur du nord logistique du Royaume. Nos grues se déplacent sur tout le territoire, de Tanger-Med à Casablanca.',
    cities: ['Tanger', 'Tanger-Med', 'Tétouan', 'Larache', 'Kénitra', 'Rabat', 'Casablanca', 'Fès'],
    hq: 'Siège',
  },
  quote: {
    tag: 'Devis',
    title: 'Demandez votre devis',
    intro:
      'Plus votre demande est précise, plus notre réponse est rapide. Le simulateur remplit déjà une partie des champs pour vous.',
    name: 'Nom complet',
    phone: 'Téléphone',
    company: 'Société',
    city: 'Ville du chantier',
    crane: 'Grue souhaitée',
    craneAuto: 'Je ne sais pas, conseillez-moi',
    load: 'Charge (t)',
    radius: 'Portée (m)',
    height: 'Hauteur (m)',
    date: 'Date de début',
    duration: 'Durée',
    durations: { half: 'Demi-journée', day: '1 jour', week: '1 semaine', month: '1 mois ou plus' },
    message: 'Détails du chantier',
    messagePh: 'Nature de la charge, accès au site, contraintes…',
    required: 'Champ obligatoire',
    fromPlanner: 'Données du simulateur',
    clearPlanner: 'Effacer',
    sendWhatsApp: 'Envoyer sur WhatsApp',
    sendEmail: 'Envoyer par e-mail',
    hintWhatsApp: 'Votre message s’ouvre dans WhatsApp, prêt à envoyer.',
    hintEmail: 'Votre application de messagerie s’ouvrira avec le message prêt à envoyer.',
    msg: {
      hello: 'Bonjour Power Cranes, je souhaite un devis pour la location d’une grue.',
      name: 'Nom',
      phone: 'Téléphone',
      company: 'Société',
      city: 'Ville du chantier',
      crane: 'Grue',
      load: 'Charge',
      radius: 'Portée',
      height: 'Hauteur',
      date: 'Début',
      duration: 'Durée',
      details: 'Détails',
    },
    mailSubject: 'Demande de devis : location de grue',
  emailField: 'E-mail (facultatif)',
    submit: 'Envoyer la demande',
    sending: 'Envoi en cours…',
    hintForm: 'Votre demande nous parvient directement. Réponse sous un jour ouvré.',
    consentPre: 'J’accepte que mes informations soient utilisées pour répondre à ma demande (',
    consentLink: 'politique de confidentialité',
    consentPost: ').',
    errors: {
      name: 'Indiquez votre nom (2 caractères minimum).',
      phone: 'Indiquez un numéro valide (8 chiffres minimum).',
      email: 'Cette adresse e-mail semble incorrecte.',
      consent: 'Cochez la case pour envoyer votre demande.',
      summary: 'Merci de corriger les champs signalés.',
      send: 'L’envoi a échoué. Réessayez, ou contactez-nous directement :'
    },
    alt: 'Ou contactez-nous directement',
  },
  contact: {
    tag: 'Contact',
    title: 'Nous trouver',
    address: 'Adresse',
    email: 'E-mail',
    hours: 'Horaires',
    hoursLines: ['Lun – Ven · 08:30 – 18:30', 'Sam · 09:00 – 13:00'],
    phone: 'Téléphone',
    whatsapp: 'WhatsApp',
    maps: 'Ouvrir dans Google Maps',
    mapTitle: 'Carte : Power Cranes à Tanger',
  },
  footer: {
    tagline: 'Location de grues mobiles à Tanger et partout au Maroc.',
    nav: 'Navigation',
    contact: 'Contact',
    rights: 'Tous droits réservés.',
    top: 'Haut de page',
  privacy: 'Confidentialité',
    terms: 'Conditions et mentions légales',
  },
  thanks: {
    meta: {
      title: 'Merci | Power Cranes',
      description: 'Votre demande de devis a bien été prise en compte.'
    },
    form: {
      h: 'Demande reçue, merci !',
      p: 'Nous avons bien reçu votre demande de devis. Un membre de l’équipe vous répond sous un jour ouvré.'
    },
    whatsapp: {
      h: 'Votre message est prêt dans WhatsApp',
      p: 'Il ne reste qu’à appuyer sur « Envoyer » dans WhatsApp. Si la fenêtre ne s’est pas ouverte, appelez-nous ou écrivez-nous par e-mail.'
    },
    email: {
      h: 'Votre e-mail est prêt',
      p: 'Il ne reste qu’à l’envoyer depuis votre application de messagerie. Si elle ne s’est pas ouverte, écrivez-nous à l’adresse ci-dessous.'
    },
    next: 'Et maintenant ?',
    steps: [
      'Nous étudions votre levage : charge, portée, hauteur et accès au site.',
      'Nous vous proposons la grue adaptée et un devis clair.',
      'Après votre accord, nous planifions la livraison et la mise en place.'
    ],
    home: 'Retour à l’accueil',
    call: 'Appeler maintenant'
  },
  notFound: {
    meta: {
      title: 'Page introuvable (404) | Power Cranes'
    },
    h: 'Page introuvable',
    p: 'Cette page n’existe pas ou a été déplacée. Revenez à l’accueil ou demandez directement votre devis.',
    home: 'Retour à l’accueil',
    quote: 'Demander un devis'
  },
  cookie: {
    aria: 'Cookies et confidentialité',
    info: 'Ce site mesure son audience sans cookies de suivi et mémorise votre langue sur votre appareil.',
    ask: 'Souhaitez-vous autoriser Google Analytics (cookies) pour nous aider à améliorer le site ?',
    ok: 'OK',
    accept: 'Accepter',
    decline: 'Refuser',
    more: 'En savoir plus',
    manage: 'Cookies'
  },
  legal: {
    updated: 'Dernière mise à jour : 19 novembre 2026',
    back: 'Retour à l’accueil',
    labels: {
      company: 'Société',
      manager: 'Gérant',
      rc: 'Registre de commerce',
      ice: 'ICE',
      if_: 'Identifiant fiscal',
      tp: 'Taxe professionnelle',
      address: 'Adresse',
      email: 'E-mail',
      phone: 'Téléphone',
      host: 'Hébergeur'
    },
    privacy: {
      meta: {
        title: 'Politique de confidentialité | Power Cranes',
        description: 'Comment Power Cranes collecte, utilise et protège vos données personnelles.'
      },
      title: 'Politique de confidentialité',
      intro: 'Cette page explique quelles données nous recueillons lorsque vous utilisez ce site, pourquoi, et quels sont vos droits.',
      sections: [
        {
          h: '1. Responsable du traitement',
          p: [
            'Power Cranes SARL AU, 183 Avenue Prince Héritier, Center Nrea, Bureau N°15, Tanger (Maroc), RC 147703, ICE 00346737700080. Contact : info@powercranesma.com.'
          ]
        },
        {
          h: '2. Données que nous recueillons',
          p: [
            'Lorsque vous demandez un devis : votre nom, votre numéro de téléphone, votre e-mail (facultatif), votre société, la ville du chantier, les caractéristiques de votre levage et votre message.',
            'Statistiques de fréquentation anonymes (pages vues, pays, type d’appareil), sans cookies de suivi et sans identifier les visiteurs.',
            'Sur votre appareil uniquement : votre choix de langue et votre choix concernant les cookies.'
          ]
        },
        {
          h: '3. Pourquoi, et sur quelle base',
          p: [
            'Répondre à votre demande de devis et préparer la location : mesures précontractuelles prises à votre demande.',
            'Mesurer l’audience et améliorer le site : intérêt légitime.',
            'Mesure d’audience par cookies (Google Analytics), uniquement si vous l’acceptez : consentement.'
          ]
        },
        {
          h: '4. Qui reçoit vos données',
          p: [
            'L’équipe de Power Cranes. Nos prestataires techniques : Vercel Inc. (hébergement et mesure d’audience), le service d’envoi de formulaires que nous utilisons le cas échéant, et WhatsApp (Meta) si vous choisissez ce canal. La carte de la page Contact est fournie par Google. Certains de ces prestataires sont situés hors du Maroc.',
            'Nous ne vendons jamais vos données.'
          ]
        },
        {
          h: '5. Durée de conservation',
          p: [
            'Les demandes de devis sont conservées le temps nécessaire à leur traitement et, au maximum, 3 ans après notre dernier échange commercial.'
          ]
        },
        {
          h: '6. Vos droits',
          p: [
            'Conformément à la loi n° 09-08 relative à la protection des personnes physiques à l’égard du traitement des données à caractère personnel, vous pouvez accéder à vos données, les faire corriger ou supprimer, et vous opposer à leur traitement. Écrivez-nous à info@powercranesma.com.',
            'Vous pouvez également saisir la Commission nationale de contrôle de la protection des données à caractère personnel (CNDP).'
          ]
        },
        {
          h: '7. Cookies et stockage local',
          p: [
            'Par défaut, ce site n’utilise aucun cookie de suivi. Le stockage local de votre navigateur conserve votre langue et votre choix concernant les cookies. Si Google Analytics est activé, il n’est chargé qu’après votre accord, que vous pouvez retirer à tout moment via le lien « Cookies » en bas de page.'
          ]
        },
        {
          h: '8. Modifications',
          p: [
            'Nous pouvons mettre à jour cette politique. La date de dernière mise à jour figure en haut de la page.'
          ]
        }
      ]
    },
    terms: {
      meta: {
        title: 'Conditions d’utilisation et mentions légales | Power Cranes',
        description: 'Mentions légales, conditions d’utilisation du site et informations sur la location de grues Power Cranes.'
      },
      title: 'Conditions d’utilisation et mentions légales',
      intro: 'En utilisant ce site, vous acceptez les conditions ci-dessous.',
      sections: [
        {
          h: '1. Éditeur du site',
          p: []
        },
        {
          h: '2. Hébergement',
          p: [
            'Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.'
          ]
        },
        {
          h: '3. Objet du site',
          p: [
            'Ce site présente les services de location de grues mobiles de Power Cranes. Les informations qu’il contient sont données à titre indicatif et ne constituent pas une offre contractuelle.'
          ]
        },
        {
          h: '4. Simulateur de levage',
          p: [
            'Le simulateur fournit une estimation indicative de la faisabilité d’un levage. Il ne remplace en aucun cas une étude et un plan de levage. La décision finale appartient à Power Cranes après analyse de votre chantier, et Power Cranes ne peut être tenue responsable d’une opération organisée sur la seule base de cette estimation.'
          ]
        },
        {
          h: '5. Devis et location',
          p: [
            'Aucune commande n’est passée en ligne. Chaque location fait l’objet d’un devis écrit de Power Cranes. Les tarifs, la durée, les assurances, les responsabilités et les conditions d’accès au site sont fixés dans le devis ou le contrat de location accepté par les deux parties.'
          ]
        },
        {
          h: '6. Propriété intellectuelle',
          p: [
            'Les logos, textes, images et illustrations de ce site appartiennent à Power Cranes. Toute reproduction sans accord écrit préalable est interdite.'
          ]
        },
        {
          h: '7. Liens externes et responsabilité',
          p: [
            'Nous nous efforçons de maintenir ce site exact et disponible, sans garantie d’absence d’erreur ou d’interruption. Power Cranes n’est pas responsable du contenu des sites tiers vers lesquels ce site pointe.'
          ]
        },
        {
          h: '8. Droit applicable',
          p: [
            'Ces conditions sont soumises au droit marocain. En cas de litige, les tribunaux de Tanger sont compétents.'
          ]
        }
      ]
    }
  },
  sticky: { call: 'Appeler', whatsapp: 'WhatsApp', quote: 'Devis' },
};

export type Dict = typeof fr;
