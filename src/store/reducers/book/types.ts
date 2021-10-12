import {IBook} from "../../../models/IBook";
import {IBookFilter} from "../../../models/IBookFilter";
import {IUser} from "../../../models/IUser";
import {IReservation} from "../../../models/IReservation";

export interface BookState {
    books: IBook[];
    reservations: IReservation[];
    error: string | null;
}

export enum BookActionEnum {
    SET_BOOKS = "SET_BOOKS",
    SET_BOOKS_ERROR = "SET_BOOKS_ERROR",
    SAGA_LOAD_BOOKS = "SAGA_LOAD_BOOKS",
    SAGA_SAVE_BOOK = "SAGA_SAVE_BOOK",
    SAGA_UPDATE_BOOK = "SAGA_UPDATE_BOOK",
    SAGA_DELETE_BOOK = "SAGA_DELETE_BOOK",
    SAGA_RESERVATION_BOOK = "SAGA_RESERVATION_BOOK",
    SET_RESERVATION = "SET_RESERVATION",
    SAGA_GIVE_OUT_BOOK = "SAGA_GIVE_OUT_BOOK",
    SAGA_RETURN_BOOK = "SAGA_RETURN_BOOK"
}

export interface SetBookAction {
    type: BookActionEnum.SET_BOOKS;
    payload: IBook[];
}

export interface SetBookErrorAction {
    type: BookActionEnum.SET_BOOKS_ERROR;
    payload: string | null;
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

export interface SagaReserveBookAction {
    type: BookActionEnum.SAGA_RESERVATION_BOOK;
    payload: {
        user: IUser,
        book: IBook,
        filter: IBookFilter
    };
}

export interface SagaGiveOutBookAction {
    type: BookActionEnum.SAGA_GIVE_OUT_BOOK;
    payload: {
        user: IUser,
        book: IBook,
        filter: IBookFilter
    };
}

export interface SagaReturnBookAction {
    type: BookActionEnum.SAGA_RETURN_BOOK;
    payload: {
        user: IUser,
        book: IBook,
        filter: IBookFilter
    };
}

export interface SetReservationAction {
    type: BookActionEnum.SET_RESERVATION;
    payload: IReservation | null;
}

export type BookAction =
    SetBookAction | SetReservationAction | SetBookErrorAction