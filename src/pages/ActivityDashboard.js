


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

// //bouton supprimer rajouté


// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';

// const ActivityDashboard = () => {
//     const [reservations, setReservations] = useState([]);
//     const [loading, setLoading] = useState(true); // État pour gérer le chargement
//     const [error, setError] = useState(null); // État pour gérer les erreurs

//     // Utilisation du hook useEffect pour récupérer les réservations au chargement du composant
//     useEffect(() => {
//         const fetchReservations = async () => {
//             try {
//                 const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/api/reservations/all', {
//                     withCredentials: true, // Assurez-vous que les cookies sont envoyés avec la requête
//                 });
//                 setReservations(response.data); // Mise à jour de l'état avec les réservations récupérées
//             } catch (error) {
//                 console.error('Error fetching reservations:', error); // Affiche l'erreur dans la console
//                 setError('Erreur lors de la récupération des réservations'); // Mise à jour de l'état des erreurs
//             } finally {
//                 setLoading(false); // Changement de l'état de chargement une fois la requête terminée
//             }
//         };

//         fetchReservations(); // Appel de la fonction pour récupérer les réservations
//     }, []); // Dépendance vide, ce qui signifie que ce code s'exécute une seule fois au montage

//     // Fonction pour supprimer une réservation
//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/reservations/${id}`, {
//                 withCredentials: true,
//             });
//             // Supprimer la réservation de l'état local
//             setReservations((prevReservations) => prevReservations.filter((reservation) => reservation.id !== id));
//             alert('Réservation supprimée avec succès.');
//         } catch (error) {
//             console.error('Erreur lors de la suppression de la réservation:', error);
//             alert('Erreur lors de la suppression de la réservation.');
//         }
//     };

//     // Si la page est en cours de chargement
//     if (loading) {
//         return <div className="container mt-4"><p>Chargement des réservations...</p></div>;
//     }

//     // Si une erreur est survenue lors de la récupération des réservations
//     if (error) {
//         return <div className="container mt-4"><p>{error}</p></div>;
//     }

//     return (
//         <div className="container mt-4">
//             <h2 className="mb-4">Tableau des réservations</h2>

//             <div className="row">
//                 {reservations.length > 0 ? (
//                     reservations.map((reservation) => (
//                         <div key={reservation.id} className="col-md-4 mb-3">
//                             <div className="card" style={{ width: '100%' }}>
//                                 <img
//                                     src={reservation.Car && reservation.Car.CarImages && reservation.Car.CarImages.length > 0
//                                         ? process.env.REACT_APP_BACKEND_URL + `/${reservation.Car.CarImages[0].imageURL}`
//                                         : "/images/default.png"
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
//                                 <div className="card-body text-center">
//                                     <button
//                                         className="btn btn-danger"
//                                         onClick={() => handleDelete(reservation.id)}
//                                     >
//                                         Supprimer
//                                     </button>
//                                 </div>
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


