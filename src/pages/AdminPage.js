import React, { useState } from 'react';
import axios from 'axios';

const Adminpage = () => {
  // État local pour gérer les valeurs du formulaire
  const [formValues, setFormValues] = useState({
    brand: '',
    model: '',
    immatriculation: '',
    years: '',
    price: '',
    available: '',
    file: null,
  });

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  // Fonction pour gérer le changement de fichier
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormValues((prevValues) => ({
      ...prevValues,
      file: file,
    }));
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Création de l'objet FormData
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
      // Envoi de la requête POST avec axios
      const response = await axios.post('http://localhost:8002/api/cars/add', formData, {
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données !', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Ajouter un véhicule</h1>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="brand">Marque du véhicule</label>
          <input
            type="text"
            className="form-control"
            id="brand"
            placeholder="Marque du véhicule"
            value={formValues.brand}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group col-md-6">
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
        <div className="form-group col-md-6">
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
        <div className="form-group col-md-6">
          <label htmlFor="years">Année de mise en circulation</label>
          <input
            type="number"
            className="form-control"
            id="years"
            placeholder="Année"
            value={formValues.years}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="price">Prix de la location</label>
          <input
            type="number"
            className="form-control"
            id="price"
            placeholder="Prix"
            value={formValues.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="available">Disponibilité</label>
          <input
            type="text"
            className="form-control"
            id="available"
            placeholder="Disponibilité"
            value={formValues.available}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="input-group mb-3">
          <input
            type="file"
            className="form-control"
            id="fileUpload"
            aria-label="Upload"
            onChange={handleFileChange}
          />
          <button className="btn btn-outline-secondary" type="button" id="button-addon1">Télécharger l'image</button>
        </div>
        
        <div className="form-group">
          <button 
            type="submit" 
            className="btn btn-primary btn-lg" // Classes Bootstrap pour le style du bouton
            style={{
              backgroundColor: '#007bff', // Couleur de fond personnalisée
              color: '#fff', // Couleur du texte
              border: 'none', // Suppression de la bordure
              borderRadius: '5px', // Bordures arrondies
              padding: '10px 20px', // Espacement interne
              fontSize: '16px', // Taille de la police
              cursor: 'pointer', // Curseur en forme de main au survol
              transition: 'background-color 0.3s', // Transition de couleur de fond au survol
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'} // Changer la couleur de fond au survol
            onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'} // Revenir à la couleur initiale
          >
            Ajouter le véhicule
          </button>
        </div>
      </div>
    </form>
  );
};

export default Adminpage;


// import React from 'react';

// const Adminpage = () => {
//   return (
//     <form>
//       <h1>Ajouter un véhicule</h1>
//       <div className="form-row">
//         <div className="form-group col-md-6">
//           <label htmlFor="brand">Marque du véhicule</label>
//           <input type="text" className="form-control" id="brand" placeholder="Marque du véhicule" />
//         </div>
//         <div className="form-group col-md-6">
//           <label htmlFor="model">Modèle</label>
//           <input type="text" className="form-control" id="model" placeholder="Modèle" />
//         </div>
//         <div className="form-group col-md-6">
//           <label htmlFor="registrationPlate">Immatriculation</label>
//           <input type="text" className="form-control" id="immatriculation" placeholder="immatriculation" />
//         </div>
//         <div className="form-group col-md-6">
//           <label htmlFor="years">Année de mise en circulation</label>
//           <input type="number" className="form-control" id="years" placeholder="years" />
//         </div>
//         <div className="form-group col-md-6">
//           <label htmlFor="pricePerDay">Prix de la location</label>
//           <input type="number" className="form-control" id="price" placeholder="price" />
//         </div>
//         <div className="form-group col-md-6">
//           <label htmlFor="available">Disponibilité</label>
//           <input type="text" className="form-control" id="available" placeholder="available" />
//         </div>
        
//         <div className="input-group mb-6">
//           <input type="file" className="form-control" id="fileUpload" aria-label="Upload" />
//           <button className="btn btn-outline-secondary" type="button" id="button-addon1">Telecharger l' Image</button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default Adminpage;
