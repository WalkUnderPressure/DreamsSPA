import { Store, createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { all } from 'redux-saga/effects';

// import Entity from 'src/models/entity';
import rootReducer from './reducers';
import { getDreans, deleteDrean, getDreanForRedact } from './entities/dreans';
import { userLogIn, userLogOut, userRegistration } from './identity/index';

const saga = function* root() {
    // console.log('1 - saga started !!!')
    yield all([
        getDreans(),
        deleteDrean(),
        getDreanForRedact(),
        userLogIn(),
        userLogOut(),
        userRegistration(),
    ]);
};

/**
* @param {object} initialState
* @param {boolean} options.isServer indicates whether it is a server side or client side
* @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
* @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
* @param {boolean} options.debug User-defined debug mode param
* @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR 
*/

export default (initialState, options) => {
    const sagaMiddleware = createSagaMiddleware();
    const middleware = [sagaMiddleware];

    const composeEnhancers =
        typeof window === 'object' &&
            (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
            }) : compose;

    const enhancer = composeEnhancers(
        applyMiddleware(...middleware)
        // other store enhancers if any
    );

    const store: any = createStore(
        rootReducer,
        initialState,
        enhancer
    );

    store.runSaga = () => {
        // Avoid running twice
        if (store.saga) return;
        // log('Run Sagas:', Model.saga.map(o => o.FORK.fn.name));
        store.saga = sagaMiddleware.run(saga);
    };

    store.stopSaga = async () => {
        // Avoid running twice
        if (!store.saga) return;
        store.dispatch(END);
        await store.saga.done;
        store.saga = null;
        // log('Stop Sagas');
    };

    store.execSagaTasks = async (ctx, tasks) => {
        // Entity.context = ctx;
        // run saga
        await store.runSaga();
        // dispatch saga tasks
        if (ctx.hasOwnProperty('query')) {
            // 'kostily' for fixing Next9 issue and withRouter() HOC
            const body = JSON.stringify(ctx.query);
            if (!body.includes('css') && !body.includes('chunk')) {
                tasks(store.dispatch);
            }
        } else {
            tasks(store.dispatch);
        }

        // Stop running and wait for the tasks to be done
        await store.stopSaga();
        // Re-run on client side
        if (!ctx.isServer) {
            store.runSaga();
        }
    };

    store.runSaga();

    return store;
};
