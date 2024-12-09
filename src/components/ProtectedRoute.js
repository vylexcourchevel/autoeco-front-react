
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, allowedForAdminOnly }) => {
  const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);

  // Si l'utilisateur n'est pas authentifié, on le redirige vers la page de connexion
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Si l'utilisateur est authentifié mais tente d'accéder à une page réservée aux admins, on le redirige vers l'accueil
  if (allowedForAdminOnly && !isAdmin) {
    return <Navigate to="/" />;
  }

  // Si tout est ok, on affiche le composant enfant
  return children;
};

export default ProtectedRoute;


// // src/components/ProtectedRoute.js VERSION OK 

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
