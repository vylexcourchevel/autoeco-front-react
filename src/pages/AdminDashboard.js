
// //src/pages/AdminDashboard.js 

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [editingUserId, setEditingUserId] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address: '',
        phoneNumber: '',
        isAdmin: false,
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8002/api/users/all', {
                    withCredentials: true
                });
                if (response.status === 200) {
                    setUsers(response.data);
                } else {
                    setError(`Erreur inattendue: ${response.statusText}`);
                }
            } catch (err) {
                setError("Une erreur s'est produite lors de la récupération des utilisateurs.");
            }
        };

        fetchUsers();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8002/api/users/add', formData, {
                withCredentials: true
            });
            alert('Utilisateur ajouté avec succès');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                address: '',
                phoneNumber: '',
                isAdmin: false,
            });
            setUsers([...users, response.data]);
        } catch (error) {
            alert('Erreur lors de l\'ajout de l\'utilisateur');
        }
    };

    const handleEditClick = (user) => {
        setEditingUserId(user.id);
        setFormData({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: '', // Optionnel, ne pas pré-remplir le mot de passe
            address: user.address,
            phoneNumber: user.phoneNumber,
            isAdmin: user.isAdmin,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8002/api/users/update/${editingUserId}`, formData, {
                withCredentials: true
            });
            alert('Utilisateur mis à jour avec succès');
            setUsers(users.map(user => user.id === editingUserId ? { ...user, ...formData } : user));
            setEditingUserId(null);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                address: '',
                phoneNumber: '',
                isAdmin: false,
            });
        } catch (error) {
            alert('Erreur lors de la mise à jour de l\'utilisateur');
        }
    };

    const toggleAdminStatus = async (userId, currentStatus) => {
        try {
            const newStatus = !currentStatus;
            await axios.post(`http://localhost:8002/api/users/admin/${userId}`, { isAdmin: newStatus }, {
                withCredentials: true
            });
            setUsers(users.map(user =>
                user.id === userId ? { ...user, isAdmin: newStatus } : user
            ));
        } catch (err) {
            setError("Une erreur s'est produite lors de la mise à jour du statut d'admin.");
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8002/api/users/delete/${userId}`, {
                withCredentials: true
            });
            setUsers(users.filter(user => user.id !== userId));
        } catch (err) {
            setError("Une erreur s'est produite lors de la suppression de l'utilisateur.");
        }
    };

    return (
        <div>
            <h1>Tableau de Bord Administrateur</h1>
            
            {/* Formulaire pour ajouter un nouvel utilisateur */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Prénom</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Nom</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Mot de Passe</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Adresse</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Numéro de Téléphone</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Est Administrateur</label>
                    <input
                        type="checkbox"
                        name="isAdmin"
                        checked={formData.isAdmin}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Ajouter Utilisateur</button>
            </form>

            {/* Formulaire pour modifier un utilisateur */}
            {editingUserId && (
                <form onSubmit={handleUpdate}>
                    <h2>Modifier Utilisateur</h2>
                    <div>
                        <label>Prénom</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Nom</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Mot de Passe</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Adresse</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Numéro de Téléphone</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Est Administrateur</label>
                        <input
                            type="checkbox"
                            name="isAdmin"
                            checked={formData.isAdmin}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit">Mettre à Jour</button>
                    <button type="button" onClick={() => setEditingUserId(null)}>Annuler</button>
                </form>
            )}

            <h2>Liste des utilisateurs</h2>
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
                            <button onClick={() => deleteUser(user.id)} style={{ marginLeft: '10px', color: 'red' }}>
                                Supprimer l'utilisateur
                            </button>
                            <button onClick={() => handleEditClick(user)} style={{ marginLeft: '10px' }}>
                                Modifier l'utilisateur
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;



// //src/pages/AdminDashboard.js C EST OK  CELUI LA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AdminDashboard = () => {
//     // État pour stocker les utilisateurs, les erreurs et les données du formulaire
//     const [users, setUsers] = useState([]);
//     const [error, setError] = useState(null);
//     const [formData, setFormData] = useState({
//         firstName: '', // Champ pour le prénom
//         lastName: '', // Champ pour le nom
//         email: '', // Champ pour l'email
//         password: '', // Champ pour le mot de passe
//         address: '', // Champ pour l'adresse
//         phoneNumber: '', // Champ pour le numéro de téléphone
//         isAdmin: false, // Champ pour indiquer si l'utilisateur est administrateur
//     });

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

//     // Fonction pour gérer les changements dans les champs du formulaire
//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({
//             ...formData, // On garde les autres champs inchangés
//             [name]: type === 'checkbox' ? checked : value, // Si le type est checkbox, on utilise checked, sinon value
//         });
//     };

//     // Fonction pour gérer la soumission du formulaire
//     const handleSubmit = async (e) => {
//         e.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
        
//         try {
//             // Envoi des données du formulaire au backend pour créer un nouvel utilisateur
//             const response = await axios.post('http://localhost:8002/api/users/add', formData, {
//                 withCredentials: true
//             });
            
            
//             alert('Utilisateur ajouté avec succès'); // Alerte en cas de succès
            
//             // Réinitialisation du formulaire après l'ajout d'un utilisateur
//             setFormData({
//                 firstName: '',
//                 lastName: '',
//                 email: '',
//                 password: '',
//                 address: '',
//                 phoneNumber: '',
//                 isAdmin: false,
//             });

//             // Ajout du nouvel utilisateur à la liste existante
//             setUsers([...users, response.data]);

//         } catch (error) {
//             console.error('Erreur lors de l\'ajout de l\'utilisateur:', error); // Log de l'erreur en cas de problème
//             alert('Erreur lors de l\'ajout de l\'utilisateur'); // Alerte en cas d'erreur
//         }
//     };

//     // Fonction pour basculer le statut d'admin
//     const toggleAdminStatus = async (userId, currentStatus) => {
//         try {
//             const newStatus = !currentStatus; // Inverser le statut actuel
//             await axios.post(`http://localhost:8002/api/users/admin/${userId}`, { isAdmin: newStatus }, {
//                 withCredentials: true
//             });

//             // Mettre à jour l'état local
//             setUsers(users.map(user => 
//                 user.id === userId ? { ...user, isAdmin: newStatus } : user
//             ));
//         } catch (err) {
//             console.error("Erreur lors de la mise à jour du statut d'admin:", err);
//             setError("Une erreur s'est produite lors de la mise à jour du statut d'admin.");
//         }
//     };

//     // Fonction pour supprimer un utilisateur
//     const deleteUser = async (userId) => {
//         try {
//             await axios.delete(`http://localhost:8002/api/users/delete/${userId}`, {
//                 withCredentials: true
//             });

//             // Mettre à jour l'état local pour enlever l'utilisateur supprimé
//             setUsers(users.filter(user => user.id !== userId));
//         } catch (err) {
//             console.error("Erreur lors de la suppression de l'utilisateur:", err);
//             setError("Une erreur s'est produite lors de la suppression de l'utilisateur.");
//         }
//     };

//     return (
//         <div>
//             <h1>Tableau de Bord Administrateur</h1>
            
//             {/* Formulaire pour ajouter un nouvel utilisateur */}
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Prénom</label>
//                     <input
//                         type="text"
//                         name="firstName"
//                         value={formData.firstName}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label>Nom</label>
//                     <input
//                         type="text"
//                         name="lastName"
//                         value={formData.lastName}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label>Email</label>
//                     <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label>Mot de Passe</label>
//                     <input
//                         type="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label>Adresse</label>
//                     <input
//                         type="text"
//                         name="address"
//                         value={formData.address}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label>Numéro de Téléphone</label>
//                     <input
//                         type="text"
//                         name="phoneNumber"
//                         value={formData.phoneNumber}
//                         onChange={handleChange}
//                     />
//                 </div>

//                 <div>
//                     <label>Est Administrateur</label>
//                     <input
//                         type="checkbox"
//                         name="isAdmin"
//                         checked={formData.isAdmin}
//                         onChange={handleChange}
//                     />
//                 </div>

//                 <button type="submit">Ajouter Utilisateur</button>
//             </form>

//             {/* Affichage des utilisateurs */}
//             <h2>Liste des utilisateurs</h2>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <div className="user-list">
//                 {users.map(user => (
//                     <div key={user.id} className="user-container">
//                         <div className="user-detail">
//                             <strong>Prénom:</strong> {user.firstName}
//                         </div>
//                         <div className="user-detail">
//                             <strong>Nom:</strong> {user.lastName}
//                         </div>
//                         <div className="user-detail">
//                             <strong>Email:</strong> {user.email}
//                         </div>
//                         <div className="user-detail">
//                             <strong>Est Admin:</strong> {user.isAdmin ? 'Oui' : 'Non'}
//                         </div>
//                         <div className="user-detail">
//                             <strong>Date de Création:</strong> {new Date(user.createdAt).toLocaleDateString()}
//                         </div>
//                         <div className="user-action">
//                             <button onClick={() => toggleAdminStatus(user.id, user.isAdmin)}>
//                                 {user.isAdmin ? 'Supprimer le statut Admin' : 'Activer le statut Admin'}
//                             </button>
//                             <button onClick={() => deleteUser(user.id)} style={{ marginLeft: '10px', color: 'red' }}>
//                                 Supprimer l'utilisateur
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;



