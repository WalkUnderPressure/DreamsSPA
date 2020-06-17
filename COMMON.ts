export const DOMAIN:string = `http://localhost:3000`
export enum METHODS {
    POST = 'POST',
    GET = 'GET',
    DELETE = 'DELETE'
}
export enum USER_ROLE {
    GUEST = 'GUEST',
    USER = 'USER',
    ADMIN = 'ADMIN'
}

export interface  IIdentity {
    userId: string;
    firstName: string;
    lastName: string;
    role: USER_ROLE
}