import React from 'react';
import { Calendar } from '../../Calendar';
import { SearchList } from '../../SearchList';
import { CatalogFiltersType, SelectionFiltersType } from '../../../types';
import { PriceSlider } from '../PriceSlider';

type ModalContentProps = {
   name: SelectionFiltersType | CatalogFiltersType;
};

const contentMap: { [key: string]: React.ReactNode } = {
   Мероприятие: <SearchList />,
   Дата: <Calendar />,
   Стоимость: <PriceSlider />,
};

export const ModalContent: React.FC<ModalContentProps> = ({ name }) => {
   return <>{contentMap[name] || <p>Мне было лениво</p>}</>;
};
