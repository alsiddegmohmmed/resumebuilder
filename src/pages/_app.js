// pages/_app.js
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import Header from '../../components/Header.js';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => (
  <SessionProvider session={pageProps.session}>
    <Head>
      <title>Interactive Resume Builder</title>
    </Head>
    <Header />
    <Component {...pageProps} />
  </SessionProvider>
);

export default MyApp;
