


import React, { useEffect } from 'react'; // Importation de React et du hook useEffect
import { useDispatch, useSelector } from 'react-redux'; // Utilisation de Redux pour la gestion de l'état global
import axios from 'axios'; // Pour effectuer des requêtes HTTP
import { FETCH_SUCCESS, FETCH_FAILURE } from '../redux/reducers/sliceCar'; // Actions Redux pour les succès et échecs de requêtes

const AdminCarPage = () => {
  const dispatch = useDispatch(); // Hook Redux pour dispatcher des actions
  const cars = useSelector((state) => state.car.data); // Sélecteur pour récupérer les données des voitures
  const loading = useSelector((state) => state.car.loading); // Sélecteur pour l'état de chargement
  const error = useSelector((state) => state.car.error); // Sélecteur pour l'état d'erreur

  // Fonction pour récupérer les données des voitures depuis l'API
  const fetchCars = async () => {
    dispatch({ type: 'FETCH_CARS_LOADING' }); // Optionnel : met à jour l'état pour signaler le chargement
    try {
      const { data } = await axios.get('http://localhost:8002/api/cars/all'); // Récupération des voitures
      console.log('Fetched car data:', data); // Log pour débogage
      dispatch(FETCH_SUCCESS(data)); // Mise à jour des données dans Redux en cas de succès
    } catch (error) {
      console.error('Error fetching cars:', error); // Gestion de l'erreur
      dispatch(FETCH_FAILURE(error.message)); // Mise à jour de l'erreur dans Redux
    }
  };

  // Appel à l'API pour récupérer les données une fois que le composant est monté
  useEffect(() => {
    fetchCars();
  }, [dispatch]); // Dépendance sur `dispatch` pour s'assurer de l'exécution une seule fois

  // Fonction pour supprimer une voiture par son ID
  const handleDelete = async (carId) => {
    console.log(carId); // Log pour vérifier l'ID
    try {
      await axios.delete(`http://localhost:8002/api/cars/delete/${carId}`); // Suppression de la voiture
      await fetchCars(); // Rechargement des données après suppression
    } catch (error) {
      console.error('Error deleting car:', error); // Log en cas d'échec
    }
  };

  // Affiche un message pendant le chargement
  if (loading === 'loading') return <div>Loading...</div>;

  // Affiche un message en cas d'erreur
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      {/* Liste des voitures */}
      <div className="row">
        {cars.map((car) => (
          <div key={car.id} className="col-md-4 mb-4">
            <div className="card" style={{ width: '18rem' }}>
              {/* Image principale de la voiture */}
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
                {/* Détails de la voiture */}
                <h5 className="card-title">{car.brand} {car.model}</h5>
                <p className="card-text">Plaque: {car.registrationPlate}</p>
                <p className="card-text">Année: {car.years}</p>
                <p className="card-text">Prix/Jour: {car.pricePerDay}€</p>
                <p className="card-text">Disponible: {car.available ? 'Oui' : 'Non'}</p>
                {/* Bouton pour supprimer une voiture */}
                <button className="btn btn-danger" onClick={() => handleDelete(car.id)}>
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCarPage; // Export du composant pour l'utiliser ailleurs


// import React, { useEffect } from 'react'; // Importation de React et du hook useEffect
// import { useDispatch, useSelector } from 'react-redux'; // Importation des hooks useDispatch et useSelector pour interagir avec Redux
// import axios from 'axios'; // Importation d'axios pour effectuer des requêtes HTTP
// //import { FETCH_SUCCESS, FETCH_FAILURE, DELETE_CAR, UPDATE_CAR } from '../redux/reducers/sliceCar'; // Importation des actions Redux
// import { FETCH_SUCCESS, FETCH_FAILURE } from '../redux/reducers/sliceCar'; // Importation des actions Redux

// const AdminCarPage = () => {
//   const dispatch = useDispatch(); // Obtention de la fonction dispatch pour envoyer des actions au store Redux
//   const cars = useSelector((state) => state.car.data); // Accès à la liste des voitures depuis le store Redux
//   const loading = useSelector((state) => state.car.loading); // Accès à l'état de chargement depuis le store Redux
//   const error = useSelector((state) => state.car.error); // Accès à l'état d'erreur depuis le store Redux

//   const fetchCars = async () => {
//     dispatch({ type: 'FETCH_CARS_LOADING' }); // Peut être utilisé pour mettre à jour l'état de chargement si nécessaire
//     try {
//       const { data } = await axios.get('http://localhost:8002/api/cars/all'); // Requête pour récupérer les voitures depuis l'API
//       console.log('Fetched car data:', data); // Ajoutez ce log pour vérifier les données sélectionnées
//       dispatch(FETCH_SUCCESS(data)); // Dispatch de l'action FETCH_SUCCESS avec les données récupérées
//     } catch (error) {
//       dispatch(FETCH_FAILURE(error.message)); // Dispatch de l'action FETCH_FAILURE en cas d'erreur
//     }
//   };
//   useEffect(() => {

//     fetchCars(); // Appel de la fonction pour récupérer les données lors du montage du composant
//   }, [dispatch]); // Dépendance sur dispatch pour que l'effet se déclenche uniquement lors du premier rendu

//   const handleDelete = async (carId) => {
//     console.log(carId);
//     try {
//       await axios.delete(`http://localhost:8002/api/cars/delete/${carId}`); // Requête pour supprimer la voiture avec l'ID spécifié
//       // dispatch(DELETE_CAR(carId)); // Dispatch de l'action DELETE_CAR pour mettre à jour l'état dans Redux
//       await fetchCars();
//     } catch (error) {
//       console.error('Error deleting car:', error); // Gestion des erreurs en cas d'échec de la requête
//     }
//   };

//   // const handleUpdate = async (carId, updatedCar) => {
//   //   try {
//   //     const { data } = await axios.put(`http://localhost:8002/api/cars/${carId}`, updatedCar); // Requête pour mettre à jour la voiture avec les nouvelles données
//   //     dispatch(UPDATE_CAR(data)); // Dispatch de l'action UPDATE_CAR pour mettre à jour l'état dans Redux avec les nouvelles données
//   //   } catch (error) {
//   //     console.error('Error updating car:', error); // Gestion des erreurs en cas d'échec de la requête
//   //   }
//   // };

//   if (loading === 'loading') return <div>Loading...</div>; // Affichage d'un message de chargement pendant que les données sont en cours de récupération
//   if (error) return <div>Error: {error}</div>; // Affichage d'un message d'erreur si une erreur s'est produite

//   return (
//     <div className="container"> {/* Conteneur principal de la page */}
//       <div className="row"> {/* Conteneur des lignes */}
//         {cars.map((car) => ( // Boucle à travers chaque voiture dans la liste
//           <div key={car.id} className="col-md-4 mb-4"> {/* Conteneur pour chaque voiture avec une clé unique */}
//             <div className="card" style={{ width: '18rem' }}> {/* Carte pour afficher les détails de la voiture */}
//               {car.CarImages && car.CarImages.length > 0 ? (
//                 <img
//                   src={`http://localhost:8002${car.CarImages[0].imageURL}`} // URL de l'image de la voiture
              
//                   className="card-img-top"
//                   alt={`${car.brand} ${car.model}`} // Texte alternatif pour l'image
//                   style={{ width: '100%', height: 'auto' }}
//                 />
//               ) : (
//                 <img
//                   src="/images/default.png" // Image par défaut si aucune image n'est disponible
//                   className="card-img-top"
//                   alt="Default"
//                   style={{ width: '100%', height: 'auto' }}
//                 />
//               )}
//               <div className="card-body"> {/* Corps de la carte avec les détails de la voiture */}
//                 <h5 className="card-title">{car.brand} {car.model}</h5> {/* Titre avec la marque et le modèle de la voiture */}
//                 <p className="card-text">Registration Plate: {car.registrationPlate}</p> {/* Plaque d'immatriculation */}
//                 <p className="card-text">Year: {car.years}</p> {/* Année de fabrication */}
//                 <p className="card-text">Price per Day: {car.pricePerDay}</p> {/* Prix par jour */}
//                 <p className="card-text">Available: {car.available ? 'Yes' : 'No'}</p> {/* Disponibilité */}
//                 <button  className="btn btn-danger" onClick={() => handleDelete(car.id)}> {/* Bouton pour supprimer la voiture */}
//                 Delete
//               </button>
              
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminCarPage; // Exportation du composant pour utilisation dans d'autres parties de l'application
