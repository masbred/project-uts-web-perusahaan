const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Data Dummy (Sama persis dengan struktur data pada Project 1)
let companyData = [
  {
    id: 1,
    title: "Layanan Cloud Infrastructure",
    category: "Layanan IT",
    date: "15 November 2026",
    summary:
      "Solusi server cloud berperforma tinggi untuk kebutuhan skalabilitas bisnis modern.",
    content:
      "Kami menyediakan layanan Cloud Infrastructure berbasis container dan virtual machine dengan jaminan uptime 99.9%. Dilengkapi sistem keamanan berlapis, pencadangan otomatis harian, dan dukungan teknis 24/7 untuk memastikan operasional perusahaan berjalan tanpa hambatan.",
  },
  {
    id: 2,
    title: "Audit Keamanan Jaringan & Sistem",
    category: "Cyber Security",
    date: "18 November 2026",
    summary:
      "Pengujian penetrasi dan analisis kerentanan infrastruktur jaringan perusahaan.",
    content:
      "Layanan audit menyeluruh meliputi pemindaian kerentanan jaringan, analisis lalu lintas paket data, pengujian keamanan aplikasi web, serta penyusunan laporan mitigasi risiko sesuai standar keamanan informasi.",
  },
  {
    id: 3,
    title: "Pengembangan Sistem ERP Terintegrasi",
    category: "Software Development",
    date: "20 November 2026",
    summary:
      "Aplikasi manajemen sumber daya perusahaan yang mencakup modul keuangan, SDM, dan inventaris.",
    content:
      "Sistem Enterprise Resource Planning (ERP) yang dirancang khusus untuk mengotomatisasi alur bisnis perusahaan Anda. Memudahkan pemantauan stok barang, penggajian karyawan, dan laporan keuangan secara real-time dalam satu dashboard.",
  },
];

// Route Root (Cek Status Server)
app.get("/", (req, res) => {
  res.json({
    message: "API Informasi Perusahaan Berjalan!",
    endpoints: {
      getAll: "GET /api/informasi",
      getById: "GET /api/informasi/:id",
      create: "POST /api/informasi",
      update: "PUT /api/informasi/:id",
      delete: "DELETE /api/informasi/:id",
    },
  });
});

// 1. READ ALL - Mengambil semua data informasi perusahaan
app.get("/api/informasi", (req, res) => {
  res.status(200).json({
    status: "success",
    total: companyData.length,
    data: companyData,
  });
});

// 2. READ BY ID - Mengambil detail informasi berdasarkan ID
app.get("/api/informasi/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = companyData.find((d) => d.id === id);

  if (!item) {
    return res.status(404).json({
      status: "error",
      message: `Informasi dengan ID ${id} tidak ditemukan`,
    });
  }

  res.status(200).json({
    status: "success",
    data: item,
  });
});

// 3. CREATE - Menambahkan informasi perusahaan baru
app.post("/api/informasi", (req, res) => {
  const { title, category, date, summary, content } = req.body;

  if (!title || !category || !summary || !content) {
    return res.status(400).json({
      status: "error",
      message: "Field title, category, summary, dan content wajib diisi!",
    });
  }

  const newId =
    companyData.length > 0 ? companyData[companyData.length - 1].id + 1 : 1;
  const newItem = {
    id: newId,
    title,
    category,
    date:
      date ||
      new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    summary,
    content,
  };

  companyData.push(newItem);

  res.status(201).json({
    status: "success",
    message: "Data informasi berhasil ditambahkan",
    data: newItem,
  });
});

// 4. UPDATE - Mengubah data informasi berdasarkan ID
app.put("/api/informasi/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = companyData.findIndex((d) => d.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: `Informasi dengan ID ${id} tidak ditemukan`,
    });
  }

  const { title, category, date, summary, content } = req.body;

  companyData[index] = {
    ...companyData[index],
    title: title || companyData[index].title,
    category: category || companyData[index].category,
    date: date || companyData[index].date,
    summary: summary || companyData[index].summary,
    content: content || companyData[index].content,
  };

  res.status(200).json({
    status: "success",
    message: "Data informasi berhasil diperbarui",
    data: companyData[index],
  });
});

// 5. DELETE - Menghapus data informasi berdasarkan ID
app.delete("/api/informasi/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = companyData.findIndex((d) => d.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: `Informasi dengan ID ${id} tidak ditemukan`,
    });
  }

  const deletedItem = companyData.splice(index, 1);

  res.status(200).json({
    status: "success",
    message: "Data informasi berhasil dihapus",
    deletedData: deletedItem[0],
  });
});

// Jalankan Server
app.listen(PORT, () => {
  console.log(`Server CRUD API berjalan di http://localhost:${PORT}`);
});
