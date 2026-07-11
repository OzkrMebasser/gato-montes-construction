"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n/client";
import { useStaggerFadeIn } from "@/hooks/useGsapAnimation";
import { useEffect } from "react";
import {
  Bath,
  LayoutGrid,
  DoorOpen,
  Fence,
  LayoutPanelLeft,
  PaintBucket,
  ArrowRight,
} from "lucide-react";
import { rye } from "@/lib/fonts";

const services = [
  { key: "bathroomRemodeling", icon: Bath },
  { key: "flooringTile", icon: LayoutGrid },
  { key: "doorsWindows", icon: DoorOpen },
  { key: "stuccoFences", icon: Fence },
  { key: "drywall", icon: LayoutPanelLeft },
  { key: "painting", icon: PaintBucket },
];

export function ServicesSection() {
  const { t, i18n } = useTranslation();
  const gridRef = useStaggerFadeIn(0.12);
  const currentLang = (i18n.language || "en").split("-")[0] as "en" | "es";
  const servicesHref = currentLang === "es" ? "/servicios" : "/services";

  useEffect(() => {
  if (window.location.hash) {
    const id = window.location.hash.substring(1);
    const el = document.getElementById(id);
    if (el) {
      // pequeño delay para asegurar que el layout ya renderizó
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }
}, []);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#A0522D] font-semibold text-sm uppercase tracking-[0.2em]">
            {t("services.subtitle")}
          </span>
          <h2
            className={` uppercase ${rye.className}  text-3xl md:text-4xl lg:text-5xl font-bold text-[#241812] mt-3`}
          >
            {t("services.title")}
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.key}
                className="group bg-[#F7EFE3] hover:bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-[#EAD9C0]/50 border border-[#EAD9C0] hover:border-[#A0522D]/30 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-[#EAD9C0] text-[#A0522D] flex items-center justify-center mb-6 group-hover:bg-[#A0522D] group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#241812] mb-3">
                  {t(`services.${service.key}.title`)}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm mb-4">
                  {t(`services.${service.key}.description`)}
                </p>
                <Link   href={`${servicesHref}#${service.key}`} className="text-[#A0522D] hover:text-[#8B4429] font-semibold transition-colors">
                  <span className="inline-flex items-center gap-1 text-[#A0522D] font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     {t("services.more")} <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href={servicesHref}
            className="inline-flex items-center gap-2 text-[#A0522D] hover:text-[#8B4429] font-semibold transition-colors"
          >
            {t("services.cta")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
