import type { Metadata } from 'next';
import { ProjectsContent } from '@/components/pages/projects/ProjectsContent';

export const metadata: Metadata = {
  title: 'Our Projects | Gato Montes Construction',
  description: 'See our recent handyman and remodeling projects across Wickenburg, Congress, and the surrounding Arizona desert communities.',
  alternates: {
    canonical: 'https://www.handymaninwickenburg.com/projects',
    languages: {
      en: 'https://www.handymaninwickenburg.com/projects',
      es: 'https://www.handymaninwickenburg.com/proyectos',
    },
  },
  openGraph: {
    title: 'Our Projects | Gato Montes Construction',
    description: 'Recent handyman and remodeling projects in Wickenburg, AZ.',
    locale: 'en_US',
  },
};

export default function ProjectsPageEN() {
  return <ProjectsContent lang="en" />;
}