import {IUser} from "../models/IUser";
import {call, put, takeEvery} from "redux-saga/effects";
import {AuthActionEnum, SagaSignupAction} from "../store/reducers/auth/types";
import {AxiosResponse} from "axios";
import UserService from "../api/UserService";
import {AuthActionCreators} from "../store/reducers/auth/action-creators";
import {jwtUtils} from "../utils/jwt";

function* signUp(user: IUser) {

    let resUser: IUser = yield user
    let error: string = yield ""
    let isAuth: boolean = yield true

    try {
        const response: AxiosResponse<string> = yield call(UserService.signUp, user);

        if (response.status !== 200) {
            throw new Error('response.status: ' + response.status);
        }
        yield console.log(response.headers);
        const authorizationHeader: string = yield response.headers["authorization"];
        yield console.log(authorizationHeader);
        const authParts: string[] = yield authorizationHeader.split(" ");
        yield console.log(authParts);
        const jwtToken:string = yield authParts[1];
        yield user.jwtToken = jwtToken;
        yield user.jwtTokenPayload = jwtUtils.getJwtTokenPayload(jwtToken);
    } catch (e) {
        yield console.log("signUp error: " + e);
        resUser = yield {}
        error = yield "Please try again"
        isAuth = yield false
    }

    yield localStorage.setItem('auth', isAuth.toString());
    yield localStorage.setItem('user', JSON.stringify(resUser));

    yield put(AuthActionCreators.setUser(resUser));
    yield put(AuthActionCreators.setError(error));
    yield put(AuthActionCreators.setIsAuth(isAuth));
}

export function* userWatcher() {
    yield takeEvery(AuthActionEnum.SAGA_SIGNUP, (action: SagaSignupAction) => signUp(action.payload));
}