import { cardSectionList } from '../../utils';

import { MainSection } from '../MainSection';
import { BannerSection } from '../BannerSection';
import { CardBlockSection } from '../CardBlockSection';
import { CardSection } from '../CardSection';

export const Home = () => {
   const { title: mainSectionTitle, param: mainSectionParam } =
      cardSectionList[0];

   const blockSectionCards = cardSectionList.slice(1, 11);
   const cardsSection = cardSectionList.slice(11, 100);

   return (
      <>
         <MainSection />
         <BannerSection />
         <CardSection title={mainSectionTitle} filter={mainSectionParam} />
         <CardBlockSection data={blockSectionCards} />
         {cardsSection.map((item, index) => {
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
