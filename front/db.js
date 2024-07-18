

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sathya:sathyapr@cluster0.dkuc0.mongodb.net/sheycars-udemy', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB', error);
});

module.exports = mongoose;