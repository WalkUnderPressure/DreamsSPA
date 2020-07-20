import Entity from "redux/entities/Entity";
import { take, call, put, select } from 'redux-saga/effects';
import { action } from "redux/actions";
import IServerResponse from '../../Templates/ServerResponse';
import { METHODS, IIdentity } from "COMMON";
import Router from "next/router";

export interface ILogInFields{
    email: string;
    password: string;
}

export const USER_LOG_IN = 'USER_LOG_IN';
export const USER_LOG_OUT = 'USER_LOG_OUT';
export const USER_REGISTRATION = 'USER_REGISTRATION';
export const USER_UPDATE_PROFILE = 'USER_UPDATE_PROFILE';

export const userLogIn = (data: ILogInFields) => action(USER_LOG_IN, {data});
export const userLogOut = (data: ILogInFields) => action(USER_LOG_OUT, {data});
export const userRegistration = (data: IIdentity) => action(USER_REGISTRATION, {data});
export const userUpdateProfile = (data: IIdentity) => action(USER_UPDATE_PROFILE, {data});

export class Identity extends Entity {

    constructor() {
        super();
        Entity.addSaga(
            this.userLogIn.bind(this),
            this.userLogOut.bind(this),
            this.userRegistration.bind(this),
            this.userUpdateProfile.bind(this),
        )
    }

    public * userLogIn() {
        while (true) {
            const actionData = yield take(USER_LOG_IN);
            
            const url = '/api/auth/login';
            const data: ILogInFields = actionData.data;
            
            const result = yield call(this.xFetch, url, data, METHODS.POST);
            
            if (!result.error) {
                const element: IIdentity = result.data;
            
                const action = {
                    type: USER_LOG_IN,
                    user: element
                }
                yield put(action);
    
                Router.push('/');
            } else {
                console.log('Log in not successfully!', data);
                // alert(result.message);
            }
        }
    }

    public * userLogOut() {
        while (true) {
            const actionData = yield take(USER_LOG_OUT);
            
            const url = '/api/auth/logout';
            const data: ILogInFields = actionData.data;
            const result: IServerResponse = yield call(this.xFetch, url, { ...data }, METHODS.POST)
            
            if (!result.error) {
                const action = {
                    type: USER_LOG_OUT,
                }
                yield put(action);
                Router.push('/');
            } else {
                console.log('log out not successfully!');
                // alert(result.message);
            }
        }
    }

    public * userRegistration() {
        while (true) {
            const actionData = yield take(USER_REGISTRATION);
            
            const url = '/api/auth/register';
            const data = actionData.data;
            const result: IServerResponse = yield call(this.xFetch, url, { ...data },METHODS.POST)
            
            if (!result.error) {
                const action = {
                    type: USER_REGISTRATION,
                }
                yield put(action);
                Router.push('/auth/login');
            } else {
                console.log('registration not successfully!');
                // alert(result.message);
            }
        }
    }

    public * userUpdateProfile(){
        while (true) {
            const actionData = yield take(USER_UPDATE_PROFILE);
            
            const url = '/api/auth/updateProfile';
            const data = actionData.data;
            const result: IServerResponse = yield call(this.xFetch, url, { ...data },METHODS.POST)
            
            if (!result.error) {
                const action = {
                    type: USER_UPDATE_PROFILE,
                    user: {...result.data}
                }
                yield put(action);
                Router.back();
            } else {
                console.log('Update profile not successfully!');
                // alert(result.message);
            }
        }
    }
}
export default new Identity();
