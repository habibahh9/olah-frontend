# 🍳 Olah — Frontend

> Antarmuka pengguna aplikasi Olah, sistem rekomendasi resep berbasis AI.

## 🛠️ Tech Stack
- **React JS** + Vite
- **Tailwind CSS**
- **Axios**
- **React Router DOM**

## 🚀 Cara Menjalankan

### Prerequisites
- Node.js 18+
- npm atau yarn

### Instalasi

```bash
# Clone repository
git clone https://github.com/USERNAME_KAMU/olah-frontend.git
cd olah-frontend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env sesuai kebutuhan

# Jalankan development server
npm run dev
```
del README.md
Buka browser di `http://localhost:5173`

## 📁 Struktur Foldersrc/
src/
├── assets/         # Gambar dan aset statis
├── components/     # Komponen reusable
│   ├── common/     # Button, Input, Card, dll
│   └── layout/     # Navbar, Footer, dll
├── pages/          # Halaman-halaman utama
├── hooks/          # Custom React hooks
├── services/       # Integrasi API
├── context/        # State global (Auth, dll)
└── utils/          # Fungsi helper## 🔗 Repository Terkait

- [olah-backend](https://github.com/habibahh99/olah-backend) — Backend API