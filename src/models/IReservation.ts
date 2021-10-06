import {IBook} from "./IBook";
import {IUser} from "./IUser";

export interface IReservation {
    id: number;
    status: string;
    code: string;
    from: string;
    to: string;
    book: IBook;
    user: IUser;
}