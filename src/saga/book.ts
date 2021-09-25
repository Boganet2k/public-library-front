import {put, takeEvery, call} from "redux-saga/effects";
import {
    BookActionEnum,
    SagaDeleteBookAction,
    SagaSaveBookAction,
    SagaUpdateBookAction
} from "../store/reducers/book/types";
import BookService from "../api/BookService";
import axios, {AxiosResponse} from "axios";
import {IBook} from "../models/IBook";
import {BookActionCreators} from "../store/reducers/book/action-creators";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function* loadBook() {
    yield delay(1000);
    const response: AxiosResponse<IBook[]> = yield call(BookService.loadBooks);
    yield put(BookActionCreators.setBooks(response.data))
}

function* saveBook(book: IBook) {
    yield delay(1000);
    const response: AxiosResponse<IBook> = yield call(BookService.saveBook, book);
    yield loadBook();
}

function* updateBook(book: IBook) {
    yield delay(1000);
    const response: AxiosResponse<IBook> = yield call(BookService.updateBook, book);
    yield loadBook();
}

function* deleteBook(book: IBook) {
    yield delay(1000);
    const response: AxiosResponse<IBook> = yield call(BookService.deleteBook, book);
    yield loadBook();
}

export function* bookWatcher() {
    yield takeEvery(BookActionEnum.SAGA_LOAD_BOOKS, loadBook);
    yield takeEvery(BookActionEnum.SAGA_SAVE_BOOK, (action: SagaSaveBookAction) => saveBook(action.payload));
    yield takeEvery(BookActionEnum.SAGA_UPDATE_BOOK, (action: SagaUpdateBookAction) => updateBook(action.payload));
    yield takeEvery(BookActionEnum.SAGA_DELETE_BOOK, (action: SagaDeleteBookAction) => deleteBook(action.payload));
}