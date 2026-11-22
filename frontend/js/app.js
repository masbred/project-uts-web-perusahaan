// Data Dummy Informasi Perusahaan (Nanti disinkronkan dengan CRUD API Project 2)
const companyData = [
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

// Fungsi Validasi Login dengan Percabangan If
function handleLogin(event) {
  event.preventDefault();

  const emailInput = document.getElementById("loginEmail").value.trim();
  const passwordInput = document.getElementById("loginPassword").value.trim();
  const alertBox = document.getElementById("loginAlert");

  // Mengambil data akun jika user baru mendaftar via halaman Registrasi
  const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

  // Percabangan If untuk mengecek akun default atau akun hasil registrasi
  if (
    (emailInput === "admin" &&
      passwordInput === "admin123") ||
    (registeredUser &&
      emailInput === registeredUser.email &&
      passwordInput === registeredUser.password)
  ) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("activeUser", emailInput);
    window.location.href = "dashboard.html";
  } else {
    alertBox.classList.remove("d-none");
    alertBox.textContent =
      "Email atau password salah! Gunakan admin@nusantaratech.co.id / admin123 atau akun yang telah didaftarkan.";
  }
}

// Fungsi Simulasi Registrasi
function handleRegister(event) {
  event.preventDefault();

  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();

  if (name && email && password) {
    localStorage.setItem(
      "registeredUser",
      JSON.stringify({ name, email, password }),
    );
    alert("Registrasi berhasil! Silakan login menggunakan akun Anda.");
    window.location.href = "login.html";
  }
}

// Fungsi Logout
function handleLogout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("activeUser");
  window.location.href = "login.html";
}
