import {put, takeEvery, call} from "redux-saga/effects";
import {
    BookActionEnum,
    SagaDeleteBookAction, SagaGiveOutBookAction,
    SagaLoadBooksAction, SagaReserveBookAction, SagaReturnBookAction,
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
import ReservationService from "../api/ReservationService";
import {IReservation} from "../models/IReservation";
import {IBookData} from "../models/IBookData";

function* loadBook(user: IUser, bookFilter: IBookFilter) {
    try {
        let response: AxiosResponse<IBookData> = yield call(BookService.loadBooks, user, bookFilter);

        let testIBookData = {} as IBookData;

        if (response.status !== 200 || !(typeof response.data == typeof testIBookData )) {
            yield sagaUtils.updateAuthData(false, {} as IUser, "");
        } else {
            yield put(BookActionCreators.setBooks(response.data.books, response.data.total))
        }
    } catch (e) {
        yield put(BookActionCreators.setBooksError((e as Error).message));
    }
}

function* saveBook(user: IUser, book: IBook, bookFilter: IBookFilter) {
    try {
        yield call(BookService.saveBook, user, book);
        yield loadBook(user, bookFilter);
    } catch (e) {
        yield put(BookActionCreators.setBooksError((e as Error).message));
    }
}

function* updateBook(user: IUser, book: IBook, bookFilter: IBookFilter) {
    try {
        yield call(BookService.updateBook, user, book);
        yield loadBook(user, bookFilter);
    } catch (e) {
        yield put(BookActionCreators.setBooksError((e as Error).message));
    }
}

function* deleteBook(user: IUser, book: IBook, bookFilter: IBookFilter) {
    try {
        yield call(BookService.deleteBook, user, book);
        yield loadBook(user, bookFilter);
    } catch (e) {
        yield put(BookActionCreators.setBooksError((e as Error).message));
    }
}

function* reserveBook(user: IUser, book: IBook, bookFilter: IBookFilter) {
    try {
        let response: AxiosResponse<IReservation> = yield call(ReservationService.reserve, user, book);
        yield response.data.book = book;
        yield put(BookActionCreators.setReservations(response.data))
        yield loadBook(user, bookFilter);
    } catch (e) {
        yield put(BookActionCreators.setBooksError((e as Error).message));
    }
}

function* giveOutBook(user: IUser, book: IBook, bookFilter: IBookFilter) {
    try {
        let response: AxiosResponse<IReservation> = yield call(ReservationService.giveOut, user, book);
        yield response.data.book = book;
        yield put(BookActionCreators.setReservations(response.data))
        yield loadBook(user, bookFilter);
    } catch (e) {
        yield put(BookActionCreators.setBooksError((e as Error).message));
    }
}

function* returnBook(user: IUser, book: IBook, bookFilter: IBookFilter) {
    try {
        let response: AxiosResponse<IReservation> = yield call(ReservationService.return, user, book);
        yield response.data.book = book;
        yield put(BookActionCreators.setReservations(response.data))
        yield loadBook(user, bookFilter);
    } catch (e) {
        yield put(BookActionCreators.setBooksError((e as Error).message));
    }
}

export function* bookWatcher() {
    yield takeEvery(BookActionEnum.SAGA_LOAD_BOOKS, (action: SagaLoadBooksAction) => loadBook(action.payload.user, action.payload.filter));
    yield takeEvery(BookActionEnum.SAGA_SAVE_BOOK, (action: SagaSaveBookAction) => saveBook(action.payload.user, action.payload.book, action.payload.filter));
    yield takeEvery(BookActionEnum.SAGA_UPDATE_BOOK, (action: SagaUpdateBookAction) => updateBook(action.payload.user, action.payload.book, action.payload.filter));
    yield takeEvery(BookActionEnum.SAGA_DELETE_BOOK, (action: SagaDeleteBookAction) => deleteBook(action.payload.user, action.payload.book, action.payload.filter));
    yield takeEvery(BookActionEnum.SAGA_RESERVATION_BOOK, (action: SagaReserveBookAction) => reserveBook(action.payload.user, action.payload.book, action.payload.filter));
    yield takeEvery(BookActionEnum.SAGA_GIVE_OUT_BOOK, (action: SagaGiveOutBookAction) => giveOutBook(action.payload.user, action.payload.book, action.payload.filter));
    yield takeEvery(BookActionEnum.SAGA_RETURN_BOOK, (action: SagaReturnBookAction) => returnBook(action.payload.user, action.payload.book, action.payload.filter));
}