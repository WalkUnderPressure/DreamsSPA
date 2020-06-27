import React from 'react';
import Document, {Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {

    render() {
        return (
        <html lang='en'>
            <Head>
                <meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0"/>
            </Head>
            
            <body 
            className="bgImage font-serif text-sm text-steel bg-fixed"
            >
                <Main/>
                <NextScript/>
            </body>
        </html>
        );
    }
}