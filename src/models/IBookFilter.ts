import {IUser} from "./IUser";

export interface IBookFilter {
    title: string;
    author: string;
    user: IUser;
}