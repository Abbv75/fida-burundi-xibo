export const API_CONFIG = {
  piparvb: {
    proxy: "/api-piparvb",
    baseUrl: import.meta.env.VITE_PIPARVB_URL || "https://piparvb.fidaburundi.org",
  },
  proder: {
    proxy: "/api-proder",
    baseUrl: import.meta.env.VITE_PRODER_URL || "https://proder.fidaburundi.org",
  },
  paifarb: {
    proxy: "/api-paifarb",
    baseUrl: import.meta.env.VITE_PAIFARB_URL || "https://paifarb.fidaburundi.org",
  },
  sise: {
    proxy: "/api-sise",
    baseUrl: import.meta.env.VITE_SISE_URL || "https://sise.fc-psfe.org",
  },
  suivi: {
    proxy: "/api-suivi",
    baseUrl: import.meta.env.VITE_SUIVI_URL || "https://suivi.fc-psfe.org",
  },
};

export const getApiUrl = (key: keyof typeof API_CONFIG, path: string) => {
  const config = API_CONFIG[key];
  const prefix = import.meta.env.DEV ? config.proxy : config.baseUrl;
  // Ensure path starts with / if prefix doesn't end with it, or vice versa
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${prefix}${cleanPath}`;
};
