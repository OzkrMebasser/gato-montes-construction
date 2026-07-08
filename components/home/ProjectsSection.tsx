"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/client";
import { useStaggerFadeIn } from "@/hooks/useGsapAnimation";
import { ArrowRight, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { rye } from "@/lib/fonts";

type PhotoStatus = "before" | "after";

interface ProjectImage {
  status: PhotoStatus;
  image: string;
}

interface Project {
  id: number;
  images: ProjectImage[];
}

const projects: Project[] = [
  {
    id: 1,
    images: [
      {
        status: "after",
        image:
          "https://res.cloudinary.com/dmqqhcf49/image/upload/v1783489016/Bathroom-remodeling-after_ufjo3l.jpg",
      },
      {
        status: "before",
        image:
          "https://res.cloudinary.com/dmqqhcf49/image/upload/v1783489015/Bathroom-remodeling-before_v8trgz.png",
      },
    ],
  },
  {
    id: 2,
    images: [
      {
        status: "after",
        image:
          "https://res.cloudinary.com/dmqqhcf49/image/upload/v1783487896/kitchen-remodel-after_zwqr4m.png",
      },
      {
        status: "before",
        image:
          "https://res.cloudinary.com/dmqqhcf49/image/upload/v1783487896/kitchen-remodel-before_zycwkf.png",
      },
    ],
  },
  {
    id: 3,
    images: [
      {
        status: "after",
        image:
          "https://res.cloudinary.com/dmqqhcf49/image/upload/v1783493034/stucco-repair-wall-after_lpeo4x.png",
      },
      {
        status: "before",
        image:
          "https://res.cloudinary.com/dmqqhcf49/image/upload/v1783493066/stucco-repair-wall-before_riiazd.png",
      },
      {
        status: "after",
        image:
          "https://res.cloudinary.com/dmqqhcf49/image/upload/v1783494346/stucco-repair-wall-after-2_torztp.png",
      },
      {
        status: "before",
        image:
          "https://res.cloudinary.com/dmqqhcf49/image/upload/v1783493637/stucco-repair-wall-before-2_wqjybv.png",
      },
    ],
  },
];

function ProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const total = project.images.length;
  const currentImage = project.images[current];
  const isBefore = currentImage.status === "before";

  // Textos traducidos dinámicamente según el id del proyecto
  const title = t(`projects.items.${project.id}.title`);
  const location = t(`projects.items.${project.id}.location`);
  // const category = t(`projects.items.${project.id}.category`);

  const goTo = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrent((index + total) % total);
  };

  return (
    <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer">
      <img
        src={currentImage.image}
        alt={`${title} - ${isBefore ? t("projects.before") : t("projects.after")}`}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Tag Antes/Después */}
      <div className="absolute top-4 left-4 z-10">
        <span
          className={`px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-full shadow-md ${
            isBefore ? "bg-[#241812] text-white" : "bg-[#A0522D] text-white"
          }`}
        >
          {isBefore ? t("projects.before") : t("projects.after")}
        </span>
      </div>

      {/* Flechas de navegación (solo si hay más de 1 foto) */}
      {total > 1 && (
        <>
          <button
            onClick={(e) => goTo(current - 1, e)}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#A0522D]"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => goTo(current + 1, e)}
            aria-label="Next photo"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#A0522D]"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Dots indicadores */}
      {total > 1 && (
        <div className="absolute top-4 right-4 z-10 flex gap-1.5">
          {project.images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => goTo(index, e)}
              aria-label={`Go to photo ${index + 1}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === current ? "bg-white w-4" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-[#241812]/90 via-[#241812]/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        {/* <span className="inline-block px-3 py-1 bg-[#A0522D] text-white text-xs font-semibold rounded-full mb-3">
          {category}
        </span> */}
        <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
        <div className="flex items-center gap-1 text-white/70 text-sm">
          <MapPin className="w-3 h-3" />
          {location}
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const { t } = useTranslation();
  const gridRef = useStaggerFadeIn(0.15);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#A0522D] font-semibold text-sm uppercase tracking-[0.2em]">
            {t("projects.subtitle")}
          </span>
          <h2
            className={` uppercase ${rye.className}  text-3xl md:text-4xl lg:text-5xl font-bold text-[#241812] mt-3`}
          >
            {t("projects.title")}
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
     {/* {no hay proyectos, no mostrar el botón de ver todos de momento} */}
        {/* <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-[#241812] hover:bg-[#3A2A1E] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            {t("projects.viewAll")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div> */}
      </div>
    </section>
  );
}
