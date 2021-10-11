import {IUser} from "../models/IUser";
import {IBook} from "../models/IBook";
import axios, {AxiosResponse} from "axios";
import {jwtUtils} from "../utils/jwt";
import {IReservation} from "../models/IReservation";


const SERVER_URL = process.env.REACT_APP_SERVER_URL as string;

export default class ReservationService {
    static async reserve(user: IUser, book: IBook): Promise<AxiosResponse<IReservation>> {
        return axios.post<IReservation>(SERVER_URL + '/reservations', {book_id: book.id}, jwtUtils.getAuthorizationConfig(user));
    }

    static async giveOut(user: IUser, book: IBook): Promise<AxiosResponse<IReservation>> {
        return axios.put<IReservation>(SERVER_URL + '/reservations/' + book.reservations[0].id, {new_reservation_status: 'lent'}, jwtUtils.getAuthorizationConfig(user));
    }

    static async return(user: IUser, book: IBook): Promise<AxiosResponse<IReservation>> {
        return axios.put<IReservation>(SERVER_URL + '/reservations/' + book.reservations[0].id, {new_reservation_status: 'returned'}, jwtUtils.getAuthorizationConfig(user));
    }
}