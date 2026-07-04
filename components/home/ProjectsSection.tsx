'use client';

import Link from 'next/link';
import { useTranslation } from '@/lib/i18n/client';
import { useStaggerFadeIn } from '@/hooks/useGsapAnimation';
import { ArrowRight, MapPin } from 'lucide-react';
import { rye } from "@/lib/fonts";


const projects = [
  {
    id: 1,
    title: 'Remodelación de Baño',
    location: 'Wickenburg, AZ',
    category: 'Baños',
    image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80',
  },
  {
    id: 2,
    title: 'Instalación de Tile y Pisos',
    location: 'Wickenburg, AZ',
    category: 'Pisos y Tile',
    image: 'https://images.unsplash.com/photo-1615529162924-f8605388461d?w=800&q=80',
  },
  {
    id: 3,
    title: 'Reparación de Estuco y Pintura',
    location: 'Congress, AZ',
    category: 'Estuco y Pintura',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
];

export function ProjectsSection() {
  const { t, i18n } = useTranslation();
  const gridRef = useStaggerFadeIn(0.15);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#A0522D] font-semibold text-sm uppercase tracking-[0.2em]">
            {t('projects.subtitle')}
          </span>
                 <h2 className={` uppercase ${rye.className}  text-3xl md:text-4xl lg:text-5xl font-bold text-[#241812] mt-3`}>
       
            {t('projects.title')}
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#241812]/90 via-[#241812]/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block px-3 py-1 bg-[#A0522D] text-white text-xs font-semibold rounded-full mb-3">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-white mb-1">
                  {project.title}
                </h3>
                <div className="flex items-center gap-1 text-white/70 text-sm">
                  <MapPin className="w-3 h-3" />
                  {project.location}
                </div>
              </div>
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#A0522D]">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-[#241812] hover:bg-[#3A2A1E] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            {t('projects.viewAll')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}