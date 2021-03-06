import Entity from "./Entity";
import  { ENTITIES } from '../../COMMON';
import { take, call, select } from 'redux-saga/effects';
import { action } from '../actions';

export const GET_ALL_USERS = 'GET_ALL_USERS'; 
export const REDACT_USER = 'REDACT_USER';
export const SAVE_USER = 'SAVE_USER';
export const DELETE_USER = 'DELETE_USER';

export const getAllUsers = () => action(GET_ALL_USERS, {});
export const redactUser = (id: string) => action(REDACT_USER, {id});
export const saveUserChanges = (changedData: any) => action(SAVE_USER, {changedData});
export const deleteUser = (id: string) => action(DELETE_USER, {id});

export class UserEntity extends Entity {
    constructor() {
        super(ENTITIES.USERS);
    }

    public * getAllUsers() {
        while (true) {
            const actionData = yield take(GET_ALL_USERS);
            const url = '/api/users/allUsers';
            yield call(this.xRead, url, {});
        }
    }

    public * getUserForRedact() {
        while (true) {
            const actionData = yield take(REDACT_USER);
            
            const id = actionData.id;
            if (id !== 'add') {
                const url = `/api/users/redact/${id}`
                yield call(this.xRead, url, {id});
            }
        }
    }
    public * saveUserChanges() {
        while (true) {
            const actionData = yield take(SAVE_USER);
            let changedData = actionData.changedData;
            const url ='/api/users/redact';
            yield call(this.xSave, url, { ... actionData.changedData });
        }
    }

    public * deleteUser() {
        while (true) {
            const actionData = yield take(DELETE_USER);

            const url = '/api/users/remove';

            const id = actionData.id;
            yield call(this.xDelete, url, { id });
        }
    }
}
export default new UserEntity();