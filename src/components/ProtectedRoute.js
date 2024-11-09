import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, allowedForAdminOnly, allowedForAuthenticatedUsersOnly }) => {
  const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);

  // Autoriser l'accès libre aux pages /login et /register même si l'utilisateur n'est pas authentifié
  const currentPath = window.location.pathname;
  if (currentPath === "/login" || currentPath === "/register") {
    return children;  // Permet l'accès aux pages /login et /register
  }

  // Si l'utilisateur n'est pas authentifié et essaie d'accéder à une page protégée par authentication
  if (allowedForAuthenticatedUsersOnly && !isAuthenticated) {
    return <Navigate to="/login" />;  // Rediriger vers la page de login
  }

  // Si l'utilisateur n'est pas admin mais essaie d'accéder à une page admin, rediriger
  if (allowedForAdminOnly && !isAdmin) {
    return <Navigate to="/" />;  // Rediriger vers la page d'accueil ou une autre page
  }

  // Si l'utilisateur est authentifié et a les droits nécessaires, afficher la page
  return children;
};

export default ProtectedRoute;



// // src/components/ProtectedRoute.js

// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const ProtectedRoute = ({ children, allowedForAdminOnly }) => {
//   const {  isAdmin } = useSelector((state) => state.auth);

  

//   // Si l'utilisateur est authentifié mais tente d'accéder à une page réservée aux admins, on le redirige vers l'accueil
//   if (allowedForAdminOnly && !isAdmin) {
//     return <Navigate to="/" />;
//   }

//   // Si tout est ok, on affiche le composant enfant
//   return children;
// };

// export default ProtectedRoute;

// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { canAccessAdminPages } from '../redux/reducers/sliceAuth';

// const AdminProtectedRoute = ({ component: Component, ...rest }) => {
//   const hasAccess = useSelector(canAccessAdminPages);

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         hasAccess ? <Component {...props} /> : <Redirect to="/not-authorized" />
//       }
//     />
//   );
// };

// export default AdminProtectedRoute;
