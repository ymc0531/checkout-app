import * as React from 'react';
import Head from 'next/head';
import * as Interface from '../interfaces';

const Layout: React.FunctionComponent<Interface.LayoutProps> = ({ children, title }) => {

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link href="/css/main.css" rel="stylesheet" />
      </Head>
      <main>
        <div className='main-body'>
          {children}
        </div>
      </main>
    </div>
  )
}
export default Layout