// server/server.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./database');
const authRoutes = require('./routes/auth');
const gameRoutes = require('./routes/game');

const app = express();
const port = 4000;
app.enable('trust proxy'); // Render
app.use(cors({
    origin: [
        'https://mmogamemai-front.onrender.com',
    ],
    credentials: true
}));

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});//чисто для логов, в принципе тоже уже не особо нцжно

app.use('/auth', authRoutes);
app.use('/game', gameRoutes);

app.get('/test', (req, res) => {
    res.json({ message: 'Server is working' });
});//мне жалко удалять

process.on('uncaughtException', (err) => {
    console.error('uncaughtException detected:', err);
    process.exit(1);
});


sequelize.sync({ force: false }) // если true то база упадет
    .then(() => {
        console.log('Database synced successfully.');
    })
    .then(() => {
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
            console.log("Server started successfully!");
        });
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
        console.error(error);
    });