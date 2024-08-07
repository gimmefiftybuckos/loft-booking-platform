import { Link } from 'react-router-dom';
import clsx from 'clsx';

import styles from './Button.module.sass';

import { Text } from '../Text';

export interface ButtonProps {
   size?: 'small' | 'medium' | 'large';
   children: string;

   accented?: boolean;
   outlined?: boolean;
   pathTo: string;
   textColor?: 'white' | 'black';

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
