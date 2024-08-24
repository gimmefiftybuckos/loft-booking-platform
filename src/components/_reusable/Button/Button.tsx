import { Link } from 'react-router-dom';
import clsx from 'clsx';

import styles from './Button.module.sass';

import { Text } from '../Text';

export interface ButtonProps {
   children: string;

   accented?: boolean;
   outlined?: boolean;
   inMainSection?: boolean;

   pathTo: string;
   textColor?: 'white' | 'black';

   onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
   children,
   accented,
   outlined,
   inMainSection,
   pathTo,
   textColor = 'black',
   onClick,
}) => {
   const accent = accented ? styles.button_accent : null;
   const outline = outlined ? styles.button_outlined : null;
   const search = inMainSection ? styles.button__search : null;

   return (
      <Link
         onClick={onClick}
         className={clsx(styles.button, accent, outline, search)}
         to={pathTo}
      >
         <Text color={textColor} weight={500}>
            {children}
         </Text>
      </Link>
   );
};
