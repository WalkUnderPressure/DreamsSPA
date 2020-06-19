// import { createStore, applyMiddleware, compose } from 'redux';
// import createSagaMiddleware, { END } from 'redux-saga';
// // import { all } from 'redux-saga/effects';

// // import Entity from 'src/models/entity';
// import rootReducer from './reducers';

// // const saga = function* root() {
// //     yield all( Entity.saga );
// // };

// /**
// * @param {object} initialState
// * @param {boolean} options.isServer indicates whether it is a server side or client side
// * @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
// * @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
// * @param {boolean} options.debug User-defined debug mode param
// * @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR 
// */
// export default (initialState, options) => {
//   const sagaMiddleware = createSagaMiddleware();
//   const middleware = [sagaMiddleware];

//   const composeEnhancers =
//     typeof window === 'object' &&
//       window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
//       window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//       // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//       }) : compose;

//   const enhancer = composeEnhancers(
//     applyMiddleware(...middleware)
//     // other store enhancers if any
//   );

//   const store = createStore(
//     rootReducer,
//     initialState,
//     enhancer
//   );

//   store.runSaga = () => {
//     // Avoid running twice
//     if (store.saga) return;
//     // log('Run Sagas:', Model.saga.map(o => o.FORK.fn.name));
//     store.saga = sagaMiddleware.run(saga);
//   };

//   store.stopSaga = async () => {
//     // Avoid running twice
//     if (!store.saga) return;
//     store.dispatch(END);
//     await store.saga.done;
//     store.saga = null;
//     // log('Stop Sagas');
//   };

//   store.execSagaTasks = async (ctx, tasks) => {
//     Entity.context = ctx;
//     // run saga
//     await store.runSaga();
//     // dispatch saga tasks
//     if (ctx.hasOwnProperty('query')) {
//       // 'kostily' for fixing Next9 issue and withRouter() HOC
//       const body = JSON.stringify(ctx.query);
//       if (!body.includes('css') && !body.includes('chunk')) {
//         tasks(store.dispatch);
//       }
//     } else {
//       tasks(store.dispatch);
//     }
//     // Stop running and wait for the tasks to be done
//     await store.stopSaga();
//     // Re-run on client side
//     if (!ctx.isServer) {
//       store.runSaga();
//     }
//   };

//   store.runSaga();

//   return store;
// };



// -----------------------------------------------------------------------

import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'

let store = {};

const initialState = {
  lastUpdate: 0,
  light: false,
  count: 0,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TICK':
      return {
        ...state,
        lastUpdate: action.lastUpdate,
        light: !!action.light,
      }
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      }
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
      }
    case 'RESET':
      return {
        ...state,
        count: initialState.count,
      }
    default:
      return state
  }
}

function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState,
  )
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}

/*
import {createStore, AnyAction} from 'redux';
import {MakeStore, createWrapper, Context } from 'next-redux-wrapper';

export interface State {
    tick: string;
}

// create your reducer
const reducer = (state: State = {tick: 'init'}, action: AnyAction) => {
    switch (action.type) {
        case 'TICK':
            return {...state, tick: action.payload};
        default:
            return state;
    }
};

// create a makeStore function
const makeStore: MakeStore<State> = (context: Context) => createStore(reducer);

// export an assembled wrapper
export const wrapper = createWrapper<State>(makeStore, {debug: true});
*/