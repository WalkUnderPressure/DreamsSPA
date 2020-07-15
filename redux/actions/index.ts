import { Action } from "redux";
import Entity, { IEntityRequest } from "redux/entities/Entity";
import { CRUD } from "COMMON";

export const action = (type: string, payload = {}): Action<any> => {
    return {type, ...payload};
}

export interface IActionRequest {
    request: Function,
    success: Function,
    failure: Function,
}

export const entityRequest = (entity: Entity) => {
    const result: any = {};
    return [CRUD.CREATE, CRUD.READ, CRUD.UPDATE, CRUD.DELETE].reduce((acc: IEntityRequest, crud: CRUD) => {
        const pref = `${entity.entityName.toUpperCase()}_${crud}`;
        const glob = { entity, crud };
        const act: IActionRequest = {
            request: (data: any) => action(`${pref}_REQUEST`, { glob, data }),
            success: (data: any, response) => action(`${pref}_SUCCESS`, { glob, data, response }),
            failure: (data: any, error) => action(`${pref}_FAILURE`, { glob, data, error }),
        };
        // @ts-ignore
        acc[crud] = act;
        return acc;
    }, result);
}
