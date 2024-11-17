// src/redux/reducers/sliceAuth.js VERSION TEST ajout de const canAccessAdminPages , permet de vérifier si l’utilisateur est authentifié et administrateur

import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false, // Indique si l'utilisateur est authentifié ou non
    user: null,             // Contient les informations de l'utilisateur (initialement aucune)
    status: 'idle',         // Indique l'état actuel du slice, peut être 'idle', 'loading', 'succeeded', ou 'failed'
    error: null,            // Contient les messages d'erreur, s'il y en a
    loading: false,         // Indique si une opération asynchrone est en cours
    isAdmin: false          // Indique si l'utilisateur est administrateur ou non
};

// Création d'une fonction asynchrone pour récupérer l'utilisateur actuel depuis l'API
export const getCurrentUser = createAsyncThunk('auth/getCurrent', async () => {
    const response = await axios.get('http://localhost:8002/api/users/getCurrent', {
        withCredentials: true // Inclure les cookies dans la requête
    });

    return response.data;
    // Retourne les données de la réponse
});

const sliceAuth = createSlice({
    name: 'auth',            // Nom du slice. Utilisé pour identifier cette partie de l'état dans le store Redux
    initialState,            // État initial pour ce slice, défini plus haut
    reducers: {              // Définition des actions et des fonctions pour modifier l'état
        loginSuccess(state, action) {
            state.isAuthenticated = true;         // Définit que l'utilisateur est authentifié
            state.user = action.payload;          // Définit les informations de l'utilisateur à partir de l'action payload
            state.isAdmin = action.payload.isAdmin; // Met à jour l'état `isAdmin` en fonction de la donnée renvoyée par le serveur
            state.status = 'succeeded';           // Met à jour le statut à 'succeeded' pour indiquer que la connexion a réussi
            state.error = null;                   // Réinitialise l'erreur à null
        },
        logout(state) {
            state.isAuthenticated = false;        // Définit que l'utilisateur n'est plus authentifié
            state.user = null;                    // Réinitialise les informations de l'utilisateur
            state.isAdmin = false;                // Réinitialise l'état `isAdmin` à false
            state.status = 'idle';                // Réinitialise le statut à 'idle'
            state.error = null;                   // Réinitialise l'erreur à null
        },
        loginFailure(state, action) {
            state.isAuthenticated = false;        // Définit que l'utilisateur n'est pas authentifié
            state.user = null;                    // Réinitialise les informations de l'utilisateur
            state.isAdmin = false;                // Réinitialise l'état `isAdmin` à false
            state.status = 'failed';              // Met à jour le statut à 'failed' pour indiquer que la connexion a échoué
            state.error = action.payload;         // Définit l'erreur à partir de l'action payload
        }
    },
    extraReducers: (builder) => {                 // Gestion des reducers additionnels pour les opérations asynchrones
        builder
            .addCase(getCurrentUser.pending, (state) => {
                state.loading = true;             // Indique que la récupération de l'utilisateur est en cours
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.loading = false;            // Indique que la récupération de l'utilisateur est terminée
                state.user = action.payload;      // Définit les informations de l'utilisateur à partir de l'action payload
                state.isAuthenticated = true;     // Définit que l'utilisateur est authentifié
                state.isAdmin = action.payload.isAdmin; // Met à jour l'état `isAdmin` en fonction de la donnée renvoyée par le serveur
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.loading = false;            // Indique que la récupération de l'utilisateur a échoué
                state.error = action.error.message; // Définit l'erreur à partir de l'action error.message
            });
    }
});

// Sélecteur pour vérifier si l'utilisateur peut accéder aux pages réservées aux administrateurs
export const canAccessAdminPages = (state) => state.auth.isAuthenticated && state.auth.isAdmin;

// Exportation des actions définies dans le slice pour les utiliser dans les composants ou ailleurs
export const { loginSuccess, logout, loginFailure } = sliceAuth.actions;

// Exportation du réducteur pour l'intégrer dans le store Redux
export default sliceAuth.reducer;


//src/redux/reducers/sliceAuth.js VERSION ok 

// import axios from 'axios';
// // Importation d'axios pour effectuer des requêtes HTTP

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // Importation de createSlice et createAsyncThunk depuis Redux Toolkit

// const initialState = {
//     isAuthenticated: false, // Indique si l'utilisateur est authentifié ou non
//     user: null,             // Contient les informations de l'utilisateur (initialement aucune)
//     status: 'idle',         // Indique l'état actuel du slice, peut être 'idle', 'loading', 'succeeded', ou 'failed'
//     error: null,            // Contient les messages d'erreur, s'il y en a
//     loading: false,         // Indique si une opération asynchrone est en cours
//     isAdmin: false          // Indique si l'utilisateur est administrateur ou non
// };

// // Création d'une fonction asynchrone pour récupérer l'utilisateur actuel depuis l'API
// export const getCurrentUser = createAsyncThunk('auth/getCurrent', async () => {
//     const response = await axios.get('http://localhost:8002/api/users/getCurrent', {
//         withCredentials: true // Inclure les cookies dans la requête
//     });

//     return response.data;
//     // Retourne les données de la réponse
// });

// const sliceAuth = createSlice({
//     name: 'auth',            // Nom du slice. Utilisé pour identifier cette partie de l'état dans le store Redux
//     initialState,            // État initial pour ce slice, défini plus haut
//     reducers: {              // Définition des actions et des fonctions pour modifier l'état
//         loginSuccess(state, action) {
//             state.isAuthenticated = true;         // Définit que l'utilisateur est authentifié
//             state.user = action.payload;          // Définit les informations de l'utilisateur à partir de l'action payload
//             state.isAdmin = action.payload.isAdmin; // Met à jour l'état `isAdmin` en fonction de la donnée renvoyée par le serveur
//             state.status = 'succeeded';           // Met à jour le statut à 'succeeded' pour indiquer que la connexion a réussi
//             state.error = null;                   // Réinitialise l'erreur à null
//         },
//         logout(state) {
//             state.isAuthenticated = false;        // Définit que l'utilisateur n'est plus authentifié
//             state.user = null;                    // Réinitialise les informations de l'utilisateur
//             state.isAdmin = false;                // Réinitialise l'état `isAdmin` à false
//             state.status = 'idle';                // Réinitialise le statut à 'idle'
//             state.error = null;                   // Réinitialise l'erreur à null
//         },
//         loginFailure(state, action) {
//             state.isAuthenticated = false;        // Définit que l'utilisateur n'est pas authentifié
//             state.user = null;                    // Réinitialise les informations de l'utilisateur
//             state.isAdmin = false;                // Réinitialise l'état `isAdmin` à false
//             state.status = 'failed';              // Met à jour le statut à 'failed' pour indiquer que la connexion a échoué
//             state.error = action.payload;         // Définit l'erreur à partir de l'action payload
//         }
//     },
//     extraReducers: (builder) => {                 // Gestion des reducers additionnels pour les opérations asynchrones
//         builder
//             .addCase(getCurrentUser.pending, (state) => {
//                 state.loading = true;             // Indique que la récupération de l'utilisateur est en cours
//             })
//             .addCase(getCurrentUser.fulfilled, (state, action) => {
//                 state.loading = false;            // Indique que la récupération de l'utilisateur est terminée
//                 state.user = action.payload;      // Définit les informations de l'utilisateur à partir de l'action payload
//                 state.isAuthenticated = true;     // Définit que l'utilisateur est authentifié
//                 state.isAdmin = action.payload.isAdmin; // Met à jour l'état `isAdmin` en fonction de la donnée renvoyée par le serveur
//             })
//             .addCase(getCurrentUser.rejected, (state, action) => {
//                 state.loading = false;            // Indique que la récupération de l'utilisateur a échoué
//                 state.error = action.error.message; // Définit l'erreur à partir de l'action error.message
//             });
//     }
// });

// // Exportation des actions définies dans le slice pour les utiliser dans les composants ou ailleurs
// export const { loginSuccess, logout, loginFailure } = sliceAuth.actions;

// // Exportation du réducteur pour l'intégrer dans le store Redux
// export default sliceAuth.reducer;



// // src/redux/reducers/authSlice.js

// // Importation d'axios pour effectuer des requêtes HTTP
// import axios from 'axios';

// // Importation de createSlice et createAsyncThunk depuis Redux Toolkit
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Définition de l'état initial pour le slice d'authentification
// const initialState = {
//     isAuthenticated: false, // Indique si l'utilisateur est authentifié ou non
//     user: null,             // Contient les informations de l'utilisateur (initialement aucune)
//     status: 'idle',         // Indique l'état actuel du slice, peut être 'idle', 'loading', 'succeeded', ou 'failed'
//     error: null,            // Contient les messages d'erreur, s'il y en a
//     loading: false          // Indique si une opération asynchrone est en cours
// };

// // Création d'une fonction asynchrone pour récupérer l'utilisateur actuel depuis l'API
// export const getCurrentUser = createAsyncThunk('auth/getCurrent', async () => {
//     // Envoi d'une requête GET à l'API pour obtenir l'utilisateur actuel
//     const response = await axios.get('http://localhost:8002/api/users/getCurrent', {
//         withCredentials: true // Inclure les cookies dans la requête
//     });

//     // Retourne les données de la réponse
//     return response.data;
// });

// // Création du slice pour l'authentification avec Redux Toolkit
// const sliceAuth = createSlice({
//     name: 'auth',            // Nom du slice. Utilisé pour identifier cette partie de l'état dans le store Redux
//     initialState,            // État initial pour ce slice, défini plus haut
//     reducers: {              // Définition des actions et des fonctions pour modifier l'état
//         // Action appelée lorsque la connexion est réussie
//         loginSuccess(state, action) {
//             state.isAuthenticated = true;         // Définit que l'utilisateur est authentifié
//             state.user = action.payload;          // Définit les informations de l'utilisateur à partir de l'action payload
//             state.status = 'succeeded';           // Met à jour le statut à 'succeeded' pour indiquer que la connexion a réussi
//             state.error = null;                   // Réinitialise l'erreur à null
//         },
//         // Action appelée lors de la déconnexion
//         logout(state) {
//             state.isAuthenticated = false;        // Définit que l'utilisateur n'est plus authentifié
//             state.user = null;                    // Réinitialise les informations de l'utilisateur
//             state.status = 'idle';                // Réinitialise le statut à 'idle'
//             state.error = null;                   // Réinitialise l'erreur à null
//         },
//         // Action appelée lorsqu'il y a un échec de connexion
//         loginFailure(state, action) {
//             state.isAuthenticated = false;        // Définit que l'utilisateur n'est pas authentifié
//             state.user = null;                    // Réinitialise les informations de l'utilisateur
//             state.status = 'failed';              // Met à jour le statut à 'failed' pour indiquer que la connexion a échoué
//             state.error = action.payload;         // Définit l'erreur à partir de l'action payload
//         }
//     },
//     extraReducers: (builder) => {                 // Gestion des reducers additionnels pour les opérations asynchrones
//         builder
//             .addCase(getCurrentUser.pending, (state) => {
//                 state.loading = true;             // Indique que la récupération de l'utilisateur est en cours
//             })
//             .addCase(getCurrentUser.fulfilled, (state, action) => {
//                 state.loading = false;            // Indique que la récupération de l'utilisateur est terminée
//                 console.log(action.payload);
//                 state.user = action.payload;      // Définit les informations de l'utilisateur à partir de l'action payload
//                 state.isAuthenticated = true;     // Définit que l'utilisateur est authentifié
//             })
//             .addCase(getCurrentUser.rejected, (state, action) => {
//                 state.loading = false;            // Indique que la récupération de l'utilisateur a échoué
//                 state.error = action.error.message; // Définit l'erreur à partir de l'action error.message
//             });
//     }
// });

// // Exportation des actions définies dans le slice pour les utiliser dans les composants ou ailleurs
// export const { loginSuccess, logout, loginFailure } = sliceAuth.actions;

// // Exportation du réducteur pour l'intégrer dans le store Redux
// export default sliceAuth.reducer;
