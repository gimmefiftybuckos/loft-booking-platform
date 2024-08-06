import clsx from 'clsx';

import styles from './Button.module.sass';
import { Text } from '../Text';
import { Link } from 'react-router-dom';

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
   pathTo: string;

   onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
   children,
   accented,
   outlined,
   pathTo,
}) => {
   const accent = accented ? styles.button_accent : null;
   const outline = outlined ? styles.button_outlined : null;

   return (
      <Link className={clsx(styles.button, accent, outline)} to={pathTo}>
         <Text>{children}</Text>
      </Link>
   );
};
