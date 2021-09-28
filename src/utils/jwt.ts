import {IUser, jwtTokenPayloadType} from "../models/IUser";

export const jwtUtils = {
    getJwtTokenPayload: (token: string): jwtTokenPayloadType => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    },
    isAdmin: (user: IUser):boolean => {

        if (user.jwtTokenPayload && user.jwtTokenPayload.roles && user.jwtTokenPayload.roles.find(role => "ADMIN" === role)) {
            return true;
        }

        return false;
    },
    getAuthorizationConfig: (user: IUser) : any => {
        return { headers: { "Authorization": "Bearer " + user.jwtToken}, maxRedirects: 0};
    },
    delay: (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
}