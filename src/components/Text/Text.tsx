import { ElementType, ReactNode } from 'react';
import { clsx } from 'clsx';
import { FontFamiliesClasses } from '../../constants';

import styles from './Text.module.sass';

type TextProps = {
   /** Сам текст для вывода */
   children: ReactNode;
   /** Тэг которым отрендерить текст */
   as?: ElementType;
   /** Булевая пропса, должен ли текст меняться в зависимости от конфига */
   dynamic?: boolean;
   /** Размер шрифта */
   size?: '14' | '16' | '24' | '28' | '32' | '36' | '40';
   /** Вес шрифта */
   weight?: 400 | 500 | 600 | 700 | 800 | 900;
   /** Стиль шрифта */
   fontStyle?: 'italic' | 'normal';
   /** Булевая пропса, отвечающая должен ли текст быть в верхнем регистре */
   uppercase?: boolean;
   /** Выравнивание текста */
   align?: 'center' | 'left';

   color?: 'black' | 'white';
   /** font-family текста */
   family?: FontFamiliesClasses;
   /** Булевая пропса, делает динамическим только семью шрифтов и цвет */
};

export const Text = ({
   children,
   as: Tag = 'p',
   size = '16',
   dynamic = false,
   weight = 400,
   fontStyle = 'normal',
   uppercase = false,
   align = 'left',
   family = 'inter',
   color = 'black',
}: TextProps) => {
   const className = clsx(
      styles.text,
      styles[`size${size}`],
      { [styles.dynamic]: dynamic },
      styles[`weight${weight}`],
      styles[`${fontStyle}`],
      { [styles.uppercase]: uppercase },
      styles[`${align}`],
      styles[`${family}`],
      styles[`${color}`],
      styles.margin
   );
   return <Tag className={className}>{children}</Tag>;
};
