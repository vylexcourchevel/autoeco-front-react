


//src/pages/AdminPage.js VERSION TEST FONCTIONE ¨POUR LA MODIFICATION SAUF POUR L'IMAGE


import React, { useState, useEffect } from 'react';
import axios from 'axios';


const AdminPage = () => { 
  const [formValues, setFormValues] = useState({
    brand: '',
    model: '',
    immatriculation: '',
    years: '',
    price: '',
    available: '',
    file: null,
  });

  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isEditing, setIsEditing] = useState(false);  // Ajouter état pour gestion de l'affichage

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    console.log('Fetching vehicle data...');
    try {
      const { data } = await axios.get("http://localhost:8002/api/cars/all", {
        withCredentials: true,
      });
      console.log('Fetched vehicle data:', data);
      setVehicles(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des véhicules !', error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setFormValues((prevValues) => ({
  //     ...prevValues,
  //     file: file,
  //   }));
  // };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log('File selected:', file); // Vérifie que le fichier est bien sélectionné
    setFormValues((prevValues) => ({
      ...prevValues,
      file: file,
    }));
  };
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    const formData = new FormData();
    formData.append('brand', formValues.brand);
    formData.append('model', formValues.model);
    formData.append('registrationPlate', formValues.immatriculation);
    formData.append('years', formValues.years);
    formData.append('pricePerDay', formValues.price);
    formData.append('available', formValues.available);
    formData.append('image', formValues.file);

    try {
      const response = await axios.post('http://localhost:8002/api/cars/add', formData);
      console.log(response.data);
      fetchVehicles();
      setFormValues({
        brand: '',
        model: '',
        immatriculation: '',
        years: '',
        price: '',
        available: '',
        file: null,
      }); // Reset form values
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données !', error);
    }
  };

  const handleDelete = async (carId) => {
    console.log('Deleting vehicle with ID:', carId);
    try {
      await axios.delete(`http://localhost:8002/api/cars/delete/${carId}`, {
        withCredentials: true,
      });
      fetchVehicles();
    } catch (error) {
      console.error('Erreur lors de la suppression du véhicule !', error);
    }
  };
// modier un véhicule

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('brand', formValues.brand);
    formData.append('model', formValues.model);
    formData.append('registrationPlate', formValues.immatriculation);
    formData.append('years', formValues.years);
    formData.append('pricePerDay', formValues.price);
    formData.append('available', formValues.available);
    formData.append('image', formValues.file);

  

  try {
    const response = await axios.put(
      `http://localhost:8002/api/cars/update/${selectedVehicle.id}`, 
      formData, 
      {
        withCredentials: true,  // Les cookies, y compris le token, sont envoyés automatiquement
        headers: {
          'Content-Type': 'application/json',  // Définit le type de contenu
        }
      }
    );
    console.log(response.data);
    fetchVehicles(); // Recharger les véhicules pour afficher les données mises à jour
    setSelectedVehicle(null);
    setIsEditing(false); // Cacher le formulaire de modification
  } catch (error) {
    console.error('Erreur lors de la mise à jour du véhicule !', error);
  }
};

  

  const handleEditClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setFormValues({
      brand: vehicle.brand,
      model: vehicle.model,
      immatriculation: vehicle.registrationPlate,
      years: vehicle.years,
      price: vehicle.pricePerDay,
      available: vehicle.available,
      file: null,
    });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setSelectedVehicle(null);
    setIsEditing(false);
    setFormValues({
      brand: '',
      model: '',
      immatriculation: '',
      years: '',
      price: '',
      available: '',
      file: null,
    });
  };

  return (
    <div className="d-flex flex-column" style={{ padding: '20px' }}>
      {/* Conteneur pour rajouter des véhicules */}
      <div style={{
        marginBottom: '40px', // Marge entre les deux conteneurs
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9'
      }}>
        <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Rajouter des Véhicules</h1>
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: 'calc(100% - 100px)', // Full width minus 50px on each side
          maxWidth: '100%', 
          padding: '20px',
          borderRadius: '8px', 
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          flexWrap: 'wrap',  // Allow wrapping for responsiveness
          margin: '0 50px'  // 50px margin on each side
        }}>
          <div className="form-group" style={{ flex: '1 1 12%' }}>
            <label htmlFor="brand">Marque</label>
            <input
              type="text"
              className="form-control"
              id="brand"
              placeholder="Marque du véhicule"
              value={formValues.brand}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group" style={{ flex: '1 1 12%' }}>
            <label htmlFor="model">Modèle</label>
            <input
              type="text"
              className="form-control"
              id="model"
              placeholder="Modèle"
              value={formValues.model}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group" style={{ flex: '1 1 12%' }}>
            <label htmlFor="immatriculation">Immatriculation</label>
            <input
              type="text"
              className="form-control"
              id="immatriculation"
              placeholder="Immatriculation"
              value={formValues.immatriculation}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group" style={{ flex: '1 1 12%' }}>
            <label htmlFor="years">Année</label>
            <input
              type="number"
              className="form-control"
              id="years"
              placeholder="Année"
              value={formValues.years}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group" style={{ flex: '1 1 12%' }}>
            <label htmlFor="price">Prix</label>
            <input
              type="number"
              className="form-control"
              id="price"
              placeholder="Prix"
              value={formValues.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group" style={{ flex: '1 1 12%' }}>
            <label htmlFor="fileUpload">Image</label>
            <div className="input-group">
              <input
                type="file"
                className="form-control"
                id="fileUpload"
                aria-label="Upload"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="form-group" style={{ flex: '1 1 12%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button 
              type="submit" 
              className="btn btn-primary btn-lg"
              style={{
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                width: '100%'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
            >
              Ajouter le véhicule
            </button>
          </div>
        </form>
      </div>

      {/* Conteneur pour la modification de véhicules */}
      {isEditing && (
        <div style={{
          marginBottom: '40px', // Marge entre les deux conteneurs
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#f9f9f9'
        }}>
          <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Modifier un Véhicule</h1>
          <form onSubmit={handleUpdate} style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: 'calc(100% - 100px)', // Full width minus 50px on each side
            maxWidth: '100%', 
            padding: '20px',
            borderRadius: '8px', 
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            flexWrap: 'wrap',  // Allow wrapping for responsiveness
            margin: '0 50px'  // 50px margin on each side
          }}>
            <div className="form-group" style={{ flex: '1 1 12%' }}>
              <label htmlFor="brand">Marque</label>
              <input
                type="text"
                className="form-control"
                id="brand"
                placeholder="Marque du véhicule"
                value={formValues.brand}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group" style={{ flex: '1 1 12%' }}>
              <label htmlFor="model">Modèle</label>
              <input
                type="text"
                className="form-control"
                id="model"
                placeholder="Modèle"
                value={formValues.model}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group" style={{ flex: '1 1 12%' }}>
              <label htmlFor="immatriculation">Immatriculation</label>
              <input
                type="text"
                className="form-control"
                id="immatriculation"
                placeholder="Immatriculation"
                value={formValues.immatriculation}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group" style={{ flex: '1 1 12%' }}>
              <label htmlFor="years">Année</label>
              <input
                type="number"
                className="form-control"
                id="years"
                placeholder="Année"
                value={formValues.years}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group" style={{ flex: '1 1 12%' }}>
              <label htmlFor="price">Prix</label>
              <input
                type="number"
                className="form-control"
                id="price"
                placeholder="Prix"
                value={formValues.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group" style={{ flex: '1 1 12%' }}>
              <label htmlFor="fileUpload">Image</label>
              <div className="input-group">
                <input
                  type="file"
                  className="form-control"
                  id="fileUpload"
                  aria-label="Upload"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="form-group" style={{ flex: '1 1 12%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <button 
                type="submit" 
                className="btn btn-primary btn-lg"
                style={{
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '10px 20px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  width: '100%'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
              >
                Mettre à jour le véhicule
              </button>
              <button 
                type="button"
                className="btn btn-secondary btn-lg"
                style={{
                  backgroundColor: '#6c757d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '10px 20px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  marginLeft: '10px',
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
                onClick={handleCancelEdit}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Conteneur pour la liste des véhicules */}
      <div style={{
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9'
      }}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Liste des Véhicules</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {vehicles.length === 0 ? (
            <p>Aucune voiture disponible</p>
          ) : (
            vehicles.map((vehicle) => (
              <div key={vehicle.id} style={{ flex: '1 1 auto', maxWidth: '300px' }}>
                <div className="card h-100">
                  {vehicle.CarImages && vehicle.CarImages.length > 0 ? (
                    <img
                      src={`http://localhost:8002${vehicle.CarImages[0].imageURL}`}
                      className="card-img-top"
                      alt={`${vehicle.brand} ${vehicle.model}`}
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
                    <h5 className="card-title">{vehicle.brand} {vehicle.model}</h5>
                    <p className="card-text">Année: {vehicle.years}</p>
                    <p className="card-text">Prix par jour: {vehicle.pricePerDay} €</p>
                    <p className="card-text">Disponibilité: {vehicle.available ? 'Oui' : 'Non'}</p>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEditClick(vehicle)}
                    >
                      Modifier
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(vehicle.id)}
                      style={{ marginLeft: '10px' }}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;







// // //src/pages/AdminPage.js VERSION TEST

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';


// const AdminPage = () => { 
//   const [formValues, setFormValues] = useState({
//     brand: '',
//     model: '',
//     immatriculation: '',
//     years: '',
//     price: '',
//     available: '',
//     file: null,
//   });

//   const [vehicles, setVehicles] = useState([]);
//   const [selectedVehicle, setSelectedVehicle] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);  // Ajouter état pour gestion de l'affichage

//   useEffect(() => {
//     fetchVehicles();
//   }, []);

//   const fetchVehicles = async () => {
//     console.log('Fetching vehicle data...');
//     try {
//       const { data } = await axios.get("http://localhost:8002/api/cars/all", {
//         withCredentials: true,
//       });
//       console.log('Fetched vehicle data:', data);
//       setVehicles(data);
//     } catch (error) {
//       console.error('Erreur lors de la récupération des véhicules !', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormValues((prevValues) => ({
//       ...prevValues,
//       [id]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormValues((prevValues) => ({
//       ...prevValues,
//       file: file,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(formValues);
//     const formData = new FormData();
//     formData.append('brand', formValues.brand);
//     formData.append('model', formValues.model);
//     formData.append('registrationPlate', formValues.immatriculation);
//     formData.append('years', formValues.years);
//     formData.append('pricePerDay', formValues.price);
//     formData.append('available', formValues.available);
//     formData.append('image', formValues.file);

//     try {
//       const response = await axios.post('http://localhost:8002/api/cars/add', formData);
//       console.log(response.data);
//       fetchVehicles();
//       setFormValues({
//         brand: '',
//         model: '',
//         immatriculation: '',
//         years: '',
//         price: '',
//         available: '',
//         file: null,
//       }); // Reset form values
//     } catch (error) {
//       console.error('Erreur lors de l\'envoi des données !', error);
//     }
//   };

//   const handleDelete = async (carId) => {
//     console.log('Deleting vehicle with ID:', carId);
//     try {
//       await axios.delete(`http://localhost:8002/api/cars/delete/${carId}`, {
//         withCredentials: true,
//       });
//       fetchVehicles();
//     } catch (error) {
//       console.error('Erreur lors de la suppression du véhicule !', error);
//     }
//   };

//   const handleUpdate = async (e) => {
    
//     e.preventDefault();

//     console.log(`Updating vehicle with ID: ${selectedVehicle.id}`);


//     const formData = new FormData();
//     formData.append('brand', formValues.brand);
//     formData.append('model', formValues.model);
//     formData.append('registrationPlate', formValues.immatriculation);
//     formData.append('years', formValues.years);
//     formData.append('pricePerDay', formValues.price);
//     formData.append('available', formValues.available);
//     formData.append('image', formValues.file);
    
   


//     try {
 
    
//       const response = await axios.put(`http://localhost:8002/api/cars/update/${selectedVehicle.id}`, formData,{
//         withCredentials: true,
//     });
        
      
//       console.log(response.data);
//       fetchVehicles();
//       setSelectedVehicle(null);
//       setIsEditing(false); // Hide the edit form
//     } catch (error) {
//       console.error('Erreur lors de la mise à jour du véhicule !', error);
//     }
//   };

//   const handleEditClick = (vehicle) => {
//     setSelectedVehicle(vehicle);
//     setFormValues({
//       brand: vehicle.brand,
//       model: vehicle.model,
//       immatriculation: vehicle.registrationPlate,
//       years: vehicle.years,
//       price: vehicle.pricePerDay,
//       available: vehicle.available,
//       file: null,
//     });
//     setIsEditing(true);
//   };

//   const handleCancelEdit = () => {
//     setSelectedVehicle(null);
//     setIsEditing(false);
//     setFormValues({
//       brand: '',
//       model: '',
//       immatriculation: '',
//       years: '',
//       price: '',
//       available: '',
//       file: null,
//     });
//   };

//   return (
//     <div className="d-flex flex-column" style={{ padding: '20px' }}>
//       {/* Conteneur pour rajouter des véhicules */}
//       <div style={{
//         marginBottom: '40px', // Marge entre les deux conteneurs
//         padding: '20px',
//         borderRadius: '8px',
//         boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//         backgroundColor: '#f9f9f9'
//       }}>
//         <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Rajouter des Véhicules</h1>
//         <form onSubmit={handleSubmit} style={{
//           display: 'flex',
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           width: 'calc(100% - 100px)', // Full width minus 50px on each side
//           maxWidth: '100%', 
//           padding: '20px',
//           borderRadius: '8px', 
//           boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//           flexWrap: 'wrap',  // Allow wrapping for responsiveness
//           margin: '0 50px'  // 50px margin on each side
//         }}>
//           <div className="form-group" style={{ flex: '1 1 12%' }}>
//             <label htmlFor="brand">Marque</label>
//             <input
//               type="text"
//               className="form-control"
//               id="brand"
//               placeholder="Marque du véhicule"
//               value={formValues.brand}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group" style={{ flex: '1 1 12%' }}>
//             <label htmlFor="model">Modèle</label>
//             <input
//               type="text"
//               className="form-control"
//               id="model"
//               placeholder="Modèle"
//               value={formValues.model}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group" style={{ flex: '1 1 12%' }}>
//             <label htmlFor="immatriculation">Immatriculation</label>
//             <input
//               type="text"
//               className="form-control"
//               id="immatriculation"
//               placeholder="Immatriculation"
//               value={formValues.immatriculation}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group" style={{ flex: '1 1 12%' }}>
//             <label htmlFor="years">Année</label>
//             <input
//               type="number"
//               className="form-control"
//               id="years"
//               placeholder="Année"
//               value={formValues.years}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group" style={{ flex: '1 1 12%' }}>
//             <label htmlFor="price">Prix</label>
//             <input
//               type="number"
//               className="form-control"
//               id="price"
//               placeholder="Prix"
//               value={formValues.price}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group" style={{ flex: '1 1 12%' }}>
//             <label htmlFor="fileUpload">Image</label>
//             <div className="input-group">
//               <input
//                 type="file"
//                 className="form-control"
//                 id="fileUpload"
//                 aria-label="Upload"
//                 onChange={handleFileChange}
//               />
//             </div>
//           </div>
//           <div className="form-group" style={{ flex: '1 1 12%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//             <button 
//               type="submit" 
//               className="btn btn-primary btn-lg"
//               style={{
//                 backgroundColor: '#007bff',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: '5px',
//                 padding: '10px 20px',
//                 fontSize: '16px',
//                 cursor: 'pointer',
//                 transition: 'background-color 0.3s',
//                 width: '100%'
//               }}
//               onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
//               onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
//             >
//               Ajouter le véhicule
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Conteneur pour la modification de véhicules */}
//       {isEditing && (
//         <div style={{
//           marginBottom: '40px', // Marge entre les deux conteneurs
//           padding: '20px',
//           borderRadius: '8px',
//           boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//           backgroundColor: '#f9f9f9'
//         }}>
//           <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Modifier un Véhicule</h1>
//           <form onSubmit={handleUpdate} style={{
//             display: 'flex',
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             width: 'calc(100% - 100px)', // Full width minus 50px on each side
//             maxWidth: '100%', 
//             padding: '20px',
//             borderRadius: '8px', 
//             boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//             flexWrap: 'wrap',  // Allow wrapping for responsiveness
//             margin: '0 50px'  // 50px margin on each side
//           }}>
//             <div className="form-group" style={{ flex: '1 1 12%' }}>
//               <label htmlFor="brand">Marque</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="brand"
//                 placeholder="Marque du véhicule"
//                 value={formValues.brand}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="form-group" style={{ flex: '1 1 12%' }}>
//               <label htmlFor="model">Modèle</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="model"
//                 placeholder="Modèle"
//                 value={formValues.model}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="form-group" style={{ flex: '1 1 12%' }}>
//               <label htmlFor="immatriculation">Immatriculation</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="immatriculation"
//                 placeholder="Immatriculation"
//                 value={formValues.immatriculation}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="form-group" style={{ flex: '1 1 12%' }}>
//               <label htmlFor="years">Année</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 id="years"
//                 placeholder="Année"
//                 value={formValues.years}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="form-group" style={{ flex: '1 1 12%' }}>
//               <label htmlFor="price">Prix</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 id="price"
//                 placeholder="Prix"
//                 value={formValues.price}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="form-group" style={{ flex: '1 1 12%' }}>
//               <label htmlFor="fileUpload">Image</label>
//               <div className="input-group">
//                 <input
//                   type="file"
//                   className="form-control"
//                   id="fileUpload"
//                   aria-label="Upload"
//                   onChange={handleFileChange}
//                 />
//               </div>
//             </div>
//             <div className="form-group" style={{ flex: '1 1 12%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//               <button 
//                 type="submit" 
//                 className="btn btn-primary btn-lg"
//                 style={{
//                   backgroundColor: '#007bff',
//                   color: '#fff',
//                   border: 'none',
//                   borderRadius: '5px',
//                   padding: '10px 20px',
//                   fontSize: '16px',
//                   cursor: 'pointer',
//                   transition: 'background-color 0.3s',
//                   width: '100%'
//                 }}
//                 onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
//                 onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
//               >
//                 Mettre à jour le véhicule
//               </button>
//               <button 
//                 type="button"
//                 className="btn btn-secondary btn-lg"
//                 style={{
//                   backgroundColor: '#6c757d',
//                   color: '#fff',
//                   border: 'none',
//                   borderRadius: '5px',
//                   padding: '10px 20px',
//                   fontSize: '16px',
//                   cursor: 'pointer',
//                   transition: 'background-color 0.3s',
//                   marginLeft: '10px',
//                 }}
//                 onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
//                 onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
//                 onClick={handleCancelEdit}
//               >
//                 Annuler
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Conteneur pour la liste des véhicules */}
//       <div style={{
//         padding: '20px',
//         borderRadius: '8px',
//         boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//         backgroundColor: '#f9f9f9'
//       }}>
//         <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Liste des Véhicules</h2>
//         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
//           {vehicles.length === 0 ? (
//             <p>Aucune voiture disponible</p>
//           ) : (
//             vehicles.map((vehicle) => (
//               <div key={vehicle.id} style={{ flex: '1 1 auto', maxWidth: '300px' }}>
//                 <div className="card h-100">
//                   {vehicle.CarImages && vehicle.CarImages.length > 0 ? (
//                     <img
//                       src={`http://localhost:8002${vehicle.CarImages[0].imageURL}`}
//                       className="card-img-top"
//                       alt={`${vehicle.brand} ${vehicle.model}`}
//                       style={{ width: '100%', height: 'auto' }}
//                     />
//                   ) : (
//                     <img
//                       src="/images/default.png"
//                       className="card-img-top"
//                       alt="Default"
//                       style={{ width: '100%', height: 'auto' }}
//                     />
//                   )}
//                   <div className="card-body">
//                     <h5 className="card-title">{vehicle.brand} {vehicle.model}</h5>
//                     <p className="card-text">Année: {vehicle.years}</p>
//                     <p className="card-text">Prix par jour: {vehicle.pricePerDay} €</p>
//                     <p className="card-text">Disponibilité: {vehicle.available ? 'Oui' : 'Non'}</p>
//                     <button
//                       className="btn btn-warning"
//                       onClick={() => handleEditClick(vehicle)}
//                     >
//                       Modifier
//                     </button>
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => handleDelete(vehicle.id)}
//                       style={{ marginLeft: '10px' }}
//                     >
//                       Supprimer
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminPage;



// //src/pages/AdminPage.js VERSION OK

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';


// const AdminPage = () => { 
//   const [formValues, setFormValues] = useState({
//     brand: '',
//     model: '',
//     immatriculation: '',
//     years: '',
//     price: '',
//     available: '',
//     file: null,
//   });

//   const [vehicles, setVehicles] = useState([]);
//   const [selectedVehicle, setSelectedVehicle] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);  // Ajouter état pour gestion de l'affichage

//   useEffect(() => {
//     fetchVehicles();
//   }, []);

//   const fetchVehicles = async () => {
//     console.log('Fetching vehicle data...');
//     try {
//       const { data } = await axios.get("http://localhost:8002/api/cars/all", {
//         withCredentials: true,
//       });
//       console.log('Fetched vehicle data:', data);
//       setVehicles(data);
//     } catch (error) {
//       console.error('Erreur lors de la récupération des véhicules !', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormValues((prevValues) => ({
//       ...prevValues,
//       [id]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormValues((prevValues) => ({
//       ...prevValues,
//       file: file,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(formValues);
//     const formData = new FormData();
//     formData.append('brand', formValues.brand);
//     formData.append('model', formValues.model);
//     formData.append('registrationPlate', formValues.immatriculation);
//     formData.append('years', formValues.years);
//     formData.append('pricePerDay', formValues.price);
//     formData.append('available', formValues.available);
//     formData.append('image', formValues.file);

//     try {
//       const response = await axios.post('http://localhost:8002/api/cars/add', formData);
//       console.log(response.data);
//       fetchVehicles();
//       setFormValues({
//         brand: '',
//         model: '',
//         immatriculation: '',
//         years: '',
//         price: '',
//         available: '',
//         file: null,
//       }); // Reset form values
//     } catch (error) {
//       console.error('Erreur lors de l\'envoi des données !', error);
//     }
//   };

//   const handleDelete = async (carId) => {
//     console.log('Deleting vehicle with ID:', carId);
//     try {
//       await axios.delete(`http://localhost:8002/api/cars/delete/${carId}`, {
//         withCredentials: true,
//       });
//       fetchVehicles();
//     } catch (error) {
//       console.error('Erreur lors de la suppression du véhicule !', error);
//     }
//   };
// // modier un véhicule

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('brand', formValues.brand);
//     formData.append('model', formValues.model);
//     formData.append('registrationPlate', formValues.immatriculation);
//     formData.append('years', formValues.years);
//     formData.append('pricePerDay', formValues.price);
//     formData.append('available', formValues.available);
//     formData.append('image', formValues.file);

//     try {
//       const response = await axios.put(`http://localhost:8002/api/cars/update/${selectedVehicle.id}`, formData,{
//         withCredentials: true,
//     });
        
      
//       console.log(response.data);
//       fetchVehicles();
//       setSelectedVehicle(null);
//       setIsEditing(false); // Hide the edit form
//     } catch (error) {
//       console.error('Erreur lors de la mise à jour du véhicule !', error);
//     }
//   };

//   const handleEditClick = (vehicle) => {
//     setSelectedVehicle(vehicle);
//     setFormValues({
//       brand: vehicle.brand,
//       model: vehicle.model,
//       immatriculation: vehicle.registrationPlate,
//       years: vehicle.years,
//       price: vehicle.pricePerDay,
//       available: vehicle.available,
//       file: null,
//     });
//     setIsEditing(true);
//   };

//   const handleCancelEdit = () => {
//     setSelectedVehicle(null);
//     setIsEditing(false);
//     setFormValues({
//       brand: '',
//       model: '',
//       immatriculation: '',
//       years: '',
//       price: '',
//       available: '',
//       file: null,
//     });
//   };

//   return (
//     <div className="d-flex flex-column" style={{ padding: '20px' }}>
//       {/* Conteneur pour rajouter des véhicules */}
//       <div style={{
//         marginBottom: '40px', // Marge entre les deux conteneurs
//         padding: '20px',
//         borderRadius: '8px',
//         boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//         backgroundColor: '#f9f9f9'
//       }}>
//         <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Rajouter des Véhicules</h1>
//         <form onSubmit={handleSubmit} style={{
//           display: 'flex',
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           width: 'calc(100% - 100px)', // Full width minus 50px on each side
//           maxWidth: '100%', 
//           padding: '20px',
//           borderRadius: '8px', 
//           boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//           flexWrap: 'wrap',  // Allow wrapping for responsiveness
//           margin: '0 50px'  // 50px margin on each side
//         }}>
//           <div className="form-group" style={{ flex: '1 1 12%' }}>
//             <label htmlFor="brand">Marque</label>
//             <input
//               type="text"
//               className="form-control"
//               id="brand"
//               placeholder="Marque du véhicule"
//               value={formValues.brand}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group" style={{ flex: '1 1 12%' }}>
//             <label htmlFor="model">Modèle</label>
//             <input
//               type="text"
//               className="form-control"
//               id="model"
//               placeholder="Modèle"
//               value={formValues.model}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group" style={{ flex: '1 1 12%' }}>
//             <label htmlFor="immatriculation">Immatriculation</label>
//             <input
//               type="text"
//               className="form-control"
//               id="immatriculation"
//               placeholder="Immatriculation"
//               value={formValues.immatriculation}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group" style={{ flex: '1 1 12%' }}>
//             <label htmlFor="years">Année</label>
//             <input
//               type="number"
//               className="form-control"
//               id="years"
//               placeholder="Année"
//               value={formValues.years}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group" style={{ flex: '1 1 12%' }}>
//             <label htmlFor="price">Prix</label>
//             <input
//               type="number"
//               className="form-control"
//               id="price"
//               placeholder="Prix"
//               value={formValues.price}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group" style={{ flex: '1 1 12%' }}>
//             <label htmlFor="fileUpload">Image</label>
//             <div className="input-group">
//               <input
//                 type="file"
//                 className="form-control"
//                 id="fileUpload"
//                 aria-label="Upload"
//                 onChange={handleFileChange}
//               />
//             </div>
//           </div>
//           <div className="form-group" style={{ flex: '1 1 12%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//             <button 
//               type="submit" 
//               className="btn btn-primary btn-lg"
//               style={{
//                 backgroundColor: '#007bff',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: '5px',
//                 padding: '10px 20px',
//                 fontSize: '16px',
//                 cursor: 'pointer',
//                 transition: 'background-color 0.3s',
//                 width: '100%'
//               }}
//               onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
//               onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
//             >
//               Ajouter le véhicule
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Conteneur pour la modification de véhicules */}
//       {isEditing && (
//         <div style={{
//           marginBottom: '40px', // Marge entre les deux conteneurs
//           padding: '20px',
//           borderRadius: '8px',
//           boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//           backgroundColor: '#f9f9f9'
//         }}>
//           <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Modifier un Véhicule</h1>
//           <form onSubmit={handleUpdate} style={{
//             display: 'flex',
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             width: 'calc(100% - 100px)', // Full width minus 50px on each side
//             maxWidth: '100%', 
//             padding: '20px',
//             borderRadius: '8px', 
//             boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//             flexWrap: 'wrap',  // Allow wrapping for responsiveness
//             margin: '0 50px'  // 50px margin on each side
//           }}>
//             <div className="form-group" style={{ flex: '1 1 12%' }}>
//               <label htmlFor="brand">Marque</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="brand"
//                 placeholder="Marque du véhicule"
//                 value={formValues.brand}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="form-group" style={{ flex: '1 1 12%' }}>
//               <label htmlFor="model">Modèle</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="model"
//                 placeholder="Modèle"
//                 value={formValues.model}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="form-group" style={{ flex: '1 1 12%' }}>
//               <label htmlFor="immatriculation">Immatriculation</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="immatriculation"
//                 placeholder="Immatriculation"
//                 value={formValues.immatriculation}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="form-group" style={{ flex: '1 1 12%' }}>
//               <label htmlFor="years">Année</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 id="years"
//                 placeholder="Année"
//                 value={formValues.years}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="form-group" style={{ flex: '1 1 12%' }}>
//               <label htmlFor="price">Prix</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 id="price"
//                 placeholder="Prix"
//                 value={formValues.price}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="form-group" style={{ flex: '1 1 12%' }}>
//               <label htmlFor="fileUpload">Image</label>
//               <div className="input-group">
//                 <input
//                   type="file"
//                   className="form-control"
//                   id="fileUpload"
//                   aria-label="Upload"
//                   onChange={handleFileChange}
//                 />
//               </div>
//             </div>
//             <div className="form-group" style={{ flex: '1 1 12%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//               <button 
//                 type="submit" 
//                 className="btn btn-primary btn-lg"
//                 style={{
//                   backgroundColor: '#007bff',
//                   color: '#fff',
//                   border: 'none',
//                   borderRadius: '5px',
//                   padding: '10px 20px',
//                   fontSize: '16px',
//                   cursor: 'pointer',
//                   transition: 'background-color 0.3s',
//                   width: '100%'
//                 }}
//                 onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
//                 onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
//               >
//                 Mettre à jour le véhicule
//               </button>
//               <button 
//                 type="button"
//                 className="btn btn-secondary btn-lg"
//                 style={{
//                   backgroundColor: '#6c757d',
//                   color: '#fff',
//                   border: 'none',
//                   borderRadius: '5px',
//                   padding: '10px 20px',
//                   fontSize: '16px',
//                   cursor: 'pointer',
//                   transition: 'background-color 0.3s',
//                   marginLeft: '10px',
//                 }}
//                 onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
//                 onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
//                 onClick={handleCancelEdit}
//               >
//                 Annuler
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Conteneur pour la liste des véhicules */}
//       <div style={{
//         padding: '20px',
//         borderRadius: '8px',
//         boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//         backgroundColor: '#f9f9f9'
//       }}>
//         <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Liste des Véhicules</h2>
//         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
//           {vehicles.length === 0 ? (
//             <p>Aucune voiture disponible</p>
//           ) : (
//             vehicles.map((vehicle) => (
//               <div key={vehicle.id} style={{ flex: '1 1 auto', maxWidth: '300px' }}>
//                 <div className="card h-100">
//                   {vehicle.CarImages && vehicle.CarImages.length > 0 ? (
//                     <img
//                       src={`http://localhost:8002${vehicle.CarImages[0].imageURL}`}
//                       className="card-img-top"
//                       alt={`${vehicle.brand} ${vehicle.model}`}
//                       style={{ width: '100%', height: 'auto' }}
//                     />
//                   ) : (
//                     <img
//                       src="/images/default.png"
//                       className="card-img-top"
//                       alt="Default"
//                       style={{ width: '100%', height: 'auto' }}
//                     />
//                   )}
//                   <div className="card-body">
//                     <h5 className="card-title">{vehicle.brand} {vehicle.model}</h5>
//                     <p className="card-text">Année: {vehicle.years}</p>
//                     <p className="card-text">Prix par jour: {vehicle.pricePerDay} €</p>
//                     <p className="card-text">Disponibilité: {vehicle.available ? 'Oui' : 'Non'}</p>
//                     <button
//                       className="btn btn-warning"
//                       onClick={() => handleEditClick(vehicle)}
//                     >
//                       Modifier
//                     </button>
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => handleDelete(vehicle.id)}
//                       style={{ marginLeft: '10px' }}
//                     >
//                       Supprimer
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminPage;

