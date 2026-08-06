"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useTranslation } from "@/lib/i18n/client";
import { useStaggerFadeIn } from "@/hooks/useGsapAnimation";
import { rye } from "@/lib/fonts";
import { BlogCard } from "./BlogCard";
import type { BlogPostSummary } from "@/lib/types/blog";

interface BlogGridProps {
  posts: BlogPostSummary[];
  locale: "en" | "es";
  showHeader?: boolean;
  featuredFirst?: boolean;
}

export function BlogGrid({ posts, locale, showHeader = true, featuredFirst = false }: BlogGridProps) {
  const { t, i18n } = useTranslation();
  const gridRef = useStaggerFadeIn(0.1);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (i18n.language?.split("-")[0] !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".blog-hero-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[100svh] flex items-center">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-[position:50%_30%] md:bg-center"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/5974036/pexels-photo-5974036.jpeg?_gl=1*1mujhyg*_ga*MjI5MjcwNDAxLjE3ODA2MDUwNzI.*_ga_8JE65Q40S6*czE3ODU5MTQzMTYkbzIwJGcxJHQxNzg1OTE0MzQ3JGoyOSRsMCRoMA..')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#241812]/30 via-[#241812]/60 to-[#241812]/80" />
        </div>
        <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-16 py-32 pt-40">
          <h1
            className={`uppercase blog-hero-title ${rye.className} text-3xl sm:text-4xl md:text-6xl lg:text-5xl font-bold text-white leading-tight mb-6`}
          >
            {t("blog.title")}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            {t("blog.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#F7EFE3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {showHeader && (
            <div className="text-center mb-16">
              <span className="text-[#A0522D] font-semibold text-sm uppercase tracking-[0.2em]">
                {t("blog.subtitle")}
              </span>
              <h2 className={`uppercase ${rye.className} text-3xl md:text-4xl lg:text-5xl font-bold text-[#241812] mt-3`}>
                {t("blog.title")}
              </h2>
            </div>
          )}

          {posts.length === 0 ? (
            <p className="text-center text-slate-500">{t("blog.empty")}</p>
          ) : (
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {posts.map((post, i) => (
                <BlogCard key={post.id} post={post} locale={locale} featured={featuredFirst && i === 0} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}