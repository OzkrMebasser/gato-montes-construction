import type { Metadata } from 'next';
import { AboutContent } from '@/components/pages/about/AboutContent';

export const metadata: Metadata = {
  title: 'Nosotros | Gato Montes Construction',
  description: 'Con más de 20 años de experiencia, Gato Montes Construction es su socio de confianza en Wickenburg, Arizona.',
  alternates: {
    canonical: 'https://tudominio.com/nosotros',
    languages: {
      en: 'https://tudominio.com/about',
      es: 'https://tudominio.com/nosotros',
    },
  },
  openGraph: {
    title: 'Nosotros | Gato Montes Construction',
    description: 'Su socio de confianza en Wickenburg, Arizona.',
    locale: 'es_MX',
  },
};

export default function AboutPageES() {
  return <AboutContent lang="es" />;
}