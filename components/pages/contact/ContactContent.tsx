"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";
import { useTranslation } from "@/lib/i18n/client";
import { Phone, Mail, MapPin, Clock, CheckCircle, XCircle } from "lucide-react";
import { rye } from "@/lib/fonts";
import ServiceAreaMap from "@/components/home/ServiceAreaMap";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const serviceOptions = [
  "bathroomRemodeling",
  "flooringTile",
  "doorsWindows",
  "stuccoFences",
  "drywall",
  "painting",
];

export function ContactContent({ lang }: { lang: "en" | "es" }) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const contactFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-hero-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      );

      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: formRef.current, start: "top 80%" },
          },
        );
      }

      if (infoRef.current) {
        gsap.fromTo(
          infoRef.current,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: infoRef.current, start: "top 80%" },
          },
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setSending(true);

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        contactFormRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      )
      .then(() => {
        setSubmitted(true);
        setSending(false);
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setError(true);
        setSending(false);
      });
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] flex items-center"
      >
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-[position:50%_30%] md:bg-center"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/5691502/pexels-photo-5691502.jpeg')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#241812]/30 via-[#241812]/60 to-[#241812]/80" />
        </div>
        <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-16 py-32 pt-40 ">
          <h1
            className={` uppercase hero-title ${rye.className} text-3xl sm:text-4xl md:text-6xl lg:text-5xl font-bold text-white leading-tight mb-6`}
          >
            {" "}
            {t("contact.title")}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            {t("contact.subtitle")}
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 md:py-12 bg-white">
        <h2
          className={` text-center uppercase hero-title ${rye.className} text-3xl sm:text-4xl md:text-6xl lg:text-5xl font-bold text-[#241812] leading-tight mb-6`}
        >
          {t("contact.info.title")}
        </h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div ref={formRef}>
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center">
                  <CheckCircle className="text-green-500 w-12 h-12 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-green-800 mb-2">
                    {t("contact.form.success")}
                  </h3>
                  <p className="text-green-600">
                    We will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  ref={contactFormRef}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      {t("contact.form.name")}
                    </label>
                    <input
                      type="text"
                      name="from_name"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20 outline-none transition-all"
                      placeholder="John Smith"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        {t("contact.form.email")}
                      </label>
                      <input
                        type="email"
                        name="from_email"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20 outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        {t("contact.form.phone")}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20 outline-none transition-all"
                        placeholder="(928) 555-0147"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      {t("contact.form.service")}
                    </label>
                    <select
                      name="service"
                      defaultValue=""
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20 outline-none transition-all bg-white"
                    >
                      <option value="">
                        {t("contact.form.selectPlaceholder")}
                      </option>
                      {serviceOptions.map((key) => (
                        <option key={key} value={t(`services.${key}.title`)}>
                          {t(`services.${key}.title`)}
                        </option>
                      ))}
                      <option value={t("contact.form.other")}>
                        {t("contact.form.other")}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      {t("contact.form.message")}
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20 outline-none transition-all resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                      <XCircle className="w-4 h-4 flex-shrink-0" />
                      <span>
                        Hubo un error al enviar tu mensaje. Intenta de nuevo o
                        llámanos directamente.
                      </span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-[#A0522D] hover:bg-[#8B4429] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#A0522D]/25 hover:-translate-y-0.5"
                  >
                    {sending ? "Enviando..." : t("contact.form.submit")}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div ref={infoRef}>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-[#F7EFE3] rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-[#EAD9C0] text-[#A0522D] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#241812]">
                      {t("contact.info.phone")}
                    </h3>
                    <a
                      href="tel:9285550147"
                      className="text-slate-600 hover:text-[#A0522D] transition-colors"
                    >
                      (928) 555-0147
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-[#F7EFE3] rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-[#EAD9C0] text-[#A0522D] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#241812]">
                      {t("contact.info.email")}
                    </h3>
                    <a
                      href="mailto:handymaninwickenburg@gmail.com"
                      className="text-slate-600 hover:text-[#A0522D] transition-colors"
                    >
                      handymaninwickenburg@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-[#F7EFE3] rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-[#EAD9C0] text-[#A0522D] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#241812]">
                      {t("contact.info.address")}
                    </h3>
                    <p className="text-slate-600">
                      152 Henderson StWickenburg, AZ 85390, USA
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-[#F7EFE3] rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-[#EAD9C0] text-[#A0522D] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#241812]">
                      {t("contact.info.hours")}
                    </h3>
                    <p className="text-slate-600">{t("contact.form.week")}</p>{" "}
                    <p className="text-slate-600">{t("contact.form.sat")}</p>
                    <p className="text-slate-600">{t("contact.form.sun")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="relative h-[400px] md:h-[500px] lg:h-[600px]">
       

        <ServiceAreaMap/>
      </section>   */}

    </div>
  );
}
