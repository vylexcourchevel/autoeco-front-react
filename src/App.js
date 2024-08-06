import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingCar from './pages/BookingCar';
import  AdminPage from './pages/AdminPage';
import AdminCarPage from './pages/AdminCarPage';
import Errorpage from './pages/Errorpage';
import ReservationForm from './pages/ReservationForm';  
import DefaultLayout from './components/DefaultLayout';
import Payment from './pages/Payment';


function App() {
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
            <Route path="/payment/:carId" element={<Payment />} />
            <Route path="*" element={<Errorpage/>} />
          </Routes>
        </DefaultLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
