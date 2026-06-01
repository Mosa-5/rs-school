const DEFAULT_CACHE_TTL = 60;

export const CACHE_TTL =
  Number(import.meta.env.VITE_CACHE_TTL) || DEFAULT_CACHE_TTL;
