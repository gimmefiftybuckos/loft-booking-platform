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
   imageUrl: string;
   type: string[];
}

export interface ICardSection {
   title: string;
   filter: FilterParamsType;
}

export type FilterParamsType =
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
