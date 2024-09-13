import {
   CatalogFiltersType,
   ICardSection,
   SelectionFiltersType,
} from '../types';

export const fontFamilyClasses = ['open-sans', 'inter', 'monrope'] as const;

export type FontFamiliesClasses = (typeof fontFamilyClasses)[number];

export const MAX_PRICE = 20000;

export const API_URL = import.meta.env.VITE_API_URL;

export const selectionFilters: SelectionFiltersType[] = [
   'Event',
   'Date',
   'Start Time',
   'End Time',
];

export const catalogFilters: CatalogFiltersType[] = [
   'Event',
   'Price',
   'Date',
   'Filters',
];

export const bannersContent = [
   {
      text: {
         accent: 'Без комиссии',
         main: ' — не переплачивайте за аренду',
      },
      iconPath: 'discount',
   },
   {
      text: {
         accent: 'Онлайн-календари',
         main: ' — выбирайте только среди свободных площадок',
      },
      iconPath: 'calendar',
   },
   {
      text: {
         accent: 'Прямые контакты площадок',
         main: ' — общение без посредников',
      },
      iconPath: 'note',
   },
];

export const cardSectionList: ICardSection[] = [
   {
      title: 'Мы рекомендуем',
      type: 'recommendations',
   },
   {
      title: 'Все площадки',
      type: '',
   },
   {
      title: 'Коворкинги',
      type: 'coworking',
   },
   {
      title: 'Банкетные залы для свадеб',
      type: 'wedding',
   },
   {
      title: 'Танцевальные залы',
      type: 'dance',
   },
   {
      title: 'Площадки для выпускных',
      type: 'graduation',
   },
   {
      title: 'Площадки для переговоров',
      type: 'meeting',
   },
   {
      title: 'Лофты для вечеринок',
      type: 'party',
   },
   {
      title: 'Бары для вечеринок',
      type: 'bars',
   },
   {
      title: 'Площадки в центре Москвы',
      type: 'central_moscow',
   },
   {
      title: 'Лофты на 15 гостей',
      type: 'lofts_15_guests',
   },
   {
      title: 'Площадки для корпоративов',
      type: 'corporate',
   },
   {
      title: 'Площадки для Дня рождения',
      type: 'birthday',
   },
   {
      title: 'Детские праздники',
      type: 'kids',
   },
];
