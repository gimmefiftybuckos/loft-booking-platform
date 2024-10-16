import clsx from 'clsx';
import styles from './index.module.sass';

export const Preloader = ({ className }: { className?: string }) => (
   <div className={clsx(styles.preloader, className)}>
      <div className={clsx(styles.preloader_circle)} />
   </div>
);
