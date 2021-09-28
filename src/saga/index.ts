import {all} from "redux-saga/effects";
import {bookWatcher} from "./book";
import {userWatcher} from "./user";

export function* rootWatcher() {
    yield all([bookWatcher(), userWatcher()]);
}