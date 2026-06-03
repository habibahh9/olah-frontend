# 🍳 Olah — Frontend

Olah adalah aplikasi web rekomendasi resep berbasis AI yang membantu pengguna mengolah sisa bahan makanan menjadi masakan lezat. Repository ini berisi antarmuka pengguna (frontend) dari aplikasi Olah.

## 🛠️ Tech Stack
- **React JS** + Vite
- **Tailwind CSS**
- **Axios**
- **React Router DOM**

## ⚙️ Petunjuk Setup Environment

### Prerequisites
- Node.js 18+
- npm atau yarn

### Variabel Environment
Buat file `.env` di root project berdasarkan `.env.example`:

```env
VITE_API_BASE_URL=https://your-backend-url.com
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_key
```

### Instalasi & Menjalankan Aplikasi

```bash
# Clone repository
git clone https://github.com/habibahh9/olah-frontend.git
cd olah-frontend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env sesuai kebutuhan

# Jalankan development server
npm run dev
```

Buka browser di `http://localhost:5173`

### Build Production

```bash
npm run build
```

## 🤖 Model Machine Learning
Model AI digunakan melalui backend service. Tidak ada model yang di-load langsung di frontend.
Lihat repository backend untuk detail model: [olah-backend](https://github.com/habibahh9/olah-backend)

## 📁 Struktur Folder
src/
├── assets/       # Gambar dan aset statis
├── hooks/        # Custom React hooks
├── pages/        # Halaman-halaman utama
├── services/     # Integrasi API
└── utils/        # Helper functions & API client

## 🔗 Repository Terkait
- [olah-backend](https://github.com/habibahh9/olah-backend) — Backend API & Model AI