import type { Metadata } from 'next';
import { ServicesContent } from '@/components/pages/services/ServicesContent';

export const metadata: Metadata = {
  title: 'Handyman Services | Gato Montes Construction',
  description: 'Bathroom remodeling, flooring & tile, doors & windows, stucco & fence repair, drywall, and painting services in Wickenburg, Arizona.',
  alternates: {
    canonical: 'https://www.handymaninwickenburg.com/services',
    languages: {
      en: 'https://www.handymaninwickenburg.com/services',
      es: 'https://www.handymaninwickenburg.com/servicios',
    },
  },
  openGraph: {
    title: 'Handyman Services | Gato Montes Construction',
    description: 'Bathroom remodeling, flooring & tile, doors & windows, stucco, drywall, and painting.',
    locale: 'en_US',
  },
};

export default function ServicesPageEN() {
  return <ServicesContent lang="en" />;
}