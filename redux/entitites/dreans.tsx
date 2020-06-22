import { take, call, put } from 'redux-saga/effects'

import { userDreansActionsList, userDreansGetSuccessfully } from '../actions/UsersDreans';
import { xRead } from 'src';

export function* getDreans() {
    while (true) {
        const data = yield take(userDreansActionsList.USER_DREANS_REQUEST);
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