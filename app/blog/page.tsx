import type { Metadata } from 'next';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { getAllPosts } from '@/lib/data/blog';

export const metadata: Metadata = {
  title: 'Blog | Gato Montes Construction',
  description: 'Home repair, maintenance, and remodeling tips from Gato Montes Construction, serving Wickenburg, AZ.',
  alternates: {
    canonical: 'https://www.handymaninwickenburg.com/blog',
    languages: {
      en: 'https://www.handymaninwickenburg.com/blog',
      es: 'https://www.handymaninwickenburg.com/blog-articulos',
    },
  },
  openGraph: {
    title: 'Blog | Gato Montes Construction',
    description: 'Home repair, maintenance, and remodeling tips from Gato Montes Construction.',
    locale: 'en_US',
  },
};

export default function BlogPageEN() {
  return <BlogGrid posts={getAllPosts('en')} locale="en" />;
}