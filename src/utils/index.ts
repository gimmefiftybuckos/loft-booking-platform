export const n = ['Все лофты', 'Идеи', 'Избранное'];

type test = {
   name: string;
   path: string;
};

export const navPoints: test[] = [
   { name: 'Все лофты', path: '/lofts' },
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

export const cardSectionList = [
   {
      title: 'Мы рекомендуем',
      param: 'recommendations',
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
];
