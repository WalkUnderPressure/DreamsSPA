import { normalize, schema } from 'normalizr';
import { take, call, put, select } from 'redux-saga/effects';
import { xRead, xDelete, xSave, xFetch } from '../src';
import { camelizeKeys } from 'humps';
import { METHODS } from 'COMMON';
import * as action from '../redux/actions';
import { userDreansActionsList } from './actions/UsersDreansActions';

export default class Entity {
    protected mEntityName: string;
    public static mSagas: any[] = [];
    // '?'
    public mSchema: any;

    public static get saga() { return Entity.mSagas; }

    constructor(name: string = "entity", definitions: any = {}, options: any = {}) {
        this.mEntityName = name;
        this.mSchema = name !== "entity"? [new schema.Entity(name, definitions, options)] : null;
        console.log('Entity constructor -> ', this);
        this.xRead.bind(this);
    }

    public static addSaga(...args: any[]) {
        args.forEach((item) => {
            if (item instanceof Function) {
                // fork(item)
                Entity.mSagas.push(item());
            }
        });
    }

    public async * xFetch(url: string, data: any, method: METHODS) {
        
    }

    public * xRead(url : string, data : Object, method = METHODS.GET){
        console.log('inside xRead!', this.mSchema);
        const query = yield call(xRead, url, data, method);

        console.log('xFetch query result : ', query)
        // camelizeKeys(JSON.parse(JSON.stringify(query.response.data)))
        const response = normalize(camelizeKeys(query.data), this.mSchema);
        console.log('response => ', response);
        yield put(action.success(response));
    }
}

// function * fun(url, data, method, mSchema: any){
//     // this.xFetch(url, data, method);
        
//     console.log('inside xRead!', this.mSchema);
//     const query = await xFetch(url, data, method);
//     console.log('xFetch query result : ', query)
//     // camelizeKeys(JSON.parse(JSON.stringify(query.response.data)))
//     const response = normalize(camelizeKeys(query.data), this.mSchema);
//     console.log('response => ', response);
//     yield put(action.success(response));
// }

export enum ENTITIES {
    USERS = 'users', 
    DREANS = 'dreans',
} 

export class DreanEntity extends Entity {
    constructor() {
        super(ENTITIES.DREANS, {
            ownerId: new schema.Entity(ENTITIES.USERS)
        });

        Entity.addSaga(
            this.getDreans.bind(this),
        )
        
        console.log('Drean Entity constructor -> ', this.mSchema);
    }

    public * getDreans() {
        console.log('get dreans saga start listen', this);
        while (true) {
            // while (true) {
            //     const page = yield select((state: any) => state.entities.get(ENTITY.PAGES)?.find((value: any, key: any) => value &&
            //         value.get('name') === LANDING_PAGE));
            //     if (!page) {
            //         yield call(this.xRead, '/page/name/home');
            //     }
            // }
            
            // const data = {key : 'value'}
            // const data = yield select((state: any) => {
            //     state.entities.get(ENTITIES.DREANS)
            // })
            
            // if (!data) {
            
            if (true) {
                console.log('data != null call xRead => ');
                const url = '/api/dreans/all';
                yield call(this.xRead, url, {});
            }
            // const data = yield take(userDreansActionsList.USER_DREANS_GET_REQUEST);
            // console.log('fetch() saga take = ', data);
    
            
            // const result = yield call(xRead, url, {});
            // console.log('fetch() saga call = ', result);
    
            // if (result.error) {
            //     console.log('Cant get dreans!');
            // } else {
            //     console.log('Get dreans!');
            //     yield put(userDreansGetSuccessfully(result.data));
            // }
        }
    }
}
