"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n/client";
import { useFadeIn } from "@/hooks/useGsapAnimation";
import { rye } from "@/lib/fonts";
import { ArrowLeft, Calendar, Clock, Phone } from "lucide-react";
import { BlogContent } from "./BlogContent";
import { BlogTableOfContents } from "./BlogTableOfContents";
import { GatoMontesIcon } from "./GatoMontesIcon";
import { extractHeadings } from "@/lib/blog/content-utils";
import type { BlogPost } from "@/lib/types/blog";

interface BlogPostLayoutProps {
  post: BlogPost;
  backHref: string;
}

export function BlogPostLayout({ post, backHref }: BlogPostLayoutProps) {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language || "en").split("-")[0] as "en" | "es";
  const contentRef = useFadeIn();
  const headings = extractHeadings(post.content);

  const formattedDate = new Date(post.date).toLocaleDateString(
    currentLang === "es" ? "es-MX" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <article>
      {/* Hero */}
      <div className="relative min-h-[100svh] flex items-end overflow-hidden">
        <Image src={post.image} alt={post.title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#241812] via-[#241812]/65 to-[#241812]/10" />
        {/* <GatoMontesIcon className="absolute top-8 right-8 w-24 h-24 text-white/10 hidden md:block" /> */}

        <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-16 pb-12">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 text-[#eea761] font-semibold text-sm uppercase tracking-[0.2em] mb-4">
              <span className="w-6 h-[2px] bg-[#eea761]" />
              {post.category}
            </span>
            <h1 className={`uppercase ${rye.className} text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-5`}>
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/80">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#eea761]" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#eea761]" />
                {post.readTime} {t("blog.minRead")}
              </span>
              {post.author && (
                <span>
                  {t("blog.by")} <strong className="font-semibold text-white">{post.author}</strong>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div ref={contentRef} className="bg-[#F7EFE3] py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-[#A0522D] font-semibold text-sm mb-10 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("blog.backToBlog")}
          </Link>

          <div className="flex gap-12">
            <div className="max-w-2xl">
              <BlogContent blocks={post.content} />

              <div className="flex items-center gap-4 my-12">
                <div className="h-px flex-1 bg-[#EAD9C0]" />
                <GatoMontesIcon className="w-6 h-6 text-[#A0522D]/40" />
                <div className="h-px flex-1 bg-[#EAD9C0]" />
              </div>

              <div className="bg-[#A0522D] rounded-2xl p-8 md:p-10 text-center">
                <h3 className={`uppercase ${rye.className} text-2xl md:text-3xl text-white mb-3`}>
                  {t("blog.ctaTitle")}
                </h3>
                <p className="text-[#fac793] mb-6 max-w-lg mx-auto">{t("blog.ctaDescription")}</p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href={currentLang === "es" ? "/contacto" : "/contact"}
                    className="inline-flex items-center gap-2 bg-white text-[#A0522D] hover:bg-[#F7EFE3] font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    {t("blog.ctaButton")}
                  </Link>
                  <a
                    href="tel:+19284645014"
                    className="inline-flex items-center gap-2 bg-[#8B4429] hover:bg-[#6B3220] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
                  >
                    <Phone className="w-4 h-4" />
                    (928) 464-5014
                  </a>
                </div>
              </div>
            </div>

            <BlogTableOfContents headings={headings} />
          </div>
        </div>
      </div>
    </article>
  );
}