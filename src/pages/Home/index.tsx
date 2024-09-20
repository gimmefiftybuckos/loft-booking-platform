import { cardSectionList } from '../../services/constants';

import { MainSection } from '../../parts/sections/SectionMain';
import { BannerSection } from '../../parts/sections/SectionBanner';
import { CardBlockSection } from '../../parts/sections/SectionCardBlocks';
import { CardSection } from '../../parts/sections/SectionCard';
import { useDispatch } from '../../store';
import { resetFilters } from '../../store/slices/cardCatalog';
import { useEffect } from 'react';

export const Home = () => {
   const dispatch = useDispatch();

   const { title: mainSectionTitle, type: mainSectionParam } =
      cardSectionList[0];

   const blockSectionCards = cardSectionList.slice(1, 11);
   const cardsSection = cardSectionList.slice(11, 100);

   useEffect(() => {
      dispatch(resetFilters());
   }, []);

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
