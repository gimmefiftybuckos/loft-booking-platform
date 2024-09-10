import clsx from 'clsx';

import styles from './index.module.sass';

import { createNavPoints } from '../../../services/utils';

import { Button } from '../../Button';
import { HomeButton } from '../HomeButton';
import { useDispatch } from '../../../store';

export const Navigation = () => {
   const dispatch = useDispatch();
   const navPoints = createNavPoints(dispatch);

   return (
      <nav className={clsx(styles.navigation)}>
         <HomeButton />
         <div className={clsx(styles.navigation__container)}>
            <div className={clsx(styles.points)}>
               {navPoints.map((item, index) => (
                  <Button key={index} pathTo={item.path} onClick={item.onClick}>
                     {item.name}
                  </Button>
               ))}
            </div>
            <div>
               <Button textColor='white' pathTo='/login' accented>
                  Войти
               </Button>
            </div>
         </div>
      </nav>
   );
};
