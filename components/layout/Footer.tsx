"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n/client";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react";

const footerLinks = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/projects", key: "projects" },
  { href: "/contact", key: "contact" },
];

const serviceList = [
  "Remodelación de Baños",
  "Pisos y Azulejo (Tile)",
  "Puertas y Ventanas",
  "Estuco y Cercos",
  "Drywall",
  "Pintura Interior y Exterior",
];

export function Footer() {
  const { t, i18n } = useTranslation();

  return (
    <footer className="bg-[#241812] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-full h-[200px] rounded-full overflow-hidden ring-2 ring-white/10">
                <Image
                  src="https://res.cloudinary.com/dmqqhcf49/image/upload/v1782966893/gatomontesroundlogo_a2jszb.png"
                  alt="Gato Montes Construction"
                  fill
                  className="object-contain bg-[#F7EFE3]"
                />
              </div>
              
            </div>
        
          </div>

          {/* Social Media */}
          <div className="lg:col-span-1">
            <h3 className="font-bold text-lg mb-6">Siguenos</h3>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-[#A0522D] hover:text-white transition-all"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-[#A0522D] hover:text-white transition-all"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">
              {t("nav.home") === "Home" ? "Quick Links" : "Enlaces"}
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#D9A876] transition-colors text-sm"
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-6">{t("services.title")}</h3>
            <ul className="space-y-3 text-sm text-white/60">
              {serviceList.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
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
                <span className="text-white/60 text-sm">
                  {t("footer.hours")}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} Gato Montes Construction.{" "}
              {t("footer.rights")}
            </p>
            <div className="flex items-center gap-6 text-sm text-white/40">
              <Link href="#" className="hover:text-white/70 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white/70 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
