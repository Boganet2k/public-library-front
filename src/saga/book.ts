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

function* loadBook(user: IUser, bookFilter: IBookFilter) {
    const response: AxiosResponse<IBook[]> = yield call(BookService.loadBooks, user, bookFilter);

    if (response.status !== 200 || !Array.isArray(response.data)) {
        yield sagaUtils.updateAuthData(false, {} as IUser, "");
    } else {
        yield put(BookActionCreators.setBooks(response.data))
    }
}

function* saveBook(user: IUser, book: IBook, bookFilter: IBookFilter) {
    yield call(BookService.saveBook, user, book);
    yield loadBook(user, bookFilter);
}

function* updateBook(user: IUser, book: IBook, bookFilter: IBookFilter) {
    yield call(BookService.updateBook, user, book);
    yield loadBook(user, bookFilter);
}

function* deleteBook(user: IUser, book: IBook, bookFilter: IBookFilter) {
    yield call(BookService.deleteBook, user, book);
    yield loadBook(user, bookFilter);
}

export function* bookWatcher() {
    yield takeEvery(BookActionEnum.SAGA_LOAD_BOOKS, (action: SagaLoadBooksAction) => loadBook(action.payload.user, action.payload.filter));
    yield takeEvery(BookActionEnum.SAGA_SAVE_BOOK, (action: SagaSaveBookAction) => saveBook(action.payload.user, action.payload.book, action.payload.filter));
    yield takeEvery(BookActionEnum.SAGA_UPDATE_BOOK, (action: SagaUpdateBookAction) => updateBook(action.payload.user, action.payload.book, action.payload.filter));
    yield takeEvery(BookActionEnum.SAGA_DELETE_BOOK, (action: SagaDeleteBookAction) => deleteBook(action.payload.user, action.payload.book, action.payload.filter));
}