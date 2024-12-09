
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';  // Importer le Provider de react-redux
import store from './redux/store';  // Importer votre store Redux
import App from './App';

// Rendre l'application avec le Provider et passer le store Redux
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
