import {BookAction, BookActionEnum, BookState} from "./types"

const initialState: BookState = {
    books: []
}

export default function authReducer(state = initialState, action: BookAction): BookState {
    switch (action.type) {
        case BookActionEnum.SET_BOOKS:
            return {...state, books: action.payload}
        default:
            return state;
    }
}