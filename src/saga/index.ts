import {all} from "redux-saga/effects";
import {bookWatcher} from "./book";

export function* rootWatcher() {
    yield all([bookWatcher()]);
}