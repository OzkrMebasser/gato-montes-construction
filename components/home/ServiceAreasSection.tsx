"use client";

import dynamic from "next/dynamic";
import { useTranslation } from "@/lib/i18n/client";
import { useFadeIn } from "@/hooks/useGsapAnimation";
import { MapPin } from "lucide-react";
import { rye } from "@/lib/fonts";

// El mapa usa APIs de browser (window/document), así que se carga solo en cliente
const ServiceAreaMap = dynamic(() => import("./ServiceAreaMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#EAD9C0]/40 text-[#A0522D] text-sm font-medium">
      Loading map...
    </div>
  ),
});

const areas = [
  "Wickenburg",
  "Congress",
  "Morristown",
  "Forepaugh",
  "Yarnell",
  "Wittmann",
  "Aguila",
  "Surprise",
  "Peoria",
  "Sun City West",
 
];

export function ServiceAreasSection() {
  const { t, i18n } = useTranslation();
  const contentRef = useFadeIn();

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={contentRef}
          className="bg-[#F7EFE3] rounded-3xl p-8 md:p-16 border border-[#EAD9C0]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#A0522D] font-semibold text-sm uppercase tracking-[0.2em]">
                {t("serviceAreas.subtitle")}
              </span>
              <h2
                className={` uppercase ${rye.className} text-[1.5rem] md:text-4xl lg:text-5xl font-bold text-[#241812] mt-3 mb-3`}
              >
                {t("serviceAreas.title")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                {t("serviceAreas.description")}
              </p>
              <div className="flex flex-wrap gap-3">
                {areas.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-medium text-slate-700 border border-[#EAD9C0] shadow-sm"
                  >
                    <MapPin className="text-[#A0522D] w-3 h-3" />
                    {area}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <ServiceAreaMap />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#A0522D] text-white rounded-2xl p-6 shadow-xl hidden md:block">
                <p className="text-3xl font-bold">20+</p>
                <p className="text-sm text-white/80">Years Serving Arizona</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}