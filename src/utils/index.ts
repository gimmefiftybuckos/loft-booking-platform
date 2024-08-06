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
