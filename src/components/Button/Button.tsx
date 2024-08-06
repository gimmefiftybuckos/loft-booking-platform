import clsx from 'clsx';

import styles from './Button.module.sass';

export interface ButtonProps {
   /**
    * Is this the principal call to action on the page?
    */
   accented?: boolean;

   outlined?: boolean;
   /**
    * What background color to use
    */
   backgroundColor?: string;
   /**
    * How large should the button be?
    */
   size?: 'small' | 'medium' | 'large';
   /**
    * Button contents
    */
   children: string;
   /**
    * Optional click handler
    */
   onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
   children,
   accented,
   outlined,
   onClick,
}) => {
   const accent = accented ? styles.button_accent : null;
   const outline = outlined ? styles.button_outlined : null;

   return (
      <button className={clsx(styles.button, accent, outline)}>
         {children}
      </button>
   );
};
