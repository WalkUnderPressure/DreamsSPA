import { fromJS, Map } from 'immutable';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import { userDreansActionsList } from '../actions/UsersDreansActions';
import { AnyAction } from "redux";
import { userAuthActionsList } from 'redux/actions/UserAuthActions';
import { redactAddFormActionsList } from 'redux/actions/redactAddFormActions';
import DreanItem from 'Templates/DreanItem';

const initialEntities = fromJS({

});

const identity = (state = initialEntities, action: AnyAction) => {
  // console.log('act=', action);
  switch (action.type) {
    case userAuthActionsList.USER_LOGIN_SUCCESSFULLY:
      console.log('log in successfully : ', action);
      return state.set("user", fromJS(action.user))
    case userAuthActionsList.USER_LOGOUT_SUCCESSFULLY:
      return Map();
    case userAuthActionsList.USER_REGISTRATION_SUCCESSFULLY:
      return state;
    default:
      return state
  }
}

const entity = (state = initialEntities, action: AnyAction) => {
  // console.log('act=', action);
  switch (action.type) {
    case userDreansActionsList.USER_DREANS_GET_SUCCESSFULLY:
      console.log('get successfully : ', state);
      return state.set('dreans', fromJS(action.dreansArray));
    case userDreansActionsList.USER_DREAN_DELETE_SUCCESSFULLY:
      console.log('delete successfully : ', action);
      const filtered = state.get("dreans").filter(item => item.get("_id") !== action.id);
      return state.set("dreans", filtered);
    case redactAddFormActionsList.REDACT_DREAN_SUCCESSFULLY:
        console.log('get drean for redact successfully : ', action);
        console.log('state on this step => ', state.get('dreans'));
  
        const element: DreanItem = action.data;
        const id = element._id;
        console.log('element id -> ', id);
        const indexOfListToUpdate = state.get('dreans').findIndex(listItem => {
          return listItem.get('_id') === id;
        });
        console.log('indexOfListToUpdate => ', indexOfListToUpdate);
        const newState = state.setIn(['dreans', indexOfListToUpdate], fromJS(element));
        console.log('new State => ', state);
        return state
    case redactAddFormActionsList.SAVE_DREAN_CHANGES_SUCCESSFULLY:
        console.log('drean save successfully', action)
        return state
    default:
      return state
  }
}

export default combineReducers({
  entity,
  identity,
  form: formReducer,
})
