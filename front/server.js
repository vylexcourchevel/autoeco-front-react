const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const dbConnection = require('./db')



app.use('api.cars/' , require ('./routes/carsRoutes'))
app.get('/', (req, res) => { res.send('Hello World!')})
app.listen(port, () => console.log(`Node Server started at ${port}!`))