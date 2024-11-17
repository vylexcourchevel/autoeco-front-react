// src/components/Payment.js  TEST modification handleSubmit pour avoir le carDetail 
import React, { useEffect, useState } from 'react';  // Importation des hooks React pour gérer l'état et les effets
import { useParams, useNavigate } from 'react-router-dom';  // Importation des hooks pour récupérer les paramètres d'URL et naviguer
import DatePicker from 'react-datepicker';  // Importation du sélecteur de date pour sélectionner les dates de début et de fin
import 'react-datepicker/dist/react-datepicker.css';  // Importation du style pour le sélecteur de date
import 'bootstrap/dist/css/bootstrap.min.css';  // Importation des styles Bootstrap
import axios from 'axios';  // Importation de la bibliothèque Axios pour effectuer des requêtes HTTP



const Payment = () => {
  const [car, setCar] = useState(null);  // État pour stocker les informations sur la voiture
  const { carId } = useParams();  // Récupère l'identifiant de la voiture depuis les paramètres de l'URL
  const [startDate, setStartDate] = useState(null);  // État pour stocker la date de début sélectionnée
  const [endDate, setEndDate] = useState(null);  // État pour stocker la date de fin sélectionnée
  const [totalPrice, setTotalPrice] = useState(null);  // État pour calculer et stocker le prix total
  const [showConfirmation, setShowConfirmation] = useState(false);  // État pour afficher un message de confirmation après la réservation
  const navigate = useNavigate();  // Hook pour rediriger l'utilisateur après la réservation

  useEffect(() => {  // Effet déclenché au montage du composant pour récupérer les détails de la voiture
    const fetchCar = async () => {
      try {
        const response = await axios.get(`http://localhost:8002/api/cars/${carId}`);  // Requête pour obtenir les informations de la voiture par ID
        setCar(response.data);  // Stocke les données de la voiture dans l'état
      } catch (error) {
        console.error('Error fetching car:', error);  // Gestion des erreurs
      }
    };
    fetchCar();  // Appelle la fonction pour récupérer les détails de la voiture
  }, [carId]);  // Dépendance sur carId pour récupérer les informations lorsqu'il change

  useEffect(() => {  // Effet pour calculer le prix total quand les dates de début, de fin ou les données de la voiture changent
    if (startDate && endDate && car) {  // Vérifie que les dates et les informations de la voiture sont présentes
      const diffTime = Math.abs(endDate - startDate);  // Calcule la différence en temps entre les dates
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));  // Convertit la différence en nombre de jours
      const price = diffDays * car.pricePerDay;  // Multiplie par le prix par jour pour obtenir le prix total
      setTotalPrice(price);  // Met à jour l'état du prix total
    }
  }, [startDate, endDate, car]);  // Dépendances sur startDate, endDate, et car pour mettre à jour automatiquement

  if (!car) {  // Si les informations de la voiture ne sont pas encore chargées
    return <p>Aucune information sur la voiture disponible.</p>;  // Message d'attente
  }

  const imageURL = car.CarImages && car.CarImages.length > 0  // URL de l'image de la voiture ou image par défaut
    ? `http://localhost:8002${car.CarImages[0].imageURL}`
    : '/images/default.png';

  const handleSubmit = async () => {  // Fonction pour gérer la soumission de la réservation
    if (startDate && endDate && totalPrice !== null) {  // Vérifie que les dates et le prix sont disponibles
      try {
        const response = await axios.post('http://localhost:8002/api/reservations/add', {  // Requête pour ajouter une réservation
          startDate,  // Date de début de la réservation
          endDate,  // Date de fin de la réservation
          totalPrice,  // Prix total de la réservation
          carDetails: {  // Détails de la voiture
            carId: car.id,
            brand: car.brand,
            model: car.model,
            years: car.years,
            pricePerDay: car.pricePerDay,
            imageURL: imageURL
          }
        }, {
          withCredentials: true,  // Envoie les cookies d'authentification avec la requête
        });
        console.log(response);  // Affiche la réponse en console pour vérification
        setShowConfirmation(true);  // Affiche le message de confirmation
         

        setTimeout(() => {  // Redirection après 0,5 secondes
          navigate('/');
        }, 500);
      } catch (error) {
        console.error('Error creating reservation:', error);  // Affiche une erreur si la réservation échoue
      }
    } else {
      alert('Veuillez sélectionner les dates de début et de fin.');  // Message d'alerte si les dates ne sont pas définies
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>  {/* Centrage vertical et horizontal */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '600px' }}>  {/* Conteneur de la carte de voiture */}
        {showConfirmation && (  // Affiche le message de confirmation en cas de réservation réussie
          <div 
            className="alert alert-success text-center" 
            role="alert"
            style={{ position: 'absolute', top: '0', width: '100%' }}
          >
            Félicitations, votre réservation a bien été effectuée !
          </div>
        )}
        <h2 className="text-center mt-5">Page de paiement</h2>  {/* Titre de la page */}
        <p className="text-center">Réservation pour la voiture : {car.brand} {car.model}</p>  {/* Détails de la voiture */}
        <div className="card" style={{ width: '100%' }}>  {/* Carte contenant les détails de la voiture */}
          <img
            className="card-img-top"
            src={imageURL}
            alt={`${car.brand} ${car.model}`}  // Image de la voiture avec texte alternatif
          />
          <div className="card-body">
            <h5 className="card-title">{car.brand} {car.model}</h5>  {/* Marque et modèle de la voiture */}
            <p className="card-text">Année: {car.years}</p>  {/* Année de fabrication */}
            <p className="card-text">Prix par jour: {car.pricePerDay} €</p>  {/* Prix par jour */}
            <p className="card-text">Disponibilité: {car.available ? 'Oui' : 'Non'}</p>  {/* Disponibilité */}
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}  // Met à jour la date de début
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Date de début"
              className="form-control"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}  // Met à jour la date de fin
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}  // Bloque la sélection des dates antérieures à la date de début
              placeholderText="Date de fin"
              className="form-control mt-2"
            />
            <p className="mt-3">Prix total: {totalPrice !== null ? `${totalPrice} €` : 'Sélectionnez les dates'}</p>  {/* Affiche le prix total */}
            <button onClick={handleSubmit} className="btn btn-primary mt-3">Réserver</button>  {/* Bouton de réservation */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;  // Exporte le composant pour l'utiliser ailleurs dans l'application

// // src/components/Payment.js  TEST modification handleSubmit pour avoir le carDetail 
// import React, { useEffect, useState } from 'react';  // Importation des hooks React pour gérer l'état et les effets
// import { useParams, useNavigate } from 'react-router-dom';  // Importation des hooks pour récupérer les paramètres d'URL et naviguer
// import DatePicker from 'react-datepicker';  // Importation du sélecteur de date pour sélectionner les dates de début et de fin
// import 'react-datepicker/dist/react-datepicker.css';  // Importation du style pour le sélecteur de date
// import 'bootstrap/dist/css/bootstrap.min.css';  // Importation des styles Bootstrap
// import axios from 'axios';  // Importation de la bibliothèque Axios pour effectuer des requêtes HTTP

// const Payment = () => {
//   const [car, setCar] = useState(null);  // État pour stocker les informations sur la voiture
//   const { carId } = useParams();  // Récupère l'identifiant de la voiture depuis les paramètres de l'URL
//   const [startDate, setStartDate] = useState(null);  // État pour stocker la date de début sélectionnée
//   const [endDate, setEndDate] = useState(null);  // État pour stocker la date de fin sélectionnée
//   const [totalPrice, setTotalPrice] = useState(null);  // État pour calculer et stocker le prix total
//   const [showConfirmation, setShowConfirmation] = useState(false);  // État pour afficher un message de confirmation après la réservation
//   const navigate = useNavigate();  // Hook pour rediriger l'utilisateur après la réservation

//   useEffect(() => {  // Effet déclenché au montage du composant pour récupérer les détails de la voiture
//     const fetchCar = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8002/api/cars/${carId}`);  // Requête pour obtenir les informations de la voiture par ID
//         setCar(response.data);  // Stocke les données de la voiture dans l'état
//       } catch (error) {
//         console.error('Error fetching car:', error);  // Gestion des erreurs
//       }
//     };
//     fetchCar();  // Appelle la fonction pour récupérer les détails de la voiture
//   }, [carId]);  // Dépendance sur carId pour récupérer les informations lorsqu'il change

//   useEffect(() => {  // Effet pour calculer le prix total quand les dates de début, de fin ou les données de la voiture changent
//     if (startDate && endDate && car) {  // Vérifie que les dates et les informations de la voiture sont présentes
//       const diffTime = Math.abs(endDate - startDate);  // Calcule la différence en temps entre les dates
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));  // Convertit la différence en nombre de jours
//       const price = diffDays * car.pricePerDay;  // Multiplie par le prix par jour pour obtenir le prix total
//       setTotalPrice(price);  // Met à jour l'état du prix total
//     }
//   }, [startDate, endDate, car]);  // Dépendances sur startDate, endDate, et car pour mettre à jour automatiquement

//   if (!car) {  // Si les informations de la voiture ne sont pas encore chargées
//     return <p>Aucune information sur la voiture disponible.</p>;  // Message d'attente
//   }

//   const imageURL = car.CarImages && car.CarImages.length > 0  // URL de l'image de la voiture ou image par défaut
//     ? `http://localhost:8002${car.CarImages[0].imageURL}`
//     : '/images/default.png';

//   const handleSubmit = async () => {  // Fonction pour gérer la soumission de la réservation
//     if (startDate && endDate && totalPrice !== null) {  // Vérifie que les dates et le prix sont disponibles
//       try {
//         const response = await axios.post('http://localhost:8002/api/reservations/add', {  // Requête pour ajouter une réservation
//           startDate,  // Date de début de la réservation
//           endDate,  // Date de fin de la réservation
//           totalPrice,  // Prix total de la réservation
//           carDetails: {  // Détails de la voiture
//             carId: car.id,
//             brand: car.brand,
//             model: car.model,
//             years: car.years,
//             pricePerDay: car.pricePerDay,
//             imageURL: imageURL
//           }
//         }, {
//           withCredentials: true,  // Envoie les cookies d'authentification avec la requête
//         });
//         console.log(response);  // Affiche la réponse en console pour vérification
//         setShowConfirmation(true);  // Affiche le message de confirmation

//         setTimeout(() => {  // Redirection après 0,5 secondes
//           navigate('/');
//         }, 500);
//       } catch (error) {
//         console.error('Error creating reservation:', error);  // Affiche une erreur si la réservation échoue
//       }
//     } else {
//       alert('Veuillez sélectionner les dates de début et de fin.');  // Message d'alerte si les dates ne sont pas définies
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>  {/* Centrage vertical et horizontal */}
//       <div style={{ position: 'relative', width: '100%', maxWidth: '600px' }}>  {/* Conteneur de la carte de voiture */}
//         {showConfirmation && (  // Affiche le message de confirmation en cas de réservation réussie
//           <div 
//             className="alert alert-success text-center" 
//             role="alert"
//             style={{ position: 'absolute', top: '0', width: '100%' }}
//           >
//             Félicitations, votre réservation a bien été effectuée !
//           </div>
//         )}
//         <h2 className="text-center mt-5">Page de paiement</h2>  {/* Titre de la page */}
//         <p className="text-center">Réservation pour la voiture : {car.brand} {car.model}</p>  {/* Détails de la voiture */}
//         <div className="card" style={{ width: '100%' }}>  {/* Carte contenant les détails de la voiture */}
//           <img
//             className="card-img-top"
//             src={imageURL}
//             alt={`${car.brand} ${car.model}`}  // Image de la voiture avec texte alternatif
//           />
//           <div className="card-body">
//             <h5 className="card-title">{car.brand} {car.model}</h5>  {/* Marque et modèle de la voiture */}
//             <p className="card-text">Année: {car.years}</p>  {/* Année de fabrication */}
//             <p className="card-text">Prix par jour: {car.pricePerDay} €</p>  {/* Prix par jour */}
//             <p className="card-text">Disponibilité: {car.available ? 'Oui' : 'Non'}</p>  {/* Disponibilité */}
//             <DatePicker
//               selected={startDate}
//               onChange={(date) => setStartDate(date)}  // Met à jour la date de début
//               selectsStart
//               startDate={startDate}
//               endDate={endDate}
//               placeholderText="Date de début"
//               className="form-control"
//             />
//             <DatePicker
//               selected={endDate}
//               onChange={(date) => setEndDate(date)}  // Met à jour la date de fin
//               selectsEnd
//               startDate={startDate}
//               endDate={endDate}
//               minDate={startDate}  // Bloque la sélection des dates antérieures à la date de début
//               placeholderText="Date de fin"
//               className="form-control mt-2"
//             />
//             <p className="mt-3">Prix total: {totalPrice !== null ? `${totalPrice} €` : 'Sélectionnez les dates'}</p>  {/* Affiche le prix total */}
//             <button onClick={handleSubmit} className="btn btn-primary mt-3">Réserver</button>  {/* Bouton de réservation */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payment;  // Exporte le composant pour l'utiliser ailleurs dans l'application



// src/components/Payment.js  OK 
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



// // src/components/Payment.js
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

//         // Rediriger après 3 secondes
//         setTimeout(() => {
//           navigate('/');
//         }, 3000);
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
//         {showConfirmation && (
//           <div className="alert alert-success mt-3" role="alert">
//             Félicitation, votre réservation a bien été effectuée !
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Payment;





