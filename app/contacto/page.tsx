import type { Metadata } from 'next';
import { ContactContent } from '@/components/pages/contact/ContactContent';

export const metadata: Metadata = {
  title: 'Contáctenos | Gato Montes Construction',
  description: 'Obtenga una cotización gratis para su proyecto. Llámenos o envíenos un mensaje — servimos Wickenburg, Arizona y sus alrededores.',
  alternates: {
    canonical: 'https://tudominio.com/contacto',
    languages: {
      en: 'https://tudominio.com/contact',
      es: 'https://tudominio.com/contacto',
    },
  },
  openGraph: {
    title: 'Contáctenos | Gato Montes Construction',
    description: 'Obtenga una cotización gratis para su proyecto en Wickenburg, Arizona.',
    locale: 'es_MX',
  },
};

export default function ContactPageES() {
  return <ContactContent lang="es" />;
}