import clsx from 'clsx';
import styles from './Home.module.sass';
import { Text } from '../Text';
import { MainSection } from '../MainSection';
import { BannerSection } from '../BannerSection';

export const Home = () => {
   return (
      <>
         <MainSection />
         <BannerSection />
      </>
   );
};
