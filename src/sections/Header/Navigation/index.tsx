import clsx from 'clsx';

import styles from './index.module.sass';

import { createNavPoints } from '../../../services/utils';
import { useDispatch, useSelector } from '../../../store';

import { Button, ButtonVariant } from '../../../components/Button';
import { HomeButton } from '../HomeButton';
import { Link } from 'react-router-dom';
import { Modal } from '../../../features/modal/Modal';
import { useModalControl } from '../../../hooks/useModalControl';
import { ModalContent } from '../../../features/modal/ModalContent';
import { ModalTypes } from '../../../features/modal/Modal';

export const Navigation = () => {
   const dispatch = useDispatch();
   const { isAuth, userData } = useSelector((state) => state.user);
   const navPoints = createNavPoints(dispatch);
   const { toggleModal, controlIndex } = useModalControl();

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
            <div className={clsx(styles.container)}>
               {isAuth ? (
                  <Button onClick={() => toggleModal(ModalTypes.MENU)}>
                     {userData.login}
                  </Button>
               ) : (
                  <Button
                     as={Link}
                     pathTo='/login'
                     variant={ButtonVariant.ACCENT}
                  >
                     Войти
                  </Button>
               )}
               <Modal
                  className={clsx(styles.modal)}
                  isOpen={controlIndex === ModalTypes.MENU}
               >
                  <ModalContent name={'Menu'} />
               </Modal>
            </div>
         </div>
      </nav>
   );
};
