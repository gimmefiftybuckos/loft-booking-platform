export const fontFamilyClasses = ['open-sans', 'inter', 'monrope'] as const;

export type FontFamiliesClasses = (typeof fontFamilyClasses)[number];
