// import React, { Component } from 'react'; 
// import { Provider } from "react-redux";
// import store from '../redux/store';

// class MyApp extends Component {
//     render() {
//         return (
//             <Provider store={store}>
//                 <Component {...pageProps } />
//             </Provider>
//         );
//     }
// }

// const wRedux = store.withRedux(MyApp);

// export default wRedux;
//-------------------------------------------------------------

import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { useStore } from '../redux/store'

export default function App({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState)

    return (
        <Component>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </Component>
    )
}
