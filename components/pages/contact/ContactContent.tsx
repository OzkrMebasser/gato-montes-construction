'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from '@/lib/i18n/client';
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ContactContent({ lang }: { lang: 'en' | 'es' }) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  const [submitted, setSubmitted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-hero-title',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );

      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: formRef.current, start: 'top 80%' },
          }
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
            ease: 'power3.out',
            scrollTrigger: { trigger: infoRef.current, start: 'top 80%' },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[45vh] flex items-center bg-[#241812]"
      >
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#241812]/60 to-[#241812]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-40">
          <h1 className="contact-hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div ref={formRef}>
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center">
                  <CheckCircle className="text-green-500 w-12 h-12 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-green-800 mb-2">
                    {t('contact.form.success')}
                  </h3>
                  <p className="text-green-600">
                    We will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      {t('contact.form.name')}
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20 outline-none transition-all"
                      placeholder="John Smith"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        {t('contact.form.email')}
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20 outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        {t('contact.form.phone')}
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20 outline-none transition-all"
                        placeholder="(928) 555-0147"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      {t('contact.form.service')}
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20 outline-none transition-all bg-white"
                    >
                      <option value="">Select a service</option>
                      <option value="bathroomRemodeling">Bathroom Remodeling</option>
                      <option value="flooringTile">Flooring & Tile</option>
                      <option value="doorsWindows">Doors & Windows</option>
                      <option value="stuccoFences">Stucco & Fences</option>
                      <option value="drywall">Drywall</option>
                      <option value="painting">Painting</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      {t('contact.form.message')}
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20 outline-none transition-all resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#A0522D] hover:bg-[#8B4429] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#A0522D]/25 hover:-translate-y-0.5"
                  >
                    {t('contact.form.submit')}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div ref={infoRef}>
              <h2 className="text-2xl font-bold text-[#241812] mb-8">
                {t('contact.info.title')}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-[#F7EFE3] rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-[#EAD9C0] text-[#A0522D] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#241812]">{t('contact.info.phone')}</h3>
                    <a href="tel:9285550147" className="text-slate-600 hover:text-[#A0522D] transition-colors">
                      (928) 555-0147
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-[#F7EFE3] rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-[#EAD9C0] text-[#A0522D] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#241812]">{t('contact.info.email')}</h3>
                    <a href="mailto:info@desertridgeconstruction.com" className="text-slate-600 hover:text-[#A0522D] transition-colors">
                      info@desertridgeconstruction.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-[#F7EFE3] rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-[#EAD9C0] text-[#A0522D] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#241812]">{t('contact.info.address')}</h3>
                    <p className="text-slate-600">123 Main Street, Wickenburg, AZ 85390</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-[#F7EFE3] rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-[#EAD9C0] text-[#A0522D] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#241812]">{t('contact.info.hours')}</h3>
                    <p className="text-slate-600">Mon - Fri: 7:00 AM - 5:00 PM</p>
                    <p className="text-slate-600">Sat: 8:00 AM - 12:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-8 aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-[#EAD9C0]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106698.8477456856!2d-112.7857!3d33.9684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b37e0b8e2e7c1%3A0x8e5e8e5e8e5e8e5e!2sWickenburg%2C%20AZ!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Wickenburg Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}