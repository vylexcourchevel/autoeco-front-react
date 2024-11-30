
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ResetPasswordPage = () => {
  const { token } = useParams(); // Récupère le token dans l'URL
  const navigate = useNavigate(); // Pour rediriger après succès
  const [newPassword, setNewPassword] = useState(''); // Nouveau mot de passe
  const [error, setError] = useState(null); // État des erreurs
  const [success, setSuccess] = useState(false); // État pour indiquer un succès

  console.log('Token reçu dans l’URL :', token);

  useEffect(() => {
    if (!token) {
      console.error('Token manquant dans l’URL');
      navigate('/error'); // Redirige vers une page d’erreur ou affiche un message
    }
  }, [token, navigate]);
  

  // Log initial pour vérifier les paramètres
  useEffect(() => {
    console.log('Token reçu dans l’URL :', token);
  }, [token]);
  

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rafraîchissement de la page

    console.log('Tentative de soumission avec le nouveau mot de passe...');
    console.log('Token utilisé pour la requête :', token);
    console.log('Nouveau mot de passe :', newPassword);

    try {
      const response = await axios.post(`http://localhost:8002/api/users/reset-password`, { token,newPassword });

      console.log('Réponse reçue du backend :', response.data);
      if (response.status === 200) {
        console.log('Mot de passe réinitialisé avec succès.');
        setSuccess(true);

        // // Redirige l'utilisateur vers la page de connexion après 3 secondes
        // setTimeout(() => {
        //   console.log('Redirection vers la page de connexion...');
        //   navigate("/reset-password/:token");
        // }, 3000);
      } else {
        console.error('Erreur retournée par le backend :', response.data.message);
        setError(response.data.message || 'Erreur inconnue.');
      }
    } catch (err) {
      console.error('Erreur lors de la tentative de réinitialisation :', err);
      setError(err.response?.data?.message || 'Une erreur est survenue lors de la réinitialisation.');
    }
  };

  return (
    <div>
      <h1>Réinitialisation du mot de passe</h1>
      {success ? (
        <p>
          Votre mot de passe a été réinitialisé avec succès. Vous allez être redirigé vers la page de connexion.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Nouveau mot de passe :
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Réinitialiser</button>
        </form>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ResetPasswordPage;


// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ResetPasswordPage = () => {
//   const { token } = useParams(); // Récupère le token dans l'URL
//   const navigate = useNavigate(); // Pour rediriger après succès
//   const [newPassword, setNewPassword] = useState(''); // Nouveau mot de passe
//   const [error, setError] = useState(null); // État des erreurs
//   const [success, setSuccess] = useState(false); // État pour indiquer un succès

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Empêche le rafraîchissement de la page

//     try {
//       console.log('Submitting new password...');
//       const response = await axios.post('/api/reset-password', { token, newPassword });

//       console.log('Response:', response.data); // Vérifiez ce qui est retourné
//       if (response.status === 200) {
//         setSuccess(true);
//         // Redirige l'utilisateur vers la page de connexion après 3 secondes
//         setTimeout(() => {
//           navigate('/login');
//         }, 3000);
//       } else {
//         setError(response.data.message || 'Erreur inconnue.');
//       }
//     } catch (err) {
//       console.error('Error during reset password:', err);
//       setError(err.response?.data?.message || 'Une erreur est survenue lors de la réinitialisation.');
//     }
//   };

//   return (
//     <div>
//       <h1>Réinitialisation du mot de passe</h1>
//       {success ? (
//         <p>
//           Votre mot de passe a été réinitialisé avec succès. Vous allez être redirigé vers la page de connexion.
//         </p>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           <label>
//             Nouveau mot de passe :
//             <input
//               type="password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//             />
//           </label>
//           <button type="submit">Réinitialiser</button>
//         </form>
//       )}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// };

// export default ResetPasswordPage;


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function ResetPasswordPage() {
//   const { token } = useParams(); // Récupère le token dans l'URL
//   const navigate = useNavigate();

//   console.log("voila la requete pour valider le token", token);
  
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [loading, setLoading] = useState(false);
  
//   // Vérifier la validité du token dès que la page est chargée
//   useEffect(() => {
//     const verifyToken = async () => {
//       try {
//         // Envoie du token au serveur pour vérifier sa validité
//         const response = await axios.get(`/api/verify-reset-token/${token}`);
//         if (response.data.message !== 'Token valide') {
//           setErrorMessage('Le token est invalide ou expiré.');
//         }
//       } catch (error) {
//         setErrorMessage('Erreur lors de la vérification du token.');
//       }
//     };
//     verifyToken();
//   }, [token]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (newPassword !== confirmPassword) {
//       setErrorMessage('Les mots de passe ne correspondent pas.');
//       return;
//     }

//     try {
//       setLoading(true);
//       // Envoie du nouveau mot de passe avec le token pour la réinitialisation
//       const response = await axios.post('/api/reset-password', { token: token, newPassword });
//       alert('Mot de passe réinitialisé avec succès');
//       navigate('/login'); // Redirige vers la page de connexion après réinitialisation
//     } catch (error) {
//       setErrorMessage('Erreur lors de la réinitialisation du mot de passe.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Réinitialiser le mot de passe</h2>
//       {errorMessage && <p>{errorMessage}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="password"
//           placeholder="Nouveau mot de passe"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Confirmer le mot de passe"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//         />
//         <button type="submit" disabled={loading}>Réinitialiser</button>
//       </form>
//     </div>
//   );
// }

// export default ResetPasswordPage;
