'use client';

import { useEffect } from 'react';
import { useTranslation } from '@/lib/i18n/client';
import { HeroSection } from '@/components/home/HeroSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { ServiceAreasSection } from '@/components/home/ServiceAreasSection';
import { ContactCTASection } from '@/components/home/ContactCTASection';

export function HomeContent({ lang }: { lang: 'en' | 'es' }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ServiceAreasSection />
      <ContactCTASection />
    </>
  );
}