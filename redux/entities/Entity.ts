import { schema, normalize } from 'normalizr';
import { take, call, put, fork } from 'redux-saga/effects';
import { METHODS, CRUD, DOMAIN } from 'COMMON';
import { entityRequest, IActionRequest, action } from '../actions';
import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';
import IServerResponse from '../../Templates/ServerResponse';
export interface IEntityRequest {

}

export default class Entity {
    protected mEntityName: string;
    public static mSagas: any[] = [];
    public mSchema: any;

    public get entityName() { return this.mEntityName };

    public static get saga() { return Entity.mSagas; }

    public static mActions = [];

    constructor(name: string = "entity", definitions: any = {}, options: any = {}) {
        this.mEntityName = name;
        this.mSchema = name !== "entity" ? [new schema.Entity(name, definitions, options)] : null;

        this.xFetch = this.xFetch.bind(this);
        this.xRead = this.xRead.bind(this);

        this.getAction = this.getAction.bind(this);
        this.actionRequest = this.actionRequest.bind(this);

        const methods = Reflect.ownKeys(Object.getPrototypeOf(this))

        methods.forEach((method) => {
            if (method !== 'constructor') {
                // const actionName = decamelize(method.toString(), { separator: '_', }).toUpperCase();
                // console.log('action name - ', actionName);
                
                const entityName = this.constructor.name;
                const entityItem = Entity.mActions.hasOwnProperty(entityName)? Entity.mActions[entityName] : {};

                const propertyKey = method.toString();

                if (!entityItem.hasOwnProperty(propertyKey)) {
                    entityItem[propertyKey] = {
                        // watcher: propertyKey,
                        actionFunc: (data: any) => action(propertyKey,{data}),
                        // isAdded: false,
                    };
                }
                Entity.mActions[entityName] = entityItem;
                Entity.addSaga(this[method].bind(this));
                
                this.sagaTemplate(propertyKey, this[method]);
            }
        });
    }

    private * sagaTemplate(actionName: string, method: Function){
        while(true){
            const actionData = yield take(actionName);
            yield fork(method(actionData));
        }
    }

    // public saga(){
    //     return (target: any, propertyKey: string) => {

    //     }
    // }

    public static getSagaAction(className: string, methodName: string){
        console.log('Entity.mActions', Entity.mActions);
        return Entity.mActions[className][methodName].actionFunc;
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



    protected * actionRequest(url: string, crud: CRUD, method: METHODS, data?: any) {
        const action: IActionRequest = this.getAction(crud);
        let result: IServerResponse = yield call(this.xFetch, url, data, method);
        const success = !result.error;
        const query = result.data;

        let response = null;
        if (success && this.mSchema && query) {
            response = normalize(camelizeKeys(query), this.mSchema);
        } else if (query) {
            response = query;
        }

        if (success) {
            yield put(action.success(data, response));
        } else {
            yield put(action.failure(data, response));
        }

        const message = result.message;
        return { response, message };
    }

    protected xFetch = (url: string, data: any, method: METHODS) => {
        const path = `${DOMAIN}${url}`;
        let fullPath = path;
        const request: RequestInit = {}
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

    public xSave = (url: string, data: any = {}) => {
        return this.actionRequest(url, CRUD.UPDATE, METHODS.POST, data);
    }

    public xRead = (url: string, data: any = {}, method: METHODS = METHODS.GET) => {
        return this.actionRequest(url, CRUD.READ, method, data);
    }

    public xDelete = (url: string, data: any = {}) => {
        return this.actionRequest(url, CRUD.DELETE, METHODS.DELETE, data);
    }
}