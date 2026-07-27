"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n/client";
import { PhoneOutgoing } from "lucide-react";
import { RiArrowGoBackFill } from "react-icons/ri";

const ActionButton = () => {
  const { t } = useTranslation();
  const [openMenu, setOpenMenu] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [bounceKey, setBounceKey] = useState(0);
  const toggleMenu = () => setOpenMenu(!openMenu);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > window.innerHeight * 0.9);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Repite la animación bounce-top cada 30s. Cambiar el `key` fuerza a
  // React a desmontar y remontar el botón, reiniciando la animación CSS.
  useEffect(() => {
    const interval = setInterval(() => {
      setBounceKey((k) => k + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!showButton) return null;

  return (
    <div>
      <button
        key={bounceKey}
        aria-label="Abrir menú de contacto"
        className="bounce-top shadow-lg bg-white hover:bg-[#8B4429] text-[#8B4429] hover:text-white border border-[#241812]/15 hover:border-white/20 flex justify-center fixed mx-auto rounded-full w-[46px] h-[46px] items-center z-50 left-6 bottom-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#A0522D]/25"
        onClick={toggleMenu}
      >
        <span
          className={`transition-transform duration-500 ease-in-out ${
            openMenu ? "rotate-[1440deg]" : "rotate-0"
          }`}
        >
          {openMenu ? (
            <RiArrowGoBackFill size={18} />
          ) : (
            <PhoneOutgoing size={18} />
          )}
        </span>
      </button>

      {openMenu && (
        <a
          href="tel:+19284645014"
          className="roll-in-left  inline-flex items-center gap-2 bg-white hover:bg-[#8B4429] text-[#8B4429] hover:text-white font-semibold px-5 py-3 rounded-lg backdrop-blur-sm border border-[#241812]/15 hover:border-white/20 fixed z-50 w-max left-[5.2rem] bottom-[1.6rem] text-sm transition-all duration-300 hover:-translate-y-0.5"
        >
          {t("contactCTA.callCTA")}
          <PhoneOutgoing className="w-4 h-4 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
        </a>
      )}
    </div>
  );
};

export default ActionButton;