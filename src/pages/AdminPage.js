import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Adminpage = () => {
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormValues((prevValues) => ({
      ...prevValues,
      file: file,
    }));
  };

  const handleSubmit = async (e) => {
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
      const response = await axios.post('http://localhost:8002/api/cars/add', formData);
      console.log(response.data);
      fetchVehicles();
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('brand', selectedVehicle.brand);
    formData.append('model', selectedVehicle.model);
    formData.append('registrationPlate', selectedVehicle.registrationPlate);
    formData.append('years', selectedVehicle.years);
    formData.append('pricePerDay', selectedVehicle.pricePerDay);
    formData.append('available', selectedVehicle.available);
    formData.append('image', selectedVehicle.file);

    try {
      const response = await axios.put(`http://localhost:8002/api/cars/update/${selectedVehicle.id}`, formData);
      console.log(response.data);
      fetchVehicles();
      setSelectedVehicle(null);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du véhicule !', error);
    }
  };

  const handleEditClick = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  return (
    <div className="d-flex flex-column" style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Rajouter des Véhicules</h1>
      <form onSubmit={handleSubmit} style={{
           display: 'flex',
           flexDirection: 'row',
           justifyContent: 'space-between',
           alignItems: 'center',
           width: 'calc(100% - 100px)',
           maxWidth: '100%', 
           padding: '20px',
           borderRadius: '8px',
           boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
           flexWrap: 'wrap',
           margin: '0 50px'
      }}>
        {/* Formulaire pour ajouter un véhicule */}
        {/* ... */}
      </form>

      {/* Formulaire de modification */}
      {selectedVehicle && (
        <form onSubmit={handleUpdate} style={{ marginBottom: '20px' }}>
          <h2>Modifier le Véhicule</h2>
          <div className="form-group">
            <label htmlFor="brand">Marque</label>
            <input
              type="text"
              className="form-control"
              id="brand"
              placeholder="Marque du véhicule"
              value={selectedVehicle.brand}
              onChange={e => setSelectedVehicle(prev => ({ ...prev, brand: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="model">Modèle</label>
            <input
              type="text"
              className="form-control"
              id="model"
              placeholder="Modèle"
              value={selectedVehicle.model}
              onChange={e => setSelectedVehicle(prev => ({ ...prev, model: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="registrationPlate">Immatriculation</label>
            <input
              type="text"
              className="form-control"
              id="registrationPlate"
              placeholder="Immatriculation"
              value={selectedVehicle.registrationPlate}
              onChange={e => setSelectedVehicle(prev => ({ ...prev, registrationPlate: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="years">Année</label>
            <input
              type="number"
              className="form-control"
              id="years"
              placeholder="Année"
              value={selectedVehicle.years}
              onChange={e => setSelectedVehicle(prev => ({ ...prev, years: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pricePerDay">Prix</label>
            <input
              type="number"
              className="form-control"
              id="pricePerDay"
              placeholder="Prix"
              value={selectedVehicle.pricePerDay}
              onChange={e => setSelectedVehicle(prev => ({ ...prev, pricePerDay: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fileUpload">Image</label>
            <input
              type="file"
              className="form-control"
              id="fileUpload"
              aria-label="Upload"
              onChange={e => setSelectedVehicle(prev => ({ ...prev, file: e.target.files[0] }))}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Mettre à jour
          </button>
        </form>
      )}

      {/* Liste des véhicules */}
      <div style={{ marginTop: '40px', width: 'calc(100% - 100px)', margin: '0 50px' }}>
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
                      className="btn btn-secondary mt-3"
                      onClick={() => handleEditClick(vehicle)}
                    >
                      Modifier
                    </button>
                    <button
                      className="btn btn-danger mt-3"
                      onClick={() => handleDelete(vehicle.id)}
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

export default Adminpage;



// // src/pages/AdminPage.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Adminpage = () => {
//   const [formValues, setFormValues] = useState({
//     brand: '',
//     model: '',
//     immatriculation: '',
//     years: '',
//     price: '',
//     available: '',
//     file: null,
//   });

//   const [vehicles, setVehicles] = useState([]); // État pour stocker les véhicules

//   // Fonction pour récupérer les données des véhicules
//   const fetchVehicles = async () => {
//     console.log('Fetching vehicle data...'); // Log pour indiquer le début de la récupération des données
//     try {
//       // Effectue une requête GET pour récupérer toutes les voitures depuis l'API
//       const { data } = await axios.get("http://localhost:8002/api/cars/all", {
//         withCredentials: true, // Inclut les cookies dans la requête pour l'authentification
//       });
//       console.log('Fetched vehicle data:', data);
//       setVehicles(data);
//     } catch (error) {
//       console.error('Erreur lors de la récupération des véhicules !', error);
//     }
//   };

//   // Appeler la fonction fetchVehicles lorsque le composant est monté
//   useEffect(() => {
//     fetchVehicles();
//   }, []);

//   // Fonction pour gérer la soumission du formulaire
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
//       fetchVehicles(); // Recharger les véhicules après l'ajout
//     } catch (error) {
//       console.error('Erreur lors de l\'envoi des données !', error);
//     }
//   };

//   // Fonction pour supprimer un véhicule
//   const handleDelete = async (CarId) => {
//     console.log('Deleting vehicle with ID:', CarId);
//     try {
//       await axios.delete(`http://localhost:8002/api/cars/delete/${CarId}`, {
//         withCredentials: true,
//       });
//       // Recharger la liste des véhicules après la suppression
//       fetchVehicles();
//     } catch (error) {
//       console.error('Erreur lors de la suppression du véhicule !', error);
//     }
//   };

//   return (
//     <div className="d-flex flex-column" style={{ padding: '20px' }}>
//       <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Rajouter des Véhicules</h1>
//       <form onSubmit={handleSubmit} style={{
//            display: 'flex',
//            flexDirection: 'row',
//            justifyContent: 'space-between',
//            alignItems: 'center',
//            width: 'calc(100% - 100px)',
//            maxWidth: '100%', 
//            padding: '20px',
//            borderRadius: '8px',
//            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//            flexWrap: 'wrap',
//            margin: '0 50px'
//       }}>
//         {/* Formulaire pour ajouter un véhicule */}
//         <div className="form-group" style={{ flex: '1 1 12%' }}>
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
//       </form>

//       {/* Tableau des véhicules sous forme de lignes */}
//       <div style={{ marginTop: '40px', width: 'calc(100% - 100px)', margin: '0 50px' }}>
//         <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Liste des Véhicules</h2>
//         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
//           {vehicles.length === 0 ? (
//             <p>Aucune voiture disponible</p>
//           ) : (
//             vehicles.map((vehicle, index) => (
//               <div key={index} style={{ flex: '1 1 auto', maxWidth: '300px' }}>
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
//                       className="btn btn-danger mt-3"
//                       onClick={() => handleDelete(vehicle.id)}
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

// export default Adminpage;


// // src/pages/AdminPage.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Adminpage = () => {
//   const [formValues, setFormValues] = useState({
//     brand: '',
//     model: '',
//     immatriculation: '',
//     years: '',
//     price: '',
//     available: '',
//     file: null,
//   });

//   const [vehicles, setVehicles] = useState([]); // État pour stocker les véhicules

//   // Fonction pour récupérer les données des véhicules
//   const fetchVehicles = async () => {
//     console.log('Fetching vehicle data...'); // Log pour indiquer le début de la récupération des données
//     try {
//       // Effectue une requête GET pour récupérer toutes les voitures depuis l'API
//       const { data } = await axios.get("http://localhost:8002/api/cars/all", {
//         withCredentials: true, // Inclut les cookies dans la requête pour l'authentification
//       });
//       console.log('Fetched vehicle data:', data);
//       setVehicles(data);
//     } catch (error) {
//       console.error('Erreur lors de la récupération des véhicules !', error);
//     }
//   };

//   // Appeler la fonction fetchVehicles lorsque le composant est monté
//   useEffect(() => {
//     fetchVehicles();
//   }, []);

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
//       fetchVehicles(); // Recharger les véhicules après l'ajout
//     } catch (error) {
//       console.error('Erreur lors de l\'envoi des données !', error);
//     }
//   };

//   return (
//     <div className="d-flex flex-column" style={{ padding: '20px' }}>
//       <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Rajouter des Véhicules</h1>
//       <form onSubmit={handleSubmit} style={{
//            display: 'flex',
//            flexDirection: 'row',
//            justifyContent: 'space-between',
//            alignItems: 'center',
//            width: 'calc(100% - 100px)',
//            maxWidth: '100%', 
//            padding: '20px',
//            borderRadius: '8px',
//            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//            flexWrap: 'wrap',
//            margin: '0 50px'
//       }}>
//         <div className="form-group" style={{ flex: '1 1 12%' }}>
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
//       </form>

//       {/* Tableau des véhicules sous forme de lignes */}
//       <div style={{ marginTop: '40px', width: 'calc(100% - 100px)', margin: '0 50px' }}>
//         <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Liste des Véhicules</h2>
//         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
//           {vehicles.length === 0 ? (
//             <p>Aucune voiture disponible</p>
//           ) : (
//             vehicles.map((vehicle, index) => (
//               <div key={index} style={{ flex: '1 1 auto', maxWidth: '300px' }}>
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
//                     <p className="card-text">Disponibilité: {vehicle.available ? 'Yes' : 'No'}</p>
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

// export default Adminpage;



// // src/pages/AdminPage.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Adminpage = () => {
//   const [formValues, setFormValues] = useState({
//     brand: '',
//     model: '',
//     immatriculation: '',
//     years: '',
//     price: '',
//     available: '',
//     file: null,
//   });

//   const [vehicles, setVehicles] = useState([]); // État pour stocker les véhicules

//   // Fonction pour récupérer les données des véhicules
//   const fetchVehicles = async () => {
//     console.log('Fetching vehicle data...'); // Log pour indiquer le début de la récupération des données
//     try {
//       // Effectue une requête GET pour récupérer toutes les voitures depuis l'API
//       const { data } = await axios.get("http://localhost:8002/api/cars/all", {
//         withCredentials: true, // Inclut les cookies dans la requête pour l'authentification
//       });
//       console.log('Fetched vehicle data:', data);
//       setVehicles(data);
//     } catch (error) {
//       console.error('Erreur lors de la récupération des véhicules !', error);
//     }
//   };

//   // Appeler la fonction fetchVehicles lorsque le composant est monté
//   useEffect(() => {
//     fetchVehicles();
//   }, []);

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
//       fetchVehicles(); // Recharger les véhicules après l'ajout
//     } catch (error) {
//       console.error('Erreur lors de l\'envoi des données !', error);
//     }
//   };

//   return (
//     <div className="d-flex flex-column" style={{ padding: '20px' }}>
//       <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Rajouter des Véhicules</h1>
//       <form onSubmit={handleSubmit} style={{
//            display: 'flex',
//            flexDirection: 'row',
//            justifyContent: 'space-between',
//            alignItems: 'center',
//            width: 'calc(100% - 100px)',
//            maxWidth: '100%', 
//            padding: '20px',
//            borderRadius: '8px',
//            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//            flexWrap: 'wrap',
//            margin: '0 50px'
//       }}>
//         <div className="form-group" style={{ flex: '1 1 12%' }}>
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
//       </form>

//       {/* Tableau des véhicules */}
//       <div style={{ marginTop: '40px', width: 'calc(100% - 100px)', margin: '0 50px' }}>
//         <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Liste des Véhicules</h2>
//         <div className="container">
//           <div className="row">
//             {vehicles.length === 0 ? (
//               <p>Aucune voiture disponible</p>
//             ) : (
//               vehicles.map((vehicle, index) => (
//                 <div key={index} className="col-md-4 card-container">
//                   <div className="card h-100">
//                     {vehicle.CarImages && vehicle.CarImages.length > 0 ? (
//                       <img
//                         src={`http://localhost:8002${vehicle.CarImages[0].imageURL}`}
//                         className="card-img-top"
//                         alt={`${vehicle.brand} ${vehicle.model}`}
//                         style={{ width: '100%', height: 'auto' }}
//                       />
//                     ) : (
//                       <img
//                         src="/images/default.png"
//                         className="card-img-top"
//                         alt="Default"
//                         style={{ width: '100%', height: 'auto' }}
//                       />
//                     )}
//                     <div className="card-body">
//                       <h5 className="card-title">{vehicle.brand} {vehicle.model}</h5>
//                       <p className="card-text">Année: {vehicle.years}</p>
//                       <p className="card-text">Prix par jour: {vehicle.pricePerDay} €</p>
//                       <p className="card-text">Disponibilité: {vehicle.available ? 'Yes' : 'No'}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Adminpage;

// // src/pages/AdminPage.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Adminpage = () => {
//   const [formValues, setFormValues] = useState({
//     brand: '',
//     model: '',
//     immatriculation: '',
//     years: '',
//     price: '',
//     available: '',
//     file: null,
//   });

//   const [vehicles, setVehicles] = useState([]); // État pour stocker les véhicules

//   // Fonction pour récupérer les données des véhicules
//   const fetchVehicles = async () => {
//     try {
//       const response = await axios.get('http://localhost:8002/api/cars');
//       setVehicles(response.data);
//     } catch (error) {
//       console.error('Erreur lors de la récupération des véhicules !', error);
//     }
//   };

//   // Appeler la fonction fetchVehicles lorsque le composant est monté
//   useEffect(() => {
//     fetchVehicles();
//   }, []);

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
//       fetchVehicles(); // Recharger les véhicules après l'ajout
//     } catch (error) {
//       console.error('Erreur lors de l\'envoi des données !', error);
//     }
//   };

//   return (
//     <div className="d-flex flex-column" style={{ padding: '20px' }}>
//       <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Rajouter des Véhicules</h1>
//       <form onSubmit={handleSubmit} style={{
//            display: 'flex',
//            flexDirection: 'row',
//            justifyContent: 'space-between',
//            alignItems: 'center',
//            width: 'calc(100% - 100px)',
//            maxWidth: '100%', 
//            padding: '20px',
//            borderRadius: '8px',
//            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//            flexWrap: 'wrap',
//            margin: '0 50px'
//       }}>
//         <div className="form-group" style={{ flex: '1 1 12%' }}>
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
//       </form>

//       {/* Tableau des véhicules */}
//       <div style={{ marginTop: '40px', width: 'calc(100% - 100px)', margin: '0 50px' }}>
//         <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Liste des Véhicules</h2>
//         <table className="table" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
//           <thead>
//             <tr>
//               <th>Image</th>
//               <th>Marque</th>
//               <th>Modèle</th>
//               <th>Immatriculation</th>
//               <th>Année</th>
//               <th>Prix</th>
//             </tr>
//           </thead>
//           <tbody>
//             {vehicles.map((vehicle) => (
//               <tr key={vehicle.id}>
//                 <td><img src={`http://localhost:8002/${vehicle.image}`} alt={vehicle.model} style={{ width: '100px', height: 'auto' }} /></td>
//                 <td>{vehicle.brand}</td>
//                 <td>{vehicle.model}</td>
//                 <td>{vehicle.registrationPlate}</td>
//                 <td>{vehicle.years}</td>
//                 <td>{vehicle.pricePerDay} €</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Adminpage;


// // src/pages/AdminPage.js CODE OK!!!!!!!!!!!!!!!!!
// import React, { useState } from 'react';
// import axios from 'axios';

// const Adminpage = () => {
//   const [formValues, setFormValues] = useState({
//     brand: '',
//     model: '',
//     immatriculation: '',
//     years: '',
//     price: '',
//     available: '',
//     file: null,
//   });

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
//     } catch (error) {
//       console.error('Erreur lors de l\'envoi des données !', error);
//     }
//   };

//   return (
//     <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh', padding: '20px' }}>
//       <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Rajouter des Véhicules</h1>
//       <form onSubmit={handleSubmit} style={{
//            display: 'flex',
//            flexDirection: 'row',
//            justifyContent: 'space-between',
//            alignItems: 'center',
//            width: 'calc(100% - 100px)', // Full width minus 50px on each side
//            maxWidth: '100%', 
//            padding: '20px',
//            borderRadius: '8px', 
//            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//            flexWrap: 'wrap',  // Allow wrapping for responsiveness
//            margin: '0 50px'  // 50px margin on each side
//       }}>
//         <div className="form-group" style={{ flex: '1 1 12%' }}>
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
//       </form>
//     </div>
//   );
// };

// export default Adminpage;

