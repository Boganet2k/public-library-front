import {IReservation} from "./IReservation";

export interface IBook {
    key: string;
    id: number;
    title: string;
    author: string;
    description: string;
    status: string;
    reservations: IReservation[];
}