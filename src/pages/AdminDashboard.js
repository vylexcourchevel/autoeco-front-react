//src/pages/AdminDashboard.js 

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    // État pour stocker les utilisateurs et les erreurs
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    // Utilisez useEffect pour récupérer les utilisateurs lorsque le composant est monté
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                console.log("Tentative de récupération des utilisateurs...");

                // Appel à l'API pour récupérer les utilisateurs
                const response = await axios.get('http://localhost:8002/api/users/all', {
                    withCredentials: true
                });

                console.log("Réponse de l'API reçue:", response);

                if (response.status === 200) {
                    console.log("Utilisateurs récupérés avec succès:", response.data);
                    setUsers(response.data); // Stocker les utilisateurs dans l'état
                } else {
                    console.warn("Réponse inattendue de l'API:", response);
                    setError(`Erreur inattendue: ${response.statusText}`);
                }
            } catch (err) {
                console.error("Erreur lors de la récupération des utilisateurs:", err);
                setError("Une erreur s'est produite lors de la récupération des utilisateurs.");
            }
        };

        fetchUsers();
    }, []); // Le tableau vide [] indique que l'effet s'exécute une seule fois au montage

    // Fonction pour basculer le statut d'admin
    const toggleAdminStatus = async (userId, currentStatus) => {
        try {
            const newStatus = !currentStatus; // Inverser le statut actuel
            await axios.post(`http://localhost:8002/api/users/admin/${userId}`, { isAdmin: newStatus }, {
                withCredentials: true
                
            });
           // await axios.post(`http://localhost:8002/api/users/${userId}/admin`, { isAdmin: newStatus }, {
              //  withCredentials: true
            //});

            // Mettre à jour l'état local
            setUsers(users.map(user => 
                user.id === userId ? { ...user, isAdmin: newStatus } : user
            ));
        } catch (err) {
            console.error("Erreur lors de la mise à jour du statut d'admin:", err);
            setError("Une erreur s'est produite lors de la mise à jour du statut d'admin.");
        }
    };
        return (
            <div>
                <h1>Liste des utilisateurs</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="user-list">
                    {users.map(user => (
                        <div key={user.id} className="user-container">
                            <div className="user-detail">
                                <strong>Prénom:</strong> {user.firstName}
                            </div>
                            <div className="user-detail">
                                <strong>Nom:</strong> {user.lastName}
                            </div>
                            <div className="user-detail">
                                <strong>Email:</strong> {user.email}
                            </div>
                            <div className="user-detail">
                                <strong>Est Admin:</strong> {user.isAdmin ? 'Oui' : 'Non'}
                            </div>
                            <div className="user-detail">
                                <strong>Date de Création:</strong> {new Date(user.createdAt).toLocaleDateString()}
                            </div>
                            <div className="user-action">
                                <button onClick={() => toggleAdminStatus(user.id, user.isAdmin)}>
                                    {user.isAdmin ? 'Supprimer le statut Admin' : 'Activer le statut Admin'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };
    
    export default AdminDashboard;
    



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AdminDashboard = () => {
//     // État pour stocker les utilisateurs et les erreurs
//     const [users, setUsers] = useState([]);
//     const [error, setError] = useState(null);

//     // Utilisez useEffect pour récupérer les utilisateurs lorsque le composant est monté
//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 console.log("Tentative de récupération des utilisateurs...");

//                 // Appel à l'API pour récupérer les utilisateurs
//                 const response = await axios.get('http://localhost:8002/api/users/all', {
//                     withCredentials: true
//                 });

//                 console.log("Réponse de l'API reçue:", response);

//                 if (response.status === 200) {
//                     console.log("Utilisateurs récupérés avec succès:", response.data);
//                     setUsers(response.data); // Stocker les utilisateurs dans l'état
//                 } else {
//                     console.warn("Réponse inattendue de l'API:", response);
//                     setError(`Erreur inattendue: ${response.statusText}`);
//                 }
//             } catch (err) {
//                 console.error("Erreur lors de la récupération des utilisateurs:", err);
//                 setError("Une erreur s'est produite lors de la récupération des utilisateurs.");
//             }
//         };

//         fetchUsers();
//     }, []); // Le tableau vide [] indique que l'effet s'exécute une seule fois au montage

//     return (
//         <div>
//             <h1>Liste des utilisateurs</h1>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Prénom</th>
//                         <th>Nom</th>
//                         <th>Email</th>
//                         <th>Est Admin</th>
//                         <th>Date de Création</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map(user => (
//                         <tr key={user.id}>
//                             <td>{user.firstName}</td>
//                             <td>{user.lastName}</td>
//                             <td>{user.email}</td>
//                             <td>{user.isAdmin ? 'Oui' : 'Non'}</td>
//                             <td>{new Date(user.createdAt).toLocaleDateString()}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default AdminDashboard;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AdminDashboard = () => {
//     // État pour stocker les utilisateurs et les erreurs
//     const [users, setUsers] = useState([]);
//     const [error, setError] = useState(null);

//     // Utilisez useEffect pour récupérer les utilisateurs lorsque le composant est monté
//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 // Appel à l'API pour récupérer les utilisateurs
//                 const response = await axios.get('http://localhost:8002/api/users/all', {
//                     withCredentials: true
//                 });
//                 setUsers(response.data); // Stocker les utilisateurs dans l'état
//             } catch (err) {
//                 setError('Une erreur s\'est produite lors de la récupération des utilisateurs.');
//                 console.error(err);
//             }
//         };

//         fetchUsers();
//     }, []); // Le tableau vide [] indique que l'effet s'exécute une seule fois au montage

//     return (
//         <div>
//             <h1>Liste des utilisateurs</h1>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Prénom</th>
//                         <th>Nom</th>
//                         <th>Email</th>
//                         <th>Est Admin</th>
//                         <th>Date de Création</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map(user => (
//                         <tr key={user.id}>
//                             <td>{user.firstName}</td>
//                             <td>{user.lastName}</td>
//                             <td>{user.email}</td>
//                             <td>{user.isAdmin ? 'Oui' : 'Non'}</td>
//                             <td>{new Date(user.createdAt).toLocaleDateString()}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default AdminDashboard;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AdminDashboard = () => {
//     // État pour stocker les utilisateurs et les erreurs
//     const [users, setUsers] = useState([]);
//     const [error, setError] = useState(null);

//     // Utilisez useEffect pour récupérer les utilisateurs lorsque le composant est monté
//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 // Appel à l'API pour récupérer les utilisateurs
//                 const response = await axios.get('http://localhost:8002/api/users/all', {
//                     withCredentials: true
//                 });
//                 setUsers(response.data); // Stocker les utilisateurs dans l'état
//             } catch (err) {
//                 setError('Une erreur s\'est produite lors de la récupération des utilisateurs.');
//                 console.error(err);
//             }
//         };

//         fetchUsers();
//     }, []); // Le tableau vide [] indique que l'effet s'exécute une seule fois au montage

//     return (
//         <div>
//             <h1>Liste des utilisateurs</h1>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <table>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Nom</th>
//                         <th>Email</th>
//                         <th>Date de Création</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map(user => (
//                         <tr key={user.id}>
//                             <td>{user.id}</td>
//                             <td>{user.name}</td>
//                             <td>{user.email}</td>
//                             <td>{new Date(user.createdAt).toLocaleDateString()}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default AdminDashboard;
