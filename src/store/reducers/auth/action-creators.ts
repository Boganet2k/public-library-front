import {
    AuthActionEnum, SagaSignoutAction, SagaSigninAction,
    SagaSignupAction,
    SetAuthAction,
    SetErrorAction,
    SetIsLoadingAction,
    SetUserAction
} from "./types";
import {IUser} from "../../../models/IUser";

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload}),
    setError: (payload: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload}),
    sagaSignUp: (user: IUser) : SagaSignupAction => ({type: AuthActionEnum.SAGA_SIGNUP, payload: user}),
    sagaSignIn: (user: IUser) : SagaSigninAction => ({type: AuthActionEnum.SAGA_SIGNIN, payload: user}),
    sagaSignOut: (user: IUser) : SagaSignoutAction => ({type: AuthActionEnum.SAGA_SIGNOUT, payload: user})
}
