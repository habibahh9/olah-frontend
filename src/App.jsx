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
import OnboardingPage from "./pages/OnboardingPage";

export function setOnboardingDone() {
  sessionStorage.setItem("onboarding_done", "true");
}

function isOnboardingDone() {
  return sessionStorage.getItem("onboarding_done") === "true";
}

// Guard: kalau onboarding belum selesai, paksa ke /onboarding
function RequireOnboarding({ children }) {
  if (!isOnboardingDone()) {
    return <Navigate to="/onboarding" replace />;
  }
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isOnboardingDone()
              ? <Navigate to="/login" replace />
              : <Navigate to="/onboarding" replace />
          }
        />

        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* Semua halaman lain wajib onboarding selesai dulu */}
        <Route path="/login" element={<RequireOnboarding><LoginPage /></RequireOnboarding>} />
        <Route path="/register" element={<RequireOnboarding><RegisterPage /></RequireOnboarding>} />
        <Route path="/dashboard" element={<RequireOnboarding><DashboardPage /></RequireOnboarding>} />
        <Route path="/profil" element={<RequireOnboarding><ProfilePage /></RequireOnboarding>} />
        <Route path="/sandi" element={<RequireOnboarding><SandiPage /></RequireOnboarding>} />
        <Route path="/bahan" element={<RequireOnboarding><BahanPage /></RequireOnboarding>} />
        <Route path="/resep" element={<RequireOnboarding><ResepPage /></RequireOnboarding>} />
        <Route path="/bahan-lengkap" element={<RequireOnboarding><BahanLengkapPage /></RequireOnboarding>} />
        <Route path="/cepat" element={<RequireOnboarding><CepatPage /></RequireOnboarding>} />
        <Route path="/detail-resep/:id" element={<RequireOnboarding><DetailResepPage /></RequireOnboarding>} />
        <Route path="/detail-masak/:id" element={<RequireOnboarding><DetailMasakPage /></RequireOnboarding>} />
        <Route path="/keranjang" element={<RequireOnboarding><KeranjangPage /></RequireOnboarding>} />
        <Route path="/riwayat" element={<RequireOnboarding><RiwayatPage /></RequireOnboarding>} />
        <Route path="/tambah-item" element={<RequireOnboarding><TambahItemPage /></RequireOnboarding>} />
        <Route path="/artikel" element={<RequireOnboarding><ArticlePage /></RequireOnboarding>} />
      </Routes>
    </BrowserRouter>
  );
}