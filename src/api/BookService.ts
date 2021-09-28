import axios, {AxiosResponse} from "axios";
import {IBook} from "../models/IBook";
import {IUser} from "../models/IUser";

const SERVER_URL = 'http://localhost:8080';

export default class BookService {
    static async loadBooks(user: IUser): Promise<AxiosResponse<IBook[]>> {
        return axios.get<IBook[]>(SERVER_URL, BookService.getAuthorizationConfig(user));
    }

    static async saveBook(book: IBook): Promise<AxiosResponse<IBook>> {
        return axios.post<IBook>(SERVER_URL + '/books', book, BookService.getAuthorizationConfig(book.user));
    }

    static async updateBook(book: IBook): Promise<AxiosResponse<IBook>> {
        return axios.put<IBook>(SERVER_URL + '/books/' + book.id, {title: book.title, author: book.author, description: book.description}, BookService.getAuthorizationConfig(book.user));
    }

    static async deleteBook(book: IBook): Promise<AxiosResponse<IBook>> {
        return axios.delete<IBook>(SERVER_URL + '/books/' + book.id, BookService.getAuthorizationConfig(book.user));
    }

    static getAuthorizationConfig(user: IUser) : any {
        return { headers: { "Authorization": "Bearer " + user.jwtToken}};
    }
}