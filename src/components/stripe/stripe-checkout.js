import React, { useState } from "react";
import { useStripe } from "@stripe/react-stripe-js"; // Stripe.js

const StripeCheckout = ({ totalPrice, carId }) => {
  const [email, setEmail] = useState('');
  const stripe = useStripe();

  const handleCheckout = async (e) => {
    e.preventDefault();

    // Affiche les valeurs des variables pour vérifier leur contenu
    console.log('Total Price:', totalPrice);
    console.log('Car ID:', carId);
    console.log('Email:', email);

    // Créez la session sur le backend
    try {
      const response = await fetch('http://localhost:8002/api/stripe/create-checkout-session', {
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

      // Log de la réponse brute du backend
      console.log('Réponse brute:', response);

      // Convertir la réponse en JSON
      const data = await response.json();
      console.log('Réponse JSON:', data);

      // Vérifie si la sessionId est présente
      if (!data.sessionId) {
        console.error('Session ID non trouvé dans la réponse:', data);
        return;
      }

      // Redirigez l'utilisateur vers Stripe Checkout avec l'ID de session
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
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


// import React, { useState } from "react";
// import { useStripe } from "@stripe/react-stripe-js"; // Stripe.js

// const StripeCheckout = ({ totalPrice, carId }) => {
//   const [email, setEmail] = useState('');
//   const stripe = useStripe();

//   const handleCheckout = async (e) => {
//     e.preventDefault();

//     // Créez la session sur le backend
//     try {
//       const response = await fetch('http://localhost:8002/create-checkout-session', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           totalPrice,
//           carId,
//           email
//         }),
//       });
//       console.log('voici la response',response);

//       const { sessionId } = await response.json();

//       // Redirigez l'utilisateur vers Stripe Checkout avec l'ID de session
//       const { error } = await stripe.redirectToCheckout({
//         sessionId: sessionId,
//       });

//       if (error) {
//         console.error('Erreur Stripe:', error);
//       }
//     } catch (error) {
//       console.error('Erreur lors de la création de la session:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleCheckout}>
//       <input
//         type="email"
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Entrez votre email"
//         value={email}
//         required
//       />
//       <button type="submit">
//         Payer {totalPrice} €
//       </button>
//     </form>
//   );
// };

// export default StripeCheckout;
