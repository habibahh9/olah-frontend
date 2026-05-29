import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setOnboardingDone } from "../App";
import logoOlah from "../assets/logo-olah.png";

const slides = [
  {
    tag: "Selamat Datang",
    title: "Punya Sisa\nBahan Makanan?",
    desc: "Jangan biarkan bahan di kulkasmu terbuang sia-sia. OLAH hadir untuk mengubah sisa bahan menjadi hidangan lezat yang bisa kamu masak hari ini.",
    features: [
      { icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14l-4-4 1.41-1.41L11 13.17l6.59-6.59L19 8l-8 8z" fill="#E87722"/>
        </svg>
      ), text: "Temukan resep dari bahan yang kamu punya" },
      { icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#E87722"/>
        </svg>
      ), text: "Simpan resep favoritmu kapan saja" },
    ],
    illustrasi: (
      <svg viewBox="0 0 280 280" width="240" height="240" xmlns="http://www.w3.org/2000/svg">
        {/* background plate */}
        <circle cx="140" cy="140" r="120" fill="#FDE8D0" opacity="0.5"/>
        {/* fridge body */}
        <rect x="60" y="50" width="160" height="180" rx="18" fill="#fff" stroke="#E87722" strokeWidth="2.5"/>
        {/* fridge top section */}
        <rect x="60" y="50" width="160" height="75" rx="18" fill="#FDE8D0"/>
        <rect x="60" y="105" width="160" height="20" fill="#FDE8D0"/>
        {/* fridge divider */}
        <rect x="60" y="122" width="160" height="3" fill="#E87722" opacity="0.3"/>
        {/* handle top */}
        <rect x="128" y="70" width="8" height="30" rx="4" fill="#E87722" opacity="0.6"/>
        {/* handle bottom */}
        <rect x="128" y="148" width="8" height="45" rx="4" fill="#E87722" opacity="0.6"/>
        {/* food items */}
        <text x="90" y="100" fontSize="22">🥚</text>
        <text x="155" y="100" fontSize="22">🥕</text>
        <text x="90" y="175" fontSize="22">🧅</text>
        <text x="145" y="175" fontSize="22">🥦</text>
        <text x="118" y="210" fontSize="18">🍅</text>
        {/* checkmark badge */}
        <circle cx="210" cy="65" r="22" fill="#E87722"/>
        <path d="M200 65 L208 73 L222 57" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
  },
  {
    tag: "Cerdas & Otomatis",
    title: "OLAH Carikan\nResepnya Untukmu",
    desc: "Cukup masukkan bahan yang kamu punya, OLAH akan langsung mencarikan resep yang paling cocok — dari masakan sederhana hingga hidangan istimewa.",
    features: [
      { icon: (
        <svg width="18" height="18" viewBox="0 0 28 27" fill="none">
          <path d="M26.5865 24.2967L20.6502 18.3986C22.4301 16.095 23.2611 13.2053 22.9746 10.3156C22.6881 7.42597 21.3056 4.75272 19.1075 2.83817C16.9095 0.923624 14.0604 -0.0888533 11.1383 0.00612555C8.21628 0.101104 5.43999 1.29643 3.37267 3.34962C1.30535 5.4028 0.1018 8.16011 0.00616771 11.0622C-0.0894648 13.9643 0.929981 16.7939 2.85771 18.9769C4.78543 21.16 7.47708 22.533 10.3866 22.8175C13.2962 23.1021 16.2058 22.2768 18.5252 20.5091L24.4665 26.4109C24.7542 26.6946 25.1379 26.848 25.529 26.848C25.9201 26.848 26.3038 26.6946 26.5915 26.4109C26.8792 26.1272 27.0316 25.7435 27.0316 25.3557C27.0316 24.9679 26.8792 24.5842 26.5865 24.2967ZM3.02522 11.4464C3.02522 7.01424 6.63067 3.40879 11.0628 3.40879C15.495 3.40879 19.1004 7.01424 19.1004 11.4464C19.1004 15.8786 15.495 19.484 11.0628 19.484C6.63067 19.484 3.02522 15.8786 3.02522 11.4464Z" fill="#E87722"/>
        </svg>
      ), text: "Rekomendasi resep berbasis bahan tersedia" },
      { icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 5v6l4.5 2.67-.75 1.23L11 14V7h1.5z" fill="#E87722"/>
        </svg>
      ), text: "Filter berdasarkan waktu masak & kesulitan" },
    ],
    illustrasi: (
      <svg viewBox="0 0 280 280" width="240" height="240" xmlns="http://www.w3.org/2000/svg">
        <circle cx="140" cy="140" r="120" fill="#FDE8D0" opacity="0.5"/>
        {/* phone frame */}
        <rect x="80" y="35" width="120" height="210" rx="16" fill="#fff" stroke="#E87722" strokeWidth="2.5"/>
        <rect x="80" y="35" width="120" height="210" rx="16" fill="white"/>
        {/* screen */}
        <rect x="88" y="55" width="104" height="180" rx="8" fill="#FFF5EE"/>
        {/* search bar */}
        <rect x="94" y="62" width="92" height="22" rx="11" fill="#FDE8D0"/>
        <text x="103" y="77" fontSize="9" fill="#E87722">Telur, Wortel, Bawang...</text>
        {/* recipe cards */}
        <rect x="94" y="92" width="92" height="42" rx="8" fill="white" filter="url(#shadow1)"/>
        <circle cx="111" cy="113" r="13" fill="#FDE8D0"/>
        <text x="111" y="118" textAnchor="middle" fontSize="14">🍳</text>
        <rect x="130" y="99" width="48" height="7" rx="3.5" fill="#E87722" opacity="0.6"/>
        <rect x="130" y="112" width="35" height="5" rx="2.5" fill="#E87722" opacity="0.25"/>
        <rect x="130" y="122" width="28" height="5" rx="2.5" fill="#E87722" opacity="0.15"/>
        {/* recipe card 2 */}
        <rect x="94" y="142" width="92" height="42" rx="8" fill="white" opacity="0.85"/>
        <circle cx="111" cy="163" r="13" fill="#FDE8D0"/>
        <text x="111" y="168" textAnchor="middle" fontSize="14">🥗</text>
        <rect x="130" y="149" width="40" height="7" rx="3.5" fill="#E87722" opacity="0.45"/>
        <rect x="130" y="162" width="30" height="5" rx="2.5" fill="#E87722" opacity="0.2"/>
        {/* recipe card 3 */}
        <rect x="94" y="192" width="92" height="36" rx="8" fill="white" opacity="0.6"/>
        <circle cx="111" cy="210" r="13" fill="#FDE8D0"/>
        <text x="111" y="215" textAnchor="middle" fontSize="14">🍜</text>
        <rect x="130" y="199" width="44" height="7" rx="3.5" fill="#E87722" opacity="0.35"/>
        {/* search badge */}
        <circle cx="210" cy="65" r="22" fill="#E87722"/>
        <path d="M200 65 m-7 0 a7 7 0 1 0 14 0 a7 7 0 1 0 -14 0 M205.95 70.95 L212 77" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  },
  {
    tag: "Kelola & Hemat",
    title: "Stok Terpantau,\nTidak Ada yang Terbuang",
    desc: "Catat stok bahan makananmu dan pantau tanggal kedaluwarsanya. OLAH akan mengingatkanmu sebelum bahan habis atau kadaluarsa.",
    features: [
      { icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M20 6h-2.18c.07-.44.18-.88.18-1.34C18 2.54 15.46 1 13 1c-1.57 0-3.06.78-4 2.01C8.06 1.78 6.57 1 5 1 2.54 1 0 2.54 0 4.66c0 .46.11.9.18 1.34H-2v14h24V6h-2zm-7-3c1.13 0 3 .64 3 1.66 0 .36-.1.66-.26.9L12 9.34 8.26 5.56c-.16-.24-.26-.54-.26-.9C8 3.64 9.87 3 12 3h1zM5 3c1.13 0 3 .64 3 1.66 0 .36-.1.66-.26.9L4.5 9.2 1.26 5.56C1.1 5.32 1 5.02 1 4.66 1 3.64 2.87 3 5 3z" fill="#E87722"/>
        </svg>
      ), text: "Manajemen stok bahan dapur mudah" },
      { icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" fill="#E87722"/>
        </svg>
      ), text: "Notifikasi bahan mendekati kedaluwarsa" },
    ],
    illustrasi: (
      <svg viewBox="0 0 280 280" width="240" height="240" xmlns="http://www.w3.org/2000/svg">
        <circle cx="140" cy="140" r="120" fill="#FDE8D0" opacity="0.5"/>
        {/* clipboard */}
        <rect x="70" y="55" width="140" height="175" rx="14" fill="white" stroke="#E87722" strokeWidth="2.5"/>
        {/* clipboard top clip */}
        <rect x="108" y="45" width="64" height="24" rx="8" fill="#E87722"/>
        <rect x="118" y="50" width="44" height="14" rx="5" fill="#FDE8D0"/>
        {/* rows */}
        {/* row 1 - green */}
        <rect x="84" y="90" width="112" height="26" rx="7" fill="#F9F9F9"/>
        <text x="94" y="108" fontSize="14">🥚</text>
        <rect x="116" y="97" width="55" height="6" rx="3" fill="#E87722" opacity="0.4"/>
        <rect x="174" y="96" width="14" height="8" rx="4" fill="#4CAF50" opacity="0.8"/>
        {/* row 2 - orange */}
        <rect x="84" y="124" width="112" height="26" rx="7" fill="#F9F9F9"/>
        <text x="94" y="142" fontSize="14">🥕</text>
        <rect x="116" y="131" width="45" height="6" rx="3" fill="#E87722" opacity="0.4"/>
        <rect x="174" y="130" width="14" height="8" rx="4" fill="#FF9800" opacity="0.85"/>
        {/* row 3 - green */}
        <rect x="84" y="158" width="112" height="26" rx="7" fill="#F9F9F9"/>
        <text x="94" y="176" fontSize="14">🧅</text>
        <rect x="116" y="165" width="60" height="6" rx="3" fill="#E87722" opacity="0.4"/>
        <rect x="174" y="164" width="14" height="8" rx="4" fill="#4CAF50" opacity="0.8"/>
        {/* row 4 - red */}
        <rect x="84" y="192" width="112" height="26" rx="7" fill="#FFF0F0"/>
        <text x="94" y="210" fontSize="14">🍅</text>
        <rect x="116" y="199" width="40" height="6" rx="3" fill="#E87722" opacity="0.3"/>
        <rect x="174" y="198" width="14" height="8" rx="4" fill="#F44336" opacity="0.8"/>
        {/* notification badge */}
        <circle cx="210" cy="65" r="22" fill="#E87722"/>
        <path d="M210 55 c-1 0-1.5.67-1.5 1.5v.5c-2.36.68-4 2.85-4 5.5v4l-1.5 1.5v.5h14v-.5L215.5 66v-4c0-2.65-1.64-4.82-4-5.5V56.5c0-.83-.5-1.5-1.5-1.5z" fill="white"/>
        <path d="M208 71.5 h4 a2 2 0 0 1-4 0z" fill="white"/>
      </svg>
    ),
  },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");

  const isFirst = current === 0;
  const isLast = current === slides.length - 1;
  const slide = slides[current];

  const goTo = (index, dir = "next") => {
    if (animating || index === current) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 260);
  };

  const handleNext = () => {
    if (isLast) handleMasuk();
    else goTo(current + 1, "next");
  };

  const handleBack = () => {
    if (!isFirst) goTo(current - 1, "back");
  };

  const handleMasuk = () => {
    setOnboardingDone();
    navigate("/login");
  };

  const handleSkip = () => {
    setOnboardingDone();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f4f4] px-4 sm:px-6">
      <div
        className="flex flex-col md:flex-row w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-white"
        style={{ minHeight: 560 }}
      >
        {/* Panel Kiri — Ilustrasi */}
        <div
          className="hidden md:flex w-2/5 flex-col items-center justify-center gap-6 py-10"
          style={{ background: "linear-gradient(160deg, #FFF5EE 0%, #FDE8D0 60%, #f5cda8 100%)" }}
        >
          {/* Logo */}
          <img src={logoOlah} alt="OLAH" className="w-16 object-contain" />

          {/* Ilustrasi */}
          <div
            style={{
              opacity: animating ? 0 : 1,
              transform: animating
                ? direction === "next" ? "translateX(-20px)" : "translateX(20px)"
                : "translateX(0)",
              transition: "opacity 0.26s ease, transform 0.26s ease",
            }}
          >
            {slide.illustrasi}
          </div>

          {/* tagline */}
          <div className="text-center px-6">
            <p className="text-[#E87722] font-bold text-sm">OLAH</p>
            <p className="text-[#d06224] text-xs mt-0.5 font-light">Punya Sisa Bahan? di OLAH Aja!</p>
          </div>
        </div>

        {/* Panel Kanan — Konten */}
        <div className="flex flex-col flex-1">
          {/* Header */}
          <div className="flex items-center justify-between px-8 pt-8 pb-2">
            {/* Logo mobile only */}
            <div className="flex items-center gap-2 md:hidden">
              <img src={logoOlah} alt="OLAH" className="h-8 object-contain" />
            </div>
            {/* desktop: nama brand */}
            <span className="hidden md:block text-xs font-semibold text-gray-400 tracking-widest uppercase">
              OLAH
            </span>
            <button
              onClick={handleSkip}
              className="text-sm font-medium transition"
              style={{ color: "#E87722" }}
            >
              Lewati
            </button>
          </div>

          {/* Konten Slide */}
          <div
            className="flex-1 flex flex-col justify-center px-8 py-6"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating
                ? direction === "next" ? "translateY(14px)" : "translateY(-14px)"
                : "translateY(0)",
              transition: "opacity 0.26s ease, transform 0.26s ease",
            }}
          >
            {/* ilustrasi mobile */}
            <div className="flex md:hidden justify-center mb-4">
              <div
                className="rounded-2xl p-4"
                style={{ background: "linear-gradient(135deg, #FFF5EE, #FDE8D0)" }}
              >
                {slide.illustrasi}
              </div>
            </div>

            {/* Tag */}
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: "#E87722" }}
            >
              — {slide.tag}
            </p>

            {/* Judul */}
            <h1
              className="text-2xl sm:text-3xl font-bold leading-tight mb-4 whitespace-pre-line"
              style={{ color: "#1a1a1a" }}
            >
              {slide.title}
            </h1>

            {/* Deskripsi */}
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              {slide.desc}
            </p>

            {/* Fitur */}
            <div className="flex flex-col gap-3">
              {slide.features.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "#FDE8D0" }}
                  >
                    {f.icon}
                  </div>
                  <span className="text-sm text-gray-600">{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-8 py-5 border-t border-gray-100">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > current ? "next" : "back")}
                  className="transition-all duration-300"
                  style={{
                    width: i === current ? 24 : 8,
                    height: 8,
                    borderRadius: i === current ? 4 : "50%",
                    background: i === current ? "#E87722" : "#E5E7EB",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                />
              ))}
              <span className="text-xs text-gray-400 ml-2">
                {current + 1} / {slides.length}
              </span>
            </div>

            {/* Tombol Navigasi */}
            <div className="flex items-center gap-3">
              {!isFirst && (
                <button
                  onClick={handleBack}
                  className="text-sm text-gray-500 hover:text-gray-700 border border-gray-200 px-4 py-2 rounded-xl transition"
                >
                  ← Kembali
                </button>
              )}
              <button
                onClick={isLast ? handleMasuk : handleNext}
                className="text-sm font-semibold text-white px-5 py-2 rounded-xl shadow-md transition-all duration-200 active:scale-95"
                style={{ background: "#E87722" }}
                onMouseOver={(e) => (e.currentTarget.style.background = "#d06224")}
                onMouseOut={(e) => (e.currentTarget.style.background = "#E87722")}
              >
                {isLast ? "🚀 Masuk Sekarang" : "Lanjut →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
