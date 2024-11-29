import React, { useState } from "react";
import { useStripe } from "@stripe/react-stripe-js"; // Stripe.js

const StripeCheckout = ({ totalPrice, carId }) => {
  const [email, setEmail] = useState('');
  const stripe = useStripe();

  const handleCheckout = async (e) => {
    e.preventDefault();

    // Créez la session sur le backend
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          totalPrice,
          carId,
          email
        }),
      });

      const { sessionId } = await response.json();

      // Redirigez l'utilisateur vers Stripe Checkout avec l'ID de session
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        console.error('Erreur Stripe:', error);
      }
    } catch (error) {
      console.error('Erreur lors de la création de la session:', error);
    }
  };

  return (
    <form onSubmit={handleCheckout}>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Entrez votre email"
        value={email}
        required
      />
      <button type="submit">
        Payer {totalPrice} €
      </button>
    </form>
  );
};

export default StripeCheckout;

// const API = 'http://localhost:8002/api/stripe';

// // Fonction asynchrone pour effectuer des requêtes API
// export async function fetchFromApi(endpoint, options = {}) {
//    const { method = 'POST', body = null } = options; // Utilisation de valeurs par défaut

//    try {
//       // Envoi de la requête API avec fetch
//       const res = await fetch(`${API}/${endpoint}`, {
//          method,
//          headers: {
//             'Content-Type': 'application/json', // Spécifie le type de contenu JSON
//          },
//          ...(body && { body: JSON.stringify(body) }) // Ajoute le corps de la requête si fourni
//       });

//       // Vérifie si la réponse est OK (status 200-299)
//       if (!res.ok) {
//          throw new Error(`Erreur HTTP: ${res.status}`); // Gestion des erreurs HTTP
//       }

//       // Renvoie la réponse JSON
//       return await res.json();
//    } catch (error) {
//       // Capture et affiche les erreurs
//       console.error('Erreur lors de la requête API:', error);
//       throw error; // Relance l'erreur pour gestion ultérieure
//    }
// }

// const API = 'http://localhost:8002/api/stripe'

// export async function  fetchFromApi(endpoint, options) {
//    const {method, body} = {method: 'POST', body: null, ...options}

//    //endpoint creat chekout session et endepoint serveur 

//    const res = await fetch(`${API}/${endpoint}`, {
//       method,
//       headers: {
//          'Content-Type': 'application/json'
//       },
//       ...(body && {body: JSON.stringify(body)})
//    })
//    return res.json()
// }