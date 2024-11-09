

// // src/pages/Home.js VERSION OK

import React, { useEffect } from 'react'; // Importation des hooks de React
import { useDispatch, useSelector } from 'react-redux'; // Importation des hooks de Redux
import axios from 'axios'; // Importation de la librairie axios pour les requêtes HTTP
import { useNavigate } from 'react-router-dom'; // Importation du hook useNavigate de react-router-dom pour la navigation
import { FETCH_SUCCESS, FETCH_FAILURE } from '../redux/reducers/sliceCar'; // Importation des actions Redux

const Home = () => {
  const dispatch = useDispatch(); // Utilisation du hook useDispatch pour obtenir la fonction de dispatch de Redux
  const cars = useSelector((state) => state.car.data); // Utilisation du hook useSelector pour accéder aux données des voitures dans le state Redux
  //const user = useSelector((state) => state.auth.user); // Accès aux informations de l'utilisateur authentifié
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Vérification de l'état d'authentification de l'utilisateur
  const navigate = useNavigate(); // Utilisation du hook useNavigate pour la navigation

  useEffect(() => {
    // Fonction asynchrone pour récupérer les données des voitures
    const fetchCar = async () => {
      console.log('Fetching car data...'); // Log avant de commencer la récupération des données
      try {
        const { data } = await axios.get("http://localhost:8002/api/cars/all", {
          withCredentials: true // Inclure les cookies dans la requête
        });
        console.log('Fetched car data:', data); // Affichage des données des voitures dans la console
        dispatch(FETCH_SUCCESS(data)); // Dispatch de l'action FETCH_SUCCESS avec les données des voitures
      } catch (error) {
        dispatch(FETCH_FAILURE(error.message)); // Dispatch de l'action FETCH_FAILURE en cas d'erreur
        console.log('Error fetching car data:', error); // Affichage de l'erreur dans la console
      }
    };

    fetchCar(); // Appel de la fonction fetchCar
  }, [dispatch]); // Dépendance de l'effet à la fonction dispatch

  // Fonction pour gérer le clic sur le bouton "Réserver"
  const handleReserveClick = (carId) => {
    console.log('Reserve button clicked for car ID:', carId); // Log lorsque le bouton de réservation est cliqué
    if (isAuthenticated) {
      console.log('User is authenticated, navigating to payment page...'); // Log si l'utilisateur est authentifié
      navigate(`/payment/${carId}`); // Redirection vers la page de paiement avec l'ID de la voiture
    } else {
      console.log('User is not authenticated, showing alert.'); // Log si l'utilisateur n'est pas authentifié
      alert("Veuillez vous connecter pour réserver une voiture."); // Alerte si l'utilisateur n'est pas authentifié
    }
  };

  return (
    <div className="container">
      <div className="row">
     
        {cars.length === 0 ? (
          <p>Aucune voiture disponible</p>
        ) : (
          cars.map((car, index) => (
            <div key={index} className="col-md-4 card-container">
              <div className="card h-100">
                {car.CarImages && car.CarImages.length > 0 ? (
                  <img
                    src={`http://localhost:8002${car.CarImages[0].imageURL}`}
                    className="card-img-top"
                    alt={`${car.brand} ${car.model}`}
                    style={{ width: '100%', height: 'auto' }}
                  />
                ) : (
                  <img
                    src="/images/default.png"
                    className="card-img-top"
                    alt="Default"
                    style={{ width: '100%', height: 'auto' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{car.brand} {car.model}</h5>
                  <p className="card-text">Plaque d'immatriculation: {car.registrationPlate}</p>
                  <p className="card-text">Année: {car.years}</p>
                  <p className="card-text">Prix par jour: {car.pricePerDay} €</p>
              
                  {isAuthenticated && (
                    <button
                      className="btn btn-primary mt-3"
                      onClick={() => handleReserveClick(car.id)} // Ajout du bouton "Réserver" avec l'ID de la voiture
                    >
                      Réserver
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;


// import React, { useEffect } from 'react'; // Importation des hooks de React
// import { useDispatch, useSelector } from 'react-redux'; // Importation des hooks de Redux
// import axios from 'axios'; // Importation de la librairie axios pour les requêtes HTTP
// import { useNavigate } from 'react-router-dom'; // Importation du hook useNavigate de react-router-dom pour la navigation
// import { FETCH_SUCCESS, FETCH_FAILURE } from '../redux/reducers/sliceCar'; // Importation des actions Redux

// const Home = () => {
//   const dispatch = useDispatch(); // Utilisation du hook useDispatch pour obtenir la fonction de dispatch de Redux
//   const cars = useSelector((state) => state.car.data); // Utilisation du hook useSelector pour accéder aux données des voitures dans le state Redux
//   const user = useSelector((state) => state.auth.user); // Accès aux informations de l'utilisateur authentifié
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Vérification de l'état d'authentification de l'utilisateur
//   const navigate = useNavigate(); // Utilisation du hook useNavigate pour la navigation

//   useEffect(() => {
//     // Fonction asynchrone pour récupérer les données des voitures
//     const fetchCar = async () => {
//       try {
//         const { data } = await axios.get("http://localhost:8002/api/cars/all", {
//           withCredentials: true // Inclure les cookies dans la requête
//         });
//         console.log('Fetched car data:', data); // Affichage des données des voitures dans la console
//         dispatch(FETCH_SUCCESS(data)); // Dispatch de l'action FETCH_SUCCESS avec les données des voitures
//       } catch (error) {
//         dispatch(FETCH_FAILURE(error.message)); // Dispatch de l'action FETCH_FAILURE en cas d'erreur
//         console.log('Error fetching car data:', error); // Affichage de l'erreur dans la console
//       }
//     };

//     fetchCar(); // Appel de la fonction fetchCar
//   }, [dispatch]); // Dépendance de l'effet à la fonction dispatch

//   // Fonction pour gérer le clic sur le bouton "Réserver"
//   const handleReserveClick = (carId) => {
    
//     if (isAuthenticated) {
//       navigate(`/payment/${carId}`); // Redirection vers la page de paiement avec l'ID de la voiture
//     } else {
//       alert("Veuillez vous connecter pour réserver une voiture."); // Alerte si l'utilisateur n'est pas authentifié
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         {isAuthenticated && (
//           <div className="col-12 text-end">
//             <button className="btn btn-primary">Bonjour, {user?.name}</button> {/* Affichage du nom de l'utilisateur authentifié */}
//           </div>
//         )}
//         {cars.map((car, index) => (
//           <div key={index} className="col-md-4 card-container">
//             <div className="card h-100">
//               {car.CarImages && car.CarImages.length > 0 ? (
//                 <img
//                   src={`http://localhost:8002${car.CarImages[0].imageURL}`}
//                   className="card-img-top"
//                   alt={`${car.brand} ${car.model}`}
//                   style={{ width: '100%', height: 'auto' }}
//                 />
//               ) : (
//                 <img
//                   src="/images/default.png"
//                   className="card-img-top"
//                   alt="Default"
//                   style={{ width: '100%', height: 'auto' }}
//                 />
//               )}
//               <div className="card-body">
//                 <h5 className="card-title">{car.brand} {car.model}</h5>
//                 <p className="card-text">Registration Plate: {car.registrationPlate}</p>
//                 <p className="card-text">Year: {car.years}</p>
//                 <p className="card-text">Price per Day: {car.pricePerDay}</p>
//                 <p className="card-text">Available: {car.available ? 'Yes' : 'No'}</p>
//                 {isAuthenticated && (
//                   <button
//                     className="btn btn-primary mt-3"
//                     onClick={() => handleReserveClick(car._id)} // Ajout du bouton "Réserver" avec l'ID de la voiture
//                   >
//                     Réserver
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;

