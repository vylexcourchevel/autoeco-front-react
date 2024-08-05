


import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Assurez-vous que le chemin est correct
import store from './redux/store';
import { Provider } from 'react-redux';


 ReactDOM.render(

  
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root')
)
