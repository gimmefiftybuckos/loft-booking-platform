export const fontFamilyClasses = ['open-sans', 'inter', 'monrope'] as const;

export type FontFamiliesClasses = (typeof fontFamilyClasses)[number];

export const MAX_PRICE = 20000;

export const API_URL = import.meta.env.VITE_API_URL;
