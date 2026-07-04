"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useTranslation } from "@/lib/i18n/client";
import { ArrowRight, Phone } from "lucide-react";
import { rye } from "@/lib/fonts";

const heroImageDesktop =
  "https://res.cloudinary.com/dmqqhcf49/image/upload/v1783129182/gato-salvaje-hero-cut_chrkt3.png";
const heroImageMobile =
  "https://res.cloudinary.com/dmqqhcf49/image/upload/v1783046246/mobile-gato-salvaje-hero_t0k2pu.png";

export function HeroSection() {
  const { t, i18n } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-title",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 },
      );
      gsap.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.5 },
      );
      gsap.fromTo(
        ".hero-desc",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.7 },
      );
      gsap.fromTo(
        ".hero-cta",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.9 },
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image with overlay */}
      <div className="absolute inset-0 z-0">
        {/* Mobile background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat block md:hidden"
          style={{
            backgroundImage: `url('${heroImageMobile}')`,
          }}
        />
        {/* Desktop background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
          style={{
            backgroundImage: `url('${heroImageDesktop}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#241812]/70 via-[#241812]/60 to-[#241812]/30" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-16 py-32 pt-[150px] "
      >
        <div className="max-w-7xl">
          <span className="hero-subtitle inline-block text-[#eea761] font-semibold text-sm uppercase tracking-[0.2em] mb-4">
            {t("hero.subtitle")}
          </span>
          <h1
            className={` uppercase hero-title ${rye.className} text-3xl sm:text-4xl md:text-6xl lg:text-5xl font-bold text-white leading-tight mb-6`}
          >
            {t("hero.title")}
          </h1>
          <p className="hero-desc text-lg sm:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl">
            {t("hero.description")}
          </p>
          <div className="hero-cta flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#ffffff] hover:bg-[#8B4429] text-[#8B4429] hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#A0522D]/25 hover:-translate-y-0.5"
            >
              {t("hero.ctaPrimary")}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:9285550147"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg backdrop-blur-sm transition-all duration-300 border border-white/20 hover:-translate-y-0.5"
            >
              <Phone className="w-3 h-3" />
              (928) 555-0147
            </a>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 via-white/20 to-transparent z-10" /> */}
    </section>
  );
}
