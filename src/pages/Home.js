import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Importation des hooks pour interagir avec Redux
import axios from 'axios'; // Bibliothèque pour effectuer des requêtes HTTP
import { useNavigate } from 'react-router-dom'; // Hook pour la navigation entre les pages
import { FETCH_SUCCESS, FETCH_FAILURE } from '../redux/reducers/sliceCar'; // Actions Redux pour gérer le succès ou l'échec de la récupération des voitures
import { getCurrentUser } from "../redux/reducers/sliceAuth"; // Action pour obtenir l'utilisateur actuellement connecté

const Home = () => {
  const dispatch = useDispatch(); // Hook pour dispatcher des actions Redux
  const cars = useSelector((state) => state.car.data); // Sélectionne les données des voitures du store Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Vérifie si l'utilisateur est authentifié
  const navigate = useNavigate(); // Hook pour naviguer entre les routes

  useEffect(() => {
    // Fonction asynchrone pour récupérer les données des voitures
    const fetchCar = async () => {
      console.log('Fetching car data...'); // Log pour indiquer le début de la récupération des données
      try {
        // Effectue une requête GET pour récupérer toutes les voitures depuis l'API
        const { data } = await axios.get("http://localhost:8002/api/cars/all", {
          withCredentials: true // Inclut les cookies dans la requête pour l'authentification
        });
        console.log('Fetched car data:', data); // Log pour afficher les données récupérées
        dispatch(FETCH_SUCCESS(data)); // Dispatch de l'action Redux pour stocker les données des voitures dans le store
      } catch (error) {
        dispatch(FETCH_FAILURE(error.message)); // Dispatch de l'action Redux pour indiquer une erreur lors de la récupération des données
        console.log('Error fetching car data:', error); // Log pour afficher l'erreur
      }
    };

    // Dispatch pour obtenir l'utilisateur actuellement connecté
    dispatch(getCurrentUser());
    // Appelle la fonction pour récupérer les données des voitures
    fetchCar();
  }, [dispatch]); // Le tableau de dépendances inclut "dispatch" pour s'assurer que l'effet est exécuté correctement

  // Fonction pour gérer le clic sur le bouton "Réserver"
  const handleReserveClick = (car) => {
    console.log('Reserve button clicked for car:', car); // Log pour indiquer que le bouton de réservation a été cliqué
    if (isAuthenticated) {
      console.log('User is authenticated, navigating to payment page with car:', car); // Log si l'utilisateur est authentifié
      // Redirection vers la page de paiement en passant l'ID de la voiture dans l'URL
      navigate(`/payment/${car.id}`);
    } else {
      console.log('User is not authenticated, showing alert.'); // Log si l'utilisateur n'est pas authentifié
      alert("Veuillez vous connecter pour réserver une voiture."); // Affiche une alerte si l'utilisateur n'est pas connecté
    }
  };

  return (
    <div className="container">
      <div className="row">
        {cars.length === 0 ? ( // Si aucune voiture n'est disponible, affiche un message
          <p>Aucune voiture disponible</p>
        ) : ( // Sinon, map sur le tableau des voitures pour les afficher
          cars.map((car, index) => (
            <div key={index} className="col-md-4 card-container">
              <div className="card h-100">
                {car.CarImages && car.CarImages.length > 0 ? ( // Affiche l'image de la voiture si disponible
                  <img
                    src={`http://localhost:8002${car.CarImages[0].imageURL}`} // URL de l'image de la voiture
                    className="card-img-top"
                    alt={`${car.brand} ${car.model}`} // Texte alternatif pour l'image
                    style={{ width: '100%', height: 'auto' }}
                  />
                ) : ( // Si aucune image n'est disponible, affiche une image par défaut
                  <img
                    src="/images/default.png"
                    className="card-img-top"
                    alt="Default"
                    style={{ width: '100%', height: 'auto' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{car.brand} {car.model}</h5> {/* Affiche la marque et le modèle de la voiture */}
                  <p className="card-text">Année: {car.years}</p> {/* Affiche l'année de la voiture */}
                  <p className="card-text">Prix par jour: {car.pricePerDay} €</p> {/* Affiche le prix par jour */}
                  <p className="card-text">Disponibilité: {car.available ? 'Yes' : 'No'}</p> {/* Affiche la disponibilité */}
                  {isAuthenticated && ( // Affiche le bouton "Réserver" uniquement si l'utilisateur est connecté
                    <button
                      className="btn btn-primary mt-3"
                      onClick={() => handleReserveClick(car)} // Appelle la fonction de réservation au clic
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

export default Home; // Exporte le composant Home pour l'utiliser dans d'autres parties de l'application




// import React, { useEffect } from 'react'; // Importation des hooks de React
// import { useDispatch, useSelector } from 'react-redux'; // Importation des hooks de Redux
// import axios from 'axios'; // Importation de la librairie axios pour les requêtes HTTP
// import { useNavigate } from 'react-router-dom'; // Importation du hook useNavigate de react-router-dom pour la navigation
// import { FETCH_SUCCESS, FETCH_FAILURE } from '../redux/reducers/sliceCar'; // Importation des actions Redux

// const Home = () => {
//   const dispatch = useDispatch(); // Utilisation du hook useDispatch pour obtenir la fonction de dispatch de Redux
//   const cars = useSelector((state) => state.car.data); // Utilisation du hook useSelector pour accéder aux données des voitures dans le state Redux
//   //const user = useSelector((state) => state.auth.user); // Accès aux informations de l'utilisateur authentifié
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Vérification de l'état d'authentification de l'utilisateur
//   const navigate = useNavigate(); // Utilisation du hook useNavigate pour la navigation

//   useEffect(() => {
//     // Fonction asynchrone pour récupérer les données des voitures
//     const fetchCar = async () => {
//       console.log('Fetching car data...'); // Log avant de commencer la récupération des données
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
//     console.log('Reserve button clicked for car ID:', carId); // Log lorsque le bouton de réservation est cliqué
//     if (isAuthenticated) {
//       console.log('User is authenticated, navigating to payment page...'); // Log si l'utilisateur est authentifié
//       navigate(`/payment/${carId}`); // Redirection vers la page de paiement avec l'ID de la voiture
//     } else {
//       console.log('User is not authenticated, showing alert.'); // Log si l'utilisateur n'est pas authentifié
//       alert("Veuillez vous connecter pour réserver une voiture."); // Alerte si l'utilisateur n'est pas authentifié
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row">
     
//         {cars.length === 0 ? (
//           <p>Aucune voiture disponible</p>
//         ) : (
//           cars.map((car, index) => (
//             <div key={index} className="col-md-4 card-container">
//               <div className="card h-100">
//                 {car.CarImages && car.CarImages.length > 0 ? (
//                   <img
//                     src={`http://localhost:8002${car.CarImages[0].imageURL}`}
//                     className="card-img-top"
//                     alt={`${car.brand} ${car.model}`}
//                     style={{ width: '100%', height: 'auto' }}
//                   />
//                 ) : (
//                   <img
//                     src="/images/default.png"
//                     className="card-img-top"
//                     alt="Default"
//                     style={{ width: '100%', height: 'auto' }}
//                   />
//                 )}
//                 <div className="card-body">
//                   <h5 className="card-title">{car.brand} {car.model}</h5>
//                   <p className="card-text">Plaque d'immatriculation: {car.registrationPlate}</p>
//                   <p className="card-text">Année: {car.years}</p>
//                   <p className="card-text">Prix par jour: {car.pricePerDay} €</p>
//                   <p className="card-text">Disponibilité: {car.available ? 'Yes' : 'No'}</p>
//                   {isAuthenticated && (
//                     <button
//                       className="btn btn-primary mt-3"
//                       onClick={() => handleReserveClick(car.id)} // Ajout du bouton "Réserver" avec l'ID de la voiture
//                     >
//                       Réserver
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;


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

