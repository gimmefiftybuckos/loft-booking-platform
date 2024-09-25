import clsx from 'clsx';
import styles from './index.module.sass';

export const Preloader = () => (
   <div className={clsx(styles.preloader)}>
      <div className={clsx(styles.preloader_circle)} />
   </div>
);
