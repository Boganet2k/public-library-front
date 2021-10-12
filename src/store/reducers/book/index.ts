import {BookAction, BookActionEnum, BookState} from "./types"

const initialState: BookState = {
    books: [],
    reservations: [],
    error: null
}

export default function bookReducer(state = initialState, action: BookAction): BookState {
    switch (action.type) {
        case BookActionEnum.SET_BOOKS:
            return {...state, books: action.payload};
        case BookActionEnum.SET_RESERVATION:
            if (action.payload) {
                return {...state, reservations: [...state.reservations, action.payload]};
            } else {
                return {...state, reservations: []};
            }
        case BookActionEnum.SET_BOOKS_ERROR:
            return {...state, error: action.payload};
        default:
            return state;
    }
}