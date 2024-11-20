// src/App.js

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
//import { logout } from './redux/reducers/sliceAuth';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingCar from './pages/BookingCar';
import AdminPage from './pages/AdminPage';
import AdminCarPage from './pages/AdminCarPage';
import Errorpage from './pages/Errorpage';
import ReservationForm from './pages/ReservationForm';
import DefaultLayout from './components/DefaultLayout';
import PaymentDashboard from './pages/PaymentDashboard';
import ActivityDashboard from './pages/ActivityDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ResetPasswordPage from './pages/ResetPasswordPage';
import BasketStripe from './pages/PageBasket/BasketStripe';


//PAGES COMPONENTS 

import BasketStripeCheckout from './pages/PageBasket/BasketStripe';
import Success from './components/stripe/success';
import  Canceled from './components/stripe/canceled'; 

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Supprimer le logout automatique au montage pour ne pas effacer l'état d'authentification
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <DefaultLayout>
          <Routes>
            {/* Route d'accueil accessible à tous */}
            <Route path="/" element={<Home />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/basket" element={<BasketStripe />} />
            <Route path="/checkout" element={<BasketStripeCheckout />} />
            <Route path="/success" element={<success />} />
            <Route path="/canceled" element={<Canceled />} />


            <Route
              path="/register"
              element={
                <ProtectedRoute>
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookingCar"
              element={
                <ProtectedRoute allowedForAuthenticatedUsersOnly={true}>
                  <BookingCar />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedForAdminOnly={true}>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admincar"
              element={
                <ProtectedRoute allowedForAuthenticatedUsersOnly={true}>
                  <AdminCarPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reservation"
              element={
                <ProtectedRoute allowedForAuthenticatedUsersOnly={true}>
                  <ReservationForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment/:carId"
              element={
                <ProtectedRoute allowedForAuthenticatedUsersOnly={true}>
                  <PaymentDashboard  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/activity"
              element={
                <ProtectedRoute allowedForAdminOnly={true}>
                  <ActivityDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/adminboard"
              element={
                <ProtectedRoute allowedForAdminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            {/* Route d'erreur protégée pour les administrateurs */}
            <Route
              path="*"
              element={
                <ProtectedRoute allowedForAdminOnly={true}>
                  <Errorpage />
                </ProtectedRoute>
              }
              
              
            />
          </Routes>
        </DefaultLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;


// // src/App.js

// import './App.css';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { logout } from './redux/reducers/sliceAuth';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import BookingCar from './pages/BookingCar';
// import AdminPage from './pages/AdminPage';
// import AdminCarPage from './pages/AdminCarPage';
// import Errorpage from './pages/Errorpage';
// import ReservationForm from './pages/ReservationForm';
// import DefaultLayout from './components/DefaultLayout';
// import PaymentDashboard from './pages/PaymentDashboard';
// import ActivityDashboard from './pages/ActivityDashboard';
// import AdminDashboard from './pages/AdminDashboard';
// import ProtectedRoute from './components/ProtectedRoute';

// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // Supprimer le logout automatique au montage pour ne pas effacer l'état d'authentification
//   }, [dispatch]);

//   return (
//     <div className="App">
//       <BrowserRouter>
//         <DefaultLayout>
//           <Routes>
//             {/* Route d'accueil accessible à tous */}
//             <Route path="/" element={<Home />} />

//             {/* Routes pour les utilisateurs authentifiés et protégées par ProtectedRoute */}
//             <Route
//               path="/login"
//               element={
//                 <ProtectedRoute>
//                   <Login />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/register"
//               element={
//                 <ProtectedRoute>
//                   <Register />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/bookingCar"
//               element={
//                 <ProtectedRoute>
//                   <BookingCar />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/admin"
//               element={
//                 <ProtectedRoute allowedForAdminOnly={true}>
//                   <AdminPage />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/admincar"
//               element={
//                 <ProtectedRoute allowedForAdminOnly={true}>
//                   <AdminCarPage />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/reservation"
//               element={
//                 <ProtectedRoute>
//                   <ReservationForm />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/payment/:carId"
//               element={
//                 <ProtectedRoute>
//                   <PaymentDashboard />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/activity"
//               element={
//                 <ProtectedRoute allowedForAdminOnly={true}>
//                   <ActivityDashboard />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/adminboard"
//               element={
//                 <ProtectedRoute allowedForAdminOnly={true}>
//                   <AdminDashboard />
//                 </ProtectedRoute>
//               }
//             />
//             {/* Route d'erreur protégée pour les administrateurs */}
//             <Route
//               path="*"
//               element={
//                 <ProtectedRoute allowedForAdminOnly={true}>
//                   <Errorpage />
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </DefaultLayout>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

// // src/App.js

// import './App.css';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { logout } from './redux/reducers/sliceAuth';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import BookingCar from './pages/BookingCar';
// import AdminPage from './pages/AdminPage';
// import AdminCarPage from './pages/AdminCarPage';
// import Errorpage from './pages/Errorpage';
// import ReservationForm from './pages/ReservationForm';
// import DefaultLayout from './components/DefaultLayout';
// import PaymentDashboard from './pages/PaymentDashboard';
// import ActivityDashboard from './pages/ActivityDashboard';
// import AdminDashboard from './pages/AdminDashboard';
// import AdminProtectedRoute from './components/AdminProtectedRoute';

// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(logout());
//   }, [dispatch]);

//   return (
//     <div className="App">
//       <BrowserRouter>
//         <DefaultLayout>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/bookingCar" element={<BookingCar />} />
//             <Route path="/admin" element={<AdminPage />} />
//             <Route path="/admincar" element={<AdminCarPage />} />
//             <Route path="/reservation" element={<ReservationForm />} />
//             <Route path="/payment/:carId" element={<PaymentDashboard />} />
//             <Route path="/activity" element={<ActivityDashboard />} />
//             {/* Routes protégées par AdminProtectedRoute */}
//             <Route
//               path="/adminboard"
//               element={
//                 <AdminProtectedRoute>
//                   <AdminDashboard />
//                 </AdminProtectedRoute>
//               }
//             />
//             <Route
//               path="*"
//               element={
//                 <AdminProtectedRoute>
//                   <Errorpage />
//                 </AdminProtectedRoute>
//               }
//             />
//           </Routes>
//         </DefaultLayout>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;


// // src/App.js version OK

// // src/App.js

// import './App.css';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { logout } from './redux/reducers/sliceAuth';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import BookingCar from './pages/BookingCar';
// import AdminPage from './pages/AdminPage';
// import AdminCarPage from './pages/AdminCarPage';
// import Errorpage from './pages/Errorpage';
// import ReservationForm from './pages/ReservationForm';
// import DefaultLayout from './components/DefaultLayout';
// import PaymentDashboard from './pages/PaymentDashboard';
// import ActivityDashboard from './pages/ActivityDashboard';
// import AdminDashboard from './pages/AdminDashboard';

// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // Optionally, you can dispatch a logout to clear any potential stale state
//     dispatch(logout());
//   }, [dispatch]);

//   return (
//     <div className="App">
//       <BrowserRouter>
//         <DefaultLayout>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/bookingCar" element={<BookingCar />} />
//             <Route path="/admin" element={<AdminPage />} />
//             <Route path="/admincar" element={<AdminCarPage />} />
//             <Route path="/reservation" element={<ReservationForm />} />
//             <Route path="/payment/:carId" element={<PaymentDashboard />} />
//             <Route path="/activity" element={<ActivityDashboard />} />
//             <Route path="/adminboard" element={<AdminDashboard />} />
//             <Route path="*" element={<Errorpage />} />
//           </Routes>
//         </DefaultLayout>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;



// src/App.js version OK

// import './App.css';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { logout } from './redux/reducers/sliceAuth'; // Assurez-vous que ce chemin est correct
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import BookingCar from './pages/BookingCar';
// import AdminPage from './pages/AdminPage';
// import AdminCarPage from './pages/AdminCarPage';
// import Errorpage from './pages/Errorpage';
// import ReservationForm from './pages/ReservationForm';
// import DefaultLayout from './components/DefaultLayout';
// import PaymentDashboard from './pages/PaymentDashboard';
// import ActivityDashboard from './pages/ActivityDashboard';
// import AdminDashboard from './pages/AdminDashboard';  

// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // Déconnecter l'utilisateur lors du chargement initial
//     dispatch(logout());
//   }, [dispatch]);

//   return (
//     <div className="App">
//       <BrowserRouter>
//         <DefaultLayout>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/bookingCar" element={<BookingCar />} />
//             <Route path="/admin" element={<AdminPage />} />
//             <Route path="/admincar" element={<AdminCarPage />} />
//             <Route path="/reservation" element={<ReservationForm />} />
//             <Route path="/payment/:carId" element={<PaymentDashboard />} />
//             <Route path="/activity" element={<ActivityDashboard />} />
//             <Route path="/adminboard" element={<AdminDashboard />} />
//             <Route path="*" element={<Errorpage />} />
//           </Routes>
//         </DefaultLayout>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;



