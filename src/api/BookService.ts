import axios, {AxiosResponse} from "axios";
import {IBook} from "../models/IBook";

export default class BookService {
    static async getBooks(): Promise<AxiosResponse<IBook[]>> {
        return axios.get<IBook[]>('http://localhost:8080')
    }
}