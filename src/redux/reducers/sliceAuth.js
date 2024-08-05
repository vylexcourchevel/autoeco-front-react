// src/redux/reducers/authSlice.js

// Importation de la fonction createSlice depuis Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Définition de l'état initial pour le slice d'authentification
const initialState = {
    isAuthenticated: false, // Indique si l'utilisateur est authentifié ou non
    user: null,             // Contient les informations de l'utilisateur (initialement aucune)
    status: 'idle',         // Indique l'état actuel du slice, peut être 'idle', 'loading', 'succeeded', ou 'failed'
    error: null             // Contient les messages d'erreur, s'il y en a
};

// Création du slice pour l'authentification avec Redux Toolkit
const sliceAuth = createSlice({
    name: 'auth',             // Nom du slice. Utilisé pour identifier cette partie de l'état dans le store Redux
    initialState,            // État initial pour ce slice, défini plus haut
    reducers: {             // Définition des actions et des fonctions pour modifier l'état
        // Action appelée lorsque la connexion est réussie
        loginSuccess(state, action) {
            state.isAuthenticated = true;         // Définit que l'utilisateur est authentifié
            state.user = action.payload;     // Définit les informations de l'utilisateur à partir de l'action payload
            state.status = 'succeeded';            // Met à jour le statut à 'succeeded' pour indiquer que la connexion a réussi
            state.error = null;                    // Réinitialise l'erreur à null
        },
        // Action appelée lors de la déconnexion
        logout(state) {
            state.isAuthenticated = false;        // Définit que l'utilisateur n'est plus authentifié
            state.user = null;                    // Réinitialise les informations de l'utilisateur
            state.status = 'idle';                // Réinitialise le statut à 'idle'
            state.error = null;                   // Réinitialise l'erreur à null
        },
        // Action appelée lorsqu'il y a un échec de connexion
        loginFailure(state, action) {
            state.isAuthenticated = false;       // Définit que l'utilisateur n'est pas authentifié
            state.user = null;                   // Réinitialise les informations de l'utilisateur
            state.status = 'failed';             // Met à jour le statut à 'failed' pour indiquer que la connexion a échoué
            state.error = action.payload;        // Définit l'erreur à partir de l'action payload
        }
    }
});

// Exportation des actions définies dans le slice pour les utiliser dans les composants ou ailleurs
export const { loginSuccess, logout, loginFailure } = sliceAuth.actions;

// Exportation du réducteur pour l'intégrer dans le store Redux
export default sliceAuth.reducer;
