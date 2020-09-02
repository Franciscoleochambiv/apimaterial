const express = require('express');
const cors = require('cors');

const app = express();

// settings
app.set('port', process.env.PORT || 4001);

// middlewares 
app.use(cors());
app.use(express.json());

// routes
app.use('/api/notes', require('./routes/notes'));
app.use('/api/users', require('./routes/users'));
app.use('/api/resubol', require('./routes/resubol'));
app.use('/api/resubolanu', require('./routes/resubolanu'));
app.use('/api/ruc', require('./routes/ruc'));
module.exports = app;
