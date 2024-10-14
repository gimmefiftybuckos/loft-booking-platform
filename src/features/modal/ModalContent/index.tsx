import React from 'react';

import {
   CatalogFiltersType,
   ImagesCarouselType,
   MenuType,
   SelectionFiltersType,
} from '../../../types';

import { Calendar } from '../Calendar';
import { SearchList } from '../SearchList';
import { PriceSlider } from '../PriceSlider';
import { Images } from '../Images';
import { Menu } from '../Menu';

type ModalContentProps = {
   name:
      | SelectionFiltersType
      | CatalogFiltersType
      | ImagesCarouselType
      | MenuType;
};

const contentMap: { [key: string]: React.ReactNode } = {
   Event: <SearchList />,
   Date: <Calendar />,
   Price: <PriceSlider />,
   Images: <Images />,
   Menu: <Menu />,
};

export const ModalContent: React.FC<ModalContentProps> = ({ name }) => {
   return <>{contentMap[name] || <p>In Progress</p>}</>;
};
