import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type Language = 'en' | 'fr';

type Dictionary = Record<string, { en: string; fr: string }>;

const dictionary: Dictionary = {
  home: { en: 'Home', fr: 'Accueil' },
  products: { en: 'Products', fr: 'Produits' },
  sectors: { en: 'Sectors', fr: 'Secteurs' },
  process: { en: 'How we work', fr: 'Notre méthode' },
  about: { en: 'About', fr: 'À propos' },
  contact: { en: 'Contact', fr: 'Contact' },
  quote: { en: 'Get a quote', fr: 'Demander un devis' },
  request: { en: 'Request a quote', fr: 'Demander un devis' },
  explore: { en: 'Explore our products', fr: 'Découvrir nos produits' },
  heroEyebrow: { en: 'B2B industrial supply · Tanger-Médina, Morocco', fr: 'Fourniture industrielle B2B · Tanger-Médina, Maroc' },
  heroTitle1: { en: "Lifting Morocco's", fr: "Élever l'industrie" },
  heroTitle2: { en: 'heavy industry', fr: 'marocaine' },
  heroTitle3: { en: 'with precision.', fr: 'avec précision.' },
  heroBody: { en: "Power Cranes supplies high-performance lifting components, crane spare parts, and industrial material-handling gear — bridging international manufacturers and Morocco's rapidly expanding industrial, automotive, and logistics sectors.", fr: "Power Cranes fournit des composants de levage haute performance, des pièces de rechange pour grues et des équipements de manutention — en reliant les fabricants internationaux aux secteurs industriels, automobiles et logistiques du Maroc." },
  compliant: { en: 'EN / DIN / ISO compliant', fr: 'Conforme EN / DIN / ISO' },
  delivery: { en: 'Nationwide delivery', fr: 'Livraison nationale' },
  customs: { en: 'Import & customs handled', fr: 'Import & dédouanement pris en charge' },
  scroll: { en: 'Scroll', fr: 'Défiler' },
  aboutTag: { en: 'About Power Cranes', fr: 'À propos de Power Cranes' },
  aboutTitle: { en: "A vital link between the world's", fr: 'Le lien stratégique entre les' },
  aboutAccent: { en: ' best manufacturers', fr: ' meilleurs fabricants' },
  aboutEnd: { en: " and Morocco's industry.", fr: " et l'industrie marocaine." },
  aboutBody: { en: "Headquartered in Tanger-Médina, Power Cranes SARL AU is a specialized corporate entity focused on industrial commercial trade, import-export, and premium technical equipment supplies. We act as a trusted B2B bridge between international manufacturers and Morocco's rapidly expanding industrial, automotive, and logistical sectors.", fr: "Basée à Tanger-Médina, Power Cranes SARL AU est une entreprise spécialisée dans le commerce industriel, l'import-export et la fourniture d'équipements techniques premium. Nous sommes le pont B2B de confiance entre les fabricants internationaux et les secteurs industriels, automobiles et logistiques en plein essor au Maroc." },
  aboutBody2: { en: 'Our core operations center on the strategic sourcing and importation of specialized heavy lifting components, machinery spare parts, and industrial material-handling gear — supplied directly to local manufacturing facilities and construction projects, ensuring supply-chain reliability, operational safety, and technical compliance.', fr: "Notre activité s'articule autour du sourcing stratégique et de l'importation de composants de levage, de pièces mécaniques et d'équipements de manutention — livrés directement aux usines et chantiers marocains pour garantir fiabilité, sécurité et conformité technique." },
  headquarters: { en: 'Headquarters', fr: 'Siège' },
  legal: { en: 'Legal form', fr: 'Forme juridique' },
  served: { en: 'Sectors served', fr: 'Secteurs servis' },
  online: { en: 'Online at', fr: 'En ligne sur' },
  reliability: { en: 'Supply-chain reliability', fr: 'Fiabilité de la chaîne logistique' },
  fromSourcing: { en: 'From sourcing to site delivery', fr: "Du sourcing jusqu'au chantier" },
  leadTime: { en: 'Lead time', fr: 'Délai' },
  whatSupply: { en: 'What we supply', fr: 'Ce que nous fournissons' },
  catalogTitle: { en: 'A catalog built for', fr: 'Un catalogue conçu pour' },
  heavyIndustry: { en: ' heavy industry.', fr: " l'industrie lourde." },
  catalogBody: { en: 'From forged hooks to complete overhead crane kits — every line item is sourced from qualified international mills and certified against EN, DIN and ISO standards.', fr: "Des crochets forgés aux kits complets de ponts roulants — chaque référence provient de fabricants internationaux qualifiés et répond aux normes EN, DIN et ISO." },
  sectorsTag: { en: 'Sectors we serve', fr: 'Nos secteurs' },
  sectorsTitle: { en: "Built for Morocco's", fr: "Au service de l'épine dorsale" },
  backbone: { en: ' industrial backbone.', fr: ' industrielle du Maroc.' },
  sectorsBody: { en: "From Tanger-Med to the Atlantic ports and inland factory belts — our equipment keeps the Kingdom's key sectors moving.", fr: "De Tanger-Med aux ports atlantiques et aux zones industrielles — nos équipements font avancer les secteurs clés du Royaume." },
  tangerReady: { en: 'Tanger-Med ready', fr: 'Prêt pour Tanger-Med' },
  marineTitle: { en: "Marine-grade equipment engineered for Africa's largest port.", fr: "Des équipements marins conçus pour le plus grand port d'Afrique." },
  howWork: { en: 'How we work', fr: 'Notre méthode' },
  processTitle: { en: 'From sourcing to site,', fr: 'Du sourcing au chantier,' },
  endToEnd: { en: ' end to end.', fr: ' de bout en bout.' },
  processBody: { en: 'We take care of the entire supply chain — you specify the need, we deliver certified equipment to your door.', fr: 'Nous prenons en charge toute la chaîne logistique — vous exprimez le besoin, nous livrons un équipement certifié à votre porte.' },
  partners: { en: "Sourcing from the world's leading manufacturers", fr: 'Sourcing auprès des leaders mondiaux' },
  contactTag: { en: 'Get in touch', fr: 'Parlons de votre projet' },
  contactTitle: { en: 'Request a quote or', fr: 'Demandez un devis ou' },
  consultation: { en: ' technical consultation.', fr: ' une consultation technique.' },
  contactBody: { en: 'Tell us what you are sourcing — spec, quantity, lead time. Our team in Tanger will reply within one business day with availability and pricing.', fr: "Dites-nous ce que vous recherchez — spécifications, quantité, délai. Notre équipe à Tanger vous répond sous un jour ouvré avec disponibilité et prix." },
  send: { en: 'Send request', fr: 'Envoyer la demande' },
  sending: { en: 'Sending...', fr: 'Envoi...' },
  received: { en: 'Request received', fr: 'Demande reçue' },
  reply: { en: 'We typically reply within one business day.', fr: 'Nous répondons généralement sous un jour ouvré.' },
  address: { en: 'Address', fr: 'Adresse' },
  phone: { en: 'Phone', fr: 'Téléphone' },
  email: { en: 'Email', fr: 'E-mail' },
  hours: { en: 'Hours', fr: 'Horaires' },
  fullName: { en: 'Full name', fr: 'Nom complet' },
  company: { en: 'Company', fr: 'Entreprise' },
  yourRequest: { en: 'Your request', fr: 'Votre demande' },
  describeRequest: { en: 'Describe the equipment, part numbers, quantity and target lead time...', fr: 'Décrivez l’équipement, les références, la quantité et le délai souhaité...' },
};

const productFrench: Record<string, string> = {
  'lifting-components': 'Composants de levage lourds', 'spare-parts': 'Pièces de rechange pour grues', 'material-handling': 'Équipements de manutention', 'industrial-machinery': 'Machines industrielles', 'port-logistics': 'Équipements portuaires et logistiques', 'automotive-tooling': 'Outillage automobile',
};
const sectorFrench: Record<string, string> = { construction: 'Construction', ports: 'Ports & logistique', automotive: 'Automobile', manufacturing: 'Industrie manufacturière' };
const langContext = createContext<{ language: Language; setLanguage: (language: Language) => void; t: (key: string) => string; localName: (id: string, english: string, kind?: 'product' | 'sector') => string }>({ language: 'en', setLanguage: () => undefined, t: (key) => key, localName: (_, english) => english });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const value = useMemo(() => ({
    language,
    setLanguage,
    t: (key: string) => dictionary[key]?.[language] ?? key,
    localName: (id: string, english: string, kind?: 'product' | 'sector') => language === 'fr' ? (kind === 'product' ? productFrench[id] : kind === 'sector' ? sectorFrench[id] : undefined) ?? english : english,
  }), [language]);
  return <langContext.Provider value={value}>{children}</langContext.Provider>;
}

export function useLanguage() { return useContext(langContext); }
