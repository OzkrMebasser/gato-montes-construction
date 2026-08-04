import type { Metadata } from 'next';
import { HomeContent } from '@/components/pages/home/HomeContent';

export const metadata: Metadata = {
  title: 'Gato Montes Construction | Handyman en Wickenburg, AZ',
  description: 'Servicios confiables de handyman y construcción en Wickenburg, Arizona. Remodelación de baños, pisos y azulejo, puertas y ventanas, estuco y cercos, drywall y pintura.',
  alternates: {
    canonical: 'https://www.handymaninwickenburg.com/inicio',
    languages: {
      en: 'https://www.handymaninwickenburg.com/',
      es: 'https://www.handymaninwickenburg.com/inicio',
    },
  },
  openGraph: {
    title: 'Gato Montes Construction | Handyman en Wickenburg, AZ',
    description: 'Servicios confiables de handyman y construcción en Wickenburg, Arizona.',
    type: 'website',
    locale: 'es_MX',
  },
};

export default function HomePageES() {
  return <HomeContent lang="es" />;
}