import { ElementType } from 'react';
import clsx from 'clsx';

import styles from './index.module.sass';

import { Link } from 'react-router-dom';

export enum ButtonVariant {
   ACCENT = 'accent',
   OUTLINED = 'outlined',
}

export interface ButtonProps {
   as?: ElementType;
   pathTo?: string;
   children: string;

   className?: string;
   variant?: ButtonVariant;
   onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
   as: Tag = 'button',
   pathTo,
   children,

   className,
   variant,
   onClick,
}) => {
   const variantClassName = variant ? styles[`button_${variant}`] : null;

   return (
      <Tag
         {...(Tag === Link && { to: pathTo })}
         onClick={onClick}
         className={clsx(styles.button, variantClassName, className)}
      >
         {children}
      </Tag>
   );
};
