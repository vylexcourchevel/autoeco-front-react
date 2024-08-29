//src/components/DefaultLayout.js version TEST 
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/reducers/sliceAuth';
import axios from 'axios';

const DefaultLayout = (props) => {
  const navigate = useNavigate();
  const location = useLocation();  // Utilisation de useLocation pour savoir sur quelle page on se trouve
  const dispatch = useDispatch();
  const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);

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

  const handleLogoutClick = async () => {
    try {
      await axios.post('http://localhost:8002/api/users/logout', {}, { withCredentials: true });
      dispatch(logout());
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

  const handleDashboardClick = () => {
    navigate('/adminboard');
  };

  const handleVehiclesListClick = () => {
    navigate('/admin');  // Redirige vers la liste des véhicules
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const AuthButton = () => {
    if (isAuthenticated && isAdmin) {
      return (
        <div>
          {/* Si l'utilisateur est sur la page AdminDashboard, on affiche le bouton "Liste des véhicules" */}
          {location.pathname === '/adminboard' ? (
            <button 
              type="button" 
              className="btn btn-primary btn-sm" 
              onClick={handleVehiclesListClick}
            >
              Liste des véhicules
            </button>
          ) : (
            // Sinon on affiche le bouton "Tableau de bord"
            <button 
              type="button" 
              className="btn btn-primary btn-sm" 
              onClick={handleDashboardClick}
            >
              Tableau de bord
            </button>
          )}
          <button 
            type="button" 
            className="btn btn-danger btn-sm"
            style={{ marginLeft: '10px' }}
            onClick={handleLogoutClick}
          >
            Déconnexion
          </button>
        </div>
      );
    }

    if (isAuthenticated) {
      return (
        <div>
          <button 
            type="button" 
            className="btn btn-secondary btn-sm"
            onClick={handleHomeClick}
          >
            Accueil
          </button>
          <button 
            type="button" 
            className="btn btn-danger btn-sm"
            style={{ marginLeft: '10px' }}
            onClick={handleLogoutClick}
          >
            Déconnexion
          </button>
        </div>
      );
    }

    return (
      <div>
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


// // src/components/DefaultLayout.js

// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../redux/reducers/sliceAuth';
// import axios from 'axios';

// const DefaultLayout = (props) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const { isAuthenticated, isAdmin } = useSelector((state) => state.auth); // Suppose que `isAdmin` est dans le state

//   const headerStyle = {
//     backgroundColor: '#343a40',
//     padding: '10px',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   };

//   const titleStyle = {
//     margin: 0,
//     color: 'white',
//   };

//   const handleLogoutClick = async () => {
//     try {
//       await axios.post('http://localhost:8002/api/users/logout', {}, { withCredentials: true });
//       dispatch(logout());
//       navigate('/');
//     } catch (error) {
//       console.error('Erreur lors de la déconnexion :', error);
//     }
//   };

//   const handleLoginClick = () => {
//     navigate('/login');
//   };

//   const handleSignupClick = () => {
//     navigate('/register');
//   };

//   const handleDashboardClick = () => {
//     navigate('/adminboard');
//   };

//   const handleHomeClick = () => {
//     navigate('/'); // Assurez-vous que la route vers la page d'accueil est correcte
//   };

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

//     // Si l'utilisateur est authentifié mais pas admin
//     if (isAuthenticated) {
//       return null; // Pas de boutons spécifiques pour les utilisateurs normaux
//     }

//     // Si l'utilisateur n'est pas authentifié
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

//   return (
//     <div>
//       <div className="header" style={headerStyle}>
//         <h1 style={titleStyle}>AUTOECO</h1>
//         <AuthButton />
//       </div>
//       <div className="content">
//         {props.children}
//       </div>
//     </div>
//   );
// };

// export default DefaultLayout;



// // src/components/DefaultLayout.js

// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../redux/reducers/sliceAuth';
// import axios from 'axios';

// const DefaultLayout = (props) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const { isAuthenticated, isAdmin } = useSelector((state) => state.auth); // Suppose que `isAdmin` est dans le state

//   const headerStyle = {
//     backgroundColor: '#343a40',
//     padding: '10px',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   };

//   const titleStyle = {
//     margin: 0,
//     color: 'white',
//   };

//   const handleLogoutClick = async () => {
//     try {
//       await axios.post('http://localhost:8002/api/users/logout', {}, { withCredentials: true });
//       dispatch(logout());
//       navigate('/');
//     } catch (error) {
//       console.error('Erreur lors de la déconnexion :', error);
//     }
//   };

//   const handleLoginClick = () => {
//     navigate('/login');
//   };

//   const handleSignupClick = () => {
//     navigate('/register');
//   };

//   const handleDashboardClick = () => {
//     navigate('/adminboard');
//   };

//   const handleHomeClick = () => {
//     navigate('/'); // Assurez-vous que la route vers la page d'accueil est correcte
//   };

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

//     // Si l'utilisateur est authentifié mais pas admin
//     if (isAuthenticated) {
//       return null; // Pas de boutons spécifiques pour les utilisateurs normaux
//     }

//     // Si l'utilisateur n'est pas authentifié
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

//   return (
//     <div>
//       <div className="header" style={headerStyle}>
//         <h1 style={titleStyle}>AUTOECO</h1>
//         <AuthButton />
//       </div>
//       <div className="content">
//         {props.children}
//       </div>
//     </div>
//   );
// };

// export default DefaultLayout;




// // //src/components/DefaultLayout.js VERSION TEST

// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../redux/reducers/sliceAuth';
// import axios from 'axios';

// const DefaultLayout = (props) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const { isAuthenticated, isAdmin } = useSelector((state) => state.auth); // Suppose que `isAdmin` est dans le state

//   const headerStyle = {
//     backgroundColor: '#343a40',
//     padding: '10px',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   };

//   const titleStyle = {
//     margin: 0,
//     color: 'white',
//   };

//   const handleLogoutClick = async () => {
//     try {
//       await axios.post('http://localhost:8002/api/users/logout', {}, { withCredentials: true });
//       dispatch(logout());
//       navigate('/');
//     } catch (error) {
//       console.error('Erreur lors de la déconnexion :', error);
//     }
//   };

//   const handleLoginClick = () => {
//     navigate('/login');
//   };

//   const handleSignupClick = () => {
//     navigate('/register');
//   };

//   const handleDashboardClick = () => {
//     navigate('/adminboard');
//   };

//   const handleHomeClick = () => {
//     navigate('/');
//   };

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

//     // Si l'utilisateur est authentifié mais pas admin
//     if (isAuthenticated) {
//       return null; // Pas de boutons spécifiques pour les utilisateurs normaux
//     }

//     // Si l'utilisateur n'est pas authentifié
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

//   return (
//     <div>
//       <div className="header" style={headerStyle}>
//         <h1 style={titleStyle}>AUTOECO</h1>
//         <AuthButton />
//       </div>
//       <div className="content">
//         {props.children}
//       </div>
//     </div>
//   );
// };

// export default DefaultLayout;


// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../redux/reducers/sliceAuth';
// import axios from 'axios';

// const DefaultLayout = (props) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   const headerStyle = {
//     backgroundColor: '#343a40',
//     padding: '10px',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   };

//   const titleStyle = {
//     margin: 0,
//     color: 'white',
//   };

//   const handleLogoutClick = async () => {
//     try {
//       await axios.post('http://localhost:8002/api/users/logout', {}, { withCredentials: true });
//       dispatch(logout());
//       navigate('/');
//     } catch (error) {
//       console.error('Erreur lors de la déconnexion :', error);
//     }
//   };

//   const handleLoginClick = () => {
//     navigate('/login');
//   };

//   const handleSignupClick = () => {
//     navigate('/register');
//   };

//   const AuthButton = () => {
//     const isLoginPage = location.pathname === '/login';
//     const isAdminDashboard = location.pathname === '/adminboard';
//     const isAdminPage = location.pathname === '/admin'; // Ajout de la vérification pour AdminPage

//     if (isLoginPage || isAdminDashboard || isAdminPage) {
//       return null;
//     }

//     return (
//       <div>
//         {!isAuthenticated ? (
//           <>
//             <button 
//               type="button" 
//               className="btn btn-primary btn-sm"
//               onClick={handleLoginClick}
//             >
//               Connexion
//             </button>
//             <button 
//               type="button" 
//               className="btn btn-secondary btn-sm" 
//               style={{ marginLeft: '10px' }}
//               onClick={handleSignupClick}
//             >
//               Inscription
//             </button>
//           </>
//         ) : (
//           <button 
//             type="button" 
//               className="btn btn-danger btn-sm"
//               onClick={handleLogoutClick}
//           >
//             Déconnexion
//           </button>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div>
//       <div className="header" style={headerStyle}>
//         <h1 style={titleStyle}>AUTOECO</h1>
//         <AuthButton />
//       </div>
//       <div className="content">
//         {props.children}
//       </div>
//     </div>
//   );
// };

// export default DefaultLayout;




// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../redux/reducers/sliceAuth';
// import axios from 'axios';

// const DefaultLayout = (props) => {
//   const navigate = useNavigate();
//   const location = useLocation();  // Récupérer l'emplacement actuel
//   const dispatch = useDispatch();
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   const headerStyle = {
//     backgroundColor: '#343a40',
//     padding: '10px',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   };

//   const titleStyle = {
//     margin: 0,
//     color: 'white',
//   };

//   const handleLogoutClick = async () => {
//     try {
//       await axios.post('http://localhost:8002/api/users/logout', {}, { withCredentials: true });
//       dispatch(logout());
//       navigate('/');
//     } catch (error) {
//       console.error('Erreur lors de la déconnexion :', error);
//     }
//   };

//   const handleLoginClick = () => {
//     navigate('/login');
//   };

//   const handleSignupClick = () => {
//     navigate('/register');
//   };

//   const AuthButton = () => {
//     // Vérifier si l'utilisateur est sur la page de connexion ou sur le tableau de bord administrateur
//     const isLoginPage = location.pathname === '/login';
//     const isAdminDashboard = location.pathname === '/adminboard';


//     // Ne pas afficher les boutons "Connexion" et "Inscription" si on est sur la page de connexion ou sur le tableau de bord administrateur
//     if (isLoginPage || isAdminDashboard) {
//       return null;
//     }

//     return (
//       <div>
//         {!isAuthenticated ? (
//           <>
//             <button 
//               type="button" 
//               className="btn btn-primary btn-sm"
//               onClick={handleLoginClick}
//             >
//               Connexion
//             </button>
//             <button 
//               type="button" 
//               className="btn btn-secondary btn-sm" 
//               style={{ marginLeft: '10px' }}
//               onClick={handleSignupClick}
//             >
//               Inscription
//             </button>
//           </>
//         ) : (
//           <button 
//             type="button" 
//             className="btn btn-danger btn-sm"
//             onClick={handleLogoutClick}
//           >
//             Déconnexion
//           </button>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div>
//       <div className="header" style={headerStyle}>
//         <h1 style={titleStyle}>AUTOECO</h1>
//         <AuthButton />
//       </div>
//       <div className="content">
//         {props.children}
//       </div>
//     </div>
//   );
// };

// export default DefaultLayout;


// src/components/DefaultLayout.js

// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../redux/reducers/sliceAuth';
// import axios from 'axios';

// const DefaultLayout = (props) => {
//   const navigate = useNavigate();
//   const location = useLocation();  // Récupérer l'emplacement actuel
//   const dispatch = useDispatch();
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   const headerStyle = {
//     backgroundColor: '#343a40',
//     padding: '10px',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   };

//   const titleStyle = {
//     margin: 0,
//     color: 'white',
//   };

//   const handleLogoutClick = async () => {
//     try {
//       await axios.post('http://localhost:8002/api/users/logout', {}, { withCredentials: true });
//       dispatch(logout());
//       navigate('/');
//     } catch (error) {
//       console.error('Erreur lors de la déconnexion :', error);
//     }
//   };

//   const handleLoginClick = () => {
//     navigate('/login');
//   };

//   const handleSignupClick = () => {
//     navigate('/register');
//   };

//   const AuthButton = () => {
//     // Vérifier si l'utilisateur est sur la page de connexion
//     const isLoginPage = location.pathname === '/login';

//     // Ne pas afficher les boutons "Connexion" et "Inscription" si on est sur la page de connexion
//     if (isLoginPage) {
//       return null;
//     }

//     return (
//       <div>
//         {!isAuthenticated ? (
//           <>
//             <button 
//               type="button" 
//               className="btn btn-primary btn-sm"
//               onClick={handleLoginClick}
//             >
//               Connexion
//             </button>
//             <button 
//               type="button" 
//               className="btn btn-secondary btn-sm" 
//               style={{ marginLeft: '10px' }}
//               onClick={handleSignupClick}
//             >
//               Inscription
//             </button>
//           </>
//         ) : (
//           <button 
//             type="button" 
//             className="btn btn-danger btn-sm"
//             onClick={handleLogoutClick}
//           >
//             Déconnexion
//           </button>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div>
//       <div className="header" style={headerStyle}>
//         <h1 style={titleStyle}>AUTOECO</h1>
//         <AuthButton />
//       </div>
//       <div className="content">
//         {props.children}
//       </div>
//     </div>
//   );
// };

// export default DefaultLayout;


// // src/components/DefaultLayout.js

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../redux/reducers/sliceAuth';
// import axios from 'axios';

// // Définition du composant fonctionnel DefaultLayout
// const DefaultLayout = (props) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   const headerStyle = {
//     backgroundColor: '#343a40',
//     padding: '10px',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   };

//   const titleStyle = {
//     margin: 0,
//     color: 'white',
//   };

//   // Fonction pour envoyer une requête à l'API pour supprimer le cookie
//   const handleLogoutClick = async () => {
//     try {
//       // Envoi de la requête à l'API pour supprimer le cookie
//       await axios.post('http://localhost:8002/api/users/logout', {}, { withCredentials: true });

//       // Dispatch de l'action de déconnexion
//       dispatch(logout());

//       // Redirection vers la page d'accueil
//       navigate('/');
//     } catch (error) {
//       console.error('Erreur lors de la déconnexion :', error);
//     }
//   };

//   const handleLoginClick = () => {
//     navigate('/login');
//   };

//   const handleSignupClick = () => {
//     navigate('/register');
//   };

//   const AuthButton = () => {
//     return (
//       <div>
//         {!isAuthenticated ? (
//           <>
//             <button 
//               type="button" 
//               className="btn btn-primary btn-sm"
//               onClick={handleLoginClick}
//             >
//               Connexion
//             </button>
//             <button 
//               type="button" 
//               className="btn btn-secondary btn-sm" 
//               style={{ marginLeft: '10px' }}
//               onClick={handleSignupClick}
//             >
//               Inscription
//             </button>
//           </>
//         ) : (
//           <button 
//             type="button" 
//             className="btn btn-danger btn-sm"
//             onClick={handleLogoutClick}
//           >
//             Déconnexion
//           </button>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div>
//       <div className="header" style={headerStyle}>
//         <h1 style={titleStyle}>AUTOECO</h1>
//         <AuthButton />
//       </div>
//       <div className="content">
//         {props.children}
//       </div>
//     </div>
//   );
// };

// export default DefaultLayout;


// // src/components/DefaultLayout.js

// import React from 'react';
// import { useNavigate } from 'react-router-dom'; // Importation de useNavigate depuis react-router-dom
// import { useSelector, useDispatch } from 'react-redux'; // Importation de useSelector et useDispatch depuis react-redux
// import { logout } from '../redux/reducers/sliceAuth'; // Importation de l'action logout

// // Définition du composant fonctionnel DefaultLayout
// const DefaultLayout = (props) => {
//   const navigate = useNavigate(); // Création de l'objet navigate pour la redirection
//   const dispatch = useDispatch(); // Création de l'objet dispatch pour les actions Redux

//   // Utilisation de useSelector pour accéder au statut d'authentification depuis le store Redux
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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

//     // Fonction pour gérer la déconnexion
//     const handleLogoutClick = () => {
//       dispatch(logout()); // Appel de l'action de déconnexion
//       navigate('/'); // Redirection vers la page d'accueil après la déconnexion
//     };

//     // Retourne les boutons conditionnellement
//     return (
//       <div>
//         {!isAuthenticated ? (
//           <>
//             {/* Bouton de connexion */}
//             <button 
//               type="button" 
//               className="btn btn-primary btn-sm"
//               onClick={handleLoginClick} // Ajout du gestionnaire de clic
//             >
//               Connexion
//             </button>
//             {/* Bouton d'inscription */}
//             <button 
//               type="button" 
//               className="btn btn-secondary btn-sm" 
//               style={{ marginLeft: '10px' }} // Espacement entre les deux boutons
//               onClick={handleSignupClick} // Ajout du gestionnaire de clic
//             >
//               Inscription
//             </button>
//           </>
//         ) : (
//           // Bouton de déconnexion
//           <button 
//             type="button" 
//             className="btn btn-danger btn-sm" // Utilisation d'une couleur différente pour la déconnexion
//             onClick={handleLogoutClick} // Ajout du gestionnaire de clic
//           >
//             Déconnexion
//           </button>
//         )}
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
// import { useSelector } from 'react-redux'; // Importation de useSelector depuis react-redux

// // Définition du composant fonctionnel DefaultLayout
// const DefaultLayout = (props) => {
//   const navigate = useNavigate(); // Création de l'objet navigate pour la redirection

//   // Utilisation de useSelector pour accéder au statut d'authentification depuis le store Redux
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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

//     // Retourne les boutons conditionnellement
//     return (
//       <div>
//         {!isAuthenticated && (
//           <>
//             {/* Bouton de connexion */}
//             <button 
//               type="button" 
//               className="btn btn-primary btn-sm"
//               onClick={handleLoginClick} // Ajout du gestionnaire de clic
//             >
//               Connexion
//             </button>
//             {/* Bouton d'inscription */}
//             <button 
//               type="button" 
//               className="btn btn-secondary btn-sm" 
//               style={{ marginLeft: '10px' }} // Espacement entre les deux boutons
//               onClick={handleSignupClick} // Ajout du gestionnaire de clic
//             >
//               Inscription
//             </button>
//           </>
//         )}
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
//     // Fonction pour gérer la redirection vers la page spécifiée
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


