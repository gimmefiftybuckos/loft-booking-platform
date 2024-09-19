import {
   CatalogFiltersType,
   ICardSection,
   SelectionFiltersType,
} from '../types';
import { resetFilters } from '../store/slices/cardCatalog';
import { useSelector, AppDispatch } from '../store';
import { cardSectionList, daysOfWeek, months } from './constants';

export const createNavPoints = (dispatch: AppDispatch) => [
   {
      name: 'Все лофты',
      path: '/catalog',
      onClick: () => dispatch(resetFilters()),
   },
   { name: 'Идеи', path: '/ideas' },
   { name: 'Избранное', path: '/favorite' },
];

export const formatDate = (fullDate: string): string | null => {
   const [day, month, year] = fullDate.split(':').map(Number);

   if (!day || !month || !year) {
      return null;
   }

   const jsDate = new Date(year, month - 1, day);
   const dayOfWeek = daysOfWeek[jsDate.getDay()];

   return `${day} ${months[month - 1]}, ${dayOfWeek}`;
};

export const getTitle = (
   typeParam: string,
   cardSectionList: ICardSection[]
) => {
   return cardSectionList.find((item) => item.type === typeParam)?.title || '';
};

export const getTitleByFilter = (
   filter: SelectionFiltersType | CatalogFiltersType
) => {
   const { type, date, price } = useSelector((state) => state.cards);

   const newDate = formatDate(date);
   const newPrice = price.split(':');

   switch (filter) {
      case 'Event':
         return type ? getTitle(type, cardSectionList) : null;
      case 'Date':
         return newDate || null;
      case 'Price':
         if (price) {
            return `${newPrice[0]} - ${newPrice[1]} руб.`;
         }
         return null;
      default:
         return null;
   }
};

export const updateSearchParams = (
   type: string,
   date: string,
   price: string
) => {
   const params: Record<string, string> = {};

   if (type) params.type = type;
   if (date) params.date = encodeURIComponent(date);
   if (price) params.price = encodeURIComponent(price);

   return params;
};

export function setCookie(name: string, value: string) {
   value = encodeURIComponent(value);
   let updatedCookie = name + '=' + value;
   document.cookie = updatedCookie;
}

export function getCookie(name: string): string | undefined {
   const matches = document.cookie.match(
      new RegExp(
         '(?:^|; )' +
            name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
            '=([^;]*)'
      )
   );

   return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
   setCookie(name, '');
}
