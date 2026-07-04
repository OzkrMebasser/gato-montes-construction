import type { Metadata } from 'next';
import { ProjectsContent } from '@/components/pages/projects/ProjectsContent';

export const metadata: Metadata = {
  title: 'Nuestros Proyectos | Gato Montes Construction',
  description: 'Vea nuestros proyectos recientes de handyman y remodelación en Wickenburg, Congress y las comunidades cercanas de Arizona.',
  alternates: {
    canonical: 'https://tudominio.com/proyectos',
    languages: {
      en: 'https://tudominio.com/projects',
      es: 'https://tudominio.com/proyectos',
    },
  },
  openGraph: {
    title: 'Nuestros Proyectos | Gato Montes Construction',
    description: 'Proyectos recientes de handyman y remodelación en Wickenburg, AZ.',
    locale: 'es_MX',
  },
};

export default function ProjectsPageES() {
  return <ProjectsContent lang="es" />;
}