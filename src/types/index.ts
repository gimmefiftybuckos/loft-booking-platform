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

export type ICardSection = {
   title: string;
   param: string;
};
