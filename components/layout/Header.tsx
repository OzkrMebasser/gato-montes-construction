"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslation, useChangeLanguage } from "@/lib/i18n/client";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { key: "home", href: { en: "/", es: "/inicio" } },
  { key: "about", href: { en: "/about", es: "/nosotros" } },
  { key: "services", href: { en: "/services", es: "/servicios" } },
  { key: "projects", href: { en: "/projects", es: "/proyectos" } },
  { key: "contact", href: { en: "/contact", es: "/contacto" } },
];

const logoRound =
  "https://res.cloudinary.com/dmqqhcf49/image/upload/v1782977150/ChatGPT_Image_2_jul_2026_00_14_04_q4llsz.png";
const logoTextWhite =
  "https://res.cloudinary.com/dmqqhcf49/image/upload/v1782977996/ChatGPT_Image_2_jul_2026_00_37_15_tjitul.png";
const logoTextBrown =
  "https://res.cloudinary.com/dmqqhcf49/image/upload/v1782977649/gato-montes-logo-textos_prtjeo.png";

const flagMX = "https://flagcdn.com/w80/mx.png";
const flagUS = "https://flagcdn.com/w80/us.png";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();
  const { t, i18n } = useTranslation();
  const changeLanguage = useChangeLanguage();
  const currentLang = (i18n.language || "en").split("-")[0] as "en" | "es";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const toggleLang = () => {
    changeLanguage(currentLang === "en" ? "es" : "en");
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FBF2E9] backdrop-blur-md shadow-md "
          : "bg-transparent py-4"
      }`}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href={currentLang === "es" ? "/inicio" : "/"}
            className="flex items-center transition-all duration-300 "
          >
            {scrolled ? (
              <>
                <Image
                  src={logoRound}
                  alt="Gato Montes Construction"
                  width={70}
                  height={70}
                  className="-ml-3 rounded-full h-[70px] w-[70px] sm:h-[70px] sm:w-[70px] lg:h-[70px] lg:w-[70px]"
                />
                <Image
                  src={logoTextBrown}
                  alt="Gato Montes Construction"
                  width={200}
                  height={70}
                  className="-ml-3 transition-all duration-300 object-contain h-[70px] w-auto sm:h-[70px]  lg:h-[65px]"
                />
              </>
            ) : (
              <>
                <Image
                  src={logoRound}
                  alt="Gato Montes Construction"
                  width={70}
                  height={70}
                  className="-ml-3 object-contain rounded-full h-[70px] w-[70px] sm:h-[70px] sm:w-[70px] lg:h-[70px] lg:w-[70px]"
                />

                <Image
                  src={logoTextWhite}
                  alt="Gato Montes Construction"
                  width={200}
                  height={70}
                  className="-ml-3 object-contain h-[70px] w-auto sm:h-[70px]  lg:h-[65px]"
                />
              </>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const href = link.href[currentLang];
              return (
                <Link
                  key={link.key}
                  href={href}
                  className={`text-sm font-medium tracking-wide uppercase transition-colors relative group ${
                    isActive(href)
                      ? scrolled
                        ? "text-[#A0522D]"
                        : "text-[#D9A876]"
                      : scrolled
                        ? "text-slate-700 hover:text-[#A0522D]"
                        : "text-white/90 hover:text-white"
                  }`}
                >
                  {t(`nav.${link.key}`)}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-[#A0522D] transition-all duration-300 ${
                      isActive(href) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Phone */}
            <a
              href="tel:9285550147"
              className={`hidden md:flex items-center gap-2 text-sm font-medium transition-colors ${
                scrolled
                  ? "text-slate-700 hover:text-[#A0522D]"
                  : "text-white/90 hover:text-white"
              }`}
            >
              <Phone className="w-3 h-3" />
              <span>(928) 555-0147</span>
            </a>

            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className={`flex items-center gap-2 pl-1 pr-3 py-1  transition-all `}
              aria-label={
                currentLang === "en" ? "Cambiar a Español" : "Switch to English"
              }
              title={
                currentLang === "en" ? "Cambiar a Español" : "Switch to English"
              }
            >
              <Image
                src={currentLang === "en" ? flagMX : flagUS}
                alt={currentLang === "en" ? "Español" : "English"}
                width={24}
                height={18}
                className="object-cover w-6 h-[18px]"
              />
              <span
                className={`text-xs font-bold ${
                  scrolled ? "text-slate-700" : "text-white"
                }`}
              >
                {currentLang === "en" ? "ES" : "EN"}
              </span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled
                  ? "text-slate-700 hover:bg-slate-100"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Progress Indicator */}
      <div className="h-[3px] w-full bg-transparent">
        <div
          className="h-full bg-[#A0522D] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <nav className="flex flex-col py-4 px-4">
            {navLinks.map((link) => {
              const href = link.href[currentLang];
              return (
                <Link
                  key={link.key}
                  href={href}
                  className={`py-3 px-4 text-sm font-medium uppercase tracking-wide rounded-lg transition-colors ${
                    isActive(href)
                      ? "text-[#A0522D] bg-[#F7EFE3]"
                      : "text-slate-700 hover:bg-[#F7EFE3] hover:text-[#A0522D]"
                  }`}
                >
                  {t(`nav.${link.key}`)}
                </Link>
              );
            })}
            <a
              href="tel:9285550147"
              className="flex items-center gap-2 py-3 px-4 text-sm font-medium text-slate-700 hover:bg-[#F7EFE3] rounded-lg mt-2"
            >
              <Phone className="w-4 h-4 text-[#A0522D]" />
              (928) 555-0147
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
