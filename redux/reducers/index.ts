import { fromJS, List, Map } from 'immutable';

import { combineReducers } from 'redux';
import { userDreansActionsList } from '../actions/UsersDreansActions';
import { AnyAction } from "redux";
import { userAuthActionsList } from 'redux/actions/UserAuthActions';
import { redactAddFormActionsList } from 'redux/actions/redactAddFormActions';

const initialEntities = fromJS({

});

const entity = (state = initialEntities, action: AnyAction) => {
  // console.log('act=', action);
  switch (action.type) {
    case userDreansActionsList.USER_DREANS_GET_SUCCESSFULLY:
      console.log('get successfully : ', state);
      state = state.set('dreans', fromJS(action.dreansArray));
      console.log('state after --> ', state); 
      return state
    case userDreansActionsList.USER_DREAN_DELETE_SUCCESSFULLY:
      console.log('delete successfully : ', action);
      const changedDreans = Map(state).getIn(['entity','dreans']);
      Map(changedDreans).filter(item => item._id !== action.id) 
      // const data = state.dreans.filter(item => item._id !== action.id) || [];
      // return {dreans: data};
    default:
      return state
  }
}

const editingItem = (state = initialEntities, action: AnyAction) => {
  switch (action.type) {
    case redactAddFormActionsList.REDACT_DREAN_SUCCESSFULLY:
      console.log('get drean for redact successfully : ', action);
      return { ... action.data }
    case redactAddFormActionsList.REDACT_DREAN_UNSUCCESSFULLY:
      const emptyItem = {
        needThings: [],
        guests: [],
      }
      return { ... emptyItem } 
    case redactAddFormActionsList.REDACT_MAIN_INPUT:
      console.log('main action ', state);
      const name = action.field.name;
      const value = action.field.value;
      return state[name] = value
    default:
      return state
  }
}

const identity = (state = initialEntities, action: AnyAction) => {
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
