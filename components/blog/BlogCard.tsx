"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n/client";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPostSummary } from "@/lib/types/blog";

interface BlogCardProps {
  post: BlogPostSummary;
  locale: "en" | "es";
  featured?: boolean;
}

export function BlogCard({ post, locale, featured = false }: BlogCardProps) {
  const { t } = useTranslation();

  const href = locale === "es" ? `/blog-articulos/${post.slug}` : `/blog/${post.slug}`;
  const formattedDate = new Date(post.date).toLocaleDateString(
    locale === "es" ? "es-MX" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <Link
      href={href}
      className={`group block bg-white rounded-2xl overflow-hidden border border-[#EAD9C0] transition-all duration-300 hover:shadow-lg hover:shadow-[#EAD9C0]/50 hover:-translate-y-1 ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? "h-64 md:h-80" : "h-52"}`}>
        <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute top-4 left-4">
          <span className="inline-block bg-[#A0522D] text-white text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full">
            {post.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime} {t("blog.minRead")}
          </span>
        </div>
        <h3 className={`font-bold text-[#241812] mb-3 leading-snug group-hover:text-[#A0522D] transition-colors ${featured ? "text-2xl" : "text-lg"}`}>
          {post.title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
        <span className="inline-flex items-center gap-2 text-[#A0522D] font-semibold text-sm">
          {t("blog.readMore")}
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}