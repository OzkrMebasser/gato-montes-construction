"use client";

import { useTranslation } from "@/lib/i18n/client";
import { useStaggerFadeIn } from "@/hooks/useGsapAnimation";
import { Star, Quote } from "lucide-react";
import { rye } from "@/lib/fonts";

const testimonials = [
  {
    id: 1,
    name: "Maria Gonzalez",
    role: "Homeowner, Wickenburg",
    text: "Gato Montes remodeled our bathroom and the attention to detail was amazing. They treated our home like it was their own. Fair pricing and honest work.",
    rating: 5,
  },
  {
    id: 2,
    name: "Robert Klein",
    role: "Homeowner, Congress",
    text: "We needed drywall repair and new tile flooring after some water damage. They showed up on time and the work looks better than before. Highly recommend.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ana & Luis Torres",
    role: "Homeowners, Wickenburg",
    text: "They fixed our stucco, repaired the fence, and repainted the whole exterior. Real neighbors who care about doing the job right at a reasonable price.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const { t, i18n } = useTranslation();
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
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#A0522D]/40 transition-all duration-300 hover:-translate-y-1"
            >
              <Quote className="text-[#A0522D]/50 w-8 h-8 mb-4" />
              <p className="text-white/80 leading-relaxed mb-6 text-sm">
                {testimonial.text}
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
                <p className="text-white/50 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
