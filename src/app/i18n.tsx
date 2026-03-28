import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

type Language = "en" | "es" | "fr";

const STORAGE_KEY = "preferredLanguage";
const supportedLanguages: Language[] = ["en", "es", "fr"];

const translations: Record<Language, Record<string, any>> = {
  en: {
    nav: {
      home: "Home",
      treks: "Treks",
      help: "Help",
    },
    auth: {
      login: "Login",
      becomeGuide: "Become a Guide",
      dashboard: "Dashboard",
      logout: "Logout",
    },
    footer: {
      quickLinks: "Quick Links",
      about: "About",
      description: "Your trusted platform for discovering Nepal's trekking routes and connecting with local guides.",
      browseTreks: "Browse Treks",
      guideRegister: "Become a Guide",
      helpSupport: "Help & Support",
      fair: "Fair & Transparent",
      noBias: "No Biased Rankings",
      localGuides: "Local Guides",
      copyright: "© 2026 Gantavya. All rights reserved.",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      treks: "Trek",
      help: "Ayuda",
    },
    auth: {
      login: "Iniciar sesión",
      becomeGuide: "Conviértete en guía",
      dashboard: "Panel",
      logout: "Cerrar sesión",
    },
    footer: {
      quickLinks: "Enlaces rápidos",
      about: "Acerca de",
      description: "Tu plataforma confiable para descubrir rutas de trekking en Nepal y conectar con guías locales.",
      browseTreks: "Explorar treks",
      guideRegister: "Conviértete en guía",
      helpSupport: "Ayuda y soporte",
      fair: "Justo y transparente",
      noBias: "Sin clasificaciones sesgadas",
      localGuides: "Guías locales",
      copyright: "© 2026 Gantavya. Todos los derechos reservados.",
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      treks: "Trek",
      help: "Aide",
    },
    auth: {
      login: "Connexion",
      becomeGuide: "Devenir guide",
      dashboard: "Tableau",
      logout: "Se déconnecter",
    },
    footer: {
      quickLinks: "Liens rapides",
      about: "À propos",
      description: "Votre plateforme de confiance pour découvrir les itinéraires de trekking au Népal et connecter avec des guides locaux.",
      browseTreks: "Parcourir les treks",
      guideRegister: "Devenir guide",
      helpSupport: "Aide & Assistance",
      fair: "Juste et transparent",
      noBias: "Pas de classement biaisé",
      localGuides: "Guides locaux",
      copyright: "© 2026 Gantavya. Tous droits réservés.",
    },
  },
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function detectBrowserLanguage(): Language {
  if (typeof navigator === "undefined") return "en";
  const browserLang = navigator.language.slice(0, 2).toLowerCase();
  return supportedLanguages.includes(browserLang as Language) ? (browserLang as Language) : "en";
}

function getInitialLanguage(): Language {
  if (typeof localStorage === "undefined") return detectBrowserLanguage();
  const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
  if (stored && supportedLanguages.includes(stored)) {
    return stored;
  }
  return detectBrowserLanguage();
}

function translate(language: Language, key: string): string {
  const segments = key.split(".");
  let current: any = translations[language];
  for (const segment of segments) {
    if (!current || typeof current !== "object") {
      return key;
    }
    current = current[segment];
  }
  return typeof current === "string" ? current : key;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    return getInitialLanguage();
  });

  useEffect(() => {
    if (typeof localStorage === "undefined") return;
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage: (locale: Language) => setLanguageState(locale),
      t: (key: string) => translate(language, key),
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

const fallbackLanguage: Language = "en";

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    console.warn("LanguageProvider is missing. Falling back to default language.");
    return {
      language: fallbackLanguage,
      setLanguage: () => undefined,
      t: (key: string) => translate(fallbackLanguage, key),
    };
  }
  return context;
}

export const availableLanguages: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "fr", label: "FR" },
];
