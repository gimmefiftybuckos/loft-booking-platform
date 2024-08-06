import clsx from 'clsx';

import styles from './HomeButton.module.sass';

import { Link } from 'react-router-dom';

export const HomeButton = () => {
   return <Link to='/' className={clsx(styles.button)}></Link>;
};
