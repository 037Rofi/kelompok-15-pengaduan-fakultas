const express = require('express');
const { jadwal, peserta } = require('../data/mock');

// mergeParams membuat :jadwalId dari router induk tersedia di sini.
const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
  const jadwalId = Number(req.params.jadwalId);
  const induk = jadwal.find((item) => item.id === jadwalId);

  if (!induk) {
    return res.status(404).json({ status: false, message: 'Jadwal tidak ditemukan' });
  }

  const data = peserta.filter((item) => item.jadwalId === jadwalId);
  return res.status(200).json({
    status: true,
    message: 'Daftar peserta berhasil diambil',
    data,
  });
});

router.get('/:pesertaId', (req, res) => {
  const jadwalId = Number(req.params.jadwalId);
  const pesertaId = Number(req.params.pesertaId);
  const item = peserta.find(
    (row) => row.id === pesertaId && row.jadwalId === jadwalId,
  );

  if (!item) {
    return res.status(404).json({ status: false, message: 'Peserta tidak ditemukan pada jadwal ini' });
  }

  return res.status(200).json({
    status: true,
    message: 'Peserta berhasil diambil',
    data: item,
  });
});

router.post('/', (req, res) => {
  const jadwalId = Number(req.params.jadwalId);
  const { nim, nama } = req.body || {};

  if (!jadwal.some((item) => item.id === jadwalId)) {
    return res.status(404).json({ status: false, message: 'Jadwal tidak ditemukan' });
  }

  if (!nim || !nama) {
    return res.status(400).json({ status: false, message: 'nim dan nama wajib diisi' });
  }

  const created = {
    id: Math.max(...peserta.map((item) => item.id), 0) + 1,
    jadwalId,
    nim,
    nama,
  };
  peserta.push(created);

  return res.status(201).json({
    status: true,
    message: 'Peserta berhasil ditambahkan',
    data: created,
  });
});

module.exports = router;