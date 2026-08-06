"use client";

import { useEffect, useState } from "react";
import { rye } from "@/lib/fonts";
import { useTranslation } from "@/lib/i18n/client";
import type { Heading } from "@/lib/blog/content-utils";

interface BlogTableOfContentsProps {
  headings: Heading[];
}

export function BlogTableOfContents({ headings }: BlogTableOfContentsProps) {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <aside className="hidden lg:block sticky top-32 self-start w-64 flex-shrink-0">
      <span className={`uppercase ${rye.className} text-sm text-[#A0522D] tracking-wide`}>
        {t("blog.inThisArticle")}
      </span>
      <ul className="mt-4 space-y-1 border-l-2 border-[#EAD9C0]">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block pl-4 py-1.5 -ml-0.5 border-l-2 text-sm leading-snug transition-colors ${
                activeId === h.id
                  ? "border-[#A0522D] text-[#A0522D] font-semibold"
                  : "border-transparent text-slate-500 hover:text-[#8B4429]"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}