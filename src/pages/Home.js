// Importation des bibliothèques et composants nécessaires
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Hooks Redux pour la gestion de l'état
import axios from 'axios'; // Bibliothèque pour les requêtes HTTP
import { useNavigate } from 'react-router-dom'; // Permet la navigation entre pages
import { FETCH_SUCCESS, FETCH_FAILURE } from '../redux/reducers/sliceCar'; // Actions Redux
import Footer from '../components/Footer'; // Composant pour le pied de page
import { FaLeaf, FaRecycle } from 'react-icons/fa'; // Icônes utilisées pour la mise en page

// Déclaration du composant Home
const Home = () => {
  const dispatch = useDispatch(); // Initialisation du hook pour envoyer des actions au store Redux
  const cars = useSelector((state) => state.car.data); // Récupération des données des voitures depuis Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Vérifie si l'utilisateur est connecté
  const isAdmin = useSelector((state) => state.auth.isAdmin); // Vérifie si l'utilisateur est un administrateur
  const navigate = useNavigate(); // Hook pour la navigation programmatique

  // Récupération des données des voitures depuis le backend
  useEffect(() => {
    const fetchCar = async () => {
      try {
        // Requête GET pour récupérer les données des voitures
        const { data } = await axios.get(process.env.REACT_APP_BACKEND_URL + "/api/cars/all", {
          withCredentials: true, // Inclut les cookies pour l'authentification
        });
        dispatch(FETCH_SUCCESS(data)); // Mise à jour des données des voitures en cas de succès
      } catch (error) {
        dispatch(FETCH_FAILURE(error.message)); // Envoie une action en cas d'échec
      }
    };
    fetchCar(); // Appel de la fonction pour récupérer les voitures
  }, [dispatch]); // Exécution au montage grâce à useEffect

  // Fonction pour gérer la réservation d'une voiture
  const handleReserveClick = (carId) => {
    if (isAuthenticated) {
      // Si l'utilisateur est connecté, redirige vers la page de paiement
      navigate(`/payment/${carId}`);
    } else {
      // Sinon, affiche une alerte demandant de se connecter
      alert("Veuillez vous connecter pour réserver une voiture.");
    }
  };

  // Structure principale de la page
  return (
    <div className="container my-5"> {/* Conteneur principal */}
      {/* Section de présentation */}
      <div className="p-5 mb-4 bg-light rounded-3 shadow-sm">
        <h1 className="display-4 fw-bold text-primary text-center">
          Bienvenue chez AUTOECO
        </h1>
        <p className="lead text-center">
          Le premier service de location de véhicules écologiques fonctionnant au bioéthanol et au GPL.
        </p>
      </div>

      {/* Section philosophie et valeurs */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-10">
          {/* Carte philosophie */}
          <div className="card mb-4 shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title">Notre philosophie</h5>
              <p className="card-text">
                AUTOECO croit en une mobilité respectueuse de l'environnement tout en restant accessible.
              </p>
            </div>
          </div>

          {/* Carte écologie */}
          <div className="card mb-4 shadow-sm border-0 bg-light">
            <div className="card-body">
              <FaLeaf size={50} color="green" /> {/* Icône feuille */}
              <h5 className="card-title mt-3">Économie et Écologie</h5>
              <p className="card-text">
                Nos véhicules roulent au bioéthanol et au GPL, réduisant ainsi les émissions de CO2.
              </p>
            </div>
          </div>

          {/* Carte véhicules reconditionnés */}
          <div className="card mb-4 shadow-sm border-0">
            <div className="card-body">
              <FaRecycle size={50} color="green" /> {/* Icône recyclage */}
              <h5 className="card-title mt-3">Véhicules reconditionnés</h5>
              <p className="card-text">
                Nos voitures proviennent de processus de reconditionnement, prolongeant leur cycle de vie.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Message d'inscription */}
      <p className="text-primary text-center fw-bold fs-3">
        Pour réserver un véhicule, rien de plus simple : inscrivez vous grace au bouton "Inscription" 
        et connectez vous grace au bouton "Connexion".
      </p>

      {/* Liste des véhicules disponibles */}
      <h2 className="text-center my-4">Véhicules disponibles</h2>
      <div className="row">
        {cars.length === 0 ? ( // Si aucune voiture n'est disponible
          <p className="text-center fs-4">Aucune voiture disponible</p>
        ) : (
          cars.map((car, index) => ( // Parcours des voitures pour les afficher
            <div key={index} className="col-md-4 mb-4">
              <div className="card h-100 shadow-lg">
                {/* Affiche l'image de la voiture ou une image par défaut */}
                {car.CarImages && car.CarImages.length > 0 ? (
                  <img
                    src={process.env.REACT_APP_BACKEND_URL + `${car.CarImages[0].imageURL}`}
                    className="card-img-top"
                    alt={`${car.brand} ${car.model}`}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                ) : (
                  <img
                    src="/images/default.png"
                    className="card-img-top"
                    alt="Default"
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                )}

                {/* Informations sur la voiture */}
                <div className="card-body text-center">
                  <h5 className="card-title">{car.brand} {car.model}</h5>   
                  <p className="card-text">Année: {car.years}</p>
                  <p className="card-text">Prix par jour: {car.pricePerDay} €</p>
                  {/* Affiche un bouton Réserver si l'utilisateur n'est pas admin et est connecté */}
                  {!isAdmin && isAuthenticated && (
                    <button
                      className="btn btn-primary mt-3"
                      onClick={() => handleReserveClick(car.id)}
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

      {/* Pied de page */}
      <Footer />
    </div>
  );
};

// Export du composant pour l'utiliser ailleurs
export default Home;



// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FETCH_SUCCESS, FETCH_FAILURE } from '../redux/reducers/sliceCar';
// import Footer from '../components/Footer'; // Assure-toi que le chemin est correct
// import { FaLeaf, FaRecycle } from 'react-icons/fa'; // Importation des icônes

// const Home = () => {
//   const dispatch = useDispatch();
//   const cars = useSelector((state) => state.car.data);
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const isAdmin = useSelector((state) => state.auth.isAdmin);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCar = async () => {
//       try {
//         const { data } = await axios.get(process.env.REACT_APP_BACKEND_URL+"/api/cars/all", {
//           withCredentials: true
//         });
//         dispatch(FETCH_SUCCESS(data));
//       } catch (error) {
//         dispatch(FETCH_FAILURE(error.message));
//       }
//     };
//     fetchCar();
//   }, [dispatch]);

//   const handleReserveClick = (carId) => {
//     if (isAuthenticated) {
//       navigate(`/payment/${carId}`);
//     } else {
//       alert("Veuillez vous connecter pour réserver une voiture.");
//     }
//   };

//   return (
//     <div className="container my-5">
//       {/* Section de présentation stylisée */}
//       <div className="p-5 mb-4 bg-light rounded-3 shadow-sm">
//         <h1 className="display-4 fw-bold text-primary text-center">Bienvenue chez AUTOECO</h1>
//         <p className="lead text-center">
//           Le premier service de location de véhicules écologiques fonctionnant au bioéthanol et au GPL.
//         </p>
//       </div>

//       {/* Section philosophique avec cards */}
//       <div className="row justify-content-center mb-5">
//         <div className="col-md-10">
//           <div className="card mb-4 shadow-sm border-0">
//             <div className="card-body text-center">
//               <h2 className="text-success mb-3">Chez AUTOECO</h2>
//               <p className="fs-5">
//                 Notre philosophie est de vous apporter des véhicules pratiques en ville, confortables et bon marché.
//               </p>
//             </div>
//           </div>

//           <div className="card mb-4 shadow-sm border-0 bg-light">
//             <div className="card-body text-center">
//               <h2 className="text-primary mb-3">Économies et Écologie</h2>
//               <p className="fs-5">
//                 Tous nos véhicules sont compatibles avec le bioéthanol et le GPL. Ainsi, le prix de votre location sera en moyenne 40% moins cher qu'un véhicule de même catégorie.
//               </p>
//               <FaLeaf size={50} color="green" />
//             </div>
//           </div>

//           <div className="card mb-4 shadow-sm border-0">
//             <div className="card-body text-center">
//               <h2 className="text-warning mb-3">Véhicules Reconditionnés Premium</h2>
//               <p className="fs-5">
//                 Nos véhicules sont issus de véhicules reconditionnés. Vous bénéficiez donc d'un véhicule automatique avec des prestations supérieures par rapport à un véhicule neuf. Une révision annuelle garantit une sécurité optimale.
//               </p>
//               <FaRecycle size={50} color="green" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Titre des véhicules disponibles */}
//       <h2 className="text-center my-4">Véhicules disponibles</h2>

//       {/* Section des cartes de véhicules */}
//       <div className="row">
//         {cars.length === 0 ? (
//           <p className="text-center fs-4">Aucune voiture disponible</p>
//         ) : (
//           cars.map((car, index) => (
//             <div key={index} className="col-md-4 mb-4">
//               <div className="card h-100 shadow-lg">
//                 {car.CarImages && car.CarImages.length > 0 ? (
//                   <img
//                     src={process.env.REACT_APP_BACKEND_URL+`${car.CarImages[0].imageURL}`}
//                     className="card-img-top"
//                     alt={`${car.brand} ${car.model}`}
//                     style={{ width: '100%', height: '200px', objectFit: 'cover' }}
//                   />
//                 ) : (
//                   <img
//                     src="/images/default.png"
//                     className="card-img-top"
//                     alt="Default"
//                     style={{ width: '100%', height: '200px', objectFit: 'cover' }}
//                   />
//                 )}
//                 <div className="card-body text-center">
//                   <h5 className="card-title">{car.brand} {car.model}</h5>
//                   <p className="card-text">Plaque d'immatriculation: {car.registrationPlate}</p>
//                   <p className="card-text">Année: {car.years}</p>
//                   <p className="card-text">Prix par jour: {car.pricePerDay} €</p>
//                   {!isAdmin && isAuthenticated && (
//                     <button
//                       className="btn btn-primary mt-3"
//                       onClick={() => handleReserveClick(car.id)}
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

//       {/* Footer ajouté à la fin */}
//       <Footer />
//     </div>
//   );
// };

// export default Home;


// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FETCH_SUCCESS, FETCH_FAILURE } from '../redux/reducers/sliceCar';
// import Footer from '../components/Footer'; // Importation du Footer
// import { FaLeaf, FaRecycle } from 'react-icons/fa'; // Importation des icônes

// const Home = () => {
//   const dispatch = useDispatch();
//   const cars = useSelector((state) => state.car.data);
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const isAdmin = useSelector((state) => state.auth.isAdmin);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCar = async () => {
//       try {
//         const { data } = await axios.get(process.env.REACT_APP_BACKEND_URL+"/api/cars/all", {
//           withCredentials: true
//         });
//         dispatch(FETCH_SUCCESS(data));
//       } catch (error) {
//         dispatch(FETCH_FAILURE(error.message));
//       }
//     };
//     fetchCar();
//   }, [dispatch]);

//   const handleReserveClick = (carId) => {
//     if (isAuthenticated) {
//       navigate(`/payment/${carId}`);
//     } else {
//       alert("Veuillez vous connecter pour réserver une voiture.");
//     }
//   };

//   return (
//     <div className="container my-5">
//       {/* Section de présentation stylisée */}
//       <div className="p-5 mb-4 bg-light rounded-3 shadow-sm">
//         <h1 className="display-4 fw-bold text-primary text-center">Bienvenue chez AUTOECO</h1>
//         <p className="lead text-center">
//           Le premier service de location de véhicules écologiques fonctionnant au bioéthanol et au GPL.
//         </p>
//       </div>

//       {/* Section philosophique avec cards */}
//       <div className="row justify-content-center mb-5">
//         <div className="col-md-10">
//           {/* Première Card */}
//           <div className="card mb-4 shadow-sm border-0">
//             <div className="card-body text-center">
//               <h2 className="text-success mb-3">Chez AUTOECO</h2>
//               <p className="fs-5">
//                 Notre philosophie est de vous apporter des véhicules pratiques en ville, confortables et bon marché.
//               </p>
//             </div>
//           </div>

//           {/* Deuxième Card */}
//           <div className="card mb-4 shadow-sm border-0 bg-light">
//             <div className="card-body text-center">
//               <h2 className="text-primary mb-3">Économies et Écologie</h2>
//               <p className="fs-5">
//                 Tous nos véhicules sont compatibles avec le bioéthanol et le GPL. Ainsi, le prix de votre location sera en moyenne 40% moins cher qu'un véhicule de même catégorie.
//               </p>
//               <FaLeaf size={50} color="green" className="mt-3" /> {/* Logo écologie */}
//             </div>
//           </div>

//           {/* Troisième Card */}
//           <div className="card mb-4 shadow-sm border-0">
//             <div className="card-body text-center">
//               <h2 className="text-warning mb-3">Véhicules Reconditionnés Premium</h2>
//               <p className="fs-5">
//                 Nos véhicules sont issus de véhicules reconditionnés. Vous bénéficiez donc d'un véhicule automatique avec des prestations supérieures par rapport à un véhicule neuf. Une révision annuelle garantit une sécurité optimale.
//               </p>
//               <FaRecycle size={50} color="green" className="mt-3" /> {/* Logo recyclage */}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Section des cartes de véhicules */}
//       <div className="row">
//         {cars.length === 0 ? (
//           <p className="text-center fs-4">Aucune voiture disponible</p>
//         ) : (
//           cars.map((car, index) => (
//             <div key={index} className="col-md-4 mb-4">
//               <div className="card h-100 shadow-lg">
//                 {car.CarImages && car.CarImages.length > 0 ? (
//                   <img
//                     src={process.env.REACT_APP_BACKEND_URL+`${car.CarImages[0].imageURL}`}
//                     className="card-img-top"
//                     alt={`${car.brand} ${car.model}`}
//                     style={{ width: '100%', height: '200px', objectFit: 'cover' }}
//                   />
//                 ) : (
//                   <img
//                     src="/images/default.png"
//                     className="card-img-top"
//                     alt="Default"
//                     style={{ width: '100%', height: '200px', objectFit: 'cover' }}
//                   />
//                 )}
//                 <div className="card-body">
//                   <h5 className="card-title">{car.brand} {car.model}</h5>
//                   <p className="card-text">Plaque d'immatriculation: {car.registrationPlate}</p>
//                   <p className="card-text">Année: {car.years}</p>
//                   <p className="card-text">Prix par jour: {car.pricePerDay} €</p>
//                   {!isAdmin && isAuthenticated && (
//                     <button
//                       className="btn btn-primary mt-3"
//                       onClick={() => handleReserveClick(car.id)}
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

//       {/* Footer ajouté à la fin */}
//       <Footer />
//     </div>
//   );
// };

// export default Home;


// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FETCH_SUCCESS, FETCH_FAILURE } from '../redux/reducers/sliceCar';
// import Footer from '../components/Footer'; // Importation du Footer

// const Home = () => {
//   const dispatch = useDispatch();
//   const cars = useSelector((state) => state.car.data);
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const isAdmin = useSelector((state) => state.auth.isAdmin);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCar = async () => {
//       try {
//         const { data } = await axios.get(process.env.REACT_APP_BACKEND_URL+"/api/cars/all", {
//           withCredentials: true
//         });
//         dispatch(FETCH_SUCCESS(data));
//       } catch (error) {
//         dispatch(FETCH_FAILURE(error.message));
//       }
//     };
//     fetchCar();
//   }, [dispatch]);

//   const handleReserveClick = (carId) => {
//     if (isAuthenticated) {
//       navigate(`/payment/${carId}`);
//     } else {
//       alert("Veuillez vous connecter pour réserver une voiture.");
//     }
//   };

//   return (
//     <div className="container my-5">
//       {/* Section de présentation stylisée */}
//       <div className="p-5 mb-4 bg-light rounded-3 shadow-sm">
//         <h1 className="display-4 fw-bold text-primary text-center">Bienvenue chez AUTOECO</h1>
//         <p className="lead text-center">
//           Le premier service de location de véhicules écologiques fonctionnant au bioéthanol et au GPL.
//         </p>
//       </div>

//       {/* Section philosophique avec cards */}
//       <div className="row justify-content-center mb-5">
//         <div className="col-md-10">
//           <div className="card mb-4 shadow-sm border-0">
//             <div className="card-body">
//               <h2 className="text-success mb-3">Chez AUTOECO</h2>
//               <p className="fs-5">
//                 Notre philosophie est de vous apporter des véhicules pratiques en ville, confortables et bon marché.
//               </p>
//             </div>
//           </div>

//           <div className="card mb-4 shadow-sm border-0 bg-light">
//             <div className="card-body">
//               <h2 className="text-primary mb-3">Économies et Écologie</h2>
//               <p className="fs-5">
//                 Tous nos véhicules sont compatibles avec le bioéthanol et le GPL. Ainsi, le prix de votre location sera en moyenne 40% moins cher qu'un véhicule de même catégorie.
//               </p>
//             </div>
//           </div>

//           <div className="card mb-4 shadow-sm border-0">
//             <div className="card-body">
//               <h2 className="text-warning mb-3">Véhicules Reconditionnés Premium</h2>
//               <p className="fs-5">
//                 Nos véhicules sont issus de véhicules reconditionnés. Vous bénéficiez donc d'un véhicule automatique avec des prestations supérieures par rapport à un véhicule neuf. Une révision annuelle garantit une sécurité optimale.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Section des cartes de véhicules */}
//       <div className="row">
//         {cars.length === 0 ? (
//           <p className="text-center fs-4">Aucune voiture disponible</p>
//         ) : (
//           cars.map((car, index) => (
//             <div key={index} className="col-md-4 mb-4">
//               <div className="card h-100 shadow-lg">
//                 {car.CarImages && car.CarImages.length > 0 ? (
//                   <img
//                     src={process.env.REACT_APP_BACKEND_URL+`${car.CarImages[0].imageURL}`}
//                     className="card-img-top"
//                     alt={`${car.brand} ${car.model}`}
//                     style={{ width: '100%', height: '200px', objectFit: 'cover' }}
//                   />
//                 ) : (
//                   <img
//                     src="/images/default.png"
//                     className="card-img-top"
//                     alt="Default"
//                     style={{ width: '100%', height: '200px', objectFit: 'cover' }}
//                   />
//                 )}
//                 <div className="card-body">
//                   <h5 className="card-title">{car.brand} {car.model}</h5>
//                   <p className="card-text">Plaque d'immatriculation: {car.registrationPlate}</p>
//                   <p className="card-text">Année: {car.years}</p>
//                   <p className="card-text">Prix par jour: {car.pricePerDay} €</p>
//                   {!isAdmin && isAuthenticated && (
//                     <button
//                       className="btn btn-primary mt-3"
//                       onClick={() => handleReserveClick(car.id)}
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

//       {/* Footer ajouté à la fin */}
//       <Footer />
//     </div>
//   );
// };

// export default Home;


// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FETCH_SUCCESS, FETCH_FAILURE } from '../redux/reducers/sliceCar';

// const Home = () => {
//   const dispatch = useDispatch();
//   const cars = useSelector((state) => state.car.data);
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const isAdmin = useSelector((state) => state.auth.isAdmin);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCar = async () => {
//       try {
//         const { data } = await axios.get(process.env.REACT_APP_BACKEND_URL+"/api/cars/all", {
//           withCredentials: true
//         });
//         dispatch(FETCH_SUCCESS(data));
//       } catch (error) {
//         dispatch(FETCH_FAILURE(error.message));
//       }
//     };
//     fetchCar();
//   }, [dispatch]);

//   const handleReserveClick = (carId) => {
//     if (isAuthenticated) {
//       navigate(`/payment/${carId}`);
//     } else {
//       alert("Veuillez vous connecter pour réserver une voiture.");
//     }
//   };

//   return (
//     <div className="container my-5">
//       {/* Section de présentation stylisée */}
//       <div className="p-5 mb-4 bg-light rounded-3 shadow-sm">
//         <h1 className="display-4 fw-bold text-primary text-center">Bienvenue chez AUTOECO</h1>
//         <p className="lead text-center">
//           Le premier service de location de véhicules écologiques fonctionnant au bioéthanol et au GPL.
//         </p>
//       </div>

//       {/* Section philosophique avec cards */}
//       <div className="row justify-content-center mb-5">
//         <div className="col-md-10">
//           <div className="card mb-4 shadow-sm border-0">
//             <div className="card-body">
//               <h2 className="text-success mb-3">Chez AUTOECO</h2>
//               <p className="fs-5">
//                 Notre philosophie est de vous apporter des véhicules pratiques en ville, confortables et bon marché.
//               </p>
//             </div>
//           </div>

//           <div className="card mb-4 shadow-sm border-0 bg-light">
//             <div className="card-body">
//               <h2 className="text-primary mb-3">Économies et Écologie</h2>
//               <p className="fs-5">
//                 Tous nos véhicules sont compatibles avec le bioéthanol et le GPL. Ainsi, le prix de votre location sera en moyenne 40% moins cher qu'un véhicule de même catégorie.
//               </p>
//             </div>
//           </div>

//           <div className="card mb-4 shadow-sm border-0">
//             <div className="card-body">
//               <h2 className="text-warning mb-3">Véhicules Reconditionnés Premium</h2>
//               <p className="fs-5">
//                 Nos véhicules sont issus de véhicules reconditionnés. Vous bénéficiez donc d'un véhicule automatique avec des prestations supérieures par rapport à un véhicule neuf. Une révision annuelle garantit une sécurité optimale.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Section des cartes de véhicules */}
//       <div className="row">
//         {cars.length === 0 ? (
//           <p className="text-center fs-4">Aucune voiture disponible</p>
//         ) : (
//           cars.map((car, index) => (
//             <div key={index} className="col-md-4 mb-4">
//               <div className="card h-100 shadow-lg">
//                 {car.CarImages && car.CarImages.length > 0 ? (
//                   <img
//                     src={process.env.REACT_APP_BACKEND_URL+`${car.CarImages[0].imageURL}`}
//                     className="card-img-top"
//                     alt={`${car.brand} ${car.model}`}
//                     style={{ width: '100%', height: '200px', objectFit: 'cover' }}
//                   />
//                 ) : (
//                   <img
//                     src="/images/default.png"
//                     className="card-img-top"
//                     alt="Default"
//                     style={{ width: '100%', height: '200px', objectFit: 'cover' }}
//                   />
//                 )}
//                 <div className="card-body">
//                   <h5 className="card-title">{car.brand} {car.model}</h5>
//                   <p className="card-text">Plaque d'immatriculation: {car.registrationPlate}</p>
//                   <p className="card-text">Année: {car.years}</p>
//                   <p className="card-text">Prix par jour: {car.pricePerDay} €</p>
//                   {!isAdmin && isAuthenticated && (
//                     <button
//                       className="btn btn-primary mt-3"
//                       onClick={() => handleReserveClick(car.id)}
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


// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FETCH_SUCCESS, FETCH_FAILURE } from '../redux/reducers/sliceCar';

// const Home = () => {
//   const dispatch = useDispatch();
//   const cars = useSelector((state) => state.car.data);
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const isAdmin = useSelector((state) => state.auth.isAdmin);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCar = async () => {
//       try {
//         const { data } = await axios.get(process.env.REACT_APP_BACKEND_URL+"/api/cars/all", {
//           withCredentials: true
//         });
//         dispatch(FETCH_SUCCESS(data));
//       } catch (error) {
//         dispatch(FETCH_FAILURE(error.message));
//       }
//     };
//     fetchCar();
//   }, [dispatch]);

//   const handleReserveClick = (carId) => {
//     if (isAuthenticated) {
//       navigate(`/payment/${carId}`);
//     } else {
//       alert("Veuillez vous connecter pour réserver une voiture.");
//     }
//   };

//   return (
//     <div className="container my-5">
//       {/* Section de présentation */}
//       <div className="text-center mb-5">
//         <h1 className="display-5 fw-bold text-primary">Bienvenue chez AUTOECO</h1>
//         <p className="lead">
//           Le premier service de location de véhicules écologiques fonctionnant au bioéthanol et au GPL.
//         </p>
//       </div>

//       {/* Chapitres sur la philosophie et les avantages */}
//       <div className="row justify-content-center mb-5">
//         <div className="col-md-8">
//           <h2 className="text-success mb-3">Chez AUTOECO</h2>
//           <p className="fs-5">
//             Notre philosophie est de vous apporter des véhicules pratiques en ville, confortables et bon marché.
//           </p>
//           <p className="fs-5 mt-4">
//             Tous nos véhicules sont compatibles avec le bioéthanol et le GPL. Ainsi, le prix de votre location sera en moyenne 40% moins cher qu'un véhicule de même catégorie.
//           </p>
//           <p className="fs-5 mt-4">
//             Tous nos véhicules sont issus de véhicules reconditionnés. Vous bénéficierez donc d'un véhicule automatique avec des prestations supérieures par rapport à un véhicule neuf de même catégorie. Chaque année, nous révisons nos véhicules pour vous assurer une sécurité équivalente à celle d'un véhicule neuf !
//           </p>
//         </div>
//       </div>

//       {/* Section des cartes de véhicules */}
//       <div className="row">
//         {cars.length === 0 ? (
//           <p className="text-center">Aucune voiture disponible</p>
//         ) : (
//           cars.map((car, index) => (
//             <div key={index} className="col-md-4 mb-4">
//               <div className="card h-100 shadow-sm">
//                 {car.CarImages && car.CarImages.length > 0 ? (
//                   <img
//                     src={process.env.REACT_APP_BACKEND_URL+`${car.CarImages[0].imageURL}`}
//                     className="card-img-top"
//                     alt={`${car.brand} ${car.model}`}
//                     style={{ width: '100%', height: '200px', objectFit: 'cover' }}
//                   />
//                 ) : (
//                   <img
//                     src="/images/default.png"
//                     className="card-img-top"
//                     alt="Default"
//                     style={{ width: '100%', height: '200px', objectFit: 'cover' }}
//                   />
//                 )}
//                 <div className="card-body">
//                   <h5 className="card-title">{car.brand} {car.model}</h5>
//                   <p className="card-text">Plaque d'immatriculation: {car.registrationPlate}</p>
//                   <p className="card-text">Année: {car.years}</p>
//                   <p className="card-text">Prix par jour: {car.pricePerDay} €</p>
//                   {!isAdmin && isAuthenticated && (
//                     <button
//                       className="btn btn-primary mt-3"
//                       onClick={() => handleReserveClick(car.id)}
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
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Vérification de l'état d'authentification de l'utilisateur
//   const isAdmin = useSelector((state) => state.auth.isAdmin); // Vérification si l'utilisateur est un administrateur
//   const navigate = useNavigate(); // Utilisation du hook useNavigate pour la navigation

//   useEffect(() => {
//     // Fonction asynchrone pour récupérer les données des voitures
//     const fetchCar = async () => {
//       console.log('Fetching car data...'); // Log avant de commencer la récupération des données
//       try {
//         const { data } = await axios.get(process.env.REACT_APP_BACKEND_URL+"/api/cars/all", {
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
//                     src={process.env.REACT_APP_BACKEND_URL+`${car.CarImages[0].imageURL}`}
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
              
//                   {/* Masquer le bouton "Réserver" si l'utilisateur est un administrateur */}
//                   {!isAdmin && isAuthenticated && (
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

