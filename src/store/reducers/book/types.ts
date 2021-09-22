import {IBook} from "../../../models/IBook";
import {AuthActionEnum, SetAuthAction} from "../auth/types";

export interface BookState {
    books: IBook[];
}

export enum BookActionEnum {
    SET_BOOKS = "SET_BOOKS"
}

export interface SetBookAction {
    type: BookActionEnum.SET_BOOKS;
    payload: IBook[];
}

export type BookAction =
    SetBookAction