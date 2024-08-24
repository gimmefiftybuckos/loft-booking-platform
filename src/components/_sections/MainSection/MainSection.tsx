import clsx from 'clsx';

import styles from './MainSection.module.sass';

import { selectionParams } from '../../../utils';

import { Button } from '../../_reusable/Button';
import { useState } from 'react';
import { Modal } from '../../_reusable/Modal';
import { ModalContent } from '../../_reusable/ModalContent';

export const MainSection = () => {
   const [openModalKey, setOpenModalKey] = useState(-1);

   const toggleModal = (key: number) => {
      setOpenModalKey(openModalKey === key ? -1 : key);
      openModalKey !== -1
         ? (document.body.style.overflow = 'visible')
         : (document.body.style.overflow = 'hidden');
   };

   return (
      <>
         {openModalKey !== -1 ? (
            <div
               onClick={() => toggleModal(-1)}
               className={clsx(styles.modalBackdrop)}
            ></div>
         ) : null}

         <section className={clsx(styles['cover-container'])}>
            <h1 className={clsx(styles.title)}>
               Более 500 площадок для вашего мероприятия
            </h1>
            <div className={clsx(styles.container)}>
               {selectionParams.map((item, index) => {
                  return (
                     <div
                        onClick={() => toggleModal(index)}
                        key={index}
                        className={clsx(styles.button)}
                     >
                        {item}
                        <img
                           src='/assets/down.svg'
                           alt='Dropdown Icon'
                           width='16'
                           height='16'
                        />
                        <Modal isOpen={openModalKey === index}>
                           <ModalContent name={item} />
                        </Modal>
                     </div>
                  );
               })}

               <Button inMainSection textColor='white' accented pathTo={''}>
                  Найти
               </Button>
            </div>
         </section>
      </>
   );
};
