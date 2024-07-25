


import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Assurez-vous que le chemin est correct
import store from './redux/store';
import { Provider } from 'react-redux';
import DefaultLayout from './components/DefaultLayout';


 ReactDOM.render(

  <DefaultLayout>
  
  <Provider store={store}>
    <App />
  </Provider>,

  </DefaultLayout>,
  document.getElementById('root')
)
