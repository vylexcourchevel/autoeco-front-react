// src/components/DefaultLayout.js

import React from 'react';

// Définition du composant fonctionnel DefaultLayout
const DefaultLayout = (props) => {
  // Styles pour l'en-tête et le titre
  const headerStyle = {
    backgroundColor: '#343a40', // Couleur de fond de l'en-tête
    padding: '10px',            // Espacement intérieur de l'en-tête
    display: 'flex',            // Utilisation de flexbox pour l'alignement des éléments
    justifyContent: 'space-between', // Espacement entre les éléments pour les placer à gauche et à droite
    alignItems: 'center',       // Alignement vertical des éléments
  };

  const titleStyle = {
    margin: 0,                  // Suppression des marges autour du titre
    color: 'white',             // Couleur du texte du titre
  };

  // Définition du composant AuthButton interne
  const AuthButton = () => {
    return (
      <div>
        {/* Bouton de connexion */}
        <button 
          type="button" 
          className="btn btn-primary btn-sm"
        >
          Connexion
        </button>
        {/* Bouton d'inscription */}
        <button 
          type="button" 
          className="btn btn-secondary btn-sm" 
          style={{ marginLeft: '10px' }} // Espacement entre les deux boutons
        >
          Inscription
        </button>
      </div>
    );
  };

  // Retourne le JSX du composant
  return (
    <div>
      <div className="header" style={headerStyle}>
        <h1 style={titleStyle}>AUTOECO</h1>
        {/* Utilisation du composant AuthButton */}
        <AuthButton />
      </div>
      {/* Contenu principal du composant */}
      <div className="content">
        {props.children}
      </div>
    </div>
  );
};

// Export du composant pour pouvoir l'utiliser dans d'autres parties de l'application
export default DefaultLayout;
