import { fromJS, Map } from 'immutable';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import { AnyAction } from "redux";
import { USER_LOG_IN, USER_LOG_OUT, USER_REGISTRATION, USER_UPDATE_PROFILE } from 'redux/identity';
import { CRUD } from 'COMMON';


const initialEntities = fromJS({

});

const identity = (state = initialEntities, action: AnyAction) => {
  switch (action.type) {
    case USER_LOG_IN:
      console.log('log in successfully : ', action);
      return state.set("user", fromJS(action.user))
    case USER_LOG_OUT:
      return Map();
    case USER_UPDATE_PROFILE:
      console.log("Reducer update profile - ", action);
      return state.set("user", fromJS(action.user))
    default:
      return state
  }
}

const entities = (state = initialEntities, action: AnyAction) => {
  if (action.hasOwnProperty('glob')) {
    const { glob: { crud, entity } } = action;
  
    switch (crud) {
      case CRUD.DELETE:
        {
          let list = state.get(entity.entityName);
          if (list) {
            list = list.remove(action.data.id);
            state = state.set(entity.entityName, list);
          }
        }
        break;
      default:
      case CRUD.UPDATE:
        if (action.response && action.response.entities) {
          const { response: { entities } } = action;
          if (entities) {
            Object.keys(entities).map((entityName) => {
              let list = state.get(entityName);
              if (list && list.size > 0) {
                Object.keys(entities[entityName]).map((id) => list = list.remove(id));
              }
              state = state.set(entityName, list);
            });
            state = state.mergeDeep(fromJS(entities));
          }
        }
        break;
    }
  }
  return state;
}

export default combineReducers({
  entities,
  identity,
  form: formReducer,
})
