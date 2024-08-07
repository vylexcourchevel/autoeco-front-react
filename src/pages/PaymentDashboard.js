import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // Importez axios

const Payment = () => {
  const [car, setCar] = useState(null); // État pour stocker les informations de la voiture
  const { carId } = useParams(); // Récupère l'ID de la voiture depuis l'URL
  const [startDate, setStartDate] = useState(null); // État pour stocker la date de début
  const [endDate, setEndDate] = useState(null); // État pour stocker la date de fin

  // Utilisation de useEffect pour récupérer les informations de la voiture lorsque le composant se monte
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`http://localhost:8002/api/cars/${carId}`); // Appel API pour récupérer les données de la voiture
        console.log('Fetched car data:', response.data); // Log des données récupérées
        setCar(response.data); // Mise à jour de l'état avec les données de la voiture
      } catch (error) {
        console.error('Error fetching car:', error); // Log en cas d'erreur
      }
    };

    fetchCar();
  }, [carId]); // Dépendance à carId pour ré-exécuter l'effet lorsque carId change

  // Log the car object to see if it's correctly set
  console.log('Car details:', car);

  // Si les données de la voiture ne sont pas disponibles, afficher un message d'erreur
  if (!car) {
    console.error('No car information available.'); // Log en cas d'absence de données
    return <p>Aucune information sur la voiture disponible.</p>;
  }

  // Déterminer l'URL de l'image de la voiture
  const imageURL = car.CarImages && car.CarImages.length > 0
    ? `http://localhost:8002${car.CarImages[0].imageURL}`
    : '/images/default.png';

  // Log the image URL to ensure it's correct
  console.log('Image URL:', imageURL);

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async () => {
    // Vérifie que les dates de début et de fin sont sélectionnées
    if (startDate && endDate) {
      try {
        // Envoie une requête POST au backend avec les dates sélectionnées
        const response = await axios.post('http://localhost:8002/api/reservations/add', {
          startDate,
          endDate,
          CarId: car.id
          // Ajoutez d'autres champs nécessaires pour la réservation
        }, {
          withCredentials: true, // Inclure les cookies avec la requête
        });

        // Traite la réponse du backend
        console.log(response);
      } catch (error) {
        console.error('Error creating reservation:', error); // Log en cas d'erreur
      }
    } else {
      // Alerte l'utilisateur si les dates ne sont pas sélectionnées
      alert('Veuillez sélectionner les dates de début et de fin.');
    }
  };

  return (
    // Div pour centrer le contenu au milieu de la page
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
            {/* Composant DatePicker pour sélectionner la date de début */}
            <DatePicker
              selected={startDate} // Date actuellement sélectionnée
              onChange={(date) => setStartDate(date)} // Met à jour la date de début
              selectsStart // Indique que ce sélecteur est pour la date de début
              startDate={startDate} // La date de début de la plage de dates
              endDate={endDate} // La date de fin de la plage de dates
              placeholderText="Date de début" // Texte d'indication
              className="form-control" // Ajout de classe Bootstrap pour le style
            />
            {/* Composant DatePicker pour sélectionner la date de fin */}
            <DatePicker
              selected={endDate} // Date actuellement sélectionnée
              onChange={(date) => setEndDate(date)} // Met à jour la date de fin
              selectsEnd // Indique que ce sélecteur est pour la date de fin
              startDate={startDate} // La date de début de la plage de dates
              endDate={endDate} // La date de fin de la plage de dates
              minDate={startDate} // La date minimale sélectionnable est la date de début
              placeholderText="Date de fin" // Texte d'indication
              className="form-control mt-2" // Ajout de classe Bootstrap pour le style
            />
            {/* Bouton pour soumettre les dates sélectionnées */}
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

// const Payment = () => {
//   const [car, setCar] = useState(null); // État pour stocker les informations de la voiture
//   const { carId } = useParams(); // Récupère l'ID de la voiture depuis l'URL
//   const [startDate, setStartDate] = useState(null); // État pour stocker la date de début
//   const [endDate, setEndDate] = useState(null); // État pour stocker la date de fin

//   // Utilisation de useEffect pour récupérer les informations de la voiture lorsque le composant se monte
//   useEffect(() => {
//     const fetchCar = async () => {
//       try {
//         const response = await fetch(`http://localhost:8002/api/cars/${carId}`); // Appel API pour récupérer les données de la voiture
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json(); // Convertir la réponse en JSON
//         console.log('Fetched car data:', data); // Log des données récupérées
//         setCar(data); // Mise à jour de l'état avec les données de la voiture
//       } catch (error) {
//         console.error('Error fetching car:', error); // Log en cas d'erreur
//       }
//     };

//     fetchCar();
//   }, [carId]); // Dépendance à carId pour ré-exécuter l'effet lorsque carId change

//   // Log the car object to see if it's correctly set
//   console.log('Car details:', car);

//   // Si les données de la voiture ne sont pas disponibles, afficher un message d'erreur
//   if (!car) {
//     console.error('No car information available.'); // Log en cas d'absence de données
//     return <p>Aucune information sur la voiture disponible.</p>;
//   }

//   // Déterminer l'URL de l'image de la voiture
//   const imageURL = car.CarImages && car.CarImages.length > 0
//     ? `http://localhost:8002${car.CarImages[0].imageURL}`
//     : '/images/default.png';

//   // Log the image URL to ensure it's correct
//   console.log('Image URL:', imageURL);

//   // Fonction pour gérer la soumission du formulaire
//   const handleSubmit = async () => {
//     // Vérifie que les dates de début et de fin sont sélectionnées
//     if (startDate && endDate) {
//       // Envoie une requête POST au backend avec les dates sélectionnées
//       const response = await fetch('http://localhost:8002/api/reservations/add', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           startDate,
//           endDate,
//           CarId: car.id
//           // Ajoutez d'autres champs nécessaires pour la réservation
//         }),
//         credentials: 'include'
//       });
//       // Traite la réponse du backend
//       const data = await response.json();
//       console.log(data);
//     } else {
//       // Alerte l'utilisateur si les dates ne sont pas sélectionnées
//       alert('Veuillez sélectionner les dates de début et de fin.');
//     }
//   };

//   return (
//     // Div pour centrer le contenu au milieu de la page
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
//             <p className="card-text">Disponibilité: {car.available ? 'Yes' : 'No'}</p>
//             {/* Composant DatePicker pour sélectionner la date de début */}
//             <DatePicker
//               selected={startDate} // Date actuellement sélectionnée
//               onChange={(date) => setStartDate(date)} // Met à jour la date de début
//               selectsStart // Indique que ce sélecteur est pour la date de début
//               startDate={startDate} // La date de début de la plage de dates
//               endDate={endDate} // La date de fin de la plage de dates
//               placeholderText="Date de début" // Texte d'indication
//               className="form-control" // Ajout de classe Bootstrap pour le style
//             />
//             {/* Composant DatePicker pour sélectionner la date de fin */}
//             <DatePicker
//               selected={endDate} // Date actuellement sélectionnée
//               onChange={(date) => setEndDate(date)} // Met à jour la date de fin
//               selectsEnd // Indique que ce sélecteur est pour la date de fin
//               startDate={startDate} // La date de début de la plage de dates
//               endDate={endDate} // La date de fin de la plage de dates
//               minDate={startDate} // La date minimale sélectionnable est la date de début
//               placeholderText="Date de fin" // Texte d'indication
//               className="form-control mt-2" // Ajout de classe Bootstrap pour le style
//             />
//             {/* Bouton pour soumettre les dates sélectionnées */}
//             <button onClick={handleSubmit} className="btn btn-primary mt-3">Réserver</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payment;



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Payment = () => {
//   const [car, setCar] = useState(null);
//   const { carId } = useParams();

//   useEffect(() => {
//     const fetchCar = async () => {
//       try {
//         const response = await fetch(`http://localhost:8002/api/cars/${carId}`);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         console.log('Fetched car data:', data); // Log fetched car data
//         setCar(data);
//       } catch (error) {
//         console.error('Error fetching car:', error);
//       }
//     };

//     fetchCar();
//   }, [carId]);

//   // Log the car object to see if it's correctly set
//   console.log('Car details:', car);

//   if (!car) {
//     console.error('No car information available.'); // Error log if car is undefined
//     return <p>Aucune information sur la voiture disponible.</p>;
//   }

//   const imageURL = car.CarImages && car.CarImages.length > 0
//     ? `http://localhost:8002${car.CarImages[0].imageURL}`
//     : '/images/default.png';

//   // Log the image URL to ensure it's correct
//   console.log('Image URL:', imageURL);

//   return (
//     <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//       <div>
        
//         <div className="card" style={{ width: '18rem' }}>
//         <h2 className="text-center">Page de paiement</h2>
//         <p className="text-center">Réservation pour la voiture : {car.brand} {car.model}</p>
//           <img
//             className="card-img-top"
//             src={imageURL}
//             alt={`${car.brand} ${car.model}`}
//           />
//           <div className="card-body">
//             <h5 className="card-title">{car.brand} {car.model}</h5>
//             <p className="card-text">Année: {car.years}</p>
//             <p className="card-text">Prix par jour: {car.pricePerDay} €</p>
//             <p className="card-text">Disponibilité: {car.available ? 'Yes' : 'No'}</p>
//           </div>
//         </div>
//         {/* Ajoutez ici votre formulaire de paiement ou d'autres éléments nécessaires */}
//       </div>
//     </div>
//   );
// };

// export default Payment;



