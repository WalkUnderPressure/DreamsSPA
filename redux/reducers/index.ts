import { fromJS, Map } from 'immutable';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import { AnyAction } from "redux";
import { USER_LOG_IN, USER_LOG_OUT, USER_REGISTRATION } from 'redux/identity';
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
    case USER_REGISTRATION:
      return state;
    default:
      return state
  }
}

const entities = (state = initialEntities, action: AnyAction) => {
  // console.log('action => ', action);
  if (action.hasOwnProperty('glob')) {
    const { glob: { crud, entity } } = action;
    // console.log('crud => ', crud);

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
        console.log('hello from update!', action.response);
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

// const entities = (state = initialEntities, action: AnyAction) => {
//   switch (action.type) {
//     case ActionsTypes.SUCCESSFULLY:
//       console.log('Successfully --->', action.data);
//       const data = action.data.entities;
//       const keys = Object.keys(data);
//       keys.forEach( (key: string) => {
//         // console.log('key : ', key);
//         const value = data[key];
//         // console.log('value : ', value);
//         state = state.set(key, fromJS(value));
//       })

//       return state
//     // case userDreansActionsList.USER_DREANS_GET_SUCCESSFULLY:
//     //   console.log('get successfully : ', state);
//     //   return state.set('dreans', fromJS(action.dreansArray));
//     case userDreansActionsList.USER_DREAN_DELETE_SUCCESSFULLY:
//       console.log('delete successfully : ', action);
//       const filtered = state.get("dreans").filter(item => item.get("_id") !== action.id);
//       return state.set("dreans", filtered);
//     case redactAddFormActionsList.REDACT_DREAN_SUCCESSFULLY:
//         console.log('get drean for redact successfully : ', action);
//         console.log('state on this step => ', state.get('dreans'));

//         const element: DreanItem = action.data;
//         const id = element._id;
//         console.log('element id -> ', id);
//         const indexOfListToUpdate = state.get('dreans').findIndex(listItem => {
//           return listItem.get('_id') === id;
//         });
//         console.log('indexOfListToUpdate => ', indexOfListToUpdate);
//         const newState = state.setIn(['dreans', indexOfListToUpdate], fromJS(element));
//         console.log('new State => ', state);
//         return state
//     case redactAddFormActionsList.SAVE_DREAN_CHANGES_SUCCESSFULLY:
//         console.log('drean save successfully', action)
//         return state
//     default:
//       return state
//   }
// }

export default combineReducers({
  entities,
  identity,
  form: formReducer,
})
