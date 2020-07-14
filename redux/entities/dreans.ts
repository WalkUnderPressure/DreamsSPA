import { take, call, put } from 'redux-saga/effects'
import { userDreansActionsList, userDreansGetSuccessfully, deleteUserDreanSuccessfully } from '../actions/UsersDreansActions';
import { xRead, xDelete, xSave } from 'src';
import ServerResponse from 'Templates/ServerResponse';
import { redactAddFormActionsList, redactDreanSuccessfully, redactDreanUnsuccessfully, saveDreanChangesSuccessfully } from '../actions/redactAddFormActions';
import DreanItem from 'Templates/DreanItem';


// export function* deleteDrean() {
//     while (true) {
//         const data = yield take(userDreansActionsList.USER_DREAN_DELETE_REQUEST);
//         console.log('fetch() saga take = ', data);

//         const url = '/api/dreans/remove';

//         const id = data.drean_id;
//         const result: ServerResponse = yield call(xDelete, url, { _id: id });
//         // alert(result.message);

//         if (result.error) {
//             console.log('Cant get dreans!');
//         } else {
//             console.log('delete dreans!');
//             yield put(deleteUserDreanSuccessfully(result.data._id));
//         }
//     }
// }



// export function* saveDreanChanges() {
//     while (true) {
//         const data = yield take(redactAddFormActionsList.SAVE_DREAN_CHANGES);
//         console.log('saveDreanChanges => fetch() saga take = ', data);

//         let changedData: DreanItem = data.data;
        
//         changedData.dateOfEvent = new Date(changedData.dateOfEvent).getTime();
        
//         console.log('changes data => ', changedData);

//         const url = '/api/dreans/redact'
//         const result: ServerResponse = yield call(xSave, url, { ... changedData });
        
//         console.log('server response => ', result);
//         alert(result.message);

//         if (result.error) {
//             console.log('Cant save dreans changes!');
//         } else {
//             console.log('Drean changes saved successfully!');
//             yield put(saveDreanChangesSuccessfully());
//         }
//     }
// }
