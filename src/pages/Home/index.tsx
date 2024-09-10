import { cardSectionList } from '../../services/utils';

import { MainSection } from '../../components/Sections/SectionMain';
import { BannerSection } from '../../components/Sections/SectionBanner';
import { CardBlockSection } from '../../components/Sections/SectionCardBlocks';
import { CardSection } from '../../components/Sections/SectionCard';

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
