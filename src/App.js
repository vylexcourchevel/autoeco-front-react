import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingCar from './pages/BookingCar';
import  AdminPage from './pages/AdminPage';
import AdminCarPage from './pages/AdminCarPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/bookingCar" element={<BookingCar />} />
          <Route path="*" element={<Home />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admincar" element={<AdminCarPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
