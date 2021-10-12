import axios, {AxiosResponse} from "axios";
import {IBook} from "../models/IBook";
import {IUser} from "../models/IUser";
import {jwtUtils} from "../utils/jwt";
import {IBookFilter} from "../models/IBookFilter";
import {IBookData} from "../models/IBookData";

const SERVER_URL = process.env.REACT_APP_SERVER_URL as string;

export default class BookService {

    static async loadBooks(user: IUser, bookFilter: IBookFilter): Promise<AxiosResponse<IBookData>> {

        console.log("BookService.loadBooks bookFilter:");
        console.log(bookFilter.status);
        console.log(SERVER_URL);

        return axios.get<IBookData>(SERVER_URL, {...jwtUtils.getAuthorizationConfig(user), params: {
            title: bookFilter.title,
                author: bookFilter.author,
                code: bookFilter.code,
                status: bookFilter.status,
                current: bookFilter.current,
                pageSize: bookFilter.pageSize
            }});
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
}