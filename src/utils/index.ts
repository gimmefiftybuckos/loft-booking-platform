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
