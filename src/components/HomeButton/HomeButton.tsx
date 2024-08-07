import { Link } from 'react-router-dom';
import clsx from 'clsx';

import styles from './HomeButton.module.sass';

export const HomeButton = () => {
   return <Link to='/' className={clsx(styles.button)}></Link>;
};
