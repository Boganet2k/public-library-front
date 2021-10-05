import {IBook} from "../../../models/IBook";
import {IBookFilter} from "../../../models/IBookFilter";
import {IUser} from "../../../models/IUser";

export interface BookState {
    books: IBook[];
}

export enum BookActionEnum {
    SET_BOOKS = "SET_BOOKS",
    SAGA_LOAD_BOOKS = "SAGA_LOAD_BOOKS",
    SAGA_SAVE_BOOK = "SAGA_SAVE_BOOK",
    SAGA_UPDATE_BOOK = "SAGA_UPDATE_BOOK",
    SAGA_DELETE_BOOK = "SAGA_DELETE_BOOK"
}

export interface SetBookAction {
    type: BookActionEnum.SET_BOOKS;
    payload: IBook[];
}

export interface SagaLoadBooksAction {
    type: BookActionEnum.SAGA_LOAD_BOOKS;
    payload: {
        user: IUser,
        filter: IBookFilter
    };
}

export interface SagaSaveBookAction {
    type: BookActionEnum.SAGA_SAVE_BOOK;
    payload: {
        user: IUser,
        book: IBook,
        filter: IBookFilter
    };
}

export interface SagaUpdateBookAction {
    type: BookActionEnum.SAGA_UPDATE_BOOK;
    payload: {
        user: IUser,
        book: IBook,
        filter: IBookFilter
    };
}

export interface SagaDeleteBookAction {
    type: BookActionEnum.SAGA_DELETE_BOOK;
    payload: {
        user: IUser,
        book: IBook,
        filter: IBookFilter
    };
}

export type BookAction =
    SetBookAction