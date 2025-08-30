// server/server.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./database');
const authRoutes = require('./routes/auth');
const gameRoutes = require('./routes/game');

const app = express();
const port = process.env.PORT || 4000;
app.enable('trust proxy'); // Render
const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (process.env.NODE_ENV === 'development' || !origin) {
            callback(null, true);
        }
        else {
            const allowedOrigins = 'https://mmogamemai-front.onrender.com';
        }
    }
};

app.use(cors(corsOptions));
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
        app.listen(port, '0.0.0.0', () => {
            console.log(`Server listening on port ${port}`);
            console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log("Server started successfully!");
            if (process.env.NODE_ENV === 'development') {
                console.log(`Local: http://localhost:${port}`);
                console.log(`Test endpoint: http://localhost:${port}/test`);
            }
        });
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });