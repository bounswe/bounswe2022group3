import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <title>Group 3 - CmpE352</title>
                    <meta name="description" content="Practice App for Group 3 - CmpE352" />
                    <link rel="icon" href="/favicon.ico" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Sacramento&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
