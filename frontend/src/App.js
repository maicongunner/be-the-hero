import React from 'react';

import Routes from './routes';

import GlobalStyle from './global/style';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes />
      <GlobalStyle />
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
