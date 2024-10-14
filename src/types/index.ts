export interface ILoft {
   id: string;
   title: string;
   description: string;
   metroStation: string;
   walkingDistanceMinutes: number;
   reviewsCount: number;
   averageRating: string;
   pricePerHour: number;
   maxPersons: number;
   seatingPlaces: number;
   area: number;
   imageUrl: string[];
   type: string[];
   date?: Date;
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

export type SelectionFiltersType = 'Event' | 'Date' | 'Start Time' | 'End Time';

export type CatalogFiltersType = 'Event' | 'Price' | 'Date' | 'Filters';

export type ImagesCarouselType = 'Images';

export type MenuType = 'Menu';

export type TCatalogParams = {
   type?: string;
   page?: number;
   date?: string;
   price?: string;
};

export type TUser = {
   email: string;
   login: string;
};
