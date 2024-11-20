// fichier test avec modiifcation du paiement pour l'intégrer a Stripe :

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

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

  const handleStripePayment = async () => {
    if (startDate && endDate && totalPrice !== null) {
      try {
        // Créer une réservation avant le paiement
        const reservationResponse = await axios.post(
          'http://localhost:8002/api/reservations/add',
          {
            startDate,
            endDate,
            totalPrice,
            CarId: car.id,
          },
          { withCredentials: true }
        );
        // Créer une session Stripe
        const stripeResponse = await axios.post(
          'http://localhost:8002/api/stripe/create-checkout-session',
          {
            carId: car.id,
            totalPrice,
          },
          { withCredentials: true }
        );
        // // Redirection vers Stripe Checkout
        window.location.href = stripeResponse.data.url;
      } catch (error) {
        console.error('Erreur lors du paiement avec Stripe:', error);
      }
    } else {
      alert('Veuillez sélectionner les dates de début et de fin.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div style={{ position: 'relative', width: '100%', maxWidth: '600px' }}>
        <h2 className="text-center mt-5">Page de paiement</h2>
        <p className="text-center">Réservation pour la voiture : {car.brand} {car.model}</p>
        <div className="card" style={{ width: '100%' }}>
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
            <button onClick={handleStripePayment} className="btn btn-primary mt-3">
              Payer avec Stripe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;


// //src/components/Payment.js  OK
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
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
//   const [showConfirmation, setShowConfirmation] = useState(false); // État pour le message de confirmation
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCar = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8002/api/cars/${carId}`);
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
//     if (startDate && endDate && totalPrice !== null) {
//       try {
//         const response = await axios.post('http://localhost:8002/api/reservations/add', {
//           startDate,
//           endDate,
//           totalPrice,
//           CarId: car.id
//         }, {
//           withCredentials: true,
//         });
//         console.log(response);
//         setShowConfirmation(true); // Afficher le message de confirmation

//         // Rediriger après 0,5 secondes
//         setTimeout(() => {
//           navigate('/');
//         }, 500);
//       } catch (error) {
//         console.error('Error creating reservation:', error);
//       }
//     } else {
//       alert('Veuillez sélectionner les dates de début et de fin.');
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//       <div style={{ position: 'relative', width: '100%', maxWidth: '600px' }}>
//         {showConfirmation && (
//           <div
//             className="alert alert-success text-center"
//             role="alert"
//             style={{ position: 'absolute', top: '0', width: '100%' }}
//           >
//             Félicitations, votre réservation a bien été effectuée !
//           </div>
//         )}
//         <h2 className="text-center mt-5">Page de paiement</h2>
//         <p className="text-center">Réservation pour la voiture : {car.brand} {car.model}</p>
//         <div className="card" style={{ width: '100%' }}>
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

