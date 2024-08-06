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

   pathTo: string;

   textColor?: 'white' | 'black';
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
   pathTo,
   textColor = 'black',
}) => {
   const accent = accented ? styles.button_accent : null;
   const outline = outlined ? styles.button_outlined : null;

   return (
      <Link className={clsx(styles.button, accent, outline)} to={pathTo}>
         <Text color={textColor} weight={500}>
            {children}
         </Text>
      </Link>
   );
};
