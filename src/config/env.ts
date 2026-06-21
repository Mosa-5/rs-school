const DEFAULT_CACHE_TTL = 60;

export const CACHE_TTL =
  Number(process.env.NEXT_PUBLIC_CACHE_TTL) || DEFAULT_CACHE_TTL;
