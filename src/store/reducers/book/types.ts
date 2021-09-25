import {IBook} from "../../../models/IBook";
import {AuthActionEnum, SetAuthAction} from "../auth/types";

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
}

export interface SagaSaveBookAction {
    type: BookActionEnum.SAGA_SAVE_BOOK;
    payload: IBook;
}

export interface SagaUpdateBookAction {
    type: BookActionEnum.SAGA_UPDATE_BOOK;
    payload: IBook;
}

export interface SagaDeleteBookAction {
    type: BookActionEnum.SAGA_DELETE_BOOK;
    payload: IBook;
}

export type BookAction =
    SetBookAction