const express = require('express');
const authRoutes = require('./auth/routes');
const searchRoutes = require('./search/routes');
const fetchRoutes = require('./fetch/routes');

const app = express();

const PORT = process.env.PORT || 8080;

app.get('/', authRoutes.authEntry);
app.get('/auth/callback', authRoutes.authCallback);

app.get('/search', searchRoutes.search);
app.get('/fetch', fetchRoutes.fetch);

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
