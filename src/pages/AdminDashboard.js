
// src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importation de Bootstrap

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

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/users/all`, {
                    withCredentials: true,
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
    }, [BACKEND_URL]);

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
            const response = await axios.post(`${BACKEND_URL}/api/users/add`, formData, {
                withCredentials: true,
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
            password: '',
            address: user.address,
            phoneNumber: user.phoneNumber,
            isAdmin: user.isAdmin,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${BACKEND_URL}/api/users/update/${editingUserId}`, formData, {
                withCredentials: true,
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
            await axios.post(`${BACKEND_URL}/api/users/admin/${userId}`, { isAdmin: newStatus }, {
                withCredentials: true,
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
            await axios.delete(`${BACKEND_URL}/api/users/delete/${userId}`, {
                withCredentials: true,
            });
            setUsers(users.filter(user => user.id !== userId));
        } catch (err) {
            setError("Une erreur s'est produite lors de la suppression de l'utilisateur.");
        }
    };

    return (
                <div className="container py-4" style={{ padding: '30px 50px' }}>
                    <h1 className="text-center mb-4">Tableau de Bord Administrateur</h1>
        
                    <div className="card mb-4">
                        <div className="card-header">
                            <h2 className="mb-0">Ajouter un Utilisateur</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit} className="row g-3">
                                <div className="col-md-4">
                                    <label className="form-label">Prénom</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        className="form-control"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Nom</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        className="form-control"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Mot de Passe</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Adresse</label>
                                    <input
                                        type="text"
                                        name="address"
                                        className="form-control"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Numéro de Téléphone</label>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        className="form-control"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-4 form-check">
                                    <input
                                        type="checkbox"
                                        name="isAdmin"
                                        className="form-check-input"
                                        checked={formData.isAdmin}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label">Est Administrateur</label>
                                </div>
                                <div className="col-12">
                                    <button type="submit" className="btn btn-primary">Ajouter Utilisateur</button>
                                </div>
                            </form>
                        </div>
                    </div>
        
                    {editingUserId && (
                        <div className="card mb-4">
                            <div className="card-header">
                                <h2 className="mb-0">Modifier Utilisateur</h2>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleUpdate} className="row g-3">
                                    <div className="col-md-4">
                                        <label className="form-label">Prénom</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            className="form-control"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">Nom</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            className="form-control"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">Mot de Passe</label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">Adresse</label>
                                        <input
                                            type="text"
                                            name="address"
                                            className="form-control"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">Numéro de Téléphone</label>
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            className="form-control"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-4 form-check">
                                        <input
                                            type="checkbox"
                                            name="isAdmin"
                                            className="form-check-input"
                                            checked={formData.isAdmin}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label">Est Administrateur</label>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary">Mettre à Jour</button>
                                        <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditingUserId(null)}>Annuler</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
        
                    <div className="card">
                        <div className="card-header">
                            <h2>Liste des utilisateurs</h2>
                        </div>
                        <div className="card-body">
                            {error && <p className="text-danger">{error}</p>}
                            <div className="list-group">
                                {users.map(user => (
                                    <div key={user.id} className="list-group-item">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <p><strong>Prénom:</strong> {user.firstName}</p>
                                                <p><strong>Nom:</strong> {user.lastName}</p>
                                                <p><strong>Email:</strong> {user.email}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <p><strong>Est Admin:</strong> {user.isAdmin ? 'Oui' : 'Non'}</p>
                                                <p><strong>Date de Création:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <div className="col-md-12">
                                                <button onClick={() => toggleAdminStatus(user.id, user.isAdmin)} className="btn btn-warning me-2">
                                                    {user.isAdmin ? 'Supprimer le statut Admin' : 'Activer le statut Admin'}
                                                </button>
                                                <button onClick={() => deleteUser(user.id)} className="btn btn-danger me-2">
                                                    Supprimer
                                                </button>
                                                <button onClick={() => handleEditClick(user)} className="btn btn-secondary">
                                                    Modifier
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            );
        };
        
        export default AdminDashboard;


// // src/pages/AdminDashboard.js VERSION OK DEFIN ITIVE 

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Importation de Bootstrap

// const AdminDashboard = () => {
//     const [users, setUsers] = useState([]);
//     const [error, setError] = useState(null);
//     const [editingUserId, setEditingUserId] = useState(null);
//     const [formData, setFormData] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         password: '',
//         address: '',
//         phoneNumber: '',
//         isAdmin: false,
//     });

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8002/api/users/all', {
//                     withCredentials: true
//                 });
//                 if (response.status === 200) {
//                     setUsers(response.data);
//                 } else {
//                     setError(`Erreur inattendue: ${response.statusText}`);
//                 }
//             } catch (err) {
//                 setError("Une erreur s'est produite lors de la récupération des utilisateurs.");
//             }
//         };

//         fetchUsers();
//     }, []);

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === 'checkbox' ? checked : value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:8002/api/users/add', formData, {
//                 withCredentials: true
//             });
//             alert('Utilisateur ajouté avec succès');
//             setFormData({
//                 firstName: '',
//                 lastName: '',
//                 email: '',
//                 password: '',
//                 address: '',
//                 phoneNumber: '',
//                 isAdmin: false,
//             });
//             setUsers([...users, response.data]);
//         } catch (error) {
//             alert('Erreur lors de l\'ajout de l\'utilisateur');
//         }
//     };

//     const handleEditClick = (user) => {
//         setEditingUserId(user.id);
//         setFormData({
//             firstName: user.firstName,
//             lastName: user.lastName,
//             email: user.email,
//             password: '',
//             address: user.address,
//             phoneNumber: user.phoneNumber,
//             isAdmin: user.isAdmin,
//         });
//     };

//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.put(`http://localhost:8002/api/users/update/${editingUserId}`, formData, {
//                 withCredentials: true
//             });
//             alert('Utilisateur mis à jour avec succès');
//             setUsers(users.map(user => user.id === editingUserId ? { ...user, ...formData } : user));
//             setEditingUserId(null);
//             setFormData({
//                 firstName: '',
//                 lastName: '',
//                 email: '',
//                 password: '',
//                 address: '',
//                 phoneNumber: '',
//                 isAdmin: false,
//             });
//         } catch (error) {
//             alert('Erreur lors de la mise à jour de l\'utilisateur');
//         }
//     };

//     const toggleAdminStatus = async (userId, currentStatus) => {
//         try {
//             const newStatus = !currentStatus;
//             await axios.post(`http://localhost:8002/api/users/admin/${userId}`, { isAdmin: newStatus }, {
//                 withCredentials: true
//             });
//             setUsers(users.map(user =>
//                 user.id === userId ? { ...user, isAdmin: newStatus } : user
//             ));
//         } catch (err) {
//             setError("Une erreur s'est produite lors de la mise à jour du statut d'admin.");
//         }
//     };

//     const deleteUser = async (userId) => {
//         try {
//             await axios.delete(`http://localhost:8002/api/users/delete/${userId}`, {
//                 withCredentials: true
//             });
//             setUsers(users.filter(user => user.id !== userId));
//         } catch (err) {
//             setError("Une erreur s'est produite lors de la suppression de l'utilisateur.");
//         }
//     };

//     return (
//         <div className="container py-4" style={{ padding: '30px 50px' }}>
//             <h1 className="text-center mb-4">Tableau de Bord Administrateur</h1>

//             <div className="card mb-4">
//                 <div className="card-header">
//                     <h2 className="mb-0">Ajouter un Utilisateur</h2>
//                 </div>
//                 <div className="card-body">
//                     <form onSubmit={handleSubmit} className="row g-3">
//                         <div className="col-md-4">
//                             <label className="form-label">Prénom</label>
//                             <input
//                                 type="text"
//                                 name="firstName"
//                                 className="form-control"
//                                 value={formData.firstName}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <div className="col-md-4">
//                             <label className="form-label">Nom</label>
//                             <input
//                                 type="text"
//                                 name="lastName"
//                                 className="form-control"
//                                 value={formData.lastName}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <div className="col-md-4">
//                             <label className="form-label">Email</label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 className="form-control"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <div className="col-md-4">
//                             <label className="form-label">Mot de Passe</label>
//                             <input
//                                 type="password"
//                                 name="password"
//                                 className="form-control"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div className="col-md-4">
//                             <label className="form-label">Adresse</label>
//                             <input
//                                 type="text"
//                                 name="address"
//                                 className="form-control"
//                                 value={formData.address}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <div className="col-md-4">
//                             <label className="form-label">Numéro de Téléphone</label>
//                             <input
//                                 type="text"
//                                 name="phoneNumber"
//                                 className="form-control"
//                                 value={formData.phoneNumber}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div className="col-md-4 form-check">
//                             <input
//                                 type="checkbox"
//                                 name="isAdmin"
//                                 className="form-check-input"
//                                 checked={formData.isAdmin}
//                                 onChange={handleChange}
//                             />
//                             <label className="form-check-label">Est Administrateur</label>
//                         </div>
//                         <div className="col-12">
//                             <button type="submit" className="btn btn-primary">Ajouter Utilisateur</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>

//             {editingUserId && (
//                 <div className="card mb-4">
//                     <div className="card-header">
//                         <h2 className="mb-0">Modifier Utilisateur</h2>
//                     </div>
//                     <div className="card-body">
//                         <form onSubmit={handleUpdate} className="row g-3">
//                             <div className="col-md-4">
//                                 <label className="form-label">Prénom</label>
//                                 <input
//                                     type="text"
//                                     name="firstName"
//                                     className="form-control"
//                                     value={formData.firstName}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className="col-md-4">
//                                 <label className="form-label">Nom</label>
//                                 <input
//                                     type="text"
//                                     name="lastName"
//                                     className="form-control"
//                                     value={formData.lastName}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className="col-md-4">
//                                 <label className="form-label">Email</label>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     className="form-control"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className="col-md-4">
//                                 <label className="form-label">Mot de Passe</label>
//                                 <input
//                                     type="password"
//                                     name="password"
//                                     className="form-control"
//                                     value={formData.password}
//                                     onChange={handleChange}
//                                 />
//                             </div>
//                             <div className="col-md-4">
//                                 <label className="form-label">Adresse</label>
//                                 <input
//                                     type="text"
//                                     name="address"
//                                     className="form-control"
//                                     value={formData.address}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className="col-md-4">
//                                 <label className="form-label">Numéro de Téléphone</label>
//                                 <input
//                                     type="text"
//                                     name="phoneNumber"
//                                     className="form-control"
//                                     value={formData.phoneNumber}
//                                     onChange={handleChange}
//                                 />
//                             </div>
//                             <div className="col-md-4 form-check">
//                                 <input
//                                     type="checkbox"
//                                     name="isAdmin"
//                                     className="form-check-input"
//                                     checked={formData.isAdmin}
//                                     onChange={handleChange}
//                                 />
//                                 <label className="form-check-label">Est Administrateur</label>
//                             </div>
//                             <div className="col-12">
//                                 <button type="submit" className="btn btn-primary">Mettre à Jour</button>
//                                 <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditingUserId(null)}>Annuler</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             <div className="card">
//                 <div className="card-header">
//                     <h2>Liste des utilisateurs</h2>
//                 </div>
//                 <div className="card-body">
//                     {error && <p className="text-danger">{error}</p>}
//                     <div className="list-group">
//                         {users.map(user => (
//                             <div key={user.id} className="list-group-item">
//                                 <div className="row">
//                                     <div className="col-md-6">
//                                         <p><strong>Prénom:</strong> {user.firstName}</p>
//                                         <p><strong>Nom:</strong> {user.lastName}</p>
//                                         <p><strong>Email:</strong> {user.email}</p>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <p><strong>Est Admin:</strong> {user.isAdmin ? 'Oui' : 'Non'}</p>
//                                         <p><strong>Date de Création:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
//                                     </div>
//                                     <div className="col-md-12">
//                                         <button onClick={() => toggleAdminStatus(user.id, user.isAdmin)} className="btn btn-warning me-2">
//                                             {user.isAdmin ? 'Supprimer le statut Admin' : 'Activer le statut Admin'}
//                                         </button>
//                                         <button onClick={() => deleteUser(user.id)} className="btn btn-danger me-2">
//                                             Supprimer
//                                         </button>
//                                         <button onClick={() => handleEditClick(user)} className="btn btn-secondary">
//                                             Modifier
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;




//src/pages/AdminDashboard.js version OK QUI FONCTIONNE PARFAITEMENT



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// //import './AdminDashboard.css'; // Importation du fichier CSS pour les styles personnalisés

// const AdminDashboard = () => {
//     const [users, setUsers] = useState([]);
//     const [error, setError] = useState(null);
//     const [editingUserId, setEditingUserId] = useState(null);
//     const [formData, setFormData] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         password: '',
//         address: '',
//         phoneNumber: '',
//         isAdmin: false,
//     });

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8002/api/users/all', {
//                     withCredentials: true
//                 });
//                 if (response.status === 200) {
//                     setUsers(response.data);
//                 } else {
//                     setError(`Erreur inattendue: ${response.statusText}`);
//                 }
//             } catch (err) {
//                 setError("Une erreur s'est produite lors de la récupération des utilisateurs.");
//             }
//         };

//         fetchUsers();
//     }, []);

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === 'checkbox' ? checked : value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:8002/api/users/add', formData, {
//                 withCredentials: true
//             });
//             alert('Utilisateur ajouté avec succès');
//             setFormData({
//                 firstName: '',
//                 lastName: '',
//                 email: '',
//                 password: '',
//                 address: '',
//                 phoneNumber: '',
//                 isAdmin: false,
//             });
//             setUsers([...users, response.data]);
//         } catch (error) {
//             alert('Erreur lors de l\'ajout de l\'utilisateur');
//         }
//     };

//     const handleEditClick = (user) => {
//         setEditingUserId(user.id);
//         setFormData({
//             firstName: user.firstName,
//             lastName: user.lastName,
//             email: user.email,
//             password: '',
//             address: user.address,
//             phoneNumber: user.phoneNumber,
//             isAdmin: user.isAdmin,
//         });
//     };

//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.put(`http://localhost:8002/api/users/update/${editingUserId}`, formData, {
//                 withCredentials: true
//             });
//             alert('Utilisateur mis à jour avec succès');
//             setUsers(users.map(user => user.id === editingUserId ? { ...user, ...formData } : user));
//             setEditingUserId(null);
//             setFormData({
//                 firstName: '',
//                 lastName: '',
//                 email: '',
//                 password: '',
//                 address: '',
//                 phoneNumber: '',
//                 isAdmin: false,
//             });
//         } catch (error) {
//             alert('Erreur lors de la mise à jour de l\'utilisateur');
//         }
//     };

//     const toggleAdminStatus = async (userId, currentStatus) => {
//         try {
//             const newStatus = !currentStatus;
//             await axios.post(`http://localhost:8002/api/users/admin/${userId}`, { isAdmin: newStatus }, {
//                 withCredentials: true
//             });
//             setUsers(users.map(user =>
//                 user.id === userId ? { ...user, isAdmin: newStatus } : user
//             ));
//         } catch (err) {
//             setError("Une erreur s'est produite lors de la mise à jour du statut d'admin.");
//         }
//     };

//     const deleteUser = async (userId) => {
//         try {
//             await axios.delete(`http://localhost:8002/api/users/delete/${userId}`, {
//                 withCredentials: true
//             });
//             setUsers(users.filter(user => user.id !== userId));
//         } catch (err) {
//             setError("Une erreur s'est produite lors de la suppression de l'utilisateur.");
//         }
//     };

//     return (
//         <div className="admin-dashboard">
//             <div className="dashboard-header">
//                 <h1>Tableau de Bord Administrateur</h1>
//             </div>

//             <div className="form-container">
//                 <h2>Ajouter un Utilisateur</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div>
//                         <label>Prénom</label>
//                         <input
//                             type="text"
//                             name="firstName"
//                             value={formData.firstName}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label>Nom</label>
//                         <input
//                             type="text"
//                             name="lastName"
//                             value={formData.lastName}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label>Email</label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label>Mot de Passe</label>
//                         <input
//                             type="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <div>
//                         <label>Adresse</label>
//                         <input
//                             type="text"
//                             name="address"
//                             value={formData.address}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label>Numéro de Téléphone</label>
//                         <input
//                             type="text"
//                             name="phoneNumber"
//                             value={formData.phoneNumber}
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <div>
//                         <label>Est Administrateur</label>
//                         <input
//                             type="checkbox"
//                             name="isAdmin"
//                             checked={formData.isAdmin}
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <button type="submit">Ajouter Utilisateur</button>
//                 </form>
//             </div>

//             {editingUserId && (
//                 <div className="form-container">
//                     <h2>Modifier Utilisateur</h2>
//                     <form onSubmit={handleUpdate}>
//                         <div>
//                             <label>Prénom</label>
//                             <input
//                                 type="text"
//                                 name="firstName"
//                                 value={formData.firstName}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label>Nom</label>
//                             <input
//                                 type="text"
//                                 name="lastName"
//                                 value={formData.lastName}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label>Email</label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label>Mot de Passe</label>
//                             <input
//                                 type="password"
//                                 name="password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div>
//                             <label>Adresse</label>
//                             <input
//                                 type="text"
//                                 name="address"
//                                 value={formData.address}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label>Numéro de Téléphone</label>
//                             <input
//                                 type="text"
//                                 name="phoneNumber"
//                                 value={formData.phoneNumber}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div>
//                             <label>Est Administrateur</label>
//                             <input
//                                 type="checkbox"
//                                 name="isAdmin"
//                                 checked={formData.isAdmin}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <button type="submit">Mettre à Jour</button>
//                         <button type="button" onClick={() => setEditingUserId(null)}>Annuler</button>
//                     </form>
//                 </div>
//             )}

//             <div className="user-list-container">
//                 <h2>Liste des utilisateurs</h2>
//                 {error && <p className="error-message">{error}</p>}
//                 <div className="user-list">
//                     {users.map(user => (
//                         <div key={user.id} className="user-container">
//                             <div className="user-detail">
//                                 <strong>Prénom:</strong> {user.firstName}
//                             </div>
//                             <div className="user-detail">
//                                 <strong>Nom:</strong> {user.lastName}
//                             </div>
//                             <div className="user-detail">
//                                 <strong>Email:</strong> {user.email}
//                             </div>
//                             <div className="user-detail">
//                                 <strong>Est Admin:</strong> {user.isAdmin ? 'Oui' : 'Non'}
//                             </div>
//                             <div className="user-detail">
//                                 <strong>Date de Création:</strong> {new Date(user.createdAt).toLocaleDateString()}
//                             </div>
//                             <div className="user-action">
//                                 <button onClick={() => toggleAdminStatus(user.id, user.isAdmin)}>
//                                     {user.isAdmin ? 'Supprimer le statut Admin' : 'Activer le statut Admin'}
//                                 </button>
//                                 <button onClick={() => deleteUser(user.id)} className="delete-button">
//                                     Supprimer l'utilisateur
//                                 </button>
//                                 <button onClick={() => handleEditClick(user)} className="edit-button">
//                                     Modifier l'utilisateur
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;

