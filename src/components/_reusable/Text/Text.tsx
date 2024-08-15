import { ElementType, ReactNode } from 'react';
import { clsx } from 'clsx';

import styles from './Text.module.sass';

import { FontFamiliesClasses } from '../../../constants';

type TextProps = {
   children: ReactNode;
   as?: ElementType;
   dynamic?: boolean;
   size?:
      | '14'
      | '16'
      | '18'
      | '20'
      | '24'
      | '28'
      | '32'
      | '36'
      | '40'
      | 'CardTitle';
   weight?: 400 | 500 | 600 | 700 | 800 | 900;
   fontStyle?: 'italic' | 'normal';
   uppercase?: boolean;
   align?: 'center' | 'left';
   color?: 'black' | 'white' | 'gray';
   family?: FontFamiliesClasses;
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
