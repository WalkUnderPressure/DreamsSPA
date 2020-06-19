import React, { Head } from 'react';
import Document, { Main } from 'next/document';

export default class MyDocument extends Document {

    render() {
        return (
        <html lang='en'>
            <Head>
                <title>Dreaming and Do Together</title>
            </Head>
            
            <body className="font-serif text-sm text-steel bg-white">
                <Main/>
            </body>
        </html>
        );
    }
}