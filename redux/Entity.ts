import { schema, normalize } from 'normalizr';
import { call, put, select, fork } from 'redux-saga/effects';
import { METHODS, CRUD } from 'COMMON';
import { entityRequest, IActionRequest } from '../redux/actions';
import { camelizeKeys } from 'humps';
import { xFetch } from '../src';
import IServerResponse from '../Templates/ServerResponse';
export interface IEntityRequest {
    
}
export default class Entity {
    protected mEntityName: string;
    public static mSagas: any[] = [];
    public mSchema: any;

    public get entityName() { return this.mEntityName};

    public static get saga() { return Entity.mSagas; }

    constructor(name: string = "entity", definitions: any = {}, options: any = {}) {
        this.mEntityName = name;
        this.mSchema = name !== "entity"? [new schema.Entity(name, definitions, options)] : null;
        
        this.xRead = this.xRead.bind(this);
        // // this.xFetch.bind(this);
        // console.log('Entity constructor -> ', this);
    }

    public static addSaga(...args: any[]) {
        args.forEach((item) => {
            if (item instanceof Function) {
                Entity.mSagas.push(fork(item));
            }
        });
    }

    private getAction(crud: any = null): IActionRequest {
        let action: IActionRequest = entityRequest(this)[CRUD.READ];
        switch (crud) {
            case CRUD.CREATE:
                action = entityRequest(this)[CRUD.CREATE];
                break;
            case CRUD.UPDATE:
                action = entityRequest(this)[CRUD.UPDATE];
                break;
            case CRUD.DELETE:
                action = entityRequest(this)[CRUD.DELETE];
                break;
            default:
            case CRUD.READ:
                break;
        }
        return action;
    }

    protected * actionRequest(uri: string, crud: CRUD, method: METHODS, data?: any) {
        
        // while(true){
            const action: IActionRequest = this.getAction(crud);
            let result: IServerResponse = yield call(xFetch, uri, method, data);
            // ( .. data, token)
            
            const success = result.error;
            const query = result.data;
            
            let response = null;
            if (success && this.mSchema && query) {
                const response = normalize(camelizeKeys(query), this.mSchema);
            } else if (query ) {
                const response = query.data;
            }

            if (success) {
                yield put(action.success(data, response));
            } else {
                yield put(action.failure(data, response));
            }

            const message = result.message;
            return { response, message };
        // }
    }

    public xSave = (uri: string, data: any = {}) => {
        return this.actionRequest(uri, CRUD.UPDATE, METHODS.POST, data);
    }
    
    public xRead = (url: string, data: any = {}, method: METHODS = METHODS.GET) => {
        return this.actionRequest(url, CRUD.READ, method, data);
    }
    
    public xDelete = (uri: string, data: any = {}) => {
        return this.actionRequest(uri, CRUD.DELETE, METHODS.DELETE, data);
    }

    // public * xRead(url : string, data : Object, method = METHODS.GET){
    //     console.log('xRead => this => ', this);
    //     // while(true){
    //         console.log('inside xRead!', this);
    //         const query = yield call(xfRead, url, data, method);
    //         console.log('xFetch query result : ', query)
    //         // camelizeKeys(JSON.parse(JSON.stringify(query.response.data)))
    //         const response = normalize(camelizeKeys(query.data), this.mSchema);
    //         console.log('response => ', response);
    //         yield put(action.success(response));
    //     // }
    // }
}

export enum ENTITIES {
    USERS = 'users', 
    DREANS = 'dreans',
} 

export class DreanEntity extends Entity {
    constructor() {
        super(ENTITIES.DREANS, new schema.Entity(ENTITIES.DREANS, {
            ownerId: new schema.Entity(ENTITIES.USERS)
        }));

        this.getDreans = this.getDreans.bind(this);
        Entity.addSaga(
            this.getDreans.bind(this),
        );
    }

    public * getDreans() {
        console.log('get dreans start listen ');
        while (true) {
            const data = yield select((state: any) => state.entities.get('dreans'));
            console.log('Select Data = : = ', data);
            if (!data) {
                console.log('data != null call xRead => ');
                const url = '/api/dreans/all';
                yield call(this.xRead, url, {}, METHODS.POST);
            }
        }
    }
}
