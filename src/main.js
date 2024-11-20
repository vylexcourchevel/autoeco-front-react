import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// STRIPE 
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { BrowserRouter } from 'react-router-dom';

import store from './redux/store'; 
import { Provider } from 'react-redux';
import { PanierProvider } from './context/PanierContext';
import { AuthPrivider } from './context/AuthContext'; 

const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_KEY_STRIPE);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <AuthPrivider>
                <PanierProvider>
                    <BrowserRouter>
                        <Elements stripe={stripePromise}>
                            <App />
                            </Elements>
                    </BrowserRouter>
                </PanierProvider> 
            </AuthPrivider>
        </Provider>
    </React.StrictMode>
)
