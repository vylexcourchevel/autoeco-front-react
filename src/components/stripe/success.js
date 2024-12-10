import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirige vers la page d'accueil après 5 secondes
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    // Nettoie le timer lorsque le composant est démonté
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="text-center p-4 rounded shadow-lg" style={{ backgroundColor: '#f8f9fa', maxWidth: '500px' }}>
        <h2 className="mb-3 text-success">Merci pour votre commande !</h2>
        <p className="mb-0">Nous vous remercions pour votre confiance.</p>
        <p>À bientôt chez <strong>AUTOECO</strong> !</p>
        <p className="mt-3 text-muted">Vous allez être redirigé vers la page d'accueil dans 5 secondes...</p>
      </div>
    </div>
  );
}

export default Success;


// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function Success() {
//   return (
//     <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
//       <div className="text-center p-4 rounded shadow-lg" style={{ backgroundColor: '#f8f9fa', maxWidth: '500px' }}>
//         <h2 className="mb-3 text-success">Merci pour votre commande !</h2>
//         <p className="mb-0">Nous vous remercions pour votre confiance.</p>
//         <p>À bientôt chez <strong>AUTOECO</strong> !</p>
//       </div>
//     </div>
//   );
// }

// export default Success;
