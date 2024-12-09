import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Pour gérer la navigation et récupérer l'emplacement actuel
import { useSelector, useDispatch } from 'react-redux'; // Pour interagir avec l'état global via Redux
import { logout } from '../redux/reducers/sliceAuth'; // Action de déconnexion Redux
import axios from 'axios'; // Pour effectuer des requêtes HTTP

const AuthButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Récupération des informations d'authentification et d'administration dans le state Redux
  const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);

  // Fonction appelée lors du clic sur le bouton de déconnexion
  const handleLogoutClick = async () => {
    try {
      await axios.post(
        process.env.REACT_APP_BACKEND_URL + '/api/users/logout',
        {},
        { withCredentials: true }
      );
      dispatch(logout()); // Déconnexion de l'utilisateur dans Redux
      navigate('/'); // Redirige vers la page d'accueil après déconnexion
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };

  // Fonctions pour naviguer vers différentes pages
  const handleLoginClick = () => navigate('/login');
  const handleSignupClick = () => navigate('/register'); // Redirection vers la page /register

  // Vérification si l'utilisateur est sur la page de login
  const isLoginPage = location.pathname === '/login';

  return (
    <div>
      {/* Bouton de déconnexion affiché uniquement sur la page /login */}
      {isLoginPage && (
        <button type="button" className="btn btn-danger btn-sm" onClick={handleLogoutClick}>
          Déconnexion
        </button>
      )}

      {/* Si l'utilisateur n'est pas connecté et n'est pas sur la page de login */}
      {!isAuthenticated && !isLoginPage && (
        <>
          <button type="button" className="btn btn-primary btn-sm" onClick={handleLoginClick}>
            Connexion
          </button>
          <button type="button" className="btn btn-secondary btn-sm" style={{ marginLeft: '10px' }} onClick={handleSignupClick}>
            Inscription
          </button>
        </>
      )}

      {/* Si l'utilisateur est connecté */}
      {isAuthenticated && !isLoginPage && (
        <div>
          {/* Si l'utilisateur est un administrateur */}
          {isAdmin && (
            <>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => navigate('/admin')}>
                Liste des véhicules
              </button>
              <button type="button" className="btn btn-warning btn-sm" style={{ marginLeft: '10px' }} onClick={() => navigate('/adminboard')}>
                Tableau de bord
              </button>
              <button type="button" className="btn btn-info btn-sm" style={{ marginLeft: '10px' }} onClick={() => navigate('/activity')}>
                Activité
              </button>
            </>
          )}

          {/* Bouton de déconnexion pour les utilisateurs authentifiés */}
          <button type="button" className="btn btn-danger btn-sm" style={{ marginLeft: '10px' }} onClick={handleLogoutClick}>
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthButton;



// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom'; // Pour gérer la navigation et récupérer l'emplacement actuel
// import { useSelector, useDispatch } from 'react-redux'; // Pour interagir avec l'état global via Redux
// import { logout } from '../redux/reducers/sliceAuth'; // Action de déconnexion Redux
// import axios from 'axios'; // Pour effectuer des requêtes HTTP

// const AuthButton = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   // Récupération des informations d'authentification et d'administration dans le state Redux
//   const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);

//   // Fonction appelée lors du clic sur le bouton de déconnexion
//   const handleLogoutClick = async () => {
//     try {
//       await axios.post(
//         process.env.REACT_APP_BACKEND_URL + '/api/users/logout',
//         {},
//         { withCredentials: true }
//       );
//       dispatch(logout()); // Déconnexion de l'utilisateur dans Redux
//       navigate('/'); // Redirige vers la page d'accueil après déconnexion
//     } catch (error) {
//       console.error('Erreur lors de la déconnexion :', error);
//     }
//   };

//   // Fonctions pour naviguer vers différentes pages
//   const handleLoginClick = () => navigate('/login');
//   const handleSignupClick = () => navigate('/register'); // Redirection vers la page /register

//   // Vérification si l'utilisateur est sur la page de login
//   const isLoginPage = location.pathname === '/login';

//   return (
//     <div>
//       {/* Bouton de déconnexion affiché uniquement sur la page /login */}
//       {isLoginPage && (
//         <button type="button" className="btn btn-danger btn-sm" onClick={handleLogoutClick}>
//           Déconnexion
//         </button>
//       )}

//       {/* Si l'utilisateur n'est pas connecté et n'est pas sur la page de login */}
//       {!isAuthenticated && !isLoginPage && (
//         <>
//           <button type="button" className="btn btn-primary btn-sm" onClick={handleLoginClick}>
//             Connexion
//           </button>
//           <button type="button" className="btn btn-secondary btn-sm" style={{ marginLeft: '10px' }} onClick={handleSignupClick}>
//             Inscription
//           </button>
//         </>
//       )}

//       {/* Si l'utilisateur est connecté */}
//       {isAuthenticated && !isLoginPage && (
//         <div>
//           {/* Si l'utilisateur est un administrateur */}
//           {isAdmin && (
//             <>
//               <button type="button" className="btn btn-primary btn-sm" onClick={() => navigate('/admin')}>
//                 Liste des véhicules
//               </button>
//               <button type="button" className="btn btn-warning btn-sm" style={{ marginLeft: '10px' }} onClick={() => navigate('/adminboard')}>
//                 Tableau de bord
//               </button>
//               <button type="button" className="btn btn-info btn-sm" style={{ marginLeft: '10px' }} onClick={() => navigate('/activity')}>
//                 Activité
//               </button>
//             </>
//           )}

//           {/* Bouton de déconnexion pour les utilisateurs authentifiés */}
//           <button type="button" className="btn btn-danger btn-sm" style={{ marginLeft: '10px' }} onClick={handleLogoutClick}>
//             Déconnexion
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AuthButton;


// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom'; // Pour gérer la navigation et récupérer l'emplacement actuel
// import { useSelector, useDispatch } from 'react-redux'; // Pour interagir avec l'état global via Redux
// import { logout } from '../redux/reducers/sliceAuth'; // Action de déconnexion Redux
// import axios from 'axios'; // Pour effectuer des requêtes HTTP

// const AuthButton = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   // Récupération des informations d'authentification et d'administration dans le state Redux
//   const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);

//   // Fonction appelée lors du clic sur le bouton de déconnexion
//   const handleLogoutClick = async () => {
//     try {
//       await axios.post(
//         process.env.REACT_APP_BACKEND_URL + '/api/users/logout',
//         {},
//         { withCredentials: true }
//       );
//       dispatch(logout()); // Déconnexion de l'utilisateur dans Redux
//       navigate('/'); // Redirige vers la page d'accueil après déconnexion
//     } catch (error) {
//       console.error('Erreur lors de la déconnexion :', error);
//     }
//   };

//   // Fonctions pour naviguer vers différentes pages
//   const handleLoginClick = () => navigate('/login');
//   const handleSignupClick = () => navigate('/register');

//   // Vérification si l'utilisateur est sur la page de login
//   const isLoginPage = location.pathname === '/login';

//   return (
//     <div>
//       {/* Bouton de déconnexion affiché uniquement sur la page /login */}
//       {isLoginPage && (
//         <button type="button" className="btn btn-danger btn-sm" onClick={handleLogoutClick}>
//           Déconnexion
//         </button>
//       )}

//       {/* Si l'utilisateur n'est pas connecté et n'est pas sur la page de login */}
//       {!isAuthenticated && !isLoginPage && (
//         <>
//           <button type="button" className="btn btn-primary btn-sm" onClick={handleLoginClick}>
//             Connexion
//           </button>
//           <button type="button" className="btn btn-secondary btn-sm" style={{ marginLeft: '10px' }} onClick={handleSignupClick}>
//             Inscription
//           </button>
//         </>
//       )}

//       {/* Si l'utilisateur est connecté */}
//       {isAuthenticated && !isLoginPage && (
//         <div>
//           {/* Si l'utilisateur est un administrateur */}
//           {isAdmin && (
//             <>
//               <button type="button" className="btn btn-primary btn-sm" onClick={() => navigate('/admin')}>
//                 Liste des véhicules
//               </button>
//               <button type="button" className="btn btn-warning btn-sm" style={{ marginLeft: '10px' }} onClick={() => navigate('/adminboard')}>
//                 Tableau de bord
//               </button>
//               <button type="button" className="btn btn-info btn-sm" style={{ marginLeft: '10px' }} onClick={() => navigate('/activity')}>
//                 Activité
//               </button>
//             </>
//           )}

//           {/* Bouton de déconnexion pour les utilisateurs authentifiés */}
//           <button type="button" className="btn btn-danger btn-sm" style={{ marginLeft: '10px' }} onClick={handleLogoutClick}>
//             Déconnexion
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AuthButton;


// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom'; // Pour gérer la navigation et récupérer l'emplacement actuel
// import { useSelector, useDispatch } from 'react-redux'; // Pour interagir avec l'état global via Redux
// import { logout } from '../redux/reducers/sliceAuth'; // Action de déconnexion Redux
// import axios from 'axios'; // Pour effectuer des requêtes HTTP

// const AuthButton = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   // Récupération des informations d'authentification et d'administration dans le state Redux
//   const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);

//   // Fonction appelée lors du clic sur le bouton de déconnexion
//   const handleLogoutClick = async () => {
//     try {
//       await axios.post(
//         process.env.REACT_APP_BACKEND_URL + '/api/users/logout',
//         {},
//         { withCredentials: true }
//       );
//       dispatch(logout()); // Déconnexion de l'utilisateur dans Redux
//       navigate('/'); // Redirige vers la page d'accueil après déconnexion
//     } catch (error) {
//       console.error('Erreur lors de la déconnexion :', error);
//     }
//   };

//   return (
//     <div>
//       {/* Bouton de déconnexion toujours affiché dans le header */}
//       <button type="button" className="btn btn-danger btn-sm" onClick={handleLogoutClick}>
//         Déconnexion
//       </button>

//       {/* Affiche d'autres boutons si l'utilisateur est authentifié */}
//       {isAuthenticated && (
//         <div>
//           {isAdmin && (
//             <>
//               <button type="button" className="btn btn-primary btn-sm" onClick={() => navigate('/admin')}>
//                 Liste des véhicules
//               </button>
//               <button type="button" className="btn btn-warning btn-sm" style={{ marginLeft: '10px' }} onClick={() => navigate('/adminboard')}>
//                 Tableau de bord
//               </button>
//               <button type="button" className="btn btn-info btn-sm" style={{ marginLeft: '10px' }} onClick={() => navigate('/activity')}>
//                 Activité
//               </button>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AuthButton;



// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom'; // Pour gérer la navigation et récupérer l'emplacement actuel
// import { useSelector, useDispatch } from 'react-redux'; // Pour interagir avec l'état global via Redux
// import { logout } from '../redux/reducers/sliceAuth'; // Action de déconnexion Redux
// import axios from 'axios'; // Pour effectuer des requêtes HTTP

// const AuthButton = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   // Récupération des informations d'authentification et d'administration dans le state Redux
//   const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);

//   // Fonction appelée lors du clic sur le bouton de déconnexion
//   const handleLogoutClick = async () => {
//     try {
//       await axios.post(
//         process.env.REACT_APP_BACKEND_URL + '/api/users/logout',
//         {},
//         { withCredentials: true }
//       );
//       dispatch(logout()); // Déconnexion de l'utilisateur dans Redux
//       navigate('/login'); // Redirige vers la page de login après déconnexion
//     } catch (error) {
//       console.error('Erreur lors de la déconnexion :', error);
//     }
//   };

//   // Fonctions pour naviguer vers différentes pages
//   const handleLoginClick = () => navigate('/login');
//   const handleSignupClick = () => navigate('/register');

//   // Vérification des différentes pages où l'on doit afficher certains boutons
//   const isLoginPage = location.pathname === '/login';

//   return (
//     <div>
//       {/* Si l'utilisateur n'est pas connecté et n'est pas sur la page de login */}
//       {!isAuthenticated && !isLoginPage && (
//         <>
//           <button type="button" className="btn btn-primary btn-sm" onClick={handleLoginClick}>Connexion</button>
//           <button type="button" className="btn btn-secondary btn-sm" style={{ marginLeft: '10px' }} onClick={handleSignupClick}>Inscription</button>
//         </>
//       )}

//       {/* Si l'utilisateur est connecté */}
//       {isAuthenticated && (
//         <div>
//           {/* Si l'utilisateur est un administrateur */}
//           {isAdmin && (
//             <>
//               <button type="button" className="btn btn-primary btn-sm" onClick={() => navigate('/admin')}>Liste des véhicules</button>
//               <button type="button" className="btn btn-warning btn-sm" style={{ marginLeft: '10px' }} onClick={() => navigate('/adminboard')}>Tableau de bord</button>
//               <button type="button" className="btn btn-info btn-sm" style={{ marginLeft: '10px' }} onClick={() => navigate('/activity')}>Activité</button>
//             </>
//           )}

//           {/* Bouton de déconnexion */}
//           <button type="button" className="btn btn-danger btn-sm" style={{ marginLeft: '10px' }} onClick={handleLogoutClick}>Déconnexion</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AuthButton;


// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom'; // Pour gérer la navigation et récupérer l'emplacement actuel
// import { useSelector, useDispatch } from 'react-redux'; // Pour interagir avec l'état global via Redux
// import { logout } from '../redux/reducers/sliceAuth'; // Action de déconnexion Redux
// import axios from 'axios'; // Pour effectuer des requêtes HTTP

// const AuthButton = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   // Récupération des informations d'authentification et d'administration dans le state Redux
//   const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);

//   // Fonction appelée lors du clic sur le bouton de déconnexion
//   const handleLogoutClick = async () => {
//     try {
//       await axios.post(
//         process.env.REACT_APP_BACKEND_URL + '/api/users/logout',
//         {},
//         { withCredentials: true }
//       );
//       dispatch(logout()); // Déconnexion de l'utilisateur dans Redux
//       navigate('/login'); // Redirige vers la page de login après déconnexion
//     } catch (error) {
//       console.error('Erreur lors de la déconnexion :', error);
//     }
//   };

//   // Fonctions pour naviguer vers différentes pages
//   const handleLoginClick = () => navigate('/login');
//   const handleSignupClick = () => navigate('/register');

//   // Vérification des différentes pages où l'on doit afficher certains boutons
//   const isLoginPage = location.pathname === '/login';

//   return (
//     <div>
//       {/* Si l'utilisateur n'est pas connecté et n'est pas sur la page de login */}
//       {!isAuthenticated && !isLoginPage && (
//         <>
//           <button type="button" className="btn btn-primary btn-sm" onClick={handleLoginClick}>Connexion</button>
//           <button type="button" className="btn btn-secondary btn-sm" style={{ marginLeft: '10px' }} onClick={handleSignupClick}>Inscription</button>
//         </>
//       )}

//       {/* Si l'utilisateur est connecté */}
//       {isAuthenticated && (
//         <div>
//           {/* Si l'utilisateur est un administrateur */}
//           {isAdmin && (
//             <>
//               <button type="button" className="btn btn-primary btn-sm" onClick={() => navigate('/admin')}>Liste des véhicules</button>
//               <button type="button" className="btn btn-warning btn-sm" style={{ marginLeft: '10px' }} onClick={() => navigate('/adminboard')}>Tableau de bord</button>
//               <button type="button" className="btn btn-info btn-sm" style={{ marginLeft: '10px' }} onClick={() => navigate('/activity')}>Activité</button>
//             </>
//           )}

//           {/* Bouton de déconnexion */}
//           <button type="button" className="btn btn-danger btn-sm" style={{ marginLeft: '10px' }} onClick={handleLogoutClick}>Déconnexion</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AuthButton;


// // src/components/AuthButton.js
// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom'; // Pour gérer la navigation et récupérer l'emplacement actuel
// import { useSelector, useDispatch } from 'react-redux'; // Pour interagir avec l'état global via Redux
// import { logout } from '../redux/reducers/sliceAuth'; // Action de déconnexion Redux
// import axios from 'axios'; // Pour effectuer des requêtes HTTP

// const AuthButton = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   // Récupération des informations d'authentification et d'administration dans le state Redux
//   const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);

//   // Fonction appelée lors du clic sur le bouton de déconnexion
//   const handleLogoutClick = async () => {
//     try {
//       await axios.post(
//         process.env.REACT_APP_BACKEND_URL + '/api/users/logout',
//         {},
//         { withCredentials: true }
//       );
//       dispatch(logout());
//       navigate('/');
//     } catch (error) {
//       console.error('Erreur lors de la déconnexion :', error);
//     }
//   };

//   // Fonctions pour naviguer vers différentes pages
//   const handleLoginClick = () => navigate('/login');
//   const handleSignupClick = () => navigate('/register');
//   const handleDashboardClick = () => navigate('/adminboard');
//   const handleActivityClick = () => navigate('/activity');
//   const handleVehicleListClick = () => navigate('/admin');

//   // Vérifie si l'utilisateur est sur une page spécifique
//   const isLoginPage = location.pathname === '/login';
//   const isAdminBoard = location.pathname === '/adminboard';

//   // Affichage des boutons selon les conditions
//   if (isAdminBoard) {
//     return (
//       <button
//         type="button"
//         className="btn btn-success btn-sm"
//         onClick={handleVehicleListClick}
//       >
//         Liste des véhicules
//       </button>
//     );
//   }

//   return (
//     <div>
//       {!isAuthenticated && !isLoginPage ? (
//         <>
//           <button
//             type="button"
//             className="btn btn-primary btn-sm"
//             onClick={handleLoginClick}
//           >
//             Connexion
//           </button>
//           <button
//             type="button"
//             className="btn btn-secondary btn-sm"
//             style={{ marginLeft: '10px' }}
//             onClick={handleSignupClick}
//           >
//             Inscription
//           </button>
//         </>
//       ) : (
//         isAuthenticated && (
//           <div>
//             {isAdmin && (
//               <>
//                 <button
//                   type="button"
//                   className="btn btn-primary btn-sm"
//                   onClick={handleDashboardClick}
//                 >
//                   Tableau de bord
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-warning btn-sm"
//                   style={{ marginLeft: '10px' }}
//                   onClick={handleActivityClick}
//                 >
//                   Activité
//                 </button>
//               </>
//             )}
//             <button
//               type="button"
//               className="btn btn-danger btn-sm"
//               style={{ marginLeft: '10px' }}
//               onClick={handleLogoutClick}
//             >
//               Déconnexion
//             </button>
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// export default AuthButton;


// src/components/AuthButton.js VERSION TEST
// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../redux/reducers/sliceAuth';
// import axios from 'axios';

// const AuthButton = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   const handleLogoutClick = async () => {
//     try {
//       await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/users/logout', {}, { withCredentials: true });
//       dispatch(logout());
//       navigate('/');
//     } catch (error) {
//       console.error('Erreur lors de la déconnexion :', error);
//     }
//   };

//   const handleLoginClick = () => navigate('/login');
//   const handleSignupClick = () => navigate('/register');
//   const handleAdminRedirect = () => navigate('/admin');

//   const isLoginPage = location.pathname === '/login';
//   const isAdminBoard = location.pathname === '/adminboard';

//   if (isAdminBoard) {
//     return (
//       <button
//         type="button"
//         className="btn btn-success btn-sm"
//         onClick={handleAdminRedirect}
//       >
//         Liste des véhicules
//       </button>
//     );
//   }

//   return (
//     <div>
//       {!isAuthenticated && !isLoginPage ? (
//         <>
//           <button
//             type="button"
//             className="btn btn-primary btn-sm"
//             onClick={handleLoginClick}
//           >
//             Connexion
//           </button>
//           <button
//             type="button"
//             className="btn btn-secondary btn-sm"
//             style={{ marginLeft: '10px' }}
//             onClick={handleSignupClick}
//           >
//             Inscription
//           </button>
//         </>
//       ) : (
//         isAuthenticated && (
//           <button
//             type="button"
//             className="btn btn-danger btn-sm"
//             onClick={handleLogoutClick}
//           >
//             Déconnexion
//           </button>
//         )
//       )}
//     </div>
//   );
// };

// export default AuthButton;

// 

// 


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
//       await axios.post(process.env.REACT_APP_BACKEND_URL+'/api/users/logout', {}, { withCredentials: true });
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

//   const handleAdminRedirect = () => {
//     navigate('/admin');
//   };

//   const AuthButton = () => {
//     const isLoginPage = location.pathname === '/login';
//     const isAdminBoard = location.pathname === '/adminboard'; // Vérifie si la page actuelle est /adminboard

//     if (isAdminBoard) {
//       return (
//         <button
//           type="button"
//           className="btn btn-success btn-sm"
//           onClick={handleAdminRedirect}
//         >
//           Liste des véhicules
//         </button>
//       );
//     }

//     return (
//       <div>
//         {!isAuthenticated && !isLoginPage ? (
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
//           isAuthenticated && (
//             <button
//               type="button"
//               className="btn btn-danger btn-sm"
//               onClick={handleLogoutClick}
//             >
//               Déconnexion
//             </button>
//           )
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


// // //src/components/AuthButton.js  VERSION TEST bouton déconnexion pour page payement


// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../redux/reducers/sliceAuth';
// import axios from 'axios';

// // Définition du composant fonctionnel DefaultLayout
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

//   // Fonction pour envoyer une requête à l'API pour supprimer le cookie
//   const handleLogoutClick = async () => {
//     try {
//       // Envoi de la requête à l'API pour supprimer le cookie
//       await axios.post(process.env.REACT_APP_BACKEND_URL+'/api/users/logout', {}, { withCredentials: true });

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
//     // Vérifier si l'utilisateur est sur la page de connexion
//     const isLoginPage = location.pathname === '/login';

//     return (
//       <div>
//         {!isAuthenticated && !isLoginPage ? (
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
//           isAuthenticated && (
//             <button 
//               type="button" 
//               className="btn btn-danger btn-sm"
//               onClick={handleLogoutClick}
//             >
//               Déconnexion
//             </button>
//           )
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





// //src/components/AuthButton.js  VERSION OK 

// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../redux/reducers/sliceAuth';
// import axios from 'axios';

// // Définition du composant fonctionnel DefaultLayout
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

//   // Fonction pour envoyer une requête à l'API pour supprimer le cookie
//   const handleLogoutClick = async () => {
//     try {
//       // Envoi de la requête à l'API pour supprimer le cookie
//       await axios.post(process.env.REACT_APP_BACKEND_URL+'/api/users/logout', {}, { withCredentials: true });

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
//     // Vérifier si l'utilisateur est sur la page de connexion
//     const isLoginPage = location.pathname === '/login';

//     return (
//       <div>
//         {!isAuthenticated && !isLoginPage ? (
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
//           isAuthenticated && (
//             <button 
//               type="button" 
//               className="btn btn-danger btn-sm"
//               onClick={handleLogoutClick}
//             >
//               Déconnexion
//             </button>
//           )
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
