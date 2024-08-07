// src/components/Payment.js


// src/components/Payment.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Payment = () => {
  const [car, setCar] = useState(null);
  const { carId } = useParams();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`http://localhost:8002/api/cars/${carId}`);
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car:', error);
      }
    };
    fetchCar();
  }, [carId]);

  useEffect(() => {
    if (startDate && endDate && car) {
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const price = diffDays * car.pricePerDay;
      setTotalPrice(price);
    }
  }, [startDate, endDate, car]);

  if (!car) {
    return <p>Aucune information sur la voiture disponible.</p>;
  }

  const imageURL = car.CarImages && car.CarImages.length > 0
    ? `http://localhost:8002${car.CarImages[0].imageURL}`
    : '/images/default.png';

  const handleSubmit = async () => {
    if (startDate && endDate && totalPrice !== null) {
      try {
        const response = await axios.post('http://localhost:8002/api/reservations/add', {
          startDate,
          endDate,
          totalPrice, // Inclure totalPrice dans la requête
          CarId: car.id
        }, {
          withCredentials: true,
        });
        console.log(response);
      } catch (error) {
        console.error('Error creating reservation:', error);
      }
    } else {
      alert('Veuillez sélectionner les dates de début et de fin.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div>
        <h2 className="text-center">Page de paiement</h2>
        <p className="text-center">Réservation pour la voiture : {car.brand} {car.model}</p>
        <div className="card" style={{ width: '18rem' }}>
          <img
            className="card-img-top"
            src={imageURL}
            alt={`${car.brand} ${car.model}`}
          />
          <div className="card-body">
            <h5 className="card-title">{car.brand} {car.model}</h5>
            <p className="card-text">Année: {car.years}</p>
            <p className="card-text">Prix par jour: {car.pricePerDay} €</p>
            <p className="card-text">Disponibilité: {car.available ? 'Oui' : 'Non'}</p>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Date de début"
              className="form-control"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="Date de fin"
              className="form-control mt-2"
            />
            <p className="mt-3">Prix total: {totalPrice !== null ? `${totalPrice} €` : 'Sélectionnez les dates'}</p>
            <button onClick={handleSubmit} className="btn btn-primary mt-3">Réserver</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';

// const Payment = () => {
//   const [car, setCar] = useState(null);
//   const { carId } = useParams();
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [totalPrice, setTotalPrice] = useState(null);

//   useEffect(() => {
//     const fetchCar = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8002/api/cars/${carId}`);
//         console.log('Fetched car data:', response.data);
//         setCar(response.data);
//       } catch (error) {
//         console.error('Error fetching car:', error);
//       }
//     };
//     fetchCar();
//   }, [carId]);

//   useEffect(() => {
//     if (startDate && endDate && car) {
//       const diffTime = Math.abs(endDate - startDate);
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//       const price = diffDays * car.pricePerDay;
//       setTotalPrice(price);
//     }
//   }, [startDate, endDate, car]);

//   if (!car) {
//     return <p>Aucune information sur la voiture disponible.</p>;
//   }

//   const imageURL = car.CarImages && car.CarImages.length > 0
//     ? `http://localhost:8002${car.CarImages[0].imageURL}`
//     : '/images/default.png';

//   const handleSubmit = async () => {
//     if (startDate && endDate) {
//       try {
//         const response = await axios.post('http://localhost:8002/api/reservations/add', {
//           startDate,
//           endDate,
//           CarId: car.id
//         }, {
//           withCredentials: true,
//         });
//         console.log(response);
//       } catch (error) {
//         console.error('Error creating reservation:', error);
//       }
//     } else {
//       alert('Veuillez sélectionner les dates de début et de fin.');
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//       <div>
//         <h2 className="text-center">Page de paiement</h2>
//         <p className="text-center">Réservation pour la voiture : {car.brand} {car.model}</p>
//         <div className="card" style={{ width: '18rem' }}>
//           <img
//             className="card-img-top"
//             src={imageURL}
//             alt={`${car.brand} ${car.model}`}
//           />
//           <div className="card-body">
//             <h5 className="card-title">{car.brand} {car.model}</h5>
//             <p className="card-text">Année: {car.years}</p>
//             <p className="card-text">Prix par jour: {car.pricePerDay} €</p>
//             <p className="card-text">Disponibilité: {car.available ? 'Oui' : 'Non'}</p>
//             <DatePicker
//               selected={startDate}
//               onChange={(date) => setStartDate(date)}
//               selectsStart
//               startDate={startDate}
//               endDate={endDate}
//               placeholderText="Date de début"
//               className="form-control"
//             />
//             <DatePicker
//               selected={endDate}
//               onChange={(date) => setEndDate(date)}
//               selectsEnd
//               startDate={startDate}
//               endDate={endDate}
//               minDate={startDate}
//               placeholderText="Date de fin"
//               className="form-control mt-2"
//             />
//             <p className="mt-3">Prix total: {totalPrice !== null ? `${totalPrice} €` : 'Sélectionnez les dates'}</p>
//             <button onClick={handleSubmit} className="btn btn-primary mt-3">Réserver</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payment;





