const express = require('express');
const authRoutes = require('./auth/routes');

const app = express();

const PORT = process.env.PORT || 8080;

app.get('/', authRoutes.authEntry);
app.get('/auth/callback', authRoutes.authCallback);

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
