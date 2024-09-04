import { cardSectionList } from '../../utils';

import { MainSection } from '../../components/SectionMain';
import { BannerSection } from '../../components/SectionBanner';
import { CardBlockSection } from '../../components/SectionCardBlocks';
import { CardSection } from '../../components/SectionCard';

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
