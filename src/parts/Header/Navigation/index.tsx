import clsx from 'clsx';

import styles from './index.module.sass';

import { createNavPoints } from '../../../services/utils';
import { useDispatch } from '../../../store';

import { Button, ButtonVariant } from '../../../components/Button';
import { HomeButton } from '../HomeButton';
import { Link } from 'react-router-dom';

export const Navigation = () => {
   const dispatch = useDispatch();
   const navPoints = createNavPoints(dispatch);

   return (
      <nav className={clsx(styles.navigation)}>
         <HomeButton />
         <div className={clsx(styles.navigation__container)}>
            <div className={clsx(styles.points)}>
               {navPoints.map((item, index) => (
                  <Button
                     as={Link}
                     pathTo={item.path}
                     key={index}
                     onClick={item.onClick}
                  >
                     {item.name}
                  </Button>
               ))}
            </div>
            <div>
               <Button as={Link} pathTo='/login' variant={ButtonVariant.ACCENT}>
                  Войти
               </Button>
            </div>
         </div>
      </nav>
   );
};
