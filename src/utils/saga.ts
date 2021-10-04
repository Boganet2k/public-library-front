import {IUser} from "../models/IUser";
import {put} from "redux-saga/effects";
import {AuthActionCreators} from "../store/reducers/auth/action-creators";

export const sagaUtils = {
    *updateAuthData(isAuth: boolean, user: IUser, error: string) {
        yield localStorage.setItem('auth', isAuth.toString());
        yield localStorage.setItem('user', JSON.stringify(user));

        yield put(AuthActionCreators.setUser(user));
        yield put(AuthActionCreators.setError(error));
        yield put(AuthActionCreators.setIsAuth(isAuth));
    }
}