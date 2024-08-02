import React, { useEffect } from 'react'; // Importation de React et du hook useEffect
import { useDispatch, useSelector } from 'react-redux'; // Importation des hooks useDispatch et useSelector pour interagir avec Redux
import axios from 'axios'; // Importation d'axios pour effectuer des requêtes HTTP
import { FETCH_SUCCESS, FETCH_FAILURE } from '../redux/reducers/sliceCar'; // Importation des actions Redux

const Home = () => {
  const dispatch = useDispatch(); // Obtention de la fonction dispatch pour envoyer des actions au store Redux
  const cars = useSelector((state) => state.car.data); // Accès à la liste des voitures depuis le store Redux

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const { data } = await axios.get("http://localhost:8002/api/cars/all"); // Requête pour récupérer les voitures depuis l'API
        console.log('Fetched car data:', data); // Ajoutez ce log pour vérifier les données récupérées
        dispatch(FETCH_SUCCESS(data)); // Dispatch de l'action FETCH_SUCCESS avec les données récupérées
      } catch (error) {
        dispatch(FETCH_FAILURE(error.message)); // Dispatch de l'action FETCH_FAILURE en cas d'erreur
        console.log('Error fetching car data:', error);
      }
    };

    fetchCar(); // Appel de la fonction pour récupérer les données lors du montage du composant
  }, [dispatch]); // Dépendance sur dispatch pour que l'effet se déclenche uniquement lors du premier rendu

  return (
    <div className="container"> {/* Conteneur principal de la page */}
      <div className="row"> {/* Conteneur des lignes */}
        {cars.map((car, index) => ( // Boucle à travers chaque voiture dans la liste
          <div key={index} className="col-md-4 mb-4"> {/* Conteneur pour chaque voiture avec une clé unique */}
            <div className="card" style={{ width: '18rem' }}> {/* Carte pour afficher les détails de la voiture */}
              {/* Affichage des images de la voiture */}
              {car.CarImages && car.CarImages.length > 0 ? (
                <img
                  src={`http://localhost:8002${car.CarImages[0].imageURL}`} // URL de l'image de la voiture
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
// return (
//   <div className="container">
//     <div className="row">
//       {cars.map((car, index) => {
//         const imageUrl = car.images && car.images.length > 0
//           ? `http://localhost:8002${car.images[0].imageURL}`
//           : '/images/default.png';
//         console.log('Image URL:', imageUrl); // Ajoutez ce log pour vérifier l'URL de l'image
//         return (
//           <div key={index} className="col-md-4 mb-4">
//             <div className="card" style={{ width: '18rem' }}>
//               <img
//                 src={imageUrl}
//                 className="card-img-top"
//                 alt={`${car.brand} ${car.model}`}
//                 style={{ width: '100%', height: 'auto' }}
//               />
//               <div className="card-body">
//                 <h5 className="card-title">{car.brand} {car.model}</h5>
//                 <p className="card-text">Registration Plate: {car.registrationPlate}</p>
//                 <p className="card-text">Year: {car.years}</p>
//                 <p className="card-text">Price per Day: {car.pricePerDay}</p>
//                 <p className="card-text">Available: {car.available ? 'Yes' : 'No'}</p>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   </div>
// );

export default Home; // Exportation du composant pour utilisation dans d'autres parties de l'application




// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { FETCH_SUCCESS, FETCH_FAILURE } from '../redux/reducers/sliceCar'; // Corrigez ce chemin si nécessaire
// import axios from 'axios';

// const Home = () => {
//   const dispatch = useDispatch();
//   const cars = useSelector((state) => state.car.data);

//   useEffect(() => {
//     const fetchCar = async () => {
//       try {
//         const { data } = await axios.get("http://localhost:8000/api/cars/all");
//         dispatch(FETCH_SUCCESS(data));
//       } catch (error) {
//         dispatch(FETCH_FAILURE(error.message));
//         console.log(error);
//       }
//     };

//     fetchCar();
//   }, [dispatch]);

//   return (
//     <div className="container">
//       <div className="row">
//         {cars.map((car, index) => (
//           <div key={index} className="col-md-4 mb-4">
//             <div className="card" style={{ width: '18rem' }}>
//               <img src={car.image} className="card-img-top" alt={`${car.brand} ${car.model}`} />
//               <div className="card-body">
//                 <h5 className="card-title">{car.brand} {car.model}</h5>
//                 <p className="card-text">Registration Plate: {car.registrationPlate}</p>
//                 <p className="card-text">Year: {car.years}</p>
//                 <p className="card-text">Price per Day: {car.pricePerDay}</p>
//                 <p className="card-text">Available: {car.available ? 'Yes' : 'No'}</p>
//                 <a href="#" className="btn btn-primary">Go somewhere</a>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;
