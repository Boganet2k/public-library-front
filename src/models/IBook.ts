import {IUser} from "./IUser";

export interface IBook {
    key: string;
    id: number;
    title: string;
    author: string;
    description: string;
    user: IUser;
}