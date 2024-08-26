import { cardSectionList } from '../../utils';

import { MainSection } from '../_sections/MainSection';
import { BannerSection } from '../_sections/BannerSection';
import { CardBlockSection } from '../_sections/CardBlockSection';
import { CardSection } from '../_sections/CardSection';

export const Home = () => {
   const { title: mainSectionTitle, type: mainSectionParam } =
      cardSectionList[0];

   const blockSectionCards = cardSectionList.slice(1, 11);
   const cardsSection = cardSectionList.slice(11, 100);

   return (
      <>
         <MainSection />
         <BannerSection />
         <CardSection title={mainSectionTitle} type={mainSectionParam} />
         <CardBlockSection data={blockSectionCards} />
         {cardsSection.map((item, index) => {
            return (
               <CardSection key={index} title={item.title} type={item.type} />
            );
         })}
      </>
   );
};
