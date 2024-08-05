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
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <form onSubmit={handleSubmit} style={{
           display: 'flex',
           flexDirection: 'column',
           alignItems: 'center',
           width: '100%',
           maxWidth: '800px', 
           padding: '20px',
           borderRadius: '8px', 
           boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>

        <h1 className="text-center">Ajouter un véhicule</h1>
        <div className="form-row" style ={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '800px', 
          padding: '20px',
          borderRadius: '8px', 
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
           }}>

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
          
          <div className="form-group col-md-6">
            <label htmlFor="fileUpload">Télécharger une image</label>
            <div className="input-group mb-3">
              <input
                type="file"
                className="form-control"
                id="fileUpload"
                aria-label="Upload"
                onChange={handleFileChange}
              />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" id="button-addon1">Télécharger l'image</button>
              </div>
            </div>
          </div>
          
          <div className="form-group col-md-6">
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
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
            >
              Ajouter le véhicule
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Adminpage;
