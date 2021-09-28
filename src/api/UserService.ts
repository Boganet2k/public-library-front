import axios, {AxiosResponse} from "axios";
import {IUser} from "../models/IUser";
import {IBook} from "../models/IBook";

const SERVER_URL = 'http://localhost:8080';

export default class UserService {
    static async getUsers(): Promise<AxiosResponse<IUser[]>> {
        return axios.get<IUser[]>('./users.json')
    }

    static async signUp(user: IUser): Promise<AxiosResponse<string>> {
        return axios.post<string>(SERVER_URL + '/users', JSON.parse('{ "user": { "email": "' + user.username + '", "password": "' + user.password + '" } }'));
    }

}
