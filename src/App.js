// src/App.js version TEST

// src/App.js

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { logout } from './redux/reducers/sliceAuth';
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

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Optionally, you can dispatch a logout to clear any potential stale state
    dispatch(logout());
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <DefaultLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/bookingCar" element={<BookingCar />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admincar" element={<AdminCarPage />} />
            <Route path="/reservation" element={<ReservationForm />} />
            <Route path="/payment/:carId" element={<PaymentDashboard />} />
            <Route path="/activity" element={<ActivityDashboard />} />
            <Route path="/adminboard" element={<AdminDashboard />} />
            <Route path="*" element={<Errorpage />} />
          </Routes>
        </DefaultLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;



// // src/App.js version OK

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



