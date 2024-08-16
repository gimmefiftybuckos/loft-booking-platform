import { MainSection } from '../MainSection';
import { BannerSection } from '../BannerSection';
import { CardSection } from '../CardSection';
import { cardSectionList } from '../../utils';

export const Home = () => {
   return (
      <>
         <MainSection />
         <BannerSection />
         {cardSectionList.map((item, index) => {
            return (
               <CardSection
                  key={index}
                  title={item.title}
                  filter={item.param}
               />
            );
         })}
      </>
   );
};
