const express = require('express');
const jadwalRouter = require('./jadwal');

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json({
    status: true,
    message: 'Welcome to API v1',
    data: null,
  });
});

router.use('/jadwal', jadwalRouter);

module.exports = router;