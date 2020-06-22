import { AnyAction } from "redux";
import { userDreansActionsList } from '../actions/UsersDreans';

const userDreans = (state = [], action: AnyAction) => {
    console.log('act=', action);
    switch (action.type) {
        case userDreansActionsList.USER_DREANS_REQUEST:
            console.log('reducer user_id => ', action.user_id)
            return []
        case userDreansActionsList.USER_DREANS_GET_SUCCESSFULLY:
            console.log('get successfully : ', action.dreansArray);
            return { dreans: action.dreansArray }
        default:
            return state
    }
}

export default userDreans