import App from 'next/app';
import React from 'react';

import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import makeStore from '../redux/store';
//import { getIdentity, queryData } from 'src/redux/actions';

class MyApp extends App {


    render () {
        const {Component, pageProps, store } = this.props;
        return <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
    }
}

const wRedux = withRedux(makeStore,{})(MyApp);


// const wRedux = withRedux(makeStore, { 
//     serializeState: state => {
//         return state ? serialize(state) : state;
//     },
//     deserializeState: state => {
//         return state ? deserialize(state) : state;
//     }
// })(MyApp);


export default wRedux;