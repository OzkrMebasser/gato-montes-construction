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
  "https://res.cloudinary.com/dmqqhcf49/image/upload/v1783203088/nuevo-logo-gatomontes-blanco_azztad.png";
const logoTextBrown =
  "https://res.cloudinary.com/dmqqhcf49/image/upload/v1783217903/nuevo-logo-gatomontes_qszinl.png";

const logo =
  "https://res.cloudinary.com/dmqqhcf49/image/upload/v1783181750/logo-nuevo-gato-montes_x2wcih.png";
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

  const langAriaLabel =
    currentLang === "en" ? "Cambiar a Español" : "Switch to English";
  const logoHref = currentLang === "es" ? "/inicio" : "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#f9ece2] backdrop-blur-md shadow-md py-1"
          : "bg-transparent py-4"
      }`}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-12">
        <div className="relative flex items-center justify-between">
          {/* MOBILE LEFT SLOT:
              - not scrolled: language toggle
              - scrolled: round + brown logo */}
          <div className="md:hidden flex items-center">
            {scrolled ? (
              <Link href={logoHref} className="flex items-center">
                <Image
                  src={logoRound}
                  alt="Gato Montes Construction"
                  width={70}
                  height={70}
                  className="-ml-3 rounded-full h-[60px] w-[60px]"
                />
                <Image
                  src={logoTextBrown}
                  alt="Gato Montes Construction"
                  width={200}
                  height={70}
                  className="-ml-3 transition-all duration-300 object-contain h-[70px] w-auto"
                />
              </Link>
            ) : (
              <button
                onClick={toggleLang}
                className="flex items-center gap-2 pl-1 pr-3 py-1 transition-all"
                aria-label={langAriaLabel}
                title={langAriaLabel}
              >
                <Image
                  src={currentLang === "en" ? flagMX : flagUS}
                  alt={currentLang === "en" ? "Español" : "English"}
                  width={24}
                  height={18}
                  className="object-cover w-6 h-[18px]"
                />
                <span className="text-xs font-bold text-white">
                  {currentLang === "en" ? "ES" : "EN"}
                </span>
              </button>
            )}
          </div>

          {/* Logo — tablet/desktop position, unchanged in every scroll state */}
          <Link
            href={logoHref}
            className="hidden md:flex items-center transition-all duration-300"
          >
            {scrolled ? (
              <>
                <Image
                  src={logoRound}
                  alt="Gato Montes Construction"
                  width={70}
                  height={70}
                  className="-ml-3 rounded-full sm:h-[70px] sm:w-[70px] lg:h-[70px] lg:w-[70px]"
                />
                <Image
                  src={logoTextBrown}
                  alt="Gato Montes Construction"
                  width={200}
                  height={70}
                  className="-ml-10 transition-all duration-300 object-contain sm:h-[70px] lg:h-[70px]"
                />
              </>
            ) : (
              <Image
                src={logoTextWhite}
                alt="Gato Montes Construction"
                width={250}
                height={70}
                className="object-contain sm:h-[70px] lg:h-[120px] w-[250px] md:-ml-3"
              />
            )}
          </Link>

          {/* Mobile-only centered white logo — ONLY when not scrolled */}
          {!scrolled && (
            <Link
              href={logoHref}
              className="md:hidden absolute left-1/2 -translate-x-1/2 flex items-center transition-all duration-300"
            >
              <Image
                src={logoTextWhite}
                alt="Gato Montes Construction"
                width={250}
                height={70}
                className="object-contain h-[120px] w-[260px] mt-12"
              />
            </Link>
          )}

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

            {/* Language Toggle — tablet/desktop position, unchanged */}
            <button
              onClick={toggleLang}
              className="hidden md:flex items-center gap-2 pl-1 pr-3 py-1 transition-all"
              aria-label={langAriaLabel}
              title={langAriaLabel}
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

            {/* Mobile-only language toggle — appears here (right, next to menu button) only when scrolled */}
            {scrolled && (
              <button
                onClick={toggleLang}
                className="md:hidden flex items-center gap-2 pl-20 py-1 transition-all"
                aria-label={langAriaLabel}
                title={langAriaLabel}
              >
                <Image
                  src={currentLang === "en" ? flagMX : flagUS}
                  alt={currentLang === "en" ? "Español" : "English"}
                  width={24}
                  height={18}
                  className="object-cover w-6 h-[18px]"
                />
                <span className="text-xs font-bold text-slate-700">
                  {currentLang === "en" ? "ES" : "EN"}
                </span>
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors border  ${
                scrolled
                  ? "text-[#241812] hover:bg-[#ffae85] border-[#241812]/30"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Progress Indicator */}
      <div className="h-[3px] w-full bg-transparent absolute -bottom-[3px] left-0">
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
