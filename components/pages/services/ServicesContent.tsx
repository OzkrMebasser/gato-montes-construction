'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from '@/lib/i18n/client';
import { Bath, LayoutGrid, DoorOpen, Fence, LayoutPanelLeft, PaintBucket, Check } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  { key: 'bathroomRemodeling', icon: Bath },
  { key: 'flooringTile', icon: LayoutGrid },
  { key: 'doorsWindows', icon: DoorOpen },
  { key: 'stuccoFences', icon: Fence },
  { key: 'drywall', icon: LayoutPanelLeft },
  { key: 'painting', icon: PaintBucket },
];

export function ServicesContent({ lang }: { lang: 'en' | 'es' }) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.services-hero-title',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[100vh] flex items-center "
      >
        <div className="absolute inset-0">
          {/* Mobile: rotated 90deg to fill portrait screen */}
          <div className="md:hidden absolute inset-0 overflow-hidden">
            <div
              className="absolute top-1/2 left-1/2 bg-cover bg-center"
              style={{
                width: '100vh',
                height: '100vw',
                backgroundImage: `url('https://images.pexels.com/photos/6790074/pexels-photo-6790074.jpeg')`,
                transform: 'translate(-50%, -50%) rotate(90deg)',
              }}
            />
          </div>

          {/* Tablet/Desktop: original, unchanged */}
          <div
            className="hidden md:block absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/6790074/pexels-photo-6790074.jpeg')`,
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#241812]/30 via-[#241812]/60 to-[#241812]/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-40">
          <h1 className="services-hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {t('services.title')}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            {t('services.subtitle')}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {services.map((service) => {
              const Icon = service.icon;
              const features = t(`services.${service.key}.features`, {
                returnObjects: true,
              }) as string[];

              return (
                <div
                  key={service.key}
                  className="group bg-[#F7EFE3] hover:bg-white rounded-2xl p-8 border border-[#EAD9C0] hover:border-[#A0522D]/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#EAD9C0] text-[#A0522D] flex items-center justify-center mb-6 group-hover:bg-[#A0522D] group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#241812] mb-4">
                    {t(`services.${service.key}.title`)}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {t(`services.${service.key}.description`)}
                  </p>
                  <ul className="space-y-2">
                    {Array.isArray(features) &&
                      features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-slate-700"
                        >
                          <Check className="text-[#A0522D] w-3 h-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}