import { take, call, put } from 'redux-saga/effects'
import { userDreansActionsList, userDreansGetSuccessfully } from '../actions/UsersDreansActions';
import { xRead, xDelete } from 'src';
import ServerResponse from 'Templates/ServerResponse';
import { redactAddFormActionsList } from '../actions/redactAddFormActions';

export function* getDreans() {
    while (true) {
        const data = yield take(userDreansActionsList.USER_DREANS_GET_REQUEST);
        console.log('fetch() saga take = ', data);
    
        const url = '/api/dreans/all';
        const result = yield call(xRead, url, {});
        console.log('fetch() saga call = ', result);
        
        if(result.error){
            console.log('Cant get dreans!');
        }else{
            console.log('Get dreans!');
            const action = {
                type: userDreansActionsList.USER_DREANS_GET_SUCCESSFULLY,
                dreansArray: result.data
            }
            yield put(action);
        }
    }
}

export function* deleteDrean(){
    while(true){
        const data = yield take(userDreansActionsList.USER_DREAN_DELETE_REQUEST);
        console.log('fetch() saga take = ', data);

        const url = '/api/dreans/remove';
    
        const id = data.drean_id;
        const result: ServerResponse = yield call(xDelete, url, { _id: id });
        alert(result.message);

        if (result.error) {
            console.log('Cant get dreans!');
        }else{
            console.log('delete dreans!');
            const id = result.data._id;

            const action = {
                type: userDreansActionsList.USER_DREAN_DELETE_SUCCESSFULLY,
                id
            }
            yield put(action);
        }
     
    }
} 

export function* getDreanForRedact(){
    while(true){
        const data = yield take(redactAddFormActionsList.REDACT_DREAN_REQUEST);
        console.log('fetch() saga take = ', data);

        const id = data.id;
        const url = `/api/dreans/redact/${id}`
        
        console.log('url get drean for redact => ', url);
        const result: ServerResponse = yield call(xRead, url, {});
        console.log('fetch() saga call = ', result);

        if (result.error) {
            console.log('Cant get drean for redact!');
        }else{
            console.log('get drean for redact!');
            const data = { ... result.data};
            const action = {
                type: redactAddFormActionsList.REDACT_DREAN_SUCCESSFULLY,
                data
            }
            yield put(action);
        }
    }
}

