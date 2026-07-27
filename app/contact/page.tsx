import type { Metadata } from 'next';
import { ContactContent } from '@/components/pages/contact/ContactContent';

export const metadata: Metadata = {
  title: 'Contact Us | Gato Montes Construction',
  description: 'Get a free quote for your handyman project. Call us or send a message — serving Wickenburg, Arizona and surrounding areas.',
  alternates: {
    canonical: 'https://handymaninwickenburg.com/contact',
    languages: {
      en: 'https://handymaninwickenburg.com/contact',
      es: 'https://handymaninwickenburg.com/contacto',
    },
  },
  openGraph: {
    title: 'Contact Us | Gato Montes Construction',
    description: 'Get a free quote for your handyman project in Wickenburg, Arizona.',
    locale: 'en_US',
  },
};

export default function ContactPageEN() {
  return <ContactContent lang="en" />;
}