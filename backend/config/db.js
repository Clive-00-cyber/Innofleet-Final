const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error('MONGODB_URI non définie');
        }
        await mongoose.connect(uri);
        console.log('✅ Connexion à MongoDB réussie');
    } catch (err) {
        console.error('❌ Erreur de connexion MongoDB', err);
        process.exit(1);
    }
};

module.exports = connectDB;