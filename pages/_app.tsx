import React, { useState } from "react";
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import Layout from '../components/Layout';

import '../assets/styles/main.css';
// ensure all pages have Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

import store from '../redux/store';

const MyApp = ({ Component, pageProps }) => {

  return (
  	<Provider store={store}>
	  	<Layout title="Cart Genie Checkout">
	  		<Component {...pageProps} />
	  	</Layout>
  	</Provider>
  )
}

export default MyApp