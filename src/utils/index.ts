import { ICardSection } from '../types';
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

export const selectionParams = [
   { name: 'Тип мероприятий' },
   { name: 'Дата мероприятий' },
   { name: 'Начало' },
   { name: 'Конец' },
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
      param: 'recommendations',
   },
   {
      title: 'Все площадки',
      param: '',
   },
   {
      title: 'Коворкинги',
      param: 'coworking',
   },
   {
      title: 'Банкетные залы для свадеб',
      param: 'wedding',
   },
   {
      title: 'Танцевальные залы',
      param: 'dance',
   },
   {
      title: 'Площадки для выпускных',
      param: 'graduation',
   },
   {
      title: 'Площадки для переговоров',
      param: 'meeting',
   },
   {
      title: 'Лофты для вечеринок',
      param: 'party',
   },
   {
      title: 'Бары для вечеринок',
      param: 'bars',
   },
   {
      title: 'Площадки в центре Москвы',
      param: 'central_moscow',
   },
   {
      title: 'Лофты на 15 гостей',
      param: 'lofts_15_guests',
   },
   {
      title: 'Площадки для корпоративов',
      param: 'corporate',
   },
   {
      title: 'Площадки для Дня рождения',
      param: 'birthday',
   },
   {
      title: 'Площадки для детских праздников',
      param: 'kids',
   },
];

export const catalogFilters = ['Событие', 'Стоимость', 'Даты', 'Фильтры'];
