import {IBook} from "../../../models/IBook";
import {
    BookActionEnum,
    SagaDeleteBookAction,
    SagaLoadBooksAction,
    SagaSaveBookAction,
    SagaUpdateBookAction,
    SetBookAction
} from "./types";
import {IBookFilter} from "../../../models/IBookFilter";
import {IUser} from "../../../models/IUser";


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
        }})
}