import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import SandiPage from "./pages/SandiPage";
import BahanPage from "./pages/BahanPage";
import ResepPage from "./pages/ResepPage";
import BahanLengkapPage from "./pages/BahanLengkapPage";
import CepatPage from "./pages/CepatPage";
import DetailResepPage from "./pages/DetailResepPage";
import DetailMasakPage from "./pages/DetailMasakPage";
import KeranjangPage from "./pages/KeranjangPage";
import RiwayatPage from "./pages/RiwayatPage";
import TambahItemPage from "./pages/TambahItemPage";
import ArticlePage from "./pages/ArticlePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/sandi" element={<SandiPage />} />
        <Route path="/bahan" element={<BahanPage />} />
        <Route path="/resep" element={<ResepPage />} />
        <Route path="/bahan-lengkap" element={<BahanLengkapPage />} />
        <Route path="/cepat" element={<CepatPage />} />
        <Route path="/detail-resep/:id" element={<DetailResepPage />} />
        <Route path="/detail-masak" element={<DetailMasakPage />} />
        <Route path="/keranjang" element={<KeranjangPage />} />
        <Route path="/riwayat" element={<RiwayatPage />} />
        <Route path="/tambah-item" element={<TambahItemPage />} />
        <Route path="/artikel" element={<ArticlePage />} />
      </Routes>
    </BrowserRouter>
  );
}