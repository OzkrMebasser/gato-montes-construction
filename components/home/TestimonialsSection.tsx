"use client";

import { useTranslation } from "@/lib/i18n/client";
import { useStaggerFadeIn } from "@/hooks/useGsapAnimation";
import { Star, Quote } from "lucide-react";
import { rye } from "@/lib/fonts";

interface Testimonial {
  id: number;
  name: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  { id: 1, name: "Maria Gonzalez", rating: 5 },
  { id: 2, name: "Robert Klein", rating: 5 },
  { id: 3, name: "Ana & Luis Torres", rating: 5 },
];

export function TestimonialsSection() {
  const { t } = useTranslation();
  const gridRef = useStaggerFadeIn(0.2);

  return (
    <section className="py-20 md:py-28 bg-[#241812] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#D9A876] font-semibold text-sm uppercase tracking-[0.2em]">
            {t("testimonials.subtitle")}
          </span>
          <h2
            className={` uppercase ${rye.className}  text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3`}
          >
            {t("testimonials.title")}
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {testimonials.map((testimonial) => {
            const role = t(`testimonials.items.${testimonial.id}.role`);
            const text = t(`testimonials.items.${testimonial.id}.text`);

            return (
              <div
                key={testimonial.id}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#A0522D]/40 transition-all duration-300 hover:-translate-y-1"
              >
                <Quote className="text-[#D9A876]/80 w-8 h-8 mb-4" />
                <p className="text-white/80 leading-relaxed mb-6 text-sm">
                  {text}
                </p>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="text-[#D9A876] w-4 h-4 fill-[#D9A876]"
                    />
                  ))}
                </div>
                <div>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-white/50 text-sm">{role}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}