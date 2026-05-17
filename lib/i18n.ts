export const locales = ["en", "es"] as const;

export type Locale = (typeof locales)[number];

type Dictionary = {
  title: string;
  description: string;
  docs: string;
  start: string;
};

export const dictionary: Record<Locale, Dictionary> = {
  en: {
    title: "Project ready for multilingual and adaptive themes.",
    description:
      "This base is configured for English/Spanish and dark/light mode based on your system preference.",
    docs: "Documentation",
    start: "Get Started",
  },
  es: {
    title: "Proyecto listo para idioma y tema adaptativo.",
    description:
      "Esta base queda configurada para inglés/español y modo claro/oscuro según la preferencia de tu sistema.",
    docs: "Documentación",
    start: "Comenzar",
  },
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getPreferredLocale(acceptLanguage: string): Locale {
  const lowered = acceptLanguage.toLowerCase();
  if (lowered.includes("es")) return "es";
  return "en";
}
