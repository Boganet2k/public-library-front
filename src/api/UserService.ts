import axios, {AxiosResponse} from "axios";
import {IUser} from "../models/IUser";
import {jwtUtils} from "../utils/jwt";

const SERVER_URL = 'http://localhost:8080';

export default class UserService {
    static async getUsers(): Promise<AxiosResponse<IUser[]>> {
        return axios.get<IUser[]>('./users.json')
    }

    static async signUp(user: IUser): Promise<AxiosResponse<string>> {
        return axios.post<string>(SERVER_URL + '/users', JSON.parse('{ "user": { "email": "' + user.username + '", "password": "' + user.password + '" } }'));
    }

    static async signIn(user: IUser): Promise<AxiosResponse<string>> {
        return axios.post<string>(SERVER_URL + '/users/sign_in', JSON.parse('{ "user": { "email": "' + user.username + '", "password": "' + user.password + '" } }'));
    }

    static async signOut(user: IUser): Promise<AxiosResponse<string>> {
        return axios.delete<string>(SERVER_URL + '/users/sign_out', jwtUtils.getAuthorizationConfig(user));
    }
}
