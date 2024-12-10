import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ResetPasswordPage = () => {
  const { token } = useParams(); // Récupère le token dans l’URL
  const navigate = useNavigate(); // Pour rediriger après succès
  const [newPassword, setNewPassword] = useState(''); // Nouveau mot de passe
  const [error, setError] = useState(null); // État des erreurs
  const [success, setSuccess] = useState(false); // État pour indiquer un succès

  useEffect(() => {
    if (!token) {
      console.error('Token manquant dans l’URL');
      navigate('/error'); // Redirige vers une page d’erreur ou affiche un message
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rafraîchissement de la page

    try {
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL + `/api/users/reset-password`, {
        token,
        newPassword,
      });

      if (response.status === 200) {
        setSuccess(true);

        // Redirige l'utilisateur vers la page de connexion après 3 secondes
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(response.data.message || 'Erreur inconnue.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue lors de la réinitialisation.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card p-4 shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="text-center mb-4">Réinitialisation du mot de passe</h2>
        {success ? (
          <div className="alert alert-success text-center">
            <p>Votre mot de passe a été réinitialisé avec succès.</p>
            <p>Vous allez être redirigé vers la page de connexion...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                id="newPassword"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Entrez votre nouveau mot de passe"
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Réinitialiser
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;



