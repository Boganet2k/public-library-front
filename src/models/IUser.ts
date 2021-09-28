export interface jwtTokenPayloadType {
    roles: string[];
    login: string;
    jti: string;
}

export interface IUser {
    username: string;
    password: string;
    jwtToken: string;
    jwtTokenPayload: jwtTokenPayloadType;
}
