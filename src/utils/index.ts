import { ICardSection, selectionParamsType } from '../types';
import { setFilter } from '../store/cardCatalogSlice';
import { AppDispatch } from '../store';

export const n = ['Все лофты', 'Идеи', 'Избранное'];

export const createNavPoints = (dispatch: AppDispatch) => [
   {
      name: 'Все лофты',
      path: '/catalog',
      onClick: () => dispatch(setFilter('')),
   },
   { name: 'Идеи', path: '/ideas' },
   { name: 'Избранное', path: '/favorite' },
];

export const selectionParams: selectionParamsType[] = [
   'Мероприятие',
   'Дата',
   'Начало',
   'Конец',
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
      filter: 'recommendations',
   },
   {
      title: 'Все площадки',
      filter: '',
   },
   {
      title: 'Коворкинги',
      filter: 'coworking',
   },
   {
      title: 'Банкетные залы для свадеб',
      filter: 'wedding',
   },
   {
      title: 'Танцевальные залы',
      filter: 'dance',
   },
   {
      title: 'Площадки для выпускных',
      filter: 'graduation',
   },
   {
      title: 'Площадки для переговоров',
      filter: 'meeting',
   },
   {
      title: 'Лофты для вечеринок',
      filter: 'party',
   },
   {
      title: 'Бары для вечеринок',
      filter: 'bars',
   },
   {
      title: 'Площадки в центре Москвы',
      filter: 'central_moscow',
   },
   {
      title: 'Лофты на 15 гостей',
      filter: 'lofts_15_guests',
   },
   {
      title: 'Площадки для корпоративов',
      filter: 'corporate',
   },
   {
      title: 'Площадки для Дня рождения',
      filter: 'birthday',
   },
   {
      title: 'Детские праздники',
      filter: 'kids',
   },
];

export const catalogFilters = ['Событие', 'Стоимость', 'Даты', 'Фильтры'];

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
   filterParam: string,
   cardSectionList: ICardSection[]
) => {
   return (
      cardSectionList.find((item) => item.filter === filterParam)?.title || ''
   );
};

export const todayDate = new Date();
