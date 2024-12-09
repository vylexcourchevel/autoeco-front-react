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
    console.log('Déconnexion simulée - Pas de requête de logout côté serveur');
    dispatch(logout());
    navigate('/'); // Redirige vers la page d'accueil après "déconnexion"
    console.log('Utilisateur redirigé vers la page d\'accueil');
  };

  // Fonctions pour naviguer vers différentes pages
  const handleLoginClick = () => navigate('/login');
  const handleSignupClick = () => navigate('/register');

  // Vérification si l'utilisateur est sur la page de login
  const isLoginPage = location.pathname === '/login';

  // Vérification si l'utilisateur est sur des pages spécifiques
  const isAdminPage = location.pathname === '/admin';
  const isAdminBoardPage = location.pathname === '/adminboard';
  const isActivityPage = location.pathname === '/activity';

  return (
    <div>
      {/* Si l'utilisateur est connecté et qu'il n'est pas sur la page de login */}
      {isAuthenticated && !isLoginPage && (
        <div>
          {/* Si l'utilisateur est un administrateur */}
          {isAdmin && (
            <>
              {/* Afficher le bouton "Liste des véhicules" uniquement si l'utilisateur n'est pas sur la page /admin */}
              {!isAdminPage && (
                <button type="button" className="btn btn-primary btn-sm" onClick={() => navigate('/admin')}>
                  Liste des véhicules
                </button>
              )}
              {/* Afficher le bouton "Tableau de bord" uniquement si l'utilisateur n'est pas sur la page /adminboard */}
              {!isAdminBoardPage && (
                <button type="button" className="btn btn-warning btn-sm" style={{ marginLeft: '10px' }} onClick={() => navigate('/adminboard')}>
                  Tableau de bord
                </button>
              )}
              {/* Afficher le bouton "Activité" uniquement si l'utilisateur n'est pas sur la page /activity */}
              {!isActivityPage && (
                <button type="button" className="btn btn-info btn-sm" style={{ marginLeft: '10px' }} onClick={() => navigate('/activity')}>
                  Activité
                </button>
              )}
            </>
          )}

          {/* Bouton de déconnexion pour les utilisateurs authentifiés */}
          <button type="button" className="btn btn-danger btn-sm" style={{ marginLeft: '10px' }} onClick={handleLogoutClick}>
            Déconnexion
          </button>
        </div>
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

      {/* Si l'utilisateur est sur la page de login */}
      {isLoginPage && (
        <button type="button" className="btn btn-danger btn-sm" onClick={handleLogoutClick}>
          Déconnexion
        </button>
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
//     console.log('Déconnexion simulée - Pas de requête de logout côté serveur');
//     dispatch(logout());
//     navigate('/'); // Redirige vers la page d'accueil après "déconnexion"
//     console.log('Utilisateur redirigé vers la page d\'accueil');
//   };

//   // Fonctions pour naviguer vers différentes pages
//   const handleLoginClick = () => navigate('/login');
//   const handleSignupClick = () => navigate('/register');

//   // Vérification si l'utilisateur est sur la page de login
//   const isLoginPage = location.pathname === '/login';

//   // Vérification si l'utilisateur est sur la page /admin
//   const isAdminPage = location.pathname === '/admin';

//   // Vérification si l'utilisateur est sur la page /adminboard
//   const isAdminBoardPage = location.pathname === '/adminboard';

//   return (
//     <div>
//       {/* Si l'utilisateur est connecté et qu'il n'est pas sur la page de login */}
//       {isAuthenticated && !isLoginPage && (
//         <div>
//           {/* Si l'utilisateur est un administrateur */}
//           {isAdmin && (
//             <>
//               {/* Afficher le bouton "Liste des véhicules" uniquement si l'utilisateur n'est pas sur la page /admin */}
//               {!isAdminPage && (
//                 <button type="button" className="btn btn-primary btn-sm" onClick={() => navigate('/admin')}>
//                   Liste des véhicules
//                 </button>
//               )}
//               {/* Afficher le bouton "Tableau de bord" uniquement si l'utilisateur n'est pas sur la page /adminboard */}
//               {!isAdminBoardPage && (
//                 <button type="button" className="btn btn-warning btn-sm" style={{ marginLeft: '10px' }} onClick={() => navigate('/adminboard')}>
//                   Tableau de bord
//                 </button>
//               )}
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

//       {/* Si l'utilisateur est sur la page de login */}
//       {isLoginPage && (
//         <button type="button" className="btn btn-danger btn-sm" onClick={handleLogoutClick}>
//           Déconnexion
//         </button>
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
//     console.log('Déconnexion simulée - Pas de requête de logout côté serveur');
//     dispatch(logout()); // Déconnexion dans Redux (peut être supprimé si tu veux garder l'état)
//     navigate('/'); // Redirige vers la page d'accueil après "déconnexion"
//     console.log('Utilisateur redirigé vers la page d\'accueil');
//   };

//   // Fonctions pour naviguer vers différentes pages
//   const handleLoginClick = () => navigate('/login');
//   const handleSignupClick = () => navigate('/register'); // Redirection vers la page /register

//   // Vérification si l'utilisateur est sur la page de login
//   const isLoginPage = location.pathname === '/login';

//   // Vérification si l'utilisateur est sur la page /admin
//   const isAdminPage = location.pathname === '/admin';

//   return (
//     <div>
//       {/* Si l'utilisateur est connecté et qu'il n'est pas sur la page de login */}
//       {isAuthenticated && !isLoginPage && (
//         <div>
//           {/* Si l'utilisateur est un administrateur */}
//           {isAdmin && (
//             <>
//               {/* Afficher le bouton "Liste des véhicules" uniquement si l'utilisateur n'est pas sur la page /admin */}
//               {!isAdminPage && (
//                 <button type="button" className="btn btn-primary btn-sm" onClick={() => navigate('/admin')}>
//                   Liste des véhicules
//                 </button>
//               )}
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

//       {/* Si l'utilisateur est sur la page de login */}
//       {isLoginPage && (
//         <button type="button" className="btn btn-danger btn-sm" onClick={handleLogoutClick}>
//           Déconnexion
//         </button>
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
//     // Ici, on va simplement rediriger sans supprimer le token localement
//     // Ceci empêche la déconnexion du côté serveur
//     // Le token dans les cookies ou localStorage restera actif
//     console.log('Déconnexion simulée - Pas de requête de logout côté serveur');
    
//     // Aucune suppression de cookies ou nettoyage du state, on garde l'utilisateur logué
//     dispatch(logout()); // Cette ligne peut être supprimée si vous ne souhaitez pas changer l'état Redux local
//     navigate('/'); // Redirige vers la page d'accueil après "déconnexion"
//     console.log('Utilisateur redirigé vers la page d\'accueil');
//   };

//   // Fonctions pour naviguer vers différentes pages
//   const handleLoginClick = () => navigate('/login');
//   const handleSignupClick = () => navigate('/register'); // Redirection vers la page /register

//   // Vérification si l'utilisateur est sur la page de login
//   const isLoginPage = location.pathname === '/login';

//   return (
//     <div>
//       {/* Si l'utilisateur est connecté et qu'il n'est pas sur la page de login */}
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

//       {/* Si l'utilisateur est sur la page de login */}
//       {isLoginPage && (
//         <button type="button" className="btn btn-danger btn-sm" onClick={handleLogoutClick}>
//           Déconnexion
//         </button>
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
//     // Ici, on va simplement rediriger sans supprimer le token localement
//     // Ceci empêche la déconnexion du côté serveur
//     // Le token dans les cookies ou localStorage restera actif
//     console.log('Déconnexion simulée - Pas de requête de logout côté serveur');
    
//     // Aucune suppression de cookies ou nettoyage du state, on garde l'utilisateur logué
//     dispatch(logout()); // Cette ligne peut être supprimée si vous ne souhaitez pas changer l'état Redux local
//     navigate('/'); // Redirige vers la page d'accueil après "déconnexion"
//     console.log('Utilisateur redirigé vers la page d\'accueil');
//   };

//   // Fonctions pour naviguer vers différentes pages
//   const handleLoginClick = () => navigate('/login');
//   const handleSignupClick = () => navigate('/register'); // Redirection vers la page /register

//   // Vérification si l'utilisateur est sur la page de login
//   const isLoginPage = location.pathname === '/login';

//   return (
//     <div>
//       {/* Si l'utilisateur est connecté et qu'il n'est pas sur la page de login */}
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

//       {/* Si l'utilisateur est sur la page de login */}
//       {isLoginPage && (
//         <button type="button" className="btn btn-danger btn-sm" onClick={handleLogoutClick}>
//           Déconnexion
//         </button>
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
//   const handleSignupClick = () => navigate('/register'); // Redirection vers la page /register

//   // Vérification si l'utilisateur est sur la page de login
//   const isLoginPage = location.pathname === '/login';

//   return (
//     <div>
//       {/* Si l'utilisateur est connecté et qu'il n'est pas sur la page de login */}
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

//       {/* Si l'utilisateur est sur la page de login */}
//       {isLoginPage && (
//         <button type="button" className="btn btn-danger btn-sm" onClick={handleLogoutClick}>
//           Déconnexion
//         </button>
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

