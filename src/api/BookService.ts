import axios, {AxiosResponse} from "axios";
import {IBook} from "../models/IBook";

const SERVER_URL = 'http://localhost:8080';

export default class BookService {
    static async loadBooks(): Promise<AxiosResponse<IBook[]>> {
        return axios.get<IBook[]>(SERVER_URL);
    }

    static async saveBook(book: IBook): Promise<AxiosResponse<IBook>> {
        return axios.post<IBook>(SERVER_URL + '/books', book);
    }

    static async updateBook(book: IBook): Promise<AxiosResponse<IBook>> {
        return axios.put<IBook>(SERVER_URL + '/books/' + book.id, {title: book.title, author: book.author, description: book.description});
    }

    static async deleteBook(book: IBook): Promise<AxiosResponse<IBook>> {
        return axios.delete<IBook>(SERVER_URL + '/books/' + book.id);
    }
}