const express = require('express');
const { jadwal } = require('../data/mock');
const pesertaRouter = require('./peserta');

const router = express.Router();

router.use('/:jadwalId/peserta', pesertaRouter);

// GET /api/v1/jadwal?status=aktif
router.get('/', (req, res) => {
  const { status } = req.query;
  const data = status
    ? jadwal.filter((item) => item.status === status)
    : jadwal;

  res.status(200).json({
    status: true,
    message: 'Daftar jadwal berhasil diambil',
    data,
  });
});

// Letakkan route statis sebelum route dinamis /:id.
router.get('/jumlah-jadwal', (_req, res) => {
  res.status(200).json({
    status: true,
    message: 'Jumlah jadwal berhasil dihitung',
    data: { total: jadwal.length },
  });
});

// GET /api/v1/jadwal/1
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ status: false, message: 'id harus berupa angka' });
  }

  const item = jadwal.find((row) => row.id === id);
  if (!item) {
    return res.status(404).json({ status: false, message: 'Jadwal tidak ditemukan' });
  }

  return res.status(200).json({
    status: true,
    message: 'Jadwal berhasil diambil',
    data: item,
  });
});

// POST /api/v1/jadwal
router.post('/', (req, res) => {
  const { mataKuliah, status = 'aktif' } = req.body || {};

  if (!mataKuliah) {
    return res.status(400).json({
      status: false,
      message: 'mataKuliah wajib diisi',
    });
  }

  const created = {
    id: Math.max(...jadwal.map((item) => item.id), 0) + 1,
    mataKuliah,
    status,
  };
  jadwal.push(created);

  return res.status(201).json({
    status: true,
    message: 'Jadwal berhasil ditambahkan',
    data: created,
  });
});

// PUT /api/v1/jadwal/1
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = jadwal.find((row) => row.id === id);
  const body = req.body || {};

  if (!item) {
    return res.status(404).json({ status: false, message: 'Jadwal tidak ditemukan' });
  }

  item.mataKuliah = body.mataKuliah ?? item.mataKuliah;
  item.status = body.status ?? item.status;

  return res.status(200).json({
    status: true,
    message: 'Jadwal berhasil diperbarui',
    data: item,
  });
});

// DELETE /api/v1/jadwal/1
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = jadwal.findIndex((row) => row.id === id);

  if (index === -1) {
    return res.status(404).json({ status: false, message: 'Jadwal tidak ditemukan' });
  }

  const [deleted] = jadwal.splice(index, 1);
  return res.status(200).json({
    status: true,
    message: 'Jadwal berhasil dihapus',
    data: deleted,
  });
});

module.exports = router;