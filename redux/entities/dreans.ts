import { take, call, put } from 'redux-saga/effects'
import { userDreansActionsList, userDreansGetSuccessfully, deleteUserDreanSuccessfully } from '../actions/UsersDreansActions';
import { xRead, xDelete, xSave } from 'src';
import ServerResponse from 'Templates/ServerResponse';
import { redactAddFormActionsList, redactDreanSuccessfully, redactDreanUnsuccessfully, saveDreanChangesSuccessfully } from '../actions/redactAddFormActions';

export function* getDreans() {
    while (true) {
        const data = yield take(userDreansActionsList.USER_DREANS_GET_REQUEST);
        console.log('fetch() saga take = ', data);

        const url = '/api/dreans/all';
        const result = yield call(xRead, url, {});
        console.log('fetch() saga call = ', result);

        if (result.error) {
            console.log('Cant get dreans!');
        } else {
            console.log('Get dreans!');
            yield put(userDreansGetSuccessfully(result.data));
        }
    }
}

export function* deleteDrean() {
    while (true) {
        const data = yield take(userDreansActionsList.USER_DREAN_DELETE_REQUEST);
        console.log('fetch() saga take = ', data);

        const url = '/api/dreans/remove';

        const id = data.drean_id;
        const result: ServerResponse = yield call(xDelete, url, { _id: id });
        alert(result.message);

        if (result.error) {
            console.log('Cant get dreans!');
        } else {
            console.log('delete dreans!');
            yield put(deleteUserDreanSuccessfully(result.data._id));
        }
    }
}

export function* getDreanForRedact() {
    while (true) {
        const data = yield take(redactAddFormActionsList.REDACT_DREAN_REQUEST);
        console.log('fetch() saga take = ', data);

        const id = data.id;
        if (id !== 'add') {
            const url = `/api/dreans/redact/${id}`

            console.log('url get drean for redact => ', url);
            const result: ServerResponse = yield call(xRead, url, {});
            console.log('fetch() saga call = ', result);

            if (result.error) {
                console.log('Cant get drean for redact!');
            } else {
                console.log('get drean for redact!');
                yield put(redactDreanSuccessfully({ ...result.data }));
            }
        } else {
            console.log('Cant get drean for redact!');
            yield put(redactDreanUnsuccessfully());
        }
    }
}

export function* saveDreanChanges() {
    while (true) {
        const data = yield take(redactAddFormActionsList.SAVE_DREAN_CHANGES);
        console.log('saveDreanChanges => fetch() saga take = ', data);

        const changedData = data.data;
        const url = '/api/dreans/redact'
        
        const result: ServerResponse = yield call(xSave, url, { ... changedData });
        
        console.log('server response => ', result);
        alert(result.message);

        if (result.error) {
            console.log('Cant save dreans changes!');
        } else {
            console.log('Drean changes saved successfully!');
            yield put(saveDreanChangesSuccessfully());
        }
    }
}


