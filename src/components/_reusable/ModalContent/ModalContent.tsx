import React from 'react';
import { Calendar } from '../../Calendar';
import { SearchList } from '../../SearchList';
import { selectionParamsType } from '../../../types';

type ModalContentProps = {
   name: selectionParamsType;
};

const contentMap: { [key: string]: React.ReactNode } = {
   Мероприятие: <SearchList />,
   Дата: <Calendar />,
};

export const ModalContent: React.FC<ModalContentProps> = ({ name }) => {
   return <>{contentMap[name] || <p>Мне было лениво</p>}</>;
};
