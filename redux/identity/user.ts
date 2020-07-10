import { take, call, put } from 'redux-saga/effects'
import { userAuthActionsList, ILogInFields } from '../actions/UserAuthActions';
import { xRead, xSave } from 'src';
import ServerResponse from 'Templates/ServerResponse';
import { METHODS, IIdentity } from 'COMMON';
import Router from 'next/router';

export function* userLogIn() {
    while (true) {
        const actionData = yield take(userAuthActionsList.USER_LOGIN_REQUEST);
        console.log('fetch() saga take = ', actionData);

        const url = '/api/auth/login';
        const data: ILogInFields = actionData.data;
        // console.log('log in data for request ', data);
        const result: ServerResponse = yield call(xRead, url, { ...data }, METHODS.POST)
        // console.log('fetch() saga call = ', result);

        if (!result.error) {
            // console.log('log in successfully!');
            const element: IIdentity = result.data;
            // console.log('element -> ', element);
        
            const action = {
                type: userAuthActionsList.USER_LOGIN_SUCCESSFULLY,
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

export function* userLogOut() {
    while (true) {
        const actionData = yield take(userAuthActionsList.USER_LOGOUT_REQUEST);
        // console.log('fetch() saga take = ', actionData);

        const url = '/api/auth/logout';
        const data: ILogInFields = actionData.data;
        // console.log('log in data for request ', data);
        const result: ServerResponse = yield call(xSave, url, { ...data })
        // console.log('fetch() saga call = ', result);

        if (!result.error) {
            const action = {
                type: userAuthActionsList.USER_LOGOUT_SUCCESSFULLY,
            }
            yield put(action);
            Router.push('/');
        } else {
            console.log('log out not successfully!');
        }
    }
}

export function* userRegistration() {
    while (true) {
        const actionData = yield take(userAuthActionsList.USER_REGISTRATION_REQUEST);
        console.log('fetch() saga take = ', actionData);

        const url = '/api/auth/register';
        const data = actionData.data;
        console.log('log in data for request ', data);
        const result: ServerResponse = yield call(xSave, url, { ...data })
        // console.log('fetch() saga call = ', result);
        
        if (!result.error) {
            // console.log('registration successfully!');
        
            const action = {
                type: userAuthActionsList.USER_REGISTRATION_SUCCESSFULLY,
            }
            yield put(action);
            Router.push('/auth/login');
        } else {
            // console.log('registration not successfully!');
        }
    }
}

