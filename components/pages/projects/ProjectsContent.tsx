"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "@/lib/i18n/client";
import { MapPin, Calendar } from "lucide-react";
import { rye } from "@/lib/fonts";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const allProjects = [
  {
    id: 1,
    category: "Bathrooms",
    location: "Wickenburg, AZ",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    description: "Full bathroom update with new fixtures, tile, and finishes.",
  },
  {
    id: 2,
    category: "Flooring & Tile",
    location: "Wickenburg, AZ",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    description:
      "New flooring installation and tile repair throughout the home.",
  },
  {
    id: 3,
    category: "Stucco & Fences",
    location: "Congress, AZ",
    year: "2022",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    description:
      "Stucco repair and fence restoration for a full exterior refresh.",
  },
];

const categories = [
  "All",
  "Bathrooms",
  "Flooring & Tile",
  "Doors & Windows",
  "Stucco & Fences",
  "Drywall",
  "Painting",
];

export function ProjectsContent({ lang }: { lang: "en" | "es" }) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  const [activeCategory, setActiveCategory] = useState("All");
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects =
    activeCategory === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".projects-hero-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current!.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
      );
    });
    return () => ctx.revert();
  }, [activeCategory]);

  const largeHeroImg = "";
  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[100vh] flex items-center"
      >
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center "
            style={{
              backgroundImage: `url('https://res.cloudinary.com/dmqqhcf49/image/upload/v1784658630/home-repairs-hero_zda06k.png')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#241812]/30 via-[#241812]/60 to-[#241812]/80" />
        </div>
        <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-16 py-32 pt-40">
          <h1
            className={`projects-hero-title uppercase ${rye.className} text-3xl sm:text-4xl md:text-6xl lg:text-5xl font-bold text-white leading-tight mb-6`}
          >
            {t("projects.title")}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            {t("projects.subtitle")}
          </p>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#A0522D] text-white shadow-lg shadow-[#A0522D]/25"
                    : "bg-[#F7EFE3] text-slate-600 hover:bg-[#EAD9C0]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-[#F7EFE3] rounded-2xl overflow-hidden border border-[#EAD9C0] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.category}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-[#EAD9C0] text-[#8B4429] text-xs font-semibold rounded-full">
                      {project.category}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400 text-xs">
                      <Calendar className="w-3 h-3" />
                      {project.year}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-1 text-slate-500 text-sm">
                    <MapPin className="text-[#A0522D] w-3 h-3" />
                    {project.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
