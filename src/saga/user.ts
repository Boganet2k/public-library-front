import {IUser} from "../models/IUser";
import {call, put, takeEvery} from "redux-saga/effects";
import {AuthActionEnum, SagaSigninAction, SagaSignoutAction, SagaSignupAction} from "../store/reducers/auth/types";
import {AxiosResponse} from "axios";
import UserService from "../api/UserService";
import {jwtUtils} from "../utils/jwt";
import {sagaUtils} from "../utils/saga";

function* signUp(user: IUser) {

    let resUser: IUser = yield user
    let error: string = yield ""
    let isAuth: boolean = yield true

    try {
        const response: AxiosResponse<string> = yield call(UserService.signUp, user);

        if (response.status !== 200) {
            throw new Error('response.status: ' + response.status);
        }

        const authorizationHeader: string = yield response.headers["authorization"];
        const authParts: string[] = yield authorizationHeader.split(" ");
        const jwtToken:string = yield authParts[1];
        yield user.jwtToken = jwtToken;
        yield user.jwtTokenPayload = jwtUtils.getJwtTokenPayload(jwtToken);
    } catch (e) {
        yield console.log("signUp error: " + e);
        resUser = yield {}
        error = yield "Please try again"
        isAuth = yield false
    }

    yield sagaUtils.updateAuthData(isAuth, resUser, error);
}

function* signIn(user: IUser) {

    let resUser: IUser = yield user
    let error: string = yield ""
    let isAuth: boolean = yield true

    try {
        const response: AxiosResponse<string> = yield call(UserService.signIn, user);

        if (response.status !== 200) {
            throw new Error('response.status: ' + response.status);
        }

        const authorizationHeader: string = yield response.headers["authorization"];
        const authParts: string[] = yield authorizationHeader.split(" ");
        const jwtToken:string = yield authParts[1];
        yield user.jwtToken = jwtToken;
        yield user.jwtTokenPayload = jwtUtils.getJwtTokenPayload(jwtToken);
    } catch (e) {
        yield console.log("signIn error: " + e);
        resUser = yield {}
        error = yield "Login or password incorrect. Please try again"
        isAuth = yield false
    }

    yield sagaUtils.updateAuthData(isAuth, resUser, error);
}

function* signOut(user: IUser) {
    yield call(UserService.signOut, user);
    yield sagaUtils.updateAuthData(false, {} as IUser, "");
}

export function* userWatcher() {
    yield takeEvery(AuthActionEnum.SAGA_SIGNUP, (action: SagaSignupAction) => signUp(action.payload));
    yield takeEvery(AuthActionEnum.SAGA_SIGNIN, (action: SagaSigninAction) => signIn(action.payload));
    yield takeEvery(AuthActionEnum.SAGA_SIGNOUT, (action: SagaSignoutAction) => signOut(action.payload));
}