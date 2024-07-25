import { createSlice } from "@reduxjs/toolkit";

// Définition de l'état initial
const initialState = {
    data: [],         // Liste des voitures. Initialement, elle est vide.
    loading: null,    // État de chargement, qui peut être 'null' (aucun chargement), 'loading' (chargement en cours), 'succeeded' (chargement réussi), ou 'failed' (échec du chargement).
    error: false,     // État d'erreur. Initialement défini sur 'false' pour indiquer qu'il n'y a pas d'erreur.
    selectedCar: null // Voiture actuellement sélectionnée. Initialement, aucune voiture n'est sélectionnée.
};

// Création du slice pour gérer l'état des voitures
export const carsSlice = createSlice({
    name: "cars",     // Nom du slice. Utilisé pour identifier cette partie de l'état dans le store.
    initialState,     // État initial pour ce slice, défini plus haut.
    reducers: {
       // Définition des reducers (fonctions pour modifier l'état) pour ce slice.
       FETCH_SUCCESS: (draft, actions) => {
            // Réduction pour l'action 'FETCH_SUCCESS', qui est appelée lorsque les données sont récupérées avec succès.
            draft.loading = false;             // Met à jour l'état de chargement à 'false' pour indiquer que le chargement est terminé.
            draft.data = actions.payload;      // Met à jour la liste des voitures avec les données reçues dans 'actions.payload'.
        },
        FETCH_FAILURE: (draft, actions) => {
            draft.loading = false;
            draft.error = true;
        },
    },
});

// Exportation de l'action 'FETCH_SUCCESS' pour l'utiliser dans les composants ou dans d'autres parties du code.
export const { FETCH_SUCCESS, FETCH_FAILURE } = carsSlice.actions;

// Exportation du réducteur pour l'intégrer dans le store Redux.
export default carsSlice.reducer;
