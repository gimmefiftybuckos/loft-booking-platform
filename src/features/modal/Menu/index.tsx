import clsx from 'clsx';

import styles from './index.module.sass';

import { Button, ButtonVariant } from '../../../components/Button';
import { Link } from 'react-router-dom';
import { useDispatch } from '../../../store';
import { logoutUser } from '../../../store/slices/userAuth';
import { useModalControl } from '../../../hooks/useModalControl';

const menuButtonsData = [
   {
      title: 'Мой профиль',
      route: '/profile',
      url: 'user',
   },
   {
      title: 'Мои заявки',
      route: '/requests',
      url: 'list',
   },
   {
      title: 'Уведомления',
      route: '/notifications',
      url: 'notification',
   },
   {
      title: 'Мои площадки',
      route: '/user/lofts',
      url: 'category',
   },
   {
      title: 'Статистика',
      route: '/user/stat',
      url: 'activity',
   },
];

export const Menu = () => {
   const dispatch = useDispatch();
   const { closeModal } = useModalControl();
   const onClickDefault = () => {
      closeModal();
   };

   return (
      <>
         <div className={clsx(styles.content)}>
            {menuButtonsData.map((item, index) => {
               return (
                  <Button
                     as={Link}
                     key={index}
                     pathTo={item.route}
                     onClick={onClickDefault}
                     className={clsx(styles.button)}
                  >
                     <img
                        className={clsx(styles.image)}
                        src={`/assets/${item.url}.svg`}
                        alt=''
                     />
                     {item.title}
                  </Button>
               );
            })}
         </div>
         <Button
            variant={ButtonVariant.ACCENT}
            onClick={onClickDefault}
            className={clsx(styles.button, styles.button_accent)}
         >
            <img className={clsx(styles.image)} src='/assets/plus.svg' alt='' />
            Добавить площадку
         </Button>
         <Button
            onClick={() => {
               dispatch(logoutUser());
               onClickDefault();
            }}
            className={clsx(styles.button, styles.button_background)}
         >
            Выйти
         </Button>
      </>
   );
};
