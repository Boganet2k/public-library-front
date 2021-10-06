import {IUser} from "../models/IUser";
import {IBook} from "../models/IBook";
import axios, {AxiosResponse} from "axios";
import {jwtUtils} from "../utils/jwt";
import {IReservation} from "../models/IReservation";


const SERVER_URL = process.env.REACT_APP_SERVER_URL as string;

export default class ReservationService {
    static async saveReservation(user: IUser, book: IBook): Promise<AxiosResponse<IReservation>> {
        return axios.post<IReservation>(SERVER_URL + '/reservations', book, jwtUtils.getAuthorizationConfig(user));
    }
}