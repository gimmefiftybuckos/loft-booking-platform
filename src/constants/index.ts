export const fontFamilyClasses = [
   'open-sans',
   'inter-variable',
   'monrope-variable',
] as const;

export type FontFamiliesClasses = (typeof fontFamilyClasses)[number];
