import type { Metadata } from 'next';
import { ServicesContent } from '@/components/pages/services/ServicesContent';

export const metadata: Metadata = {
  title: 'Servicios de Handyman | Gato Montes Construction',
  description: 'Remodelación de baños, pisos y azulejo, puertas y ventanas, reparación de estuco y cercos, drywall y pintura en Wickenburg, Arizona.',
  alternates: {
    canonical: 'https://www.handymaninwickenburg.com/servicios',
    languages: {
      en: 'https://www.handymaninwickenburg.com/services',
      es: 'https://www.handymaninwickenburg.com/servicios',
    },
  },
  openGraph: {
    title: 'Servicios de Handyman | Gato Montes Construction',
    description: 'Remodelación de baños, pisos y azulejo, puertas y ventanas, estuco, drywall y pintura.',
    locale: 'es_MX',
  },
};

export default function ServicesPageES() {
  return <ServicesContent lang="es" />;
}