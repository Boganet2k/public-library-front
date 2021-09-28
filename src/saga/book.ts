import {put, takeEvery, call} from "redux-saga/effects";
import {
    BookActionEnum,
    SagaDeleteBookAction, SagaLoadBooksAction,
    SagaSaveBookAction,
    SagaUpdateBookAction
} from "../store/reducers/book/types";
import BookService from "../api/BookService";
import {AxiosResponse} from "axios";
import {IBook} from "../models/IBook";
import {BookActionCreators} from "../store/reducers/book/action-creators";
import {IUser} from "../models/IUser";
import {AuthActionCreators} from "../store/reducers/auth/action-creators";

function* updateAuthData(isAuth: boolean, user: IUser, error: string) {
    yield localStorage.setItem('auth', isAuth.toString());
    yield localStorage.setItem('user', JSON.stringify(user));

    yield put(AuthActionCreators.setUser(user));
    yield put(AuthActionCreators.setError(error));
    yield put(AuthActionCreators.setIsAuth(isAuth));
}

function* loadBook(user: IUser) {
    const response: AxiosResponse<IBook[]> = yield call(BookService.loadBooks, user);

    if (response.status !== 200 || BookService.BOOK_URL().loadBooks !== response.request.responseURL) {
        yield updateAuthData(false, {} as IUser, "");
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
    yield takeEvery(BookActionEnum.SAGA_LOAD_BOOKS, (action: SagaLoadBooksAction) => loadBook(action.payload));
    yield takeEvery(BookActionEnum.SAGA_SAVE_BOOK, (action: SagaSaveBookAction) => saveBook(action.payload));
    yield takeEvery(BookActionEnum.SAGA_UPDATE_BOOK, (action: SagaUpdateBookAction) => updateBook(action.payload));
    yield takeEvery(BookActionEnum.SAGA_DELETE_BOOK, (action: SagaDeleteBookAction) => deleteBook(action.payload));
}