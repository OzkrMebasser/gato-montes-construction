import Image from "next/image";

export function GatoMontesIcon({ className }: { className?: string }) {
  return (
    <Image
      src="https://res.cloudinary.com/dmqqhcf49/image/upload/v1782977150/ChatGPT_Image_2_jul_2026_00_14_04_q4llsz.png"
      alt="Gato montes decor Icon"
      width={120}
      height={120}
      className={`object-contain ${className ?? ""}`}
    />
  );
}