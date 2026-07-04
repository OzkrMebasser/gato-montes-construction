import type { Metadata } from 'next';
import { AboutContent } from '@/components/pages/about/AboutContent';

export const metadata: Metadata = {
  title: 'About Us | Gato Montes Construction',
  description: 'With over 20 years of experience, Gato Montes Construction is your trusted handyman partner in Wickenburg, Arizona.',
  alternates: {
    canonical: 'https://tudominio.com/about',
    languages: {
      en: 'https://tudominio.com/about',
      es: 'https://tudominio.com/nosotros',
    },
  },
  openGraph: {
    title: 'About Us | Gato Montes Construction',
    description: 'Your trusted handyman partner in Wickenburg, Arizona.',
    locale: 'en_US',
  },
};

export default function AboutPageEN() {
  return <AboutContent lang="en" />;
}