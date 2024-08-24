import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import clsx from 'clsx';
import styles from './Calendar.module.sass';
import { useState } from 'react';

export const Calendar = () => {
   const [selected, setSelected] = useState<Date>();

   return (
      <DayPicker
         mode='single'
         selected={selected}
         onSelect={setSelected}
         className={clsx(styles.rdp)}
         modifiersClassNames={{
            selected: styles.rdp_selected,
            today: styles.rdp_today,
            selectedToday: styles.rdp_selected,
         }}
      />
   );
};
