"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n/client";
import { useFadeIn } from "@/hooks/useGsapAnimation";
import { ArrowRight, Phone } from "lucide-react";
import { rye } from "@/lib/fonts";

export function ContactCTASection() {
  const { t, i18n } = useTranslation();
  const contentRef = useFadeIn();

  return (
    <section className="py-20 md:py-28 bg-[#A0522D]">
      <div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        ref={contentRef}
      >
        <h2
          className={` uppercase ${rye.className}  text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3`}
        >
          {t("contactCTA.title")}
        </h2>
        <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
          {t("contactCTA.description")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#A0522D] hover:bg-[#F7EFE3] font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            {t("contactCTA.button")}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="tel:9285550147"
            className="inline-flex items-center gap-2 bg-[#8B4429] hover:bg-[#6B3220] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg"
          >
            <Phone className="w-4 h-4" />
            (928) 555-0147
          </a>
        </div>
      </div>
    </section>
  );
}
