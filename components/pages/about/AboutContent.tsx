"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "@/lib/i18n/client";
import {
  CheckCircle,
  Users,
  Calendar,
  FolderKanban,
  Smile,
  Award,
  Shield,
  HardHat,
  MapPin,
} from "lucide-react";
import { rye } from "@/lib/fonts";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { key: "projects", icon: FolderKanban, value: "500+" },
  { key: "experience", icon: Calendar, value: "25+" },
  { key: "team", icon: Users, value: "35+" },
  { key: "satisfaction", icon: Smile, value: "98%" },
];

const values = ["integrity", "quality", "community", "innovation"];

export function AboutContent({ lang }: { lang: "en" | "es" }) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-hero-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      );
      gsap.fromTo(
        ".about-hero-subtitle",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.3 },
      );

      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: statsRef.current, start: "top 80%" },
          },
        );
      }

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: contentRef.current, start: "top 80%" },
          },
        );
      }

      if (valuesRef.current) {
        gsap.fromTo(
          valuesRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: valuesRef.current, start: "top 80%" },
          },
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
          {/* Tablet/Desktop: original, unchanged */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/8961555/pexels-photo-8961555.jpeg')`,
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#241812]/30 via-[#241812]/60 to-[#241812]/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-40">
          <h1
            className={` uppercase hero-title ${rye.className} text-3xl sm:text-4xl md:text-6xl lg:text-5xl font-bold text-white leading-tight mb-6`}
          >
            {" "}
            {t("about.title")}
          </h1>
          <p className="about-hero-subtitle text-lg text-white/70 max-w-2xl">
            {t("about.subtitle")}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#A0522D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.key} className="text-center text-white">
                  <Icon className="mx-auto mb-3 w-8 h-8 opacity-80" />
                  <p className="text-3xl md:text-4xl font-bold">{stat.value}</p>
                  <p className="text-sm text-white/80 mt-1">
                    {t(`about.stats.${stat.key}`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div ref={contentRef}>
              <span className="text-[#A0522D] font-semibold text-sm uppercase tracking-[0.2em]">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#241812] mt-3 mb-8">
                {t("about.story.title")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {t("about.story.paragraph1")}
              </p>
              <p className="text-slate-600 leading-relaxed">
                {t("about.story.paragraph2")}
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/8961401/pexels-photo-8961401.jpeg"
                  alt="Construction team"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#241812] text-white rounded-2xl p-6 shadow-xl hidden md:block">
                <p className="text-3xl font-bold text-[#D9A876]">25+</p>
                <p className="text-sm text-white/70">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-[#F7EFE3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#241812]">
              {t("about.values.title")}
            </h2>
          </div>
          <div
            ref={valuesRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value) => (
              <div
                key={value}
                className="bg-white rounded-2xl p-8 text-center border border-[#EAD9C0] hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CheckCircle className="text-[#A0522D] w-8 h-8 mx-auto mb-4" />
                <p className="font-semibold text-[#241812]">
                  {t(`about.values.${value}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
