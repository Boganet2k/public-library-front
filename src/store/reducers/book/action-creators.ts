import {IBook} from "../../../models/IBook";
import {
    BookActionEnum,
    SagaDeleteBookAction, SagaGiveOutBookAction,
    SagaLoadBooksAction, SagaReserveBookAction, SagaReturnBookAction,
    SagaSaveBookAction,
    SagaUpdateBookAction,
    SetBookAction, SetReservationAction
} from "./types";
import {IBookFilter} from "../../../models/IBookFilter";
import {IUser} from "../../../models/IUser";
import {IReservation} from "../../../models/IReservation";


export const BookActionCreators = {
    setBooks: (books: IBook[]): SetBookAction => ({type: BookActionEnum.SET_BOOKS, payload: books}),
    sagaLoadBooks: (user: IUser, filter: IBookFilter): SagaLoadBooksAction => ({type: BookActionEnum.SAGA_LOAD_BOOKS, payload: {
            user, filter
        }}),
    sagaSaveBook: (user: IUser, book: IBook, filter: IBookFilter): SagaSaveBookAction => ({type: BookActionEnum.SAGA_SAVE_BOOK, payload: {
            user, book, filter
        }}),
    sagaUpdateBook: (user: IUser, book: IBook, filter: IBookFilter): SagaUpdateBookAction => ({type: BookActionEnum.SAGA_UPDATE_BOOK, payload: {
            user, book, filter
        }}),
    sagaDeleteBook: (user: IUser, book: IBook, filter: IBookFilter): SagaDeleteBookAction => ({type: BookActionEnum.SAGA_DELETE_BOOK, payload: {
            user, book, filter
        }}),
    sagaReservationBook: (user: IUser, book: IBook, filter: IBookFilter): SagaReserveBookAction => ({type: BookActionEnum.SAGA_RESERVATION_BOOK, payload: {
            user, book, filter
        }}),
    sagaGiveOutBook: (user: IUser, book: IBook, filter: IBookFilter): SagaGiveOutBookAction => ({type: BookActionEnum.SAGA_GIVE_OUT_BOOK, payload: {
            user, book, filter
        }}),
    sagaReturnBook: (user: IUser, book: IBook, filter: IBookFilter): SagaReturnBookAction => ({type: BookActionEnum.SAGA_RETURN_BOOK, payload: {
            user, book, filter
        }}),
    setReservations: (reservation: IReservation | null): SetReservationAction => ({type: BookActionEnum.SET_RESERVATION, payload: reservation}),
}