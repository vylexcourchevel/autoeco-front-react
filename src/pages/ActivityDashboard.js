

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ActivityDashboard() {
  return (
    <div>
      <h1>Listes des réservations effectuées</h1>
      
      <div className="container">
        <div className="card" style={{ width: '100%' }}>
          <div className="d-flex flex-column flex-lg-row">
            <img
              className="card-img"
              src="https://via.placeholder.com/150"
              alt="Card image cap"
              style={{ width: 'auto', height: 'auto', marginBottom: '10px',  flex: '1', border: '2px solid #000', padding: '10px', borderRadius: '5px' }}
            />
            <div className="card-cars" style={{ flex: '1', border: '2px solid #000', padding: '10px', borderRadius: '5px' }}>
              <h5 className="card-title">Voitures</h5>
              <p className="card-text">Rajouter les voitures, marques, modèle, année immatriculation.</p>
            </div>

            <div className="card-clients" style={{ flex: '1', border: '2px solid #000', padding: '10px', borderRadius: '5px' }}>
              <h5 className="card-title">Clients</h5>
              <p className="card-text">Rajouter des clients.</p>
            </div>
           
            <div className="card-reservations" style={{ flex: '1', border: '2px solid #000', padding: '10px', borderRadius: '5px' }}>
              <h5 className="card-title">Dates de réservation</h5>
              <p className="card-text">Rajouter des Réservations.</p>
            </div>

            <div className="card-totalPrice" style={{ flex: '1', border: '2px solid #000', padding: '10px', borderRadius: '5px' }}>
              <h5 className="card-title">Prix à Payer</h5>
              <p className="card-text">Rajouter des prix à payer.</p>
            </div>
           
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityDashboard;

