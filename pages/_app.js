import '../styles/styles.scss';
import App from 'next/app';
import React from 'react';
const { serialize, deserialize } = require('json-immutable');

import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import makeStore from '../redux/store';
//import { getIdentity, queryData } from 'src/redux/actions';

class MyApp extends App {

    static async getInitialProps({ Component, router, ctx }) {
        await ctx.store.stopSaga();
        await ctx.store.execSagaTasks(ctx, dispatch => {

        });
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
        return { pageProps };
    }

    render() {
        const { Component, pageProps, store } = this.props;
        return (
            <div className='bg-grey-lighter h-screen font-sans'>
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </div>
        ) 
    }
}
const wRedux = withRedux(makeStore, {
    serializeState: state => {
    return state ? serialize(state) : state;
    },
    deserializeState: state => {
    return state ? deserialize(state) : state;
    }
    })(MyApp);
export default wRedux;