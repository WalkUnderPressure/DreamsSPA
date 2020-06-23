import { combineReducers } from 'redux';
import { userDreansActionsList } from '../actions/UsersDreansActions';
import { AnyAction } from "redux";
import { userAuthActionsList } from 'redux/actions/UserAuthActions';
import { redactAddFormActionsList } from 'redux/actions/redactAddFormActions';

const entity = (state = [], action: AnyAction) => {
  // console.log('act=', action);
  switch (action.type) {
    case userDreansActionsList.USER_DREANS_GET_SUCCESSFULLY:
      console.log('get successfully : ', action.dreansArray);
      return { dreans: action.dreansArray }
    case userDreansActionsList.USER_DREAN_DELETE_SUCCESSFULLY:
      console.log('delete successfully : ', action);
      const data = state.dreans.filter(item => item._id !== action.id) || [];
      return {dreans: data};
    default:
      return state
  }
}

const editingItem = (state = [], action: AnyAction) => {
  switch (action.type) {
    case redactAddFormActionsList.REDACT_DREAN_SUCCESSFULLY:
      console.log('get drean for redact successfully : ', action);
      return { ... action.data }
    default:
      return state
  }
}

const identity = (state = [], action: AnyAction) => {
  // console.log('act=', action);
  switch (action.type) {
    case userAuthActionsList.USER_LOGIN_SUCCESSFULLY:
      console.log('log in successfully : ', action);
      const user = action.user;
      return { user };
    case userAuthActionsList.USER_LOGOUT_SUCCESSFULLY:
      return {};
    case userAuthActionsList.USER_REGISTRATION_SUCCESSFULLY:
      return state;
    default:
      return state
  }
}

export default combineReducers({
  entity,
  identity,
  editingItem,
})
