import axios, {AxiosResponse} from "axios";
import {IBook} from "../models/IBook";
import {IUser} from "../models/IUser";
import {jwtUtils} from "../utils/jwt";

const SERVER_URL = 'http://localhost:8080/';

const BOOK_URL = {
    loadBooks: SERVER_URL
}

export default class BookService {

    static async loadBooks(user: IUser): Promise<AxiosResponse<IBook[]>> {
        return axios.get<IBook[]>(SERVER_URL, jwtUtils.getAuthorizationConfig(user));
    }

    static async saveBook(book: IBook): Promise<AxiosResponse<IBook>> {
        return axios.post<IBook>(SERVER_URL + 'books', book, jwtUtils.getAuthorizationConfig(book.user));
    }

    static async updateBook(book: IBook): Promise<AxiosResponse<IBook>> {
        return axios.put<IBook>(SERVER_URL + 'books/' + book.id, {title: book.title, author: book.author, description: book.description}, jwtUtils.getAuthorizationConfig(book.user));
    }

    static async deleteBook(book: IBook): Promise<AxiosResponse<IBook>> {
        return axios.delete<IBook>(SERVER_URL + 'books/' + book.id, jwtUtils.getAuthorizationConfig(book.user));
    }

    static BOOK_URL() : any {
        return BOOK_URL;
    }
}