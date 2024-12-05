//src/components/AuthButton.js  VERSION TEST bouton déconnexion



//src/components/AuthButton.js  VERSION OK 

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/reducers/sliceAuth';
import axios from 'axios';

// Définition du composant fonctionnel DefaultLayout
const DefaultLayout = (props) => {
  const navigate = useNavigate();
  const location = useLocation();  // Récupérer l'emplacement actuel
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const headerStyle = {
    backgroundColor: '#343a40',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const titleStyle = {
    margin: 0,
    color: 'white',
  };

  // Fonction pour envoyer une requête à l'API pour supprimer le cookie
  const handleLogoutClick = async () => {
    try {
      // Envoi de la requête à l'API pour supprimer le cookie
      await axios.post('http://localhost:8002/api/users/logout', {}, { withCredentials: true });

      // Dispatch de l'action de déconnexion
      dispatch(logout());

      // Redirection vers la page d'accueil
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/register');
  };

  const AuthButton = () => {
    // Vérifier si l'utilisateur est sur la page de connexion
    const isLoginPage = location.pathname === '/login';

    return (
      <div>
        {!isAuthenticated && !isLoginPage ? (
          <>
            <button 
              type="button" 
              className="btn btn-primary btn-sm"
              onClick={handleLoginClick}
            >
              Connexion
            </button>
            <button 
              type="button" 
              className="btn btn-secondary btn-sm" 
              style={{ marginLeft: '10px' }}
              onClick={handleSignupClick}
            >
              Inscription
            </button>
          </>
        ) : (
          isAuthenticated && (
            <button 
              type="button" 
              className="btn btn-danger btn-sm"
              onClick={handleLogoutClick}
            >
              Déconnexion
            </button>
          )
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="header" style={headerStyle}>
        <h1 style={titleStyle}>AUTOECO</h1>
        <AuthButton />
      </div>
      <div className="content">
        {props.children}
      </div>
    </div>
  );
};

export default DefaultLayout;




// src/components/DefaultLayout.js VERSION QUI MARCHE 

// import React from 'react';

// // Définition du composant fonctionnel DefaultLayout
// const DefaultLayout = (props) => {
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
//     return (
//       <div>
//         {/* Bouton de connexion */}
//         <button 
//           type="button" 
//           className="btn btn-primary btn-sm"
//         >
//           Connexion
//         </button>
//         {/* Bouton d'inscription */}
//         <button 
//           type="button" 
//           className="btn btn-secondary btn-sm" 
//           style={{ marginLeft: '10px' }} // Espacement entre les deux boutons
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
