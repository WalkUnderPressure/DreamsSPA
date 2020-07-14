import { schema, normalize } from 'normalizr';
import { call, put, select, fork } from 'redux-saga/effects';
import { METHODS, CRUD, DOMAIN } from 'COMMON';
import { entityRequest, IActionRequest } from '../redux/actions';
import { camelizeKeys } from 'humps';
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
        
        this.xFetch = this.xFetch.bind(this);
        this.xRead = this.xRead.bind(this);

        this.getAction = this.getAction.bind(this);
        this.actionRequest = this.actionRequest.bind(this);
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
        console.log('getAction => ', action);

        return action;
    }

    protected xFetch = (url : string, data : any, method : METHODS) => {
        const path = `${DOMAIN}${url}`;
        let fullPath = path;
        const request : RequestInit = {}
        request.method = method;
        request.headers = {
            'Content-Type': 'application/json'
        }
        if (method === METHODS.GET) {
            const urlParameters = Object.entries(data).map(e => e.join('=')).join('&');
          // fullPath += urlParameters;
        } else {
            request.body = JSON.stringify(data)
        }
        
        return fetch(fullPath, request)
            .then(res => {
                return res.json()
            })
    }

    protected * actionRequest(uri: string, crud: CRUD, method: METHODS, data?: any) {
        console.log('actionRequest => ', { crud, method, data } );
        // while(true){
            const action: IActionRequest = this.getAction(crud);
            let result: IServerResponse = yield call(this.xFetch, uri, data, method);

            const success = !result.error;
            const query = result.data;
            
            let response = null;
            if (success && this.mSchema && query) {
                response = normalize(camelizeKeys(query), this.mSchema);
            } else if (query) {
                response = query;
            }

            // console.log('put to redux -> ', response);
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
}

export enum ENTITIES {
    USERS = 'users', 
    MY_DREANS = 'myDreans',
    ALL_DREANS = 'allDreans',
} 
