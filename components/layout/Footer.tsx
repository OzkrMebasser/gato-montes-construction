"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n/client";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react";
import { FaYelp } from "react-icons/fa6";
import { BsHouseFill } from "react-icons/bs";

const footerLinks = [
  { key: "home", href: { en: "/", es: "/inicio" } },
  { key: "about", href: { en: "/about", es: "/nosotros" } },
  { key: "services", href: { en: "/services", es: "/servicios" } },
  { key: "contact", href: { en: "/contact", es: "/contacto" } },
];

const serviceKeys = [
  "bathroomRemodeling",
  "flooringTile",
  "doorsWindows",
  "stuccoFences",
  "drywall",
  "painting",
];

//  'https://www.facebook.com/handymaninwickenburg',
//   'https://www.instagram.com/gatomonteshandyman/'

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/handymaninwickenburg",
    icon: Facebook,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/gatomonteshandyman/",
    icon: Instagram,
  },
  { name: "Yelp", href: "#", icon: FaYelp },
  { name: "Nextdoor", href: "#", icon: BsHouseFill, flip: true },
];

function SocialIcons({ gap = "gap-3" }: { gap?: string }) {
  return (
    <div className={`flex items-start ${gap}`}>
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.name}
            href={social.href}
            className="flex flex-col items-center gap-1.5 group"
            rel="noopener noreferrer" 
            target="_blank"
          >
            <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 group-hover:bg-[#A0522D] group-hover:text-white transition-all">
              <Icon size={16} className={social.flip ? "-scale-x-100" : ""} />
            </span>
            <span className="text-[10px] text-white/50 group-hover:text-[#D9A876] transition-colors">
              {social.name}
            </span>
          </a>
        );
      })}
    </div>
  );
}

export function Footer() {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language || "en").split("-")[0] as "en" | "es";
  const servicesHref = currentLang === "es" ? "/servicios" : "/services";
  const logo =
    "https://res.cloudinary.com/dmqqhcf49/image/upload/v1783641933/logo-nuevo-gato-montes_txw8bu.png";

  return (
    <footer className="bg-[#241812] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Company Info + Social Media — 4 de 12 columnas */}
          <div className="md:col-span-2 lg:col-span-4 rounded-xl overflow-hidden">
            <div className="flex items-center">
              <div className="relative w-full h-[300px] overflow-hidden">
                <Image
                  src={logo}
                  alt="Gato Montes Construction"
                  fill
                  className="object-contain bg-[#f9ebda]"
                />
              </div>
            </div>
            {/* Social Media — solo mobile/tablet, justo debajo del logo */}
            <div className="lg:hidden mt-6 flex flex-col items-center">
              <h3 className="font-bold text-lg mb-4">{t("footer.followUs")}</h3>
              <SocialIcons gap="gap-3" />
            </div>
          </div>

          {/* Quick Links — 2 de 12 columnas */}
          <div className="lg:col-span-2 ">
            <h3 className="font-bold text-lg mb-6">{t("footer.quickLinks")}</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href[currentLang]}
                    className="text-white/60 hover:text-[#D9A876] transition-colors text-sm"
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services — 3 de 12 columnas */}
          <div className="lg:col-span-3 ">
            <h3 className="font-bold text-lg mb-6">{t("services.title")}</h3>
            <ul className="space-y-3 text-sm text-white/60">
              {serviceKeys.map((key) => (
                <li key={key}>
                  <Link
                    href={`${servicesHref}#${key}`}
                    className="hover:text-[#D9A876] transition-colors"
                  >
                    {t(`services.${key}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info — 3 de 12 columnas */}
          <div className="lg:col-span-3 ">
            <h3 className="font-bold text-lg mb-6">
              {t("contact.info.title")}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="text-[#D9A876] mt-1 w-3 h-3 flex-shrink-0" />
                <a
                  href="tel:9285550147"
                  className="text-white/60 hover:text-[#D9A876] transition-colors text-sm"
                >
                  {t("footer.phone")}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="text-[#D9A876] mt-1 w-3 h-3 flex-shrink-0" />
                <a
                  href="mailto:info@gatomontesconstruction.com"
                  className="text-white/60 hover:text-[#D9A876] transition-colors text-sm"
                >
                  {t("footer.email")}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-[#D9A876] mt-1 w-3 h-3 flex-shrink-0" />
                <span className="text-white/60 text-sm">
                  {t("footer.address")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="text-[#D9A876] mt-1 w-3 h-3 flex-shrink-0" />
                <span className="text-white/60 text-sm whitespace-pre-line">
                  {t("footer.hours")}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media — 1 de 12 columnas — solo desktop (lg) */}
        <div className="hidden lg:flex lg:col-span-1 mx-auto mt-8 md:mt-12 lg:mt-0 flex-col items-center">
          <h3 className="font-bold text-lg mt-6 mb-4">
            {t("footer.followUs")}
          </h3>
          <SocialIcons gap="gap-6" />
        </div>
      </div>

      {/* Bottom bar */}

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm text-center sm:text-left">
              &copy; {new Date().getFullYear()} Gato Montes Construction.{" "}
              <span className="block lg:inline"> {t("footer.rights")}</span>
            </p>
            <div className="flex items-center gap-6 text-sm text-white/40">
              <Link href="#" className="hover:text-white/70 transition-colors">
                {t("footer.privacyPolicy")}
              </Link>
              <Link href="#" className="hover:text-white/70 transition-colors">
                {t("footer.termsOfService")}
              </Link>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/5 text-center">
            <p className="text-white/30 text-xs">
              {t("footer.designed")}{" "}
              <a
                href="https://oscarmorenodev.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-[#D9A876] transition-colors"
              >
                Oscar Moreno
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
