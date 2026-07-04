import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLanguageFromCookie(): string {
  if (typeof window === 'undefined') return 'en';
  const match = document.cookie.match(/i18next=([^;]+)/);
  return match?.[1] || 'en';
}
