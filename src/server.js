import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import mongoose from 'mongoose';
import path from 'path';
import session from 'express-session';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';

import seedRoles from './utils/seedRoles.js';
import seedUsers from './utils/seedUsers.js';

dotenv.config();

const app = express();

// 🌐 CORS
app.use(cors());

// 📦 JSON + FORM DATA
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🎨 EJS CONFIG
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'src/views'));

// 📁 PUBLIC (CSS/JS)
app.use(express.static('src/public'));

// 🔐 SESSION (frontend control opcional)
app.use(session({
    secret: 'secret123',
    resave: false,
    saveUninitialized: true
}));

// 🧭 FRONTEND ROUTES
app.get('/signIn', (req, res) => res.render('signin'));
app.get('/signUp', (req, res) => res.render('signup'));

app.get('/dashboard', (req, res) => res.render('dashboard-user'));
app.get('/admin', (req, res) => res.render('dashboard-admin'));
app.get('/profile', (req, res) => res.render('profile'));

// 🧪 API ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// ❤️ HEALTH CHECK
app.get('/health', (req, res) => {
    res.status(200).json({ ok: true });
});

// 🚫 404 PAGE
app.use((req, res) => {
    res.status(404).render('404');
});

// ⚠️ ERROR HANDLER
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        message: err.message || 'Error interno del servidor'
    });
});

// 🔌 MONGO CONNECTION
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('Mongo connected');

        // 🧠 seeds obligatorios
        await seedRoles();
        await seedUsers(); // 👈 admin user

        app.listen(PORT, () =>
            console.log(`Servidor corriendo en el puerto ${PORT}`)
        );
    })
    .catch(err => {
        console.error('Error al conectar con Mongo:', err);
        process.exit(1);
    });