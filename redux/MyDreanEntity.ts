import Entity, { ENTITIES } from "./Entity";
import { schema } from "normalizr";
import { take, call, select } from 'redux-saga/effects';
import { action } from './actions'

export const GET_MY_DREANS = 'GET_MY_DREANS';
export const REDACT_DREAN = 'REDACT_DREAN';

export const getMyDreans = () => action(GET_MY_DREANS, {});
export const redactDrean = (id: string) => action(REDACT_DREAN, {id})

export class MyDreansEntity extends Entity {
    constructor() {
        super(ENTITIES.MY_DREANS, new schema.Entity(ENTITIES.MY_DREANS));
        
        Entity.addSaga(
            this.getMyDreans.bind(this),
            this.getDreanForRedact.bind(this),
        );
    }

    public * getMyDreans() {
        console.log('get dreans start listen ');
        while (true) {
            const takeData = yield take(GET_MY_DREANS);
            
            const data = yield select((state: any) => state.entities.get('myDreans'));
            
            if (!data) {
                console.log('data != null call xRead => ');
                const url = '/api/dreans/allMyDreans';
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
}
export default new MyDreansEntity();