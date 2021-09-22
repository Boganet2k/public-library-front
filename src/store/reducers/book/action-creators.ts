import {IBook} from "../../../models/IBook";
import {BookActionEnum, SetBookAction} from "./types";
import {AppDispatch} from "../../index";
import BookService from "../../../api/BookService";


export const BookActionCreators = {
    setBooks: (books: IBook[]): SetBookAction => ({type: BookActionEnum.SET_BOOKS, payload: books}),
    loadBooks: () => async (dispatch: AppDispatch) => {
        try {
            setTimeout(async () => {
                const response = await BookService.getBooks()

                console.log("loadBooks: ")
                console.log(response.data)

                if (response.data) {
                    dispatch(BookActionCreators.setBooks(response.data));
                } else {
                    // dispatch(AuthActionCreators.setError('Некорректный логин или пароль'));
                }
            }, 1000)
        } catch (e) {
            // dispatch(AuthActionCreators.setError('Произошла ошибка при логине'))
        }
    }
}