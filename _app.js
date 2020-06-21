import React, { Component } from "react";
import App from "next/app";
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
// import makeStore from 'app/redux/store';

class MyApp extends App {

    render() {
        return (
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
        )
    }
}

const wRedux = withRedux(makeStore)(MyApp);

export default wRedux;