const API = 'http://localhost:8002/api/stripe'

export async function  fetchFromApi(endpoint, options) {
   const {method, body} = {method: 'POST', body: null, ...options}

   //endpoint creat chekout session et endepoint serveur 

   const res = await fetch(`${API}/${endpoint}`, {
      method,
      headers: {
         'Content-Type': 'application/json'
      },
      ...(body && {body: JSON.stringify(body)})
   })
   return res.json()
}