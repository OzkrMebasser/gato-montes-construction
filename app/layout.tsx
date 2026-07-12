import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://handymaninwickenburg.com'),
  title: 'Gato Montes Construction | Handyman in Wickenburg, AZ',
  description: 'Trusted handyman and construction services in Wickenburg, Arizona. Bathroom remodeling, flooring & tile, doors & windows, stucco & fence repair, drywall, and painting.',
  keywords: 'handyman, construction, contractor, Wickenburg, Arizona, bathroom remodeling, flooring, tile, drywall, painting, stucco, fence repair',
  openGraph: {
    title: 'Gato Montes Construction | Handyman in Wickenburg, AZ',
    description: 'Trusted handyman and construction services in Wickenburg, Arizona.',
    type: 'website',
    locale: 'en_US',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: 'Gato Montes Construction',
  alternateName: 'Handyman in Wickenburg',
  description: 'Trusted handyman and construction services in Wickenburg, Arizona. Bathroom remodeling, flooring & tile, doors & windows, stucco & fence repair, drywall, and painting.',
  url: 'https://handymaninwickenburg.com',
  telephone: '+1-928-555-0147',
  email: 'info@gatomontesconstruction.com',
  image: 'https://handymaninwickenburg.com/images/gato-montes-logo.png',
  logo: 'https://handymaninwickenburg.com/images/gato-montes-logo.png',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Main Street',
    addressLocality: 'Wickenburg',
    addressRegion: 'AZ',
    postalCode: '85390',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 33.9684,
    longitude: -112.7857,
  },
  areaServed: [
    { '@type': 'City', name: 'Wickenburg' },
    { '@type': 'City', name: 'Congress' },
    { '@type': 'City', name: 'Aguila' },
    { '@type': 'City', name: 'Morristown' },
    { '@type': 'City', name: 'Yarnell' },
    { '@type': 'City', name: 'Wittmann' },
    { '@type': 'City', name: 'Surprise' },
    { '@type': 'City', name: 'Peoria' },
    { '@type': 'City', name: 'Sun City West' },
    { '@type': 'City', name: 'Anthem' },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '08:00',
      closes: '12:00',
    },
  ],
  sameAs: [
  'https://www.facebook.com/gatomontesconstruction',
  'https://www.instagram.com/gatomontesconstruction',
],
  makesOffer: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bathroom Remodeling' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Flooring & Tile' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Doors & Windows' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Stucco & Fence Repair' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Drywall' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Interior & Exterior Painting' } },
  ],
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-white text-slate-900`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}