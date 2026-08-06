import type { Metadata } from 'next';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { getAllPosts } from '@/lib/data/blog';

export const metadata: Metadata = {
  title: 'Blog | Gato Montes Construction',
  description: 'Consejos de reparación, mantenimiento y remodelación de Gato Montes Construction en Wickenburg, AZ.',
  alternates: {
    canonical: 'https://www.handymaninwickenburg.com/blog-articulos',
    languages: {
      en: 'https://www.handymaninwickenburg.com/blog',
      es: 'https://www.handymaninwickenburg.com/blog-articulos',
    },
  },
  openGraph: {
    title: 'Blog | Gato Montes Construction',
    description: 'Consejos de reparación, mantenimiento y remodelación de Gato Montes Construction.',
    locale: 'es_MX',
  },
};

export default function BlogArticulosPageES() {
  return <BlogGrid posts={getAllPosts('es')} locale="es" />;
}