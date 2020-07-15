import Entity, { ENTITIES } from "./Entity";
import { schema } from "normalizr";
import { take, call, select } from 'redux-saga/effects';
import { action } from '../actions'
import DreanItem from "Templates/DreanItem";

export const GET_MY_DREANS = 'GET_MY_DREANS';
export const REDACT_DREAN = 'REDACT_DREAN';
export const DELETE_DREAN = 'DELETE_DREAN';
export const SAVE_DREAN = 'SAVE_DREAN';

export const getMyDreans = () => action(GET_MY_DREANS, {});
export const redactDrean = (id: string) => action(REDACT_DREAN, {id});
export const deleteDrean = (id: string) => action(DELETE_DREAN, {id});
export const saveDreanChanges = (changedData: any) => action(SAVE_DREAN, {changedData});

export class MyDreansEntity extends Entity {
    constructor() {
        super(ENTITIES.MY_DREANS, new schema.Entity(ENTITIES.MY_DREANS));
        
        Entity.addSaga(
            this.getMyDreans.bind(this),
            this.getDreanForRedact.bind(this),
            this.deleteDrean.bind(this),
            this.saveDreanChanges.bind(this),
        );
    }

    public * getMyDreans() {
        console.log('get dreans start listen ');
        while (true) {
            const actionData = yield take(GET_MY_DREANS);
            
            const data = yield select((state: any) => state.entities.get('myDreans'));
            
            if (!data) {
                console.log('data != null call xRead => ');
                // const url = '/api/dreans/allMyDreans';
                const url = '/api/dreans/allDreans';
                yield call(this.xRead, url, {});
            }
        }
    }

    public * getDreanForRedact() {
        while (true) {
            const actionData = yield take(REDACT_DREAN);
            console.log('fetch() saga take = ', actionData);

            const id = actionData.id;
            if (id !== 'add') {
                const url = `/api/dreans/redact/${id}`
                yield call(this.xRead, url, {id});
            }
        }
    }

    public * deleteDrean() {
        while (true) {
            const actionData = yield take(DELETE_DREAN);
            console.log('fetch() saga take = ', actionData);

            const url = '/api/dreans/remove';

            const id = actionData.id;
            yield call(this.xDelete, url, { id });
        }
    }

    public * saveDreanChanges() {
        while (true) {
            const actionData = yield take(SAVE_DREAN);
            console.log('saveDreanChanges => fetch() saga take = ', actionData);

            let changedData: DreanItem = actionData.changedData;

            changedData.dateOfEvent = new Date(changedData.dateOfEvent).getTime();
            
            console.log('changes data => ', changedData);

            const url = '/api/dreans/redact'
            yield call(this.xSave, url, { ... changedData });
        }
    }
}
export default new MyDreansEntity();