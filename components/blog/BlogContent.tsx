"use client";

import { rye } from "@/lib/fonts";
import { slugify } from "@/lib/utils/slugify";
import type { ContentBlock } from "@/lib/types/blog";

interface BlogContentProps {
  blocks: ContentBlock[];
}

export function BlogContent({ blocks }: BlogContentProps) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={i}
                id={slugify(block.text)}
                className={`uppercase ${rye.className} text-2xl md:text-3xl text-[#241812] pt-6 scroll-mt-32 flex items-center gap-3`}
              >
                <span className="w-8 h-[3px] bg-[#A0522D] rounded-full flex-shrink-0" />
                {block.text}
              </h2>
            );

          case "paragraph":
            return (
              <p
                key={i}
                className={`text-slate-700 leading-relaxed ${
                  i === 0
                    ? "text-lg md:text-xl first-letter:text-5xl md:first-letter:text-6xl first-letter:font-bold first-letter:text-[#A0522D] first-letter:mr-2 first-letter:float-left first-letter:leading-[0.85]"
                    : "text-base md:text-lg"
                }`}
              >
                {block.text}
              </p>
            );

          case "list":
            return (
              <ul key={i} className="space-y-3">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-slate-700 text-base md:text-lg leading-relaxed">
                    <span className="mt-2.5 w-2 h-2 rounded-full bg-[#A0522D] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "keyList":
            return (
              <ol key={i} className="space-y-4">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-4 items-start bg-white rounded-xl border border-[#EAD9C0] p-4 md:p-5">
                    <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#A0522D] text-white font-bold text-sm flex items-center justify-center">
                      {String(j + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-bold text-[#241812] mb-1">{item.label}</p>
                      <p className="text-slate-600 text-sm md:text-base leading-relaxed">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            );

          case "quote":
            return (
              <blockquote key={i} className="relative bg-white border-l-4 border-[#A0522D] rounded-r-xl px-6 py-5 my-8 shadow-sm">
                <span className={`absolute -top-4 left-4 text-6xl text-[#A0522D]/25 ${rye.className}`}>&quot;</span>
                <p className="text-[#241812] text-lg md:text-xl italic leading-relaxed">{block.text}</p>
              </blockquote>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}