import type { Metadata } from 'next';
import { HomeContent } from '@/components/pages/home/HomeContent';

export const metadata: Metadata = {
  title: 'Gato Montes Construction | Handyman in Wickenburg, AZ',
  description: 'Trusted handyman and construction services in Wickenburg, Arizona. Bathroom remodeling, flooring & tile, doors & windows, stucco & fence repair, drywall, and painting.',
  alternates: {
    canonical: 'https://www.handymaninwickenburg.com/',
    languages: {
      en: 'https://www.handymaninwickenburg.com/',
      es: 'https://www.handymaninwickenburg.com/inicio',
    },
  },
  openGraph: {
    title: 'Gato Montes Construction | Handyman in Wickenburg, AZ',
    description: 'Trusted handyman and construction services in Wickenburg, Arizona.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function HomePageEN() {
  return <HomeContent lang="en" />;
}