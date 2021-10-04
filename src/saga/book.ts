import {put, takeEvery, call} from "redux-saga/effects";
import {
    BookActionEnum,
    SagaDeleteBookAction,
    SagaLoadBooksAction,
    SagaSaveBookAction,
    SagaUpdateBookAction
} from "../store/reducers/book/types";
import BookService from "../api/BookService";
import {AxiosResponse} from "axios";
import {IBook} from "../models/IBook";
import {BookActionCreators} from "../store/reducers/book/action-creators";
import {IUser} from "../models/IUser";
import {IBookFilter} from "../models/IBookFilter";
import {sagaUtils} from "../utils/saga";

function* loadBook(user: IUser) {
    yield loadBookFiltered({user: user} as IBookFilter);
}

function* loadBookFiltered(bookFilter: IBookFilter) {
    const response: AxiosResponse<IBook[]> = yield call(BookService.loadBooks, bookFilter);

    if (response.status !== 200 || !Array.isArray(response.data)) {
        yield sagaUtils.updateAuthData(false, {} as IUser, "");
    } else {
        yield put(BookActionCreators.setBooks(response.data))
    }
}

function* saveBook(book: IBook) {
    yield call(BookService.saveBook, book);
    yield loadBook(book.user);
}

function* updateBook(book: IBook) {
    yield call(BookService.updateBook, book);
    yield loadBook(book.user);
}

function* deleteBook(book: IBook) {
    yield call(BookService.deleteBook, book);
    yield loadBook(book.user);
}

export function* bookWatcher() {
    yield takeEvery(BookActionEnum.SAGA_LOAD_BOOKS, (action: SagaLoadBooksAction) => loadBookFiltered(action.payload));
    yield takeEvery(BookActionEnum.SAGA_SAVE_BOOK, (action: SagaSaveBookAction) => saveBook(action.payload));
    yield takeEvery(BookActionEnum.SAGA_UPDATE_BOOK, (action: SagaUpdateBookAction) => updateBook(action.payload));
    yield takeEvery(BookActionEnum.SAGA_DELETE_BOOK, (action: SagaDeleteBookAction) => deleteBook(action.payload));
}