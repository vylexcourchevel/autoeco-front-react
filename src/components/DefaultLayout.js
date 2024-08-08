// src/components/DefaultLayout.js

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importation de useNavigate depuis react-router-dom

// Définition du composant fonctionnel DefaultLayout
const DefaultLayout = (props) => {
  const navigate = useNavigate(); // Création de l'objet navigate pour la redirection

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
    // Fonction pour gérer la redirection vers la page spécifiée
    const handleAuthClick = (path) => {
      navigate(path); // Redirection vers la page spécifiée
    };

    return (
      <div>
        {/* Bouton de connexion */}
        <button 
          type="button" 
          className="btn btn-primary btn-sm"
          onClick={() => handleAuthClick('/login')} // Redirection vers la page de connexion
        >
          Connexion
        </button>
        {/* Bouton d'inscription */}
        <button 
          type="button" 
          className="btn btn-secondary btn-sm" 
          style={{ marginLeft: '10px' }} // Espacement entre les deux boutons
          onClick={() => handleAuthClick('/register')} // Redirection vers la page d'inscription
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



// // src/components/DefaultLayout.js

// import React from 'react';
// import { useNavigate } from 'react-router-dom'; // Importation de useNavigate depuis react-router-dom

// // Définition du composant fonctionnel DefaultLayout
// const DefaultLayout = (props) => {
//   const navigate = useNavigate(); // Création de l'objet navigate pour la redirection

//   // Styles pour l'en-tête et le titre
//   const headerStyle = {
//     backgroundColor: '#343a40', // Couleur de fond de l'en-tête
//     padding: '10px',            // Espacement intérieur de l'en-tête
//     display: 'flex',            // Utilisation de flexbox pour l'alignement des éléments
//     justifyContent: 'space-between', // Espacement entre les éléments pour les placer à gauche et à droite
//     alignItems: 'center',       // Alignement vertical des éléments
//   };

//   const titleStyle = {
//     margin: 0,                  // Suppression des marges autour du titre
//     color: 'white',             // Couleur du texte du titre
//   };

//   // Définition du composant AuthButton interne
//   const AuthButton = () => {
//     // Fonction pour gérer la redirection vers la page de connexion
//     const handleAuthClick = (path) => {
//       navigate(path); // Redirection vers la page spécifiée
//     };

//     return (
//       <div>
//         {/* Bouton de connexion */}
//         <button 
//           type="button" 
//           className="btn btn-primary btn-sm"
//           onClick={() => handleAuthClick('/login')} // Redirection vers la page de connexion
//         >
//           Connexion
//         </button>
//         {/* Bouton d'inscription */}
//         <button 
//           type="button" 
//           className="btn btn-secondary btn-sm" 
//           style={{ marginLeft: '10px' }} // Espacement entre les deux boutons
//           onClick={() => handleAuthClick('/register')} // Redirection vers la page d'inscription
//         >
//           Inscription
//         </button>
//       </div>
//     );
//   };

//   // Retourne le JSX du composant
//   return (
//     <div>
//       <div className="header" style={headerStyle}>
//         <h1 style={titleStyle}>AUTOECO</h1>
//         {/* Utilisation du composant AuthButton */}
//         <AuthButton />
//       </div>
//       {/* Contenu principal du composant */}
//       <div className="content">
//         {props.children}
//       </div>
//     </div>
//   );
// };

// // Export du composant pour pouvoir l'utiliser dans d'autres parties de l'application
// export default DefaultLayout;





// // src/components/DefaultLayout.js

// import React from 'react';
// import { useNavigate } from 'react-router-dom'; // Importation de useNavigate depuis react-router-dom

// // Définition du composant fonctionnel DefaultLayout
// const DefaultLayout = (props) => {
//   const navigate = useNavigate(); // Création de l'objet navigate pour la redirection

//   // Styles pour l'en-tête et le titre
//   const headerStyle = {
//     backgroundColor: '#343a40', // Couleur de fond de l'en-tête
//     padding: '10px',            // Espacement intérieur de l'en-tête
//     display: 'flex',            // Utilisation de flexbox pour l'alignement des éléments
//     justifyContent: 'space-between', // Espacement entre les éléments pour les placer à gauche et à droite
//     alignItems: 'center',       // Alignement vertical des éléments
//   };

//   const titleStyle = {
//     margin: 0,                  // Suppression des marges autour du titre
//     color: 'white',             // Couleur du texte du titre
//   };

//   // Définition du composant AuthButton interne
//   const AuthButton = () => {
//     // Fonction pour gérer la redirection vers la page de connexion
//     const handleLoginClick = () => {
//       navigate('/login'); // Redirection vers la page de connexion
//     };

//     // Fonction pour gérer la redirection vers la page d'inscription
//     const handleSignupClick = () => {
//       navigate('/register'); // Redirection vers la page d'inscription
//     };

//     return (
//       <div>
//         {/* Bouton de connexion */}
//         <button 
//           type="button" 
//           className="btn btn-primary btn-sm"
//           onClick={handleLoginClick} // Gestionnaire de clic pour la redirection vers la page de connexion
//         >
//           Connexion
//         </button>
//         {/* Bouton d'inscription */}
//         <button 
//           type="button" 
//           className="btn btn-secondary btn-sm" 
//           style={{ marginLeft: '10px' }} // Espacement entre les deux boutons
//           onClick={handleSignupClick} // Gestionnaire de clic pour la redirection vers la page d'inscription
//         >
//           Inscription
//         </button>
//       </div>
//     );
//   };

//   // Retourne le JSX du composant
//   return (
//     <div>
//       <div className="header" style={headerStyle}>
//         <h1 style={titleStyle}>AUTOECO</h1>
//         {/* Utilisation du composant AuthButton */}
//         <AuthButton />
//       </div>
//       {/* Contenu principal du composant */}
//       <div className="content">
//         {props.children}
//       </div>
//     </div>
//   );
// };

// // Export du composant pour pouvoir l'utiliser dans d'autres parties de l'application
// export default DefaultLayout;
