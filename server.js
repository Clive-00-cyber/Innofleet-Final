const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');  // Ajout

dotenv.config();

// Connexion à MongoDB (chemins corrigés)
const connectDB = require('./backend/config/db');
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes API (chemins corrigés)
app.use('/api/auth', require('./backend/routes/authRoutes'));
app.use('/api/users', require('./backend/routes/userRoutes'));
app.use('/api/vehicles', require('./backend/routes/vehicleRoutes'));
app.use('/api/missions', require('./backend/routes/missionRoutes'));
app.use('/api/fuel', require('./backend/routes/fuelRoutes'));
app.use('/api/stats', require('./backend/routes/statsRoutes'));
app.use('/api/maintenances', require('./backend/routes/maintenanceRoutes'));

// Création d'un admin si aucun utilisateur (chemins corrigés)
const User = require('./backend/models/User');
const bcrypt = require('bcrypt');
(async () => {
    const count = await User.countDocuments();
    if (count === 0) {
        const hashed = await bcrypt.hash('admin', 10);
        await User.create({
            nom: 'Admin',
            cin: 'admin',
            password: hashed,
            role: 'admin'
        });
        console.log('Utilisateur admin créé (login: admin / admin)');
    }
})();

// Servir les fichiers statiques du frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// Pour les routes non API, renvoyer index.html (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));