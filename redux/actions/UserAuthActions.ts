import { IIdentity } from '../../COMMON';

export const userAuthActionsList = {
    USER_LOGIN_REQUEST: 'USER_LOGIN_REQUEST',
    USER_LOGIN_SUCCESSFULLY: 'USER_LOGIN_SUCCESSFULLY',
    USER_LOGIN_UNSUCCESSFULLY: 'USER_LOGIN_UNSUCCESSFULLY',

    USER_LOGOUT_REQUEST: 'USER_LOGOUT_REQUEST',
    USER_LOGOUT_SUCCESSFULLY: 'USER_LOGOUT_SUCCESSFULLY',
    USER_LOGOUT_UNSUCCESSFULLY: 'USER_LOGOUT_UNSUCCESSFULLY',

    USER_REGISTRATION_REQUEST: 'USER_REGISTRATION_REQUEST',
    USER_REGISTRATION_SUCCESSFULLY: 'USER_REGISTRATION_SUCCESSFULLY',
    USER_REGISTRATION_UNSUCCESSFULLY: 'USER_REGISTRATION_UNSUCCESSFULLY',
}

export interface ILogInFields{
    email: string;
    password: string;
}

export const userLogInRequest = (data: ILogInFields) => ({
    type: userAuthActionsList.USER_LOGIN_REQUEST,
    data
})

export const userLogInSuccessfully = (user: IIdentity) => ({
    type: userAuthActionsList.USER_LOGIN_SUCCESSFULLY,
    user
})

export const userLogOutRequest = (data: ILogInFields) => ({
    type: userAuthActionsList.USER_LOGOUT_REQUEST,
    data
})

export const userLogOutSuccessfully = () => ({
    type: userAuthActionsList.USER_LOGOUT_SUCCESSFULLY,
})

export const userRegistrationRequest = (data: any) => ({
    type: userAuthActionsList.USER_REGISTRATION_REQUEST,
    data
})

export const userRegistrationSuccessfully = () => ({
    type: userAuthActionsList.USER_REGISTRATION_SUCCESSFULLY,
})
