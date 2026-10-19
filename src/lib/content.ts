import {
  Cable,
  Wrench,
  Cog,
  Boxes,
  Anchor,
  Truck,
  ShieldCheck,
  Settings,
  PackageSearch,
  HardHat,
  Factory,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  specs: { label: string; value: string }[];
};

export const products: Product[] = [
  {
    id: 'lifting-components',
    name: 'Heavy Lifting Components',
    tagline: 'Wire ropes, hooks & load blocks',
    description:
      'High-tensile wire ropes, forged hooks, snatch blocks, and sheaves rated for extreme duty cycles — sourced from established international mills.',
    icon: Cable,
    specs: [
      { label: 'Capacity', value: 'Up to 500 t' },
      { label: 'Standard', value: 'EN 12385 / DIN' },
      { label: 'Origin', value: 'EU · Türkiye · CN' },
    ],
  },
  {
    id: 'spare-parts',
    name: 'Crane Spare Parts',
    tagline: 'OEM-spec replacement parts',
    description:
      'Gearboxes, brake assemblies, contactor panels, limit switches, hydraulic power units and bearings matched to your existing fleet — keeping downtime to a minimum.',
    icon: Wrench,
    specs: [
      { label: 'Compatibility', value: 'All major OEMs' },
      { label: 'Lead time', value: '15–45 days' },
      { label: 'Warranty', value: '12 months' },
    ],
  },
  {
    id: 'material-handling',
    name: 'Material Handling Gear',
    tagline: 'Conveyors, hoists & trolleys',
    description:
      'Electric chain hoists, wire-rope hoists, end-carriages, and overhead crane kits engineered for factories, ports, and logistics hubs across Morocco.',
    icon: Boxes,
    specs: [
      { label: 'Lift height', value: 'Up to 30 m' },
      { label: 'Duty class', value: 'M3 – M8' },
      { label: 'Control', value: 'VFD ready' },
    ],
  },
  {
    id: 'industrial-machinery',
    name: 'Industrial Machinery Supply',
    tagline: 'Factory apparatus & power units',
    description:
      'Hydraulic power packs, gear motors, reducers, and PLC-driven control cabinets supplied to assembly lines and heavy manufacturing facilities.',
    icon: Cog,
    specs: [
      { label: 'Power', value: '0.75 – 250 kW' },
      { label: 'Voltage', value: '400 / 690 V' },
      { label: 'IP rating', value: 'IP55 – IP66' },
    ],
  },
  {
    id: 'port-logistics',
    name: 'Port & Logistics Equipment',
    tagline: 'Reach stackers & spreaders',
    description:
      'Spreader frames, twist-locks, marine-grade wire slings, and lifting beams engineered for container terminals and bulk cargo operations at Tanger-Med.',
    icon: Anchor,
    specs: [
      { label: 'Spread', value: '20′ – 45′' },
      { label: 'Coating', value: 'Marine grade' },
      { label: 'Certification', value: 'DNV / BV' },
    ],
  },
  {
    id: 'automotive-tooling',
    name: 'Automotive Tooling',
    tagline: 'Assembly-line lifting & fixtures',
    description:
      "Custom lifting fixtures, body-handling manipulators, and ergonomic tooling feeding Morocco's fast-growing automotive manufacturing sector.",
    icon: HardHat,
    specs: [
      { label: 'Payload', value: '50 – 2 000 kg' },
      { label: 'Ergonomics', value: 'Assist-arm' },
      { label: 'Integration', value: 'Robot-ready' },
    ],
  },
];

export type Sector = {
  id: string;
  name: string;
  blurb: string;
  icon: LucideIcon;
};

export const sectors: Sector[] = [
  { id: 'construction', name: 'Construction', blurb: 'Tower cranes, parts and rigging for major projects across the Kingdom.', icon: HardHat },
  { id: 'ports', name: 'Ports & Logistics', blurb: 'Tanger-Med and Atlantic ports supplied with spreaders and slings.', icon: Anchor },
  { id: 'automotive', name: 'Automotive', blurb: 'Assembly-line lifting fixtures for Morocco’s OEM plants.', icon: Cog },
  { id: 'manufacturing', name: 'Manufacturing', blurb: 'Power units, reducers and control cabinets for factories.', icon: Factory },
];

export type Step = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const processSteps: Step[] = [
  {
    id: 'source',
    title: 'Strategic sourcing',
    description: 'We identify qualified international manufacturers and negotiate on spec, lead time and cost — on your behalf.',
    icon: PackageSearch,
  },
  {
    id: 'import',
    title: 'Import & customs',
    description: 'We handle export documentation, maritime freight, and Moroccan customs clearance end-to-end.',
    icon: Truck,
  },
  {
    id: 'quality',
    title: 'Quality & compliance',
    description: 'Every shipment is checked against EN / DIN / ISO standards before it leaves our Tanger warehouse.',
    icon: ShieldCheck,
  },
  {
    id: 'deliver',
    title: 'Delivery & support',
    description: 'Nationwide delivery plus after-sales technical support and a 12-month warranty on critical parts.',
    icon: Settings,
  },
];

export type Stat = { value: string; label: string };
export const stats: Stat[] = [
  { value: '12+', label: 'Years supplying industry' },
  { value: '200+', label: 'Active B2B clients' },
  { value: '40+', label: 'Partner manufacturers' },
  { value: '24/7', label: 'Technical support' },
];

export type Brand = { name: string };
export const partnerBrands: Brand[] = [
  { name: 'Demag' }, { name: 'Konecranes' }, { name: 'Liebherr' },
  { name: 'Stahl' }, { name: 'Verlinde' }, { name: 'ABUS' },
  { name: 'GH Cranes' }, { name: 'Pfaff-silberblau' }, { name: 'RUD' },
  { name: 'Crosby' }, { name: 'Yale' }, { name: 'Donati' },
];

export type NavLink = { id: string; label: string; children?: { id: string; label: string; desc: string }[] };

export const navLinks: NavLink[] = [
  { id: 'home', label: 'Home' },
  {
    id: 'products',
    label: 'Products',
    children: products.map((p) => ({ id: p.id, label: p.name, desc: p.tagline })),
  },
  {
    id: 'sectors',
    label: 'Sectors',
    children: sectors.map((s) => ({ id: s.id, label: s.name, desc: s.blurb })),
  },
  { id: 'process', label: 'How we work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export const images = {
  heroCrane: 'https://images.pexels.com/photos/209177/pexels-photo-209177.jpeg?auto=compress&cs=tinysrgb&w=1920',
  heroCrane2: 'https://images.pexels.com/photos/220252/pexels-photo-220252.jpeg?auto=compress&cs=tinysrgb&w=1600',
  portCranes: 'https://images.pexels.com/photos/35317553/pexels-photo-35317553.jpeg?auto=compress&cs=tinysrgb&w=1600',
  sunsetCranes: 'https://images.pexels.com/photos/30278762/pexels-photo-30278762.jpeg?auto=compress&cs=tinysrgb&w=1600',
  warehouse: 'https://images.pexels.com/photos/236709/pexels-photo-236709.jpeg?auto=compress&cs=tinysrgb&w=1600',
  warehouse2: 'https://images.pexels.com/photos/34207364/pexels-photo-34207364.jpeg?auto=compress&cs=tinysrgb&w=1600',
  gears: 'https://images.pexels.com/photos/633850/machine-mill-industry-steam-633850.jpeg?auto=compress&cs=tinysrgb&w=1600',
  factoryFloor: 'https://images.pexels.com/photos/34718922/pexels-photo-34718922.jpeg?auto=compress&cs=tinysrgb&w=1600',
  engineer: 'https://images.pexels.com/photos/13634590/pexels-photo-13634590.jpeg?auto=compress&cs=tinysrgb&w=900',
  worker: 'https://images.pexels.com/photos/34670931/pexels-photo-34670931.jpeg?auto=compress&cs=tinysrgb&w=900',
  cable: 'https://images.pexels.com/photos/12171896/pexels-photo-12171896.jpeg?auto=compress&cs=tinysrgb&w=1600',
  portIstanbul: 'https://images.pexels.com/photos/17004424/pexels-photo-17004424.jpeg?auto=compress&cs=tinysrgb&w=1600',
};
