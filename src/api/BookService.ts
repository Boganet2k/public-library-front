import axios, {AxiosResponse} from "axios";
import {IBook} from "../models/IBook";
import {IUser} from "../models/IUser";
import {jwtUtils} from "../utils/jwt";
import {IBookFilter} from "../models/IBookFilter";

const SERVER_URL = 'http://localhost:8080';

const BOOK_URL = {
    loadBooks: SERVER_URL
}

export default class BookService {

    static async loadBooks(user: IUser, bookFilter: IBookFilter): Promise<AxiosResponse<IBook[]>> {

        console.log("BookService.loadBooks bookFilter:");
        console.log(bookFilter);

        return axios.get<IBook[]>(SERVER_URL, {...jwtUtils.getAuthorizationConfig(user), params: {title: bookFilter.title, author: bookFilter.author}});
    }

    static async saveBook(user: IUser, book: IBook): Promise<AxiosResponse<IBook>> {
        return axios.post<IBook>(SERVER_URL + '/books', book, jwtUtils.getAuthorizationConfig(user));
    }

    static async updateBook(user: IUser, book: IBook): Promise<AxiosResponse<IBook>> {
        return axios.put<IBook>(SERVER_URL + '/books/' + book.id, {title: book.title, author: book.author, description: book.description}, jwtUtils.getAuthorizationConfig(user));
    }

    static async deleteBook(user: IUser, book: IBook): Promise<AxiosResponse<IBook>> {
        return axios.delete<IBook>(SERVER_URL + '/books/' + book.id, jwtUtils.getAuthorizationConfig(user));
    }

    static BOOK_URL() : any {
        return BOOK_URL;
    }
}