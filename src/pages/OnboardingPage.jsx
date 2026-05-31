import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setOnboardingDone } from "../App";
import logoOlah from "../assets/logo-OLAH-1.png";

const slides = [
  {
    tag: "Selamat Datang",
    title: "Punya Sisa\nBahan Makanan?",
    desc: "Jangan biarkan bahan di kulkasmu terbuang sia-sia. OLAH hadir untuk mengubah sisa bahan menjadi hidangan lezat yang bisa kamu masak hari ini.",
    features: [
      {
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14l-4-4 1.41-1.41L11 13.17l6.59-6.59L19 8l-8 8z" fill="#d06224"/>
          </svg>
        ),
        text: "Temukan resep dari bahan yang kamu punya",
      },
      {
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#d06224"/>
          </svg>
        ),
        text: "Simpan resep favoritmu kapan saja",
      },
    ],
    illustrasi: (
      <svg viewBox="0 0 280 280" width="240" height="240" xmlns="http://www.w3.org/2000/svg">
        {/* Background circle */}
        <circle cx="140" cy="140" r="120" fill="#FDE8D0" opacity="0.5"/>

        {/* Kulkas / card utama */}
        <rect x="60" y="50" width="160" height="180" rx="18" fill="#fff" stroke="#d06224" strokeWidth="2.5"/>
        <rect x="60" y="50" width="160" height="75" rx="18" fill="#FDE8D0"/>
        <rect x="60" y="105" width="160" height="20" fill="#FDE8D0"/>
        <rect x="60" y="122" width="160" height="3" fill="#d06224" opacity="0.3"/>
        {/* Handle */}
        <rect x="128" y="70" width="8" height="30" rx="4" fill="#d06224" opacity="0.6"/>
        <rect x="128" y="148" width="8" height="45" rx="4" fill="#d06224" opacity="0.6"/>

        {/* Telur */}
        <svg x="72" y="62" width="46" height="46" viewBox="0 0 127 124">
          <path d="M63.43 4.51c31.68-.07 51.67 51.46 43.78 84.12c-6.98 28.92-27.03 34.91-43.08 34.91s-35.54-7.78-43.08-33.79C12.33 59.63 33.87 4.58 63.43 4.51z" fill="#f2a05b"/>
          <path d="M39.26 29.03c-3.8 6.07-7.63 13.71-8.45 20.08c-1.5 11.73 7.13 13.05 10.14 7.23s6.09-11.71 10.98-19.52c6.76-10.79 17.83-18.02 12.39-22.71s-17.08 2.16-25.06 14.92z" fill="#fecc88"/>
        </svg>

        {/* Cabe */}
        <svg x="160" y="60" width="44" height="44" viewBox="0 0 55 55">
          <path d="M32.238,15.303c-0.137,0.467-0.272,0.963-0.4,1.526c-3.5,15.417-16.372,23.55-30.887,31.589c-0.664,0.368-0.755,1.503-0.103,1.405C10.2,48.417,34.61,50.788,46.549,22.81c0,0,6.163-12.856-1.712-14.981C44.838,7.829,33.95,2.714,32.238,15.303z" fill="#D13834"/>
          <path d="M48.974,17.608c0.892-4.035,0.86-8.868-3.839-10.136c0,0-10.635-4.987-13.19,6.315c2.49-0.189,5.827-0.69,6.761-2.029c0,0,2.21,2.21,1.072,5.358c0,0,4.688-0.536,4.286-4.286c0,0,2.88,2.478,2.143,6.429C46.206,19.259,47.596,18.838,48.974,17.608z" fill="#88C057"/>
        </svg>

        {/* Brokoli */}
        <svg x="68" y="140" width="52" height="52" viewBox="0 0 160 130">
          <path d="M21.74 24.77L8.57 41.04s-3.95 4.95-2.93 9.84c1.15 5.46 4.05 5.79 4.05 5.79S9.5 60.91 12 64.52s3.69 5.32 12.77 8.07s25.46 5.84 25.46 5.84l4.22 16.38s1.13 4.05 6.16 6.16s8.96 1.56 8.96 1.56s2.08 5.75 8.99 7.35c5.98 1.39 10.75-1.62 10.75-1.62s5.03 3.08 11.51 1.62c7.52-1.69 9.24-6.32 9.24-6.32s6.16-.65 10.21-6.49s1.13-12.48 1.13-12.48s3.59-5.32 2.59-11.35c-.9-5.46-3.07-7.32-3.07-7.32l-12.98-9.06s5.51-2.27 7.46-12s-2.92-14.59-2.92-14.59s1.91-5.49-1.3-10.38c-3.08-4.7-7.46-2.43-9.57-4.54c-2.6-2.6-17.35-4.22-17.35-4.22L67.25 25.26l-45.51-.49z" fill="#2f7c31"/>
          <path d="M28 8.45s5.09-5.58 11.92-5.09s8.07 4.61 8.07 4.61s4.19-.69 6.82.48c5.38 2.4 4.81 5.19 6.44 5s1.63-7.11 9.23-9.52s11.73 1.25 13.36 1.15s3.65-2.03 9.42-.19c5.19 1.66 6.3 5.1 6.54 6.15c.28 1.27.28 2.69 1.82 4.32s-.11 7.54-2.32 9.94s-6.52 2.65-6.52 2.65s1.01 8.3-5.89 12.86c-4.85 3.2-10.07 1.94-10.07 1.94s-5.57 4.82-11.82 2.8c-6.25-2.02-6.92-4.61-3.46-7.5c3.46-2.88 5-8.46.87-9.52c-4.13-1.06-8.36.96-9.8 5.48c-1.44 4.52-1.54 8.46-6.25 11.82c-4.71 3.36-8.17 2.31-12.88 3.56c-4.71 1.25-7.88 5.29-11.82 5.38c-3.94.1-7.02-2.79-9.04-2.5c-2.02.29-6.15 1.25-6.15 1.25s-1.83-3.46-.67-7.69s2.78-4.8 2.78-4.8s-9.37-9.06-.76-22.88C15.6 5.66 28 8.45 28 8.45z" fill="#709921"/>
        </svg>

        {/* Tomat*/}
        <svg x="160" y="143" width="44" height="44" viewBox="0 0 65 65">
          <path d="M62 31.6C62.8 47 48.9 60 32.1 60S.4 46.2 2.1 30.9C4.5 9.4 20.4 8 32.1 8C39.2 8 60.2 1.8 62 31.6z" fill="#ef4d3c"/>
          <path d="M11 27c6.2-9.6 16.8-6.8 19.6-10.4c0 6.9 5 3.5 7.5 6.6c3.2 4 4.4 11.1 8.2 12.5c-3.7-7.9 2.3-7.6-6.1-18.2c4.5 2.8 6.8 0 12.9 2.5c-5.3-8.4-13.6-6-13.6-6s5.2-4.8 9.6-2.3c-4.6-6.8-17.9 1.8-17.9 1.8s-5.5-9.4-17.3.5c6.9-2.8 14.5 0 14.5 0S15.9 10.9 11 27" fill="#8cc63e"/>
        </svg>
      </svg>
    ),
  },
  {
    tag: "Cerdas & Otomatis",
    title: "OLAH Carikan\nResepnya Untukmu",
    desc: "Cukup masukkan bahan yang kamu punya, OLAH akan langsung mencarikan resep yang paling cocok — dari masakan sederhana hingga hidangan istimewa.",
    features: [
      {
        icon: (
          <svg width="18" height="18" viewBox="0 0 28 27" fill="none">
            <path d="M26.5865 24.2967L20.6502 18.3986C22.4301 16.095 23.2611 13.2053 22.9746 10.3156C22.6881 7.42597 21.3056 4.75272 19.1075 2.83817C16.9095 0.923624 14.0604 -0.0888533 11.1383 0.00612555C8.21628 0.101104 5.43999 1.29643 3.37267 3.34962C1.30535 5.4028 0.1018 8.16011 0.00616771 11.0622C-0.0894648 13.9643 0.929981 16.7939 2.85771 18.9769C4.78543 21.16 7.47708 22.533 10.3866 22.8175C13.2962 23.1021 16.2058 22.2768 18.5252 20.5091L24.4665 26.4109C24.7542 26.6946 25.1379 26.848 25.529 26.848C25.9201 26.848 26.3038 26.6946 26.5915 26.4109C26.8792 26.1272 27.0316 25.7435 27.0316 25.3557C27.0316 24.9679 26.8792 24.5842 26.5865 24.2967ZM3.02522 11.4464C3.02522 7.01424 6.63067 3.40879 11.0628 3.40879C15.495 3.40879 19.1004 7.01424 19.1004 11.4464C19.1004 15.8786 15.495 19.484 11.0628 19.484C6.63067 19.484 3.02522 15.8786 3.02522 11.4464Z" fill="#d06224"/>
          </svg>
        ),
        text: "Rekomendasi resep berbasis bahan tersedia",
      },
      {
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 5v6l4.5 2.67-.75 1.23L11 14V7h1.5z" fill="#d06224"/>
          </svg>
        ),
        text: "Filter berdasarkan waktu masak & kesulitan",
      },
    ],
    illustrasi: (
      <svg viewBox="0 0 280 280" width="240" height="240" xmlns="http://www.w3.org/2000/svg">
        <circle cx="140" cy="140" r="120" fill="#FDE8D0" opacity="0.5"/>

        {/* Phone frame */}
        <rect x="80" y="35" width="120" height="210" rx="16" fill="#fff" stroke="#d06224" strokeWidth="2.5"/>
        <rect x="88" y="55" width="104" height="180" rx="8" fill="#FFF5EE"/>

        {/* Search bar */}
        <rect x="94" y="62" width="92" height="22" rx="11" fill="#FDE8D0"/>
        <text x="115" y="77" fontSize="9" fill="#d06224" fontFamily="sans-serif">Cari bahan...</text>
        {/* Search icon kecil */}
        <circle cx="105" cy="73" r="4" fill="none" stroke="#d06224" strokeWidth="1.2"/>
        <line x1="108" y1="76" x2="111" y2="79" stroke="#d06224" strokeWidth="1.2" strokeLinecap="round"/>

        {/* Card 1 */}
        <rect x="94" y="92" width="92" height="42" rx="8" fill="white"/>
        <circle cx="111" cy="113" r="13" fill="#FDE8D0"/>
        {/* Ikon wajan mini */}
        <svg x="99" y="101" width="24" height="24" viewBox="0 0 60 60">
          <ellipse cx="30" cy="35" rx="22" ry="14" fill="#e88f27"/>
          <rect x="48" y="30" width="16" height="5" rx="2.5" fill="#c97820"/>
          <ellipse cx="30" cy="30" rx="22" ry="10" fill="#f0a84a"/>
        </svg>
        <rect x="130" y="99" width="48" height="7" rx="3.5" fill="#d06224" opacity="0.6"/>
        <rect x="130" y="112" width="35" height="5" rx="2.5" fill="#d06224" opacity="0.25"/>
        <rect x="130" y="122" width="28" height="5" rx="2.5" fill="#d06224" opacity="0.15"/>

        {/* Card 2 */}
        <rect x="94" y="142" width="92" height="42" rx="8" fill="white" opacity="0.85"/>
        <circle cx="111" cy="163" r="13" fill="#FDE8D0"/>
        {/* Ikon salad/sayur */}
        <svg x="99" y="151" width="24" height="24" viewBox="0 0 60 60">
          <ellipse cx="30" cy="38" rx="20" ry="12" fill="#88C057"/>
          <path d="M20 30 Q30 10 40 30" fill="#4a9c2f" stroke="none"/>
          <path d="M15 34 Q25 18 35 34" fill="#6ab840" stroke="none"/>
        </svg>
        <rect x="130" y="149" width="40" height="7" rx="3.5" fill="#d06224" opacity="0.45"/>
        <rect x="130" y="162" width="30" height="5" rx="2.5" fill="#d06224" opacity="0.2"/>

        {/* Card 3 */}
        <rect x="94" y="192" width="92" height="36" rx="8" fill="white" opacity="0.6"/>
        <circle cx="111" cy="210" r="13" fill="#FDE8D0"/>
        {/* Ikon wortel */}
        <svg x="100" y="199" width="22" height="22" viewBox="0 0 55 55">
          <path d="M32.238,15.303c-0.137,0.467-0.272,0.963-0.4,1.526c-3.5,15.417-16.372,23.55-30.887,31.589c-0.664,0.368-0.755,1.503-0.103,1.405C10.2,48.417,34.61,50.788,46.549,22.81c0,0,6.163-12.856-1.712-14.981C44.838,7.829,33.95,2.714,32.238,15.303z" fill="#D13834"/>
          <path d="M48.974,17.608c0.892-4.035,0.86-8.868-3.839-10.136c0,0-10.635-4.987-13.19,6.315c2.49-0.189,5.827-0.69,6.761-2.029c0,0,2.21,2.21,1.072,5.358c0,0,4.688-0.536,4.286-4.286c0,0,2.88,2.478,2.143,6.429C46.206,19.259,47.596,18.838,48.974,17.608z" fill="#88C057"/>
        </svg>
        <rect x="130" y="199" width="44" height="7" rx="3.5" fill="#d06224" opacity="0.35"/>

        {/* Badge search */}
        <circle cx="210" cy="65" r="22" fill="#d06224"/>
        <circle cx="207" cy="63" r="7" fill="none" stroke="white" strokeWidth="2.5"/>
        <line x1="212" y1="68" x2="218" y2="74" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    tag: "Kelola & Hemat",
    title: "Stok Terpantau,\nTidak Ada yang Terbuang",
    desc: "Catat stok bahan makananmu dan pantau tanggal kedaluwarsanya. OLAH akan mengingatkanmu sebelum bahan habis atau kadaluarsa.",
    features: [
      {
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M20 6h-2.18c.07-.44.18-.88.18-1.34C18 2.54 15.46 1 13 1c-1.57 0-3.06.78-4 2.01C8.06 1.78 6.57 1 5 1 2.54 1 0 2.54 0 4.66c0 .46.11.9.18 1.34H-2v14h24V6h-2zm-7-3c1.13 0 3 .64 3 1.66 0 .36-.1.66-.26.9L12 9.34 8.26 5.56c-.16-.24-.26-.54-.26-.9C8 3.64 9.87 3 12 3h1zM5 3c1.13 0 3 .64 3 1.66 0 .36-.1.66-.26.9L4.5 9.2 1.26 5.56C1.1 5.32 1 5.02 1 4.66 1 3.64 2.87 3 5 3z" fill="#d06224"/>
          </svg>
        ),
        text: "Manajemen stok bahan dapur mudah",
      },
      {
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" fill="#d06224"/>
          </svg>
        ),
        text: "Notifikasi bahan mendekati kedaluwarsa",
      },
    ],
    illustrasi: (
      <svg viewBox="0 0 280 280" width="240" height="240" xmlns="http://www.w3.org/2000/svg">
        <circle cx="140" cy="140" r="120" fill="#FDE8D0" opacity="0.5"/>

        {/* Card / clipboard */}
        <rect x="70" y="55" width="140" height="175" rx="14" fill="white" stroke="#d06224" strokeWidth="2.5"/>
        {/* Tab atas */}
        <rect x="108" y="45" width="64" height="24" rx="8" fill="#d06224"/>
        <rect x="118" y="50" width="44" height="14" rx="5" fill="#FDE8D0"/>

        {/* Row 1 - Telur */}
        <rect x="84" y="90" width="112" height="26" rx="7" fill="#F9F9F9"/>
        <svg x="86" y="91" width="24" height="24" viewBox="0 0 127 124">
          <path d="M63.43 4.51c31.68-.07 51.67 51.46 43.78 84.12c-6.98 28.92-27.03 34.91-43.08 34.91s-35.54-7.78-43.08-33.79C12.33 59.63 33.87 4.58 63.43 4.51z" fill="#f2a05b"/>
          <path d="M39.26 29.03c-3.8 6.07-7.63 13.71-8.45 20.08c-1.5 11.73 7.13 13.05 10.14 7.23s6.09-11.71 10.98-19.52c6.76-10.79 17.83-18.02 12.39-22.71s-17.08 2.16-25.06 14.92z" fill="#fecc88"/>
        </svg>
        <rect x="116" y="97" width="55" height="6" rx="3" fill="#d06224" opacity="0.4"/>
        <rect x="174" y="96" width="14" height="8" rx="4" fill="#4CAF50" opacity="0.8"/>

        {/* Row 2 - Wortel */}
        <rect x="84" y="124" width="112" height="26" rx="7" fill="#F9F9F9"/>
        <svg x="86" y="126" width="22" height="22" viewBox="0 0 55 55">
          <path d="M32.238,15.303c-0.137,0.467-0.272,0.963-0.4,1.526c-3.5,15.417-16.372,23.55-30.887,31.589c-0.664,0.368-0.755,1.503-0.103,1.405C10.2,48.417,34.61,50.788,46.549,22.81c0,0,6.163-12.856-1.712-14.981C44.838,7.829,33.95,2.714,32.238,15.303z" fill="#D13834"/>
          <path d="M48.974,17.608c0.892-4.035,0.86-8.868-3.839-10.136c0,0-10.635-4.987-13.19,6.315c2.49-0.189,5.827-0.69,6.761-2.029c0,0,2.21,2.21,1.072,5.358c0,0,4.688-0.536,4.286-4.286c0,0,2.88,2.478,2.143,6.429C46.206,19.259,47.596,18.838,48.974,17.608z" fill="#88C057"/>
        </svg>
        <rect x="116" y="131" width="45" height="6" rx="3" fill="#d06224" opacity="0.4"/>
        <rect x="174" y="130" width="14" height="8" rx="4" fill="#FF9800" opacity="0.85"/>

        {/* Row 3 - Brokoli */}
        <rect x="84" y="158" width="112" height="26" rx="7" fill="#F9F9F9"/>
        <svg x="85" y="158" width="26" height="26" viewBox="0 0 160 130">
          <path d="M21.74 24.77L8.57 41.04s-3.95 4.95-2.93 9.84c1.15 5.46 4.05 5.79 4.05 5.79S9.5 60.91 12 64.52s3.69 5.32 12.77 8.07s25.46 5.84 25.46 5.84l4.22 16.38s1.13 4.05 6.16 6.16s8.96 1.56 8.96 1.56s2.08 5.75 8.99 7.35c5.98 1.39 10.75-1.62 10.75-1.62s5.03 3.08 11.51 1.62c7.52-1.69 9.24-6.32 9.24-6.32s6.16-.65 10.21-6.49s1.13-12.48 1.13-12.48s3.59-5.32 2.59-11.35c-.9-5.46-3.07-7.32-3.07-7.32l-12.98-9.06s5.51-2.27 7.46-12s-2.92-14.59-2.92-14.59s1.91-5.49-1.3-10.38c-3.08-4.7-7.46-2.43-9.57-4.54c-2.6-2.6-17.35-4.22-17.35-4.22L67.25 25.26l-45.51-.49z" fill="#2f7c31"/>
          <path d="M28 8.45s5.09-5.58 11.92-5.09s8.07 4.61 8.07 4.61s4.19-.69 6.82.48c5.38 2.4 4.81 5.19 6.44 5s1.63-7.11 9.23-9.52s11.73 1.25 13.36 1.15s3.65-2.03 9.42-.19c5.19 1.66 6.3 5.1 6.54 6.15c.28 1.27.28 2.69 1.82 4.32s-.11 7.54-2.32 9.94s-6.52 2.65-6.52 2.65s1.01 8.3-5.89 12.86c-4.85 3.2-10.07 1.94-10.07 1.94s-5.57 4.82-11.82 2.8c-6.25-2.02-6.92-4.61-3.46-7.5c3.46-2.88 5-8.46.87-9.52c-4.13-1.06-8.36.96-9.8 5.48c-1.44 4.52-1.54 8.46-6.25 11.82c-4.71 3.36-8.17 2.31-12.88 3.56c-4.71 1.25-7.88 5.29-11.82 5.38c-3.94.1-7.02-2.79-9.04-2.5c-2.02.29-6.15 1.25-6.15 1.25s-1.83-3.46-.67-7.69s2.78-4.8 2.78-4.8s-9.37-9.06-.76-22.88C15.6 5.66 28 8.45 28 8.45z" fill="#709921"/>
        </svg>
        <rect x="116" y="165" width="60" height="6" rx="3" fill="#d06224" opacity="0.4"/>
        <rect x="174" y="164" width="14" height="8" rx="4" fill="#4CAF50" opacity="0.8"/>

        {/* Row 4 - Tomat */}
        <rect x="84" y="192" width="112" height="26" rx="7" fill="#FFF0F0"/>
        <svg x="86" y="193" width="22" height="22" viewBox="0 0 65 65">
          <path d="M62 31.6C62.8 47 48.9 60 32.1 60S.4 46.2 2.1 30.9C4.5 9.4 20.4 8 32.1 8C39.2 8 60.2 1.8 62 31.6z" fill="#ef4d3c"/>
          <path d="M11 27c6.2-9.6 16.8-6.8 19.6-10.4c0 6.9 5 3.5 7.5 6.6c3.2 4 4.4 11.1 8.2 12.5c-3.7-7.9 2.3-7.6-6.1-18.2c4.5 2.8 6.8 0 12.9 2.5c-5.3-8.4-13.6-6-13.6-6s5.2-4.8 9.6-2.3c-4.6-6.8-17.9 1.8-17.9 1.8s-5.5-9.4-17.3.5c6.9-2.8 14.5 0 14.5 0S15.9 10.9 11 27" fill="#8cc63e"/>
        </svg>
        <rect x="116" y="199" width="40" height="6" rx="3" fill="#d06224" opacity="0.3"/>
        <rect x="174" y="198" width="14" height="8" rx="4" fill="#F44336" opacity="0.8"/>

        {/* Badge notif */}
        <circle cx="210" cy="65" r="22" fill="#d06224"/>
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
          <img src={logoOlah} alt="OLAH" className="w-24 object-contain" />
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
          <div className="text-center px-6">
            <p className="text-[#d06224] font-bold text-sm">OLAH</p>
            <p className="text-[#ae431e] text-xs mt-0.5 font-light">Punya Sisa Bahan? di OLAH Aja!</p>
          </div>
        </div>

        {/* Panel Kanan — Konten */}
        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-between px-8 pt-8 pb-2">
            <div className="flex items-center gap-2 md:hidden">
              <img src={logoOlah} alt="OLAH" className="h-8 object-contain" />
            </div>
            <span className="hidden md:block text-xs font-semibold text-gray-400 tracking-widest uppercase">
              OLAH
            </span>
            <button
              onClick={handleSkip}
              className="text-sm font-medium transition"
              style={{ color: "#d06224" }}
            >
              Lewati
            </button>
          </div>

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
            <div className="flex md:hidden justify-center mb-4">
              <div
                className="rounded-2xl p-4"
                style={{ background: "linear-gradient(135deg, #FFF5EE, #FDE8D0)" }}
              >
                {slide.illustrasi}
              </div>
            </div>

            <p
              className="text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: "#d06224" }}
            >
              — {slide.tag}
            </p>

            <h1
              className="text-2xl sm:text-3xl font-bold leading-tight mb-4 whitespace-pre-line"
              style={{ color: "#1a1a1a" }}
            >
              {slide.title}
            </h1>

            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              {slide.desc}
            </p>

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

          <div className="flex items-center justify-between px-8 py-5 border-t border-gray-100">
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
                    background: i === current ? "#d06224" : "#E5E7EB",
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
                style={{ background: "#d06224" }}
                onMouseOver={(e) => (e.currentTarget.style.background = "#ae431e")}
                onMouseOut={(e) => (e.currentTarget.style.background = "#d06224")}
              >
                {isLast ? "Masuk Sekarang" : "Lanjut →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
