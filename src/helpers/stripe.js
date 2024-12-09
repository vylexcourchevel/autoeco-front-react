// const API = process.env.REACT_APP_BACKEND_URL+'/api/stripe'

// Définition de la constante API qui contient l'URL de base pour les requêtes API vers Stripe
const API = process.env.REACT_APP_BACKEND_URL+'/api/stripe'

// Fonction fetchFromApi qui permet d'effectuer des requêtes HTTP vers l'API
export async function fetchFromApi(endpoint, options) {
   // Destructuration des options pour obtenir la méthode HTTP et le corps de la requête
   // Si les options ne sont pas spécifiées, la méthode par défaut est 'POST' et le corps est null
   const { method, body } = { method: 'POST', body: null, ...options }

   // Envoi de la requête HTTP avec la méthode spécifiée et, si nécessaire, un corps de requête
   const res = await fetch(`${API}/${endpoint}`, {
      method, // Utilise la méthode HTTP fournie (POST, GET, etc.)
      headers: {
         'Content-Type': 'application/json' // Déclare que le contenu de la requête est au format JSON
      },
      // Si un corps de requête est fourni, il est transformé en JSON et ajouté à la requête
      ...(body && { body: JSON.stringify(body) })
   })

   // Retourne la réponse de la requête sous forme d'objet JSON
   return res.json()
}


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