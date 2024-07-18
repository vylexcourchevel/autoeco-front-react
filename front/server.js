const express = require('express');
const app = express();
const dbConnection = require('./db.js'); // Importer la connexion à la base de données
const carRoutes = require('./routes/carsRoutes.js'); // Importer les routes des voitures

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world');
});

// Utiliser les routes de voitures
app.use('/api/cars', carRoutes);

const port = 5000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
