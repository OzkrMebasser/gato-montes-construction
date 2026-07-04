'use client';

import { useTranslation } from '@/lib/i18n/client';
import { useStaggerFadeIn } from '@/hooks/useGsapAnimation';
import { Award, HandCoins, ShieldCheck, Users } from 'lucide-react';
import { rye } from '@/lib/fonts';
const reasons = [
  { key: 'experience', icon: Award },
  { key: 'quality', icon: HandCoins },
  { key: 'safety', icon: ShieldCheck },
  { key: 'local', icon: Users },
];

export function WhyChooseUsSection() {
  const { t, i18n } = useTranslation();
  const gridRef = useStaggerFadeIn(0.15);

  return (
    <section className="py-20 md:py-28 bg-[#F7EFE3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#A0522D] font-semibold text-sm uppercase tracking-[0.2em]">
            {t('whyChooseUs.subtitle')}
          </span>
          <h2 className={` uppercase ${rye.className}  text-3xl md:text-4xl lg:text-5xl font-bold text-[#241812] mt-3`}>
            {t('whyChooseUs.title')}
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.key}
                className="group bg-white rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-lg hover:shadow-[#EAD9C0]/50 border border-[#EAD9C0] hover:border-[#A0522D]/30 hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-full bg-[#F7EFE3] text-[#A0522D] flex items-center justify-center mx-auto mb-6 group-hover:bg-[#A0522D] group-hover:text-white transition-all duration-300">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-[#241812] mb-3">
                  {t(`whyChooseUs.${reason.key}.title`)}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {t(`whyChooseUs.${reason.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}