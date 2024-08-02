import React, { useEffect } from 'react'; // Importation de React et du hook useEffect
import { useDispatch, useSelector } from 'react-redux'; // Importation des hooks useDispatch et useSelector pour interagir avec Redux
import axios from 'axios'; // Importation d'axios pour effectuer des requêtes HTTP
//import { FETCH_SUCCESS, FETCH_FAILURE, DELETE_CAR, UPDATE_CAR } from '../redux/reducers/sliceCar'; // Importation des actions Redux
import { FETCH_SUCCESS, FETCH_FAILURE } from '../redux/reducers/sliceCar'; // Importation des actions Redux

const AdminCarPage = () => {
  const dispatch = useDispatch(); // Obtention de la fonction dispatch pour envoyer des actions au store Redux
  const cars = useSelector((state) => state.car.data); // Accès à la liste des voitures depuis le store Redux
  // const loading = useSelector((state) => state.car.loading); // Accès à l'état de chargement depuis le store Redux
  // const error = useSelector((state) => state.car.error); // Accès à l'état d'erreur depuis le store Redux

  useEffect(() => {
    const fetchCars = async () => {
      //dispatch({ type: 'FETCH_CARS_LOADING' }); // Peut être utilisé pour mettre à jour l'état de chargement si nécessaire
      try {
        const { data } = await axios.get('http://localhost:8002/api/cars/all'); // Requête pour récupérer les voitures depuis l'API
         console.log('Fetched car data:', data); // Ajoutez ce log pour vérifier les données récupérées
        dispatch(FETCH_SUCCESS(data)); // Dispatch de l'action FETCH_SUCCESS avec les données récupérées
      } catch (error) {
        dispatch(FETCH_FAILURE(error.message)); // Dispatch de l'action FETCH_FAILURE en cas d'erreur
      }
    };

    fetchCars(); // Appel de la fonction pour récupérer les données lors du montage du composant
  }, [dispatch]); // Dépendance sur dispatch pour que l'effet se déclenche uniquement lors du premier rendu

  // const handleDelete = async (carId) => {
  //   try {
  //     await axios.delete(`http://localhost:8002/api/cars/${carId}`); // Requête pour supprimer la voiture avec l'ID spécifié
  //     dispatch(DELETE_CAR(carId)); // Dispatch de l'action DELETE_CAR pour mettre à jour l'état dans Redux
  //   } catch (error) {
  //     console.error('Error deleting car:', error); // Gestion des erreurs en cas d'échec de la requête
  //   }
  // };

  // const handleUpdate = async (carId, updatedCar) => {
  //   try {
  //     const { data } = await axios.put(`http://localhost:8002/api/cars/${carId}`, updatedCar); // Requête pour mettre à jour la voiture avec les nouvelles données
  //     dispatch(UPDATE_CAR(data)); // Dispatch de l'action UPDATE_CAR pour mettre à jour l'état dans Redux avec les nouvelles données
  //   } catch (error) {
  //     console.error('Error updating car:', error); // Gestion des erreurs en cas d'échec de la requête
  //   }
  // };

  // if (loading === 'loading') return <div>Loading...</div>; // Affichage d'un message de chargement pendant que les données sont en cours de récupération
  // if (error) return <div>Error: {error}</div>; // Affichage d'un message d'erreur si une erreur s'est produite

  return (
    <div className="container"> {/* Conteneur principal de la page */}
      <div className="row"> {/* Conteneur des lignes */}
        {cars.map((car) => ( // Boucle à travers chaque voiture dans la liste
          <div key={car.id} className="col-md-4 mb-4"> {/* Conteneur pour chaque voiture avec une clé unique */}
            <div className="card" style={{ width: '18rem' }}> {/* Carte pour afficher les détails de la voiture */}
              {car.images && car.images.length > 0 ? (
                <img
                  src={`http://localhost:8002${car.images[0].imageURL}`} // URL de l'image de la voiture
                  className="card-img-top"
                  alt={`${car.brand} ${car.model}`} // Texte alternatif pour l'image
                  style={{ width: '100%', height: 'auto' }}
                />
              ) : (
                <img
                  src="/images/default.png" // Image par défaut si aucune image n'est disponible
                  className="card-img-top"
                  alt="Default"
                  style={{ width: '100%', height: 'auto' }}
                />
              )}
              <div className="card-body"> {/* Corps de la carte avec les détails de la voiture */}
                <h5 className="card-title">{car.brand} {car.model}</h5> {/* Titre avec la marque et le modèle de la voiture */}
                <p className="card-text">Registration Plate: {car.registrationPlate}</p> {/* Plaque d'immatriculation */}
                <p className="card-text">Year: {car.years}</p> {/* Année de fabrication */}
                <p className="card-text">Price per Day: {car.pricePerDay}</p> {/* Prix par jour */}
                <p className="card-text">Available: {car.available ? 'Yes' : 'No'}</p> {/* Disponibilité */}
            
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCarPage; // Exportation du composant pour utilisation dans d'autres parties de l'application
