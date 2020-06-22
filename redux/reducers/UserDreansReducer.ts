import { AnyAction } from "redux";
import { userDreansActionsList } from '../actions/UsersDreans';

const userDreans = (state = [], action: AnyAction) => {
    switch (action.type) {
        case userDreansActionsList.GET_ALL_USER_DREANS:
            console.log('reducer user_id => ', action.user_id)
            return []
        default:
            return state
    }
}

export default userDreans