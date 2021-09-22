import {AuthActionCreators} from "./auth/action-creators";
import {BookActionCreators} from "./book/action-creators";

export const allActionCreators = {
    ...AuthActionCreators, ...BookActionCreators
}
