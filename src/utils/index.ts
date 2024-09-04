import {
   CatalogFiltersType,
   ICardSection,
   SelectionFiltersType,
} from '../types';
import { resetFilters } from '../store/cardCatalogSlice';
import { AppDispatch, RootState } from '../store';
import { useSelector } from 'react-redux';

export const n = ['Все лофты', 'Идеи', 'Избранное'];

export const createNavPoints = (dispatch: AppDispatch) => [
   {
      name: 'Все лофты',
      path: '/catalog',
      onClick: () => dispatch(resetFilters()),
   },
   { name: 'Идеи', path: '/ideas' },
   { name: 'Избранное', path: '/favorite' },
];

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

export const formatDate = (fullDate: string): string | null => {
   const months = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря',
   ];

   const daysOfWeek = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

   const [day, month, year] = fullDate.split(':').map(Number);

   if (!day || !month || !year) {
      return null;
   }

   const jsDate = new Date(year, month - 1, day);
   const dayOfWeek = daysOfWeek[jsDate.getDay()];

   const formattedDate = `${day} ${months[month - 1]}, ${dayOfWeek}`;

   return formattedDate;
};

export const getValueByAnother = (
   typeParam: string,
   cardSectionList: ICardSection[]
) => {
   return cardSectionList.find((item) => item.type === typeParam)?.title || '';
};

export const todayDate = new Date();

export const getTitleByFilter = (
   filter: SelectionFiltersType | CatalogFiltersType
) => {
   const { type, date, price } = useSelector((state: RootState) => state.cards);

   const newDate = formatDate(date);
   const newPrice = price.split(':');

   switch (filter) {
      case 'Event':
         return type ? getValueByAnother(type, cardSectionList) : null;
      case 'Date':
         return newDate;
      case 'Price':
         if (price) {
            return `${newPrice[0]} - ${newPrice[1]} руб.`;
         }
         return null;
      default:
         return null;
   }
};
