import '@assets/main.css';

import { AppProps } from 'next/app';
import { FC } from 'react';

// ==============================================

const NoOp: FC = ({ children }) => <>{children}</>;

// ==============================================

function MyApp({
  Component,
  pageProps,
}: AppProps & { Component: { Layout: FC } }) {
  const Layout = Component.Layout ?? NoOp;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

// ==============================================

export default MyApp;
