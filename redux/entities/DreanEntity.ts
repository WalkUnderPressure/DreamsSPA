import Entity from "./Entity";
import  { ENTITIES } from '../../COMMON';
import { schema } from "normalizr";
import { take, call, select } from 'redux-saga/effects';
import { action } from '../actions';
import DreanItem from "Templates/DreanItem";

// export const GET_MY_DREANS = 'GET_MY_DREANS';
// export const GET_ALL_DREANS = 'GET_ALL_DREANS'; 
// export const REDACT_DREAN = 'REDACT_DREAN';
// export const DELETE_DREAN = 'DELETE_DREAN';
// export const SAVE_DREAN = 'SAVE_DREAN';

// export const getMyDreans = () => action(GET_MY_DREANS, {});
// export const getAllDreans = () => action(GET_ALL_DREANS, {});
// export const redactDrean = (id: string) => action(REDACT_DREAN, {id});
// export const deleteDrean = (id: string) => action(DELETE_DREAN, {id});
// export const saveDreanChanges = (changedData: any) => action(SAVE_DREAN, {changedData});

export class DreansEntity extends Entity {
    constructor() {
        super(ENTITIES.DREANS, {
            owner: new schema.Entity(ENTITIES.USERS),
        });
    }

    public * getMyDreans() {
        while (true) {
            const actionData = yield take('getMyDreans');
            const data = yield select((state: any) => state.entities.get('myDreans'));
            
            if (!data) {
                const url = '/api/dreans/allMyDreans';
                yield call(this.xRead, url, {});
            }
        }
    }

    public * getAllDreans() {
        while (true) {
            const actionData = yield take("getAllDreans");
            const url = '/api/dreans/allDreans';
            yield call(this.xRead, url, {});
        }
    }

    public * getDreanForRedact() {
        while (true) {
            const actionData = yield take('getDreanForRedact');
        
            const id = actionData.id;
            if (id !== 'add') {
                const url = `/api/dreans/redact/${id}`
                yield call(this.xRead, url, {id});
            }
        }
    }

    public * deleteDrean(actionData: any) {
        // while (true) {
            // const actionData = yield take("deleteDrean");
            console.log('action data - ', actionData);

            const url = '/api/dreans/remove';

            const id = actionData.data;
            yield call(this.xDelete, url, { id });
        // }
    }

    public * saveDreanChanges() {
        while (true) {
            const actionData = yield take('saveDreanChanges');
    
            let changedData: DreanItem = actionData.changedData;

            changedData.dateOfEvent = new Date(changedData.dateOfEvent).getTime();
            
            const url = '/api/dreans/redact'
            yield call(this.xSave, url, { ... changedData });
        }
    }
}
export default new DreansEntity();