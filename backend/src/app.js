const express = require('express');
const indexRouter = require('./routes');

const app = express();

app.use(express.json());
app.use('/api/v1', indexRouter);

app.use((req, res) => {
  res.status(404).json({
    status: false,
    message: `Route ${req.method} ${req.originalUrl} tidak ditemukan`,
  });
});

module.exports = app;