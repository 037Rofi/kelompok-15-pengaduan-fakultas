const jadwal = [
  { id: 1, mataKuliah: 'Pemrograman Berbasis Platform', status: 'aktif' },
  { id: 2, mataKuliah: 'Basis Data', status: 'aktif' },
  { id: 3, mataKuliah: 'Jaringan Komputer', status: 'selesai' },
];

const peserta = [
  { id: 101, jadwalId: 1, nim: '2026001', nama: 'Alya' },
  { id: 102, jadwalId: 1, nim: '2026002', nama: 'Bima' },
  { id: 103, jadwalId: 2, nim: '2026003', nama: 'Citra' },
];

module.exports = { jadwal, peserta };