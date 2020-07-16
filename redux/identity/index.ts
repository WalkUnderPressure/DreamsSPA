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

export const userLogIn = (data: ILogInFields) => action(USER_LOG_IN, {data});
export const userLogOut = (data: ILogInFields) => action(USER_LOG_OUT, {data});
export const userRegistration = (data: any) => action(USER_REGISTRATION, {data});

export class Identity extends Entity {

    constructor() {
        super();
        Entity.addSaga(
            this.userLogIn.bind(this),
            this.userLogOut.bind(this),
            this.userRegistration.bind(this),
            // this.showMessage.bind(this),
        )
    }

    // @saga()
    // public * loginUser(data: ILoginData) {
    //     try {
    //         const { response } = yield call(Entity.fetch, '/auth/login', data, HTTP_METHOD.POST);
    //         if (response && response.user
    //             && response.user.userId
    //             && response.user.token && response.user.token.length > 0) {
    //             yield put(getIdentity(response));
    //             const href = '/profile'
    //             Router.replace(href, href, { shallow: true });
    //         }
    //     } finally {
    //         if (yield cancelled()) {
    //             ('authorize yield cancelled');
    //         }
    //     }
    // }

    public * userLogIn() {
        while (true) {
            const actionData = yield take(USER_LOG_IN);
            console.log('fetch() saga take = ', actionData);
    
            const url = '/api/auth/login';
            const data: ILogInFields = actionData.data;
            // console.log('log in data for request ', data);

            const result = yield call(this.xFetch, url, data, METHODS.POST);
            // const result: IServerResponse = yield call(this.xRead, url, { ...data }, METHODS.POST)
            // console.log('fetch() saga call = ', result);
    
            if (!result.error) {
                // console.log('log in successfully!');
                const element: IIdentity = result.data;
                // console.log('element -> ', element);
            
                const action = {
                    type: USER_LOG_IN,
                    user: element
                }
                yield put(action);
    
                Router.push('/');
            } else {
                // console.log('log in not successfully!');
                // alert(result.message);
            }
        }
    }

    public * userLogOut() {
        while (true) {
            const actionData = yield take(USER_LOG_OUT);
            // console.log('fetch() saga take = ', actionData);
    
            const url = '/api/auth/logout';
            const data: ILogInFields = actionData.data;
            // console.log('log in data for request ', data);
            const result: IServerResponse = yield call(this.xFetch, url, { ...data }, METHODS.POST)
            // console.log('fetch() saga call = ', result);
    
            if (!result.error) {
                const action = {
                    type: USER_LOG_OUT,
                }
                yield put(action);
                Router.push('/');
            } else {
                console.log('log out not successfully!');
            }
        }
    }

    public * userRegistration() {
        while (true) {
            const actionData = yield take(USER_REGISTRATION);
            console.log('fetch() saga take = ', actionData);
    
            const url = '/api/auth/register';
            const data = actionData.data;
            console.log('log in data for request ', data);
            const result: IServerResponse = yield call(this.xFetch, url, { ...data },METHODS.POST)
            // console.log('fetch() saga call = ', result);
            
            if (!result.error) {
                // console.log('registration successfully!');
            
                const action = {
                    type: USER_REGISTRATION,
                }
                yield put(action);
                Router.push('/auth/login');
            } else {
                // console.log('registration not successfully!');
            }
        }
    }
}
export default new Identity();
