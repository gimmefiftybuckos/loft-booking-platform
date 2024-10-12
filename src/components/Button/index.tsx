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
   type?: string;
   children: string | React.ReactNode;

   className?: string;
   variant?: ButtonVariant;
   onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
   as: Tag = 'button',
   pathTo,
   type = 'submit',
   children,

   className,
   variant,
   onClick,
}) => {
   const variantClassName = variant ? styles[`button_${variant}`] : null;

   if (Tag === Link && !pathTo) {
      console.error("'pathTo' prop is required!");
      return null;
   }

   if (Tag === 'button' && !type) {
      console.error("'type' prop is required!");
      return null;
   }

   const props = Tag === Link ? { to: pathTo } : { type };

   return (
      <Tag
         {...props}
         onClick={onClick}
         className={clsx(styles.button, variantClassName, className)}
      >
         {children}
      </Tag>
   );
};
