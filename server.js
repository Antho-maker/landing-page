const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();

// Configuration de Handlebars
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: false,
    partialsDir: __dirname
}));

app.set('view engine', 'hbs');
app.set('views', __dirname);

// Servir les fichiers statiques
app.use(express.static('./'));

// Route principale
app.get('/', (req, res) => {
    res.render('index', {
        layout: false,
        cache: false
    });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error('Erreur middleware:', err);
    res.status(500).send('Erreur serveur: ' + err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Configuration Handlebars:', {
        views: app.get('views'),
        partialsDir: ['.']
    });
}); 