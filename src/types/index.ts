export interface ILoftCard {
   id: string;
   title: string;
   metroStation: string;
   walkingDistanceMinutes: number;
   reviewsCount: number;
   averageRating: number;
   pricePerHour: number;
   maxPersons: number;
   seatingPlaces: number;
   area: number;
   imageUrl: string[];
   type: string[];
}

export interface ICardSection {
   title: string;
   type: TypeParamsType;
}

export type TypeParamsType =
   | ''
   | 'recommendations'
   | 'coworking'
   | 'wedding'
   | 'dance'
   | 'graduation'
   | 'meeting'
   | 'party'
   | 'bars'
   | 'central_moscow'
   | 'lofts_15_guests'
   | 'corporate'
   | 'birthday'
   | 'kids';

export type SelectionFiltersType = 'Мероприятие' | 'Дата' | 'Начало' | 'Конец';

export type CatalogFiltersType = 'Событие' | 'Стоимость' | 'Дата' | 'Фильтры';
