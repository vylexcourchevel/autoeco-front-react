
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Pour gérer la navigation
import AuthButton from './AuthButton'; // Importation du composant AuthButton

// Définition du composant DefaultLayout
const DefaultLayout = (props) => {
  const navigate = useNavigate();

  // Définition du style du header
  const headerStyle = {
    backgroundColor: '#343a40', // Couleur de fond gris sombre
    padding: '10px', // Espacement interne
    display: 'flex', // Utilisation de flexbox pour l'alignement
    justifyContent: 'space-between', // Espacement entre les éléments (titre et boutons)
    alignItems: 'center', // Alignement vertical centré
  };

  // Style pour le titre
  const titleStyle = {
    margin: 0, // Pas de marge autour du titre
    color: 'white', // Couleur blanche pour le texte
    cursor: 'pointer', // Ajoute une interactivité au titre
  };

  // Fonction pour rediriger vers l'accueil
  const handleHomeClick = () => navigate('/');

  // Structure du composant DefaultLayout
  return (
    <div>
      {/* En-tête avec le style défini */}
      <div className="header" style={headerStyle}>
        <h1 style={titleStyle} onClick={handleHomeClick}>
          AUTOECO
        </h1>
        <AuthButton /> {/* Intégration du composant AuthButton */}
      </div>
      {/* Contenu principal */}
      <div className="content">{props.children}</div>
    </div>
  );
};

export default DefaultLayout;


// src/components/DefaultLayout.js VERSION TEST
// Ce code définit un composant DefaultLayout qui sert de mise en page générale pour l'application. 
// Il contient un en-tête (header) avec un titre cliquable "AUTOECO" qui redirige vers la page d'accueil, 
// ainsi qu'un composant AuthButton qui affiche un bouton de connexion/déconnexion en fonction de l'état d'authentification de l'utilisateur.

// Le composant utilise useNavigate de react-router-dom pour gérer la navigation entre les pages. 
// Le contenu principal de la page enfant est affiché à l'intérieur du composant via props.children,
// permettant une structure flexible de l'application. En résumé,
// ce composant organise l'affichage de l'en-tête et du contenu principal,
// tout en gérant la navigation et l'authentification de l'utilisateur.

//src/components/DefaultLayout.js

//Définition du composant DefaultLayout

// src/components/DefaultLayout.js VERSION TEST 
// src/components/DefaultLayout.js
// import React from 'react'; 
// import { useNavigate } from 'react-router-dom'; // Pour gérer la navigation
// import AuthButton from './AuthButton'; // Importation du composant AuthButton

// // Définition du composant DefaultLayout
// const DefaultLayout = (props) => {
//   const navigate = useNavigate();

//   // Définition du style du header
//   const headerStyle = {
//     backgroundColor: '#343a40', // Couleur de fond gris sombre
//     padding: '10px', // Espacement interne
//     display: 'flex', // Utilisation de flexbox pour l'alignement
//     justifyContent: 'space-between', // Espacement entre les éléments (titre et boutons)
//     alignItems: 'center', // Alignement vertical centré
//   };

//   // Style pour le titre
//   const titleStyle = {
//     margin: 0, // Pas de marge autour du titre
//     color: 'white', // Couleur blanche pour le texte
//     cursor: 'pointer', // Ajoute une interactivité au titre
//   };

//   // Fonction pour rediriger vers l'accueil
//   const handleHomeClick = () => navigate('/');

//   // Structure du composant DefaultLayout
//   return (
//     <div>
//       {/* En-tête avec le style défini */}
//       <div className="header" style={headerStyle}>
//         <h1 style={titleStyle} onClick={handleHomeClick}>
//           AUTOECO
//         </h1>
//         <AuthButton /> {/* Intégration du composant AuthButton */}
//       </div>
//       {/* Contenu principal */}
//       <div className="content">{props.children}</div>
//     </div>
//   );
// };

// // Exportation du composant DefaultLayout
// export default DefaultLayout;



// src/components/DefaultLayout.js rectification duu bouton ajout "liste des véhicules"  version ok

// // Importation des dépendances React et autres bibliothèques
// import React from 'react'; 
// import { useNavigate, useLocation } from 'react-router-dom'; // Pour gérer la navigation et récupérer l'emplacement actuel
// import { useSelector, useDispatch } from 'react-redux'; // Pour interagir avec l'état global via Redux
// import { logout } from '../redux/reducers/sliceAuth'; // Action de déconnexion Redux
// import axios from 'axios'; // Pour effectuer des requêtes HTTP


// // Définition du composant DefaultLayout
// const DefaultLayout = (props) => {
//   // Hooks pour la navigation, la localisation et l'accès au dispatch Redux
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
  
//   // Récupération des informations d'authentification et d'administration dans le state Redux
//   const { isAuthenticated, isAdmin } = useSelector((state) => state.auth); // `isAdmin` et `isAuthenticated` sont dans l'état global de Redux

//   // Définition du style du header
//   const headerStyle = {
//     backgroundColor: '#343a40', // Couleur de fond gris sombre
//     padding: '10px', // Espacement interne
//     display: 'flex', // Utilisation de flexbox pour l'alignement
//     justifyContent: 'space-between', // Espacement entre les éléments (titre et boutons)
//     alignItems: 'center', // Alignement vertical centré
//   };

//   // Style pour le titre
//   const titleStyle = {
//     margin: 0, // Pas de marge autour du titre
//     color: 'white', // Couleur blanche pour le texte
//   };

//   // Fonction appelée lors du clic sur le bouton de déconnexion
//   const handleLogoutClick = async () => {
//     try {
//       // Requête API pour déconnecter l'utilisateur
//       await axios.post(process.env.REACT_APP_BACKEND_URL+'/api/users/logout', {}, { withCredentials: true });
//       dispatch(logout()); // Déclenchement de l'action Redux pour la déconnexion
//       navigate('/'); // Redirection vers la page d'accueil
//     } catch (error) {
//       console.error('Erreur lors de la déconnexion :', error); // Gestion des erreurs
//     }
//   };

//   // Fonction pour naviguer vers les différentes pages
//   const handleLoginClick = () => navigate('/login');
//   const handleSignupClick = () => navigate('/register');
//   const handleDashboardClick = () => navigate('/adminboard');
//   const handleHomeClick = () => navigate('/');
//   const handleActivityClick = () => navigate('/activity'); // Redirige vers la page Activité
//   const handleVehicleListClick = () => navigate('/admin'); // Redirige vers la page Liste des véhicules

//   // Composant AuthButton qui affiche les boutons en fonction de l'état d'authentification
//   const AuthButton = () => {
//     // Si l'utilisateur est admin et authentifié
//     if (isAuthenticated && isAdmin) {
//       return (
//         <div>
//           <button 
//             type="button" 
//             className="btn btn-secondary btn-sm"
//             onClick={handleHomeClick}
//           >
//             Accueil
//           </button>
//           <button 
//             type="button" 
//             className="btn btn-primary btn-sm" 
//             style={{ marginLeft: '10px' }}
//             onClick={handleDashboardClick}
//           >
//             Tableau de bord
//           </button>
//           {location.pathname === '/activity' ? ( // Vérifie si la page actuelle est '/activity'
//             <button 
//               type="button" 
//               className="btn btn-warning btn-sm" 
//               style={{ marginLeft: '10px' }}
//               onClick={handleVehicleListClick}
//             >
//               Liste des véhicules
//             </button>
//           ) : (
//             <button 
//               type="button" 
//               className="btn btn-info btn-sm"
//               style={{ marginLeft: '10px' }}
//               onClick={handleActivityClick}
//             >
//               Activité
//             </button>
//           )}
//           <button 
//             type="button" 
//             className="btn btn-danger btn-sm"
//             style={{ marginLeft: '10px' }}
//             onClick={handleLogoutClick}
//           >
//             Déconnexion
//           </button>
//         </div>
//       );
//     }

//     // Si l'utilisateur est authentifié mais pas admin, ne rien afficher
//     if (isAuthenticated) {
//       return null; // Pas de boutons supplémentaires pour les utilisateurs non-admin
//     }

//     // Si l'utilisateur n'est pas authentifié, afficher les boutons de connexion et inscription
//     return (
//       <div>
//         <button 
//           type="button" 
//           className="btn btn-primary btn-sm"
//           onClick={handleLoginClick}
//         >
//           Connexion
//         </button>
//         <button 
//           type="button" 
//           className="btn btn-secondary btn-sm" 
//           style={{ marginLeft: '10px' }}
//           onClick={handleSignupClick}
//         >
//           Inscription
//         </button>
//       </div>
//     );
//   };

//   // Structure du composant DefaultLayout
//   return (
//     <div>
//       <div className="header" style={headerStyle}> {/* En-tête avec style */}
//         <h1 style={titleStyle}>AUTOECO</h1> {/* Titre de la page */}
//         <AuthButton /> {/* Affichage des boutons d'authentification selon l'état */}
//       </div>
//       <div className="content">
//         {props.children} {/* Contenu spécifique des pages qui utilisent ce layout */}
//       </div>
//     </div>
//   );
// };

// // Exportation du composant DefaultLayout pour qu'il soit utilisé ailleurs
// export default DefaultLayout;
