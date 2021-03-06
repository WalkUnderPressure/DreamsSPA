import { mongoose } from "@typegoose/typegoose";

export const DOMAIN:string = `http://localhost:3000`
export enum METHODS {
    POST = 'POST',
    GET = 'GET',
    DELETE = 'DELETE',
}

export enum CRUD {
    CREATE = 'CREATE',
    READ = 'READ',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',  
}

export enum USER_ROLE {
    GUEST = 'GUEST',
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export enum ENTITIES {
    USERS = 'users', 
    DREANS = 'dreans',
}

export interface  IIdentity {
    userId: mongoose.Schema.Types.ObjectId;
    firstName: string;
    lastName: string;
    role: USER_ROLE;
    email: string;
    token: string;
}