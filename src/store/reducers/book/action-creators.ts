import {IBook} from "../../../models/IBook";
import {
    BookActionEnum,
    SagaDeleteBookAction,
    SagaLoadBooksAction,
    SagaSaveBookAction,
    SagaUpdateBookAction,
    SetBookAction
} from "./types";
import {AppDispatch} from "../../index";
import BookService from "../../../api/BookService";


export const BookActionCreators = {
    setBooks: (books: IBook[]): SetBookAction => ({type: BookActionEnum.SET_BOOKS, payload: books}),
    sagaLoadBooks: (): SagaLoadBooksAction => ({type: BookActionEnum.SAGA_LOAD_BOOKS}),
    sagaSaveBook: (book: IBook): SagaSaveBookAction => ({type: BookActionEnum.SAGA_SAVE_BOOK, payload: book}),
    sagaUpdateBook: (book: IBook): SagaUpdateBookAction => ({type: BookActionEnum.SAGA_UPDATE_BOOK, payload: book}),
    sagaDeleteBook: (book: IBook): SagaDeleteBookAction => ({type: BookActionEnum.SAGA_DELETE_BOOK, payload: book})
}