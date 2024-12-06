


// src/pages/ActivityDashboard.js
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const ActivityDashboard = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true); // État pour gérer le chargement
    const [error, setError] = useState(null); // État pour gérer les erreurs

    // Utilisation du hook useEffect pour récupérer les réservations au chargement du composant
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_BACKEND_URL+'/api/reservations/all', {
                    withCredentials: true, // Assurez-vous que les cookies sont envoyés avec la requête
                });
                setReservations(response.data); // Mise à jour de l'état avec les réservations récupérées
            } catch (error) {
                console.error('Error fetching reservations:', error); // Affiche l'erreur dans la console
                setError('Erreur lors de la récupération des réservations'); // Mise à jour de l'état des erreurs
            } finally {
                setLoading(false); // Changement de l'état de chargement une fois la requête terminée
            }
        };

        fetchReservations(); // Appel de la fonction pour récupérer les réservations
    }, []); // Dépendance vide, ce qui signifie que ce code s'exécute une seule fois au montage

    // Si la page est en cours de chargement
    if (loading) {
        return <div className="container mt-4"><p>Chargement des réservations...</p></div>;
    }

    // Si une erreur est survenue lors de la récupération des réservations
    if (error) {
        return <div className="container mt-4"><p>{error}</p></div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Tableau des réservations</h2>

            <div className="row">
                {reservations.length > 0 ? (
                    reservations.map((reservation) => (
                        <div key={reservation.id} className="col-md-4 mb-3">
                            <div className="card" style={{ width: '100%' }}>
                                <img
                                    src={reservation.Car && reservation.Car.CarImages && reservation.Car.CarImages.length > 0
                                        ? process.env.REACT_APP_BACKEND_URL+`/${reservation.Car.CarImages[0].imageURL}`
                                        : "/images/default.png"
                                    }
                                    className="card-img-top"
                                    alt={`${reservation.Car?.brand || 'Véhicule'} ${reservation.Car?.model || 'Inconnu'}`}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Réservation #{reservation.id}</h5>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <h6>Véhicule réservé</h6>
                                        {reservation.Car ? (
                                            <>
                                                <p>Marque: {reservation.Car.brand}</p>
                                                <p>Modèle: {reservation.Car.model}</p>
                                                <p>Plaque d'immatriculation: {reservation.Car.registrationPlate}</p>
                                            </>
                                        ) : (
                                            <p>Informations sur le véhicule non disponibles.</p>
                                        )}
                                    </li>
                                    <li className="list-group-item">
                                        <h6>Données du client</h6>
                                        <p>Prénom: {reservation.User?.firstName} Nom: {reservation.User?.lastName}</p>
                                        <p>Email: {reservation.User?.email}</p>
                                    </li>
                                    <li className="list-group-item">
                                        <h6>Détail de la réservation</h6>
                                        <p>Générée le : {new Date(reservation.createdAt).toLocaleString()}</p>
                                        <p>Date de départ: {new Date(reservation.startDate).toLocaleDateString()}</p>
                                        <p>Date d'arrivée: {new Date(reservation.endDate).toLocaleDateString()}</p>
                                        <p>Prix Total à payer: €{reservation.totalPrice} TTC</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Pas de réservation trouvée ou API introuvable.</p>
                )}
            </div>
        </div>
    );
};

export default ActivityDashboard;


// // src/pages/ActivityDashboard.js VERSION TES FORME COLONNE 
// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';

// const ActivityDashboard = () => {
//     const [reservations, setReservations] = useState([]);

//     useEffect(() => {
//         const fetchReservations = async () => {
//             console.log('Attempting to fetch reservations...');
//             try {
//                 const response = await axios.get(process.env.REACT_APP_BACKEND_URL+'/api/reservations/all', {
//                     withCredentials: true,
//                 });
//                 console.log('API Response:', response.data);
//                 setReservations(response.data);
//             } catch (error) {
//                 console.error('Error fetching reservations:', error);
//             }
//         };

//         fetchReservations();
//     }, []);

//     return (
//         <div className="container mt-4">
//             <h2 className="mb-4">Tableau des réservations</h2>

//             <div className="row">
//                 {reservations.length > 0 ? (
//                     reservations.map((reservation) => (
//                         <div key={reservation.id} className="col-md-4 mb-3">
//                             <div className="card" style={{ width: '100%' }}>
//                                 <img
//                                     src={
//                                         reservation.Car && reservation.Car.CarImages && reservation.Car.CarImages.length > 0
//                                             ? process.env.REACT_APP_BACKEND_URL+`/${reservation.Car.CarImages[0].imageURL}`
//                                             : "/images/default.png"
//                                     }
//                                     className="card-img-top"
//                                     alt={`${reservation.Car?.brand || 'Véhicule'} ${reservation.Car?.model || 'Inconnu'}`}
//                                 />
//                                 <div className="card-body">
//                                     <h5 className="card-title">Réservation #{reservation.id}</h5>
//                                 </div>
//                                 <ul className="list-group list-group-flush">
//                                     <li className="list-group-item">
//                                         <h6>Véhicule réservé</h6>
//                                         {reservation.Car ? (
//                                             <>
//                                                 <p>Marque: {reservation.Car.brand}</p>
//                                                 <p>Modèle: {reservation.Car.model}</p>
//                                                 <p>Plaque d'immatriculation: {reservation.Car.registrationPlate}</p>
//                                             </>
//                                         ) : (
//                                             <p>Informations sur le véhicule non disponibles.</p>
//                                         )}
//                                     </li>
//                                     <li className="list-group-item">
//                                         <h6>Données du client</h6>
//                                         <p>Prénom: {reservation.User?.firstName} Nom: {reservation.User?.lastName}</p>
//                                         <p>Email: {reservation.User?.email}</p>
//                                     </li>
//                                     <li className="list-group-item">
//                                         <h6>Détail de la réservation</h6>
//                                         <p>Générée le : {new Date(reservation.createdAt).toLocaleString()}</p>
//                                         <p>Date de départ: {new Date(reservation.startDate).toLocaleDateString()}</p>
//                                         <p>Date d'arrivée: {new Date(reservation.endDate).toLocaleDateString()}</p>
//                                         <p>Prix Total à payer: €{reservation.totalPrice} TTC</p>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>Pas de réservation trouvée ou API introuvable.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ActivityDashboard;



//src/pages/ActivityDashboard.js  VERSION TEST

// // src/pages/ActivityDashboard.js
// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';

// const ActivityDashboard = () => {
//     const [reservations, setReservations] = useState([]);

//     useEffect(() => {
//         const fetchReservations = async () => {
//             console.log('Attempting to fetch reservations...');
//             try {
//                 const response = await axios.get(process.env.REACT_APP_BACKEND_URL+'/api/reservations/all', {
//                     withCredentials: true,
//                 });
//                 console.log('API Response:', response.data);
//                 setReservations(response.data);
//             } catch (error) {
//                 console.error('Error fetching reservations:', error);
//             }
//         };

//         fetchReservations();
//     }, []);

//     return (
//         <div className="container mt-4">
//             <h2 className="mb-4">Tableau des réservations</h2>

//             {reservations.length > 0 ? (
//                 reservations.map((reservation) => (
//                     <div key={reservation.id} className="card mb-3" style={{ width: '18rem' }}>
//                         <img
//                             src={
//                                 reservation.Car && reservation.Car.CarImages && reservation.Car.CarImages.length > 0
//                                     ? process.env.REACT_APP_BACKEND_URL+`/${reservation.Car.CarImages[0].imageURL}`
//                                     : "/images/default.png"
//                             }
//                             className="card-img-top"
//                             alt={`${reservation.Car?.brand || 'Véhicule'} ${reservation.Car?.model || 'Inconnu'}`}
//                         />
//                         <div className="card-body">
//                             <h5 className="card-title">Réservation #{reservation.id}</h5>
//                         </div>
//                         <ul className="list-group list-group-flush">
//                             <li className="list-group-item">
//                                 <h6>Véhicule réservé</h6>
//                                 {reservation.Car ? (
//                                     <>
//                                         <p>Marque: {reservation.Car.brand}</p>
//                                         <p>Modèle: {reservation.Car.model}</p>
//                                         <p>Plaque d'immatriculation: {reservation.Car.registrationPlate}</p>
//                                     </>
//                                 ) : (
//                                     <p>Informations sur le véhicule non disponibles.</p>
//                                 )}
//                             </li>
//                             <li className="list-group-item">
//                                 <h6>Données du client</h6>
//                                 <p>Prénom: {reservation.User?.firstName} Nom: {reservation.User?.lastName}</p>
//                                 <p>Email: {reservation.User?.email}</p>
//                             </li>
//                             <li className="list-group-item">
//                                 <h6>Détail de la réservation</h6>
//                                 <p>Générée le : {new Date(reservation.createdAt).toLocaleString()}</p>
//                                 <p>Date de départ: {new Date(reservation.startDate).toLocaleDateString()}</p>
//                                 <p>Date d'arrivée: {new Date(reservation.endDate).toLocaleDateString()}</p>
//                                 <p>Prix Total à payer: €{reservation.totalPrice} TTC</p>
//                             </li>
//                         </ul>
//                     </div>
//                 ))
//             ) : (
//                 <p>Pas de réservation trouvée ou API introuvable.</p>
//             )}
//         </div>
//     );
// };

// export default ActivityDashboard;


//src/pages/ActivityDashboard.js  VERSION TEST

// // src/pages/ActivityDashboard.js
// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';

// const ActivityDashboard = () => {
//     const [reservations, setReservations] = useState([]);

//     useEffect(() => {
//         const fetchReservations = async () => {
//             console.log('Attempting to fetch reservations...');
//             try {
//                 const response = await axios.get(process.env.REACT_APP_BACKEND_URL+'/api/reservations/all', {
//                     withCredentials: true,
//                 });
//                 console.log('API Response:', response.data);
//                 setReservations(response.data);
//             } catch (error) {
//                 console.error('Error fetching reservations:', error);
//             }
//         };

//         fetchReservations();
//     }, []);

//     return (
//         <div className="container mt-4">
//             <h2 className="mb-4">Tableau des réservations</h2>

//             {reservations.length > 0 ? (
//                 reservations.map((reservation) => (
//                     <div key={reservation.id} className="card mb-3">
//                         <div className="row no-gutters">
//                             <div className="col-md-4">
//                                 <img
//                                     src={
//                                         reservation.Car && reservation.Car.CarImages && reservation.Car.CarImages.length > 0
//                                             ? process.env.REACT_APP_BACKEND_URL+`/${reservation.Car.CarImages[0].imageURL}`
//                                             : "/images/default.png"
//                                     }
//                                     className="card-img"
//                                     alt={`${reservation.Car?.brand || 'Véhicule'} ${reservation.Car?.model || 'Inconnu'}`}
//                                 />
//                             </div>
//                             <div className="col-md-8">
//                                 <div className="card-body">
//                                     <h5 className="card-title">Réservation #{reservation.id}</h5>
//                                     <ul className="list-group list-group-flush">
//                                         <li className="list-group-item">
//                                             <h6>Véhicule réservé</h6>
//                                             {reservation.Car ? (
//                                                 <>
//                                                     <p>Marque: {reservation.Car.brand}</p>
//                                                     <p>Modèle: {reservation.Car.model}</p>
//                                                     <p>Plaque d'immatriculation: {reservation.Car.registrationPlate}</p>
//                                                 </>
//                                             ) : (
//                                                 <p>Informations sur le véhicule non disponibles.</p>
//                                             )}
//                                         </li>
//                                         <li className="list-group-item">
//                                             <h6>Données du client</h6>
//                                             <p>Prénom: {reservation.User?.firstName} Nom: {reservation.User?.lastName}</p>
//                                             <p>Email: {reservation.User?.email}</p>
//                                         </li>
//                                         <li className="list-group-item">
//                                             <h6>Détail de la réservation</h6>
//                                             <p>Générée le : {new Date(reservation.createdAt).toLocaleString()}</p>
//                                             <p>Date de départ: {new Date(reservation.startDate).toLocaleDateString()}</p>
//                                             <p>Date d'arrivée: {new Date(reservation.endDate).toLocaleDateString()}</p>
//                                             <p>Prix Total à payer: €{reservation.totalPrice} TTC</p>
//                                         </li>
//                                     </ul>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 <p>Pas de réservation trouvée ou API introuvable.</p>
//             )}
//         </div>
//     );
// };

// export default ActivityDashboard;


// // src/pages/ActivityDashboard.js  VERSION OK TEST 

// // src/pages/ActivityDashboard.js
// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';

// const ActivityDashboard = () => {
//     const [reservations, setReservations] = useState([]);

//     useEffect(() => {
//         const fetchReservations = async () => {
//             console.log('Attempting to fetch reservations...');
//             try {
//                 const response = await axios.get(process.env.REACT_APP_BACKEND_URL+'/api/reservations/all', {
//                     withCredentials: true,
//                 });
//                 console.log('API Response:', response.data);
//                 setReservations(response.data);
//             } catch (error) {
//                 console.error('Error fetching reservations:', error);
//             }
//         };

//         fetchReservations();
//     }, []);

//     return (
//         <div>
//             <h2>Tableau des réservations</h2>

//             {reservations.length > 0 ? (
//                 reservations.map((reservation) => (
//                     <div key={reservation.id} className="reservation-card">
//                         <div className="car-info">
//                             <h3>Véhicule réservé</h3>
//                             <div className="car-image">
//                                 {/* Vérification si `Car` existe et si `CarImages` est un tableau non vide */}
//                                 {reservation.Car && reservation.Car.CarImages && reservation.Car.CarImages.length > 0 ? (
//                                     <img
//                                         src={process.env.REACT_APP_BACKEND_URL+`/${reservation.Car.CarImages[0].imageURL}`}
//                                         alt={`${reservation.Car.brand} ${reservation.Car.model}`}
//                                         style={{ width: '100%', height: 'auto' }}
//                                     />
//                                 ) : (
//                                     <img
//                                         src="/images/default.png"
//                                         className="card-img-top"
//                                         alt="Default"
//                                         style={{ width: '100%', height: 'auto' }}
//                                     />
//                                 )}
//                             </div>
//                             {/* Vérifie si `Car` existe avant d'accéder à ses propriétés */}
//                             {reservation.Car ? (
//                                 <>
//                                     <p>Marque: {reservation.Car.brand}</p>
//                                     <p>Modèle: {reservation.Car.model}</p>
//                                     <p>Plaque d'immatriculation: {reservation.Car.registrationPlate}</p>
//                                 </>
//                             ) : (
//                                 <p>Informations sur le véhicule non disponibles.</p>
//                             )}
//                         </div>

//                         <div className="user-info">
//                             <h3>Données du client</h3>
//                             <p>Prénom: {reservation.User?.firstName} Nom: {reservation.User?.lastName}</p>
//                             <p>Email: {reservation.User?.email}</p>
//                         </div>

//                         <div className="reservation-info">
//                             <h3>Détail de la réservation</h3>
//                             <p>générée le : {new Date(reservation.createdAt).toLocaleString()}</p>
//                             <p>Date de départ: {new Date(reservation.startDate).toLocaleDateString()}</p>
//                             <p>Date d'arrivé: {new Date(reservation.endDate).toLocaleDateString()}</p>
//                             <p>Prix Total à payer: €{reservation.totalPrice} TTC</p>
//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 <p>Pas de réservation trouvée ou API introuvable.</p>
//             )}
//         </div>
//     );
// };

// export default ActivityDashboard;


// //src/pages/ActivityDashboard.js
// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';


// // Importe les modules React, useEffect et useState depuis la bibliothèque React.
// // useEffect est utilisé pour effectuer des effets de bord, et useState pour gérer l'état local du composant.

// import axios from 'axios';
// // Importe la bibliothèque axios pour effectuer des requêtes HTTP.

// const ActivityDashboard = () => {
//     const [reservations, setReservations] = useState([]);
//     // Déclare une variable d'état `reservations` initialisée à un tableau vide. 
//     // `setReservations` est la fonction utilisée pour mettre à jour cette variable.

//     useEffect(() => {
//         // useEffect est un hook qui permet d'exécuter du code après le rendu du composant.
//         // Ici, il est utilisé pour récupérer les réservations après le premier rendu.

//         const fetchReservations = async () => {
//             // Déclare une fonction asynchrone pour récupérer les réservations depuis l'API.

//             console.log('Attempting to fetch reservations...');
//             // Affiche un message dans la console indiquant que la récupération des réservations est en cours.

//             try {
//                 const response = await axios.get(process.env.REACT_APP_BACKEND_URL+'/api/reservations/all', {
//                     withCredentials: true,
//                 });
//                 // Effectue une requête GET asynchrone à l'API pour obtenir toutes les réservations.
//                 // `withCredentials: true` indique que les cookies doivent être inclus dans la requête.

//                 console.log('API Response:', response.data); // Log the entire response
//                 // Affiche la réponse complète de l'API dans la console pour débogage.

//                 setReservations(response.data);
//                 // Met à jour la variable d'état `reservations` avec les données reçues de l'API.

//             } catch (error) {
//                 console.error('Error fetching reservations:', error);
//                 // En cas d'erreur lors de la requête, affiche un message d'erreur dans la console.
//             }
//         };

//         fetchReservations();
//         // Appelle la fonction `fetchReservations` pour récupérer les réservations lorsque le composant est monté.

//     }, []);
//     // Le second argument de useEffect est un tableau vide, ce qui signifie que l'effet est exécuté uniquement 
//     // lors du montage initial du composant (équivalent à componentDidMount).

//     return (
//         <div>
//             <h2>Tableau des réservation</h2>
//             {/* Affiche un titre pour le tableau de bord des réservations */}

//             {reservations.length > 0 ? (
//                 // Vérifie si des réservations ont été récupérées.
//                 reservations.map((reservation) => (
//                     // Si oui, map (boucle) sur les réservations pour créer un élément de carte pour chaque réservation.

//                     <div key={reservation.id} className="reservation-card">
//                         {/* Chaque réservation est rendue dans un div avec une classe pour le style.
//                         La clé unique `key={reservation.id}` est nécessaire pour aider React à identifier les éléments de la liste. */}

//                         <div className="car-info">
//                             <h3>Véhicule réservée</h3>
//                             {/* Affiche les informations de la voiture associée à la réservation */}

//                             {/* Affichage de l'image de la voiture */}
//                             <div className="car-image">
                                
//                                 {reservation.Car.CarImages && reservation.Car.CarImages.length > 0 ? (
//                                     <img
//                                         src={process.env.REACT_APP_BACKEND_URL+`/${reservation.Car.CarImages[0].imageURL}`}
//                                         alt={`${reservation.Car.brand} ${reservation.Car.model}`} // Texte alternatif pour l'image
//                                         style={{ width: '100%', height: 'auto' }}
//                                     />
//                                 ) : (
//                                     <img
//                                         src="/images/default.png"
//                                         className="card-img-top"
//                                         alt="Default"
//                                         style={{ width: '100%', height: 'auto' }}
//                                     />
//                                     // Si la voiture a des images associées, affiche la première image.
//                                     // Sinon, affiche une image par défaut.
//                                 )}
//                             </div>
//                             <p>Marque: {reservation.Car.brand}</p>
//                             <p>Modèle: {reservation.Car.model}</p>
//                             <p>Plaque d'immatriculation: {reservation.Car.registrationPlate}</p>
//                             {/* Affiche la marque, le modèle et la plaque d'immatriculation de la voiture */}
//                         </div>

//                         <div className="user-info">
//                             <h3>Données du client</h3>
//                             {/* Affiche les informations de l'utilisateur ayant fait la réservation */}
//                             <p>Prénom: {reservation.User.firstName} Nom: {reservation.User.lastName}</p>
//                             <p>Email: {reservation.User.email}</p>
//                         </div>

//                         <div className="reservation-info">
//                             <h3>Détail de la réservation</h3>
//                             {/* Affiche les détails de la réservation */}
//                             <p>générée le : {new Date(reservation.createdAt).toLocaleString()}</p>
//                             <p>Date de départ: {new Date(reservation.startDate).toLocaleDateString()}</p>
//                             <p>Date d'arrivé: {new Date(reservation.endDate).toLocaleDateString()}</p>
//                             <p>Prix Total à payer: €{reservation.totalPrice} TTC</p>
//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 <p>Pas de réservation trouvé ou API introuvalbe.</p>
//                 // Si aucune réservation n'est trouvée, affiche un message d'information.
//             )}
//         </div>
//     );
// };

// export default ActivityDashboard;
// // Exporte le composant ActivityDashboard pour qu'il puisse être utilisé dans d'autres parties de l'application.





// // src/pages/ActivityDashboard.js

// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function ActivityDashboard() {
//   return (
//     <div>
//       <h1>Listes des réservations effectuées</h1>
      
//       <div className="container">
//         <div className="card" style={{ width: '100%' }}>
//           <div className="d-flex flex-column flex-lg-row">
//             <img
//               className="card-img"
//               src="https://via.placeholder.com/150"
//               alt="Card image cap"
//               style={{ width: 'auto', height: 'auto', marginBottom: '10px',  flex: '1', border: '2px solid #000', padding: '10px', borderRadius: '5px' }}
//             />
//             <div className="card-cars" style={{ flex: '1', border: '2px solid #000', padding: '10px', borderRadius: '5px' }}>
//               <h5 className="card-title">Voitures</h5>
//               <p className="card-text">Rajouter les voitures, marques, modèle, année immatriculation.</p>
//             </div>

//             <div className="card-clients" style={{ flex: '1', border: '2px solid #000', padding: '10px', borderRadius: '5px' }}>
//               <h5 className="card-title">Clients</h5>
//               <p className="card-text">Rajouter des clients.</p>
//             </div>
           
//             <div className="card-reservations" style={{ flex: '1', border: '2px solid #000', padding: '10px', borderRadius: '5px' }}>
//               <h5 className="card-title">Dates de réservation</h5>
//               <p className="card-text">Rajouter des Réservations.</p>
//             </div>

//             <div className="card-totalPrice" style={{ flex: '1', border: '2px solid #000', padding: '10px', borderRadius: '5px' }}>
//               <h5 className="card-title">Prix à Payer</h5>
//               <p className="card-text">Rajouter des prix à payer.</p>
//             </div>
           
            
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ActivityDashboard;

