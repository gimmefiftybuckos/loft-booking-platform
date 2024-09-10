import { DayPicker } from 'react-day-picker';
import { useContext, useState } from 'react';
import { useDispatch } from '../../../store';
import 'react-day-picker/dist/style.css';
import clsx from 'clsx';

import styles from './index.module.sass';

import { setDate } from '../../../store/cardCatalogSlice';
import { ModalContext } from '../../../context';
import { todayDate } from '../../../services/utils';
import { ModalButton } from '../ModalButton';

export const Calendar = () => {
   const [selected, setSelected] = useState<Date>();
   const dispatch = useDispatch();

   const toggleModal = useContext(ModalContext);

   const onClick = () => {
      const date = `${selected?.getDate()}:${selected?.getMonth() ? selected?.getMonth() + 1 : null}:${selected?.getFullYear()}`;

      if (selected?.getDate()) {
         dispatch(setDate(date));
      } else {
         dispatch(setDate(''));
      }

      toggleModal ? toggleModal(-1) : null;
   };

   return (
      <>
         <DayPicker
            mode='single'
            selected={selected}
            captionLayout='dropdown'
            onSelect={setSelected}
            weekStartsOn={1}
            month={selected}
            startMonth={todayDate}
            endMonth={new Date(todayDate.getFullYear() + 1, 11)}
            disabled={{ before: todayDate }}
            className={clsx(styles.rdp)}
            modifiersClassNames={{
               selected: styles.rdp_selected,
               today: styles.rdp_today,
               selectedToday: styles.rdp_selected,
            }}
         />
         <ModalButton onClick={onClick}>Принять</ModalButton>
      </>
   );
};
