// src/data/resepData.js
// Sementara pakai asset lokal — nanti ganti dengan Unsplash API
import food7 from "../assets/asset7.png";
import food8 from "../assets/asset8.png";
import food9 from "../assets/asset9.png";
import food10 from "../assets/asset10.png";
import food11 from "../assets/asset11.png";

// ── Nanti kalau API key Unsplash sudah ada, uncomment ini: ──────────────
// const getUnsplashImage = (keyword) =>
//   `https://api.unsplash.com/photos/random?query=${keyword}&client_id=API_KEY_KAMU`;
// ────────────────────────────────────────────────────────────────────────

export const SEMUA_RESEP = [
  {
    id: 1,
    title: "Tumis Bayam Tahu",
    image: food7,           // getUnsplashImage("stir fry tofu spinach")
    time: "30 Menit",
    portion: "2 Porsi",
    available: true,
    isFavorite: true,
    description:
      "Tumis bayam tahu adalah hidangan rumahan yang sederhana, sehat, dan cepat saji, yang mengombinasikan tekstur lembut dari tahu dengan kesegaran daun bayam.",
    ingredients: [
      { name: "Tahu Putih",   amount: "6", satuan: "buah" },
      { name: "Bayam",        amount: "1", satuan: "ikat" },
      { name: "Cabe Merah",   amount: "3", satuan: "buah" },
      { name: "Bawang Putih", amount: "2", satuan: "buah" },
      { name: "Bombay",       amount: "1", satuan: "buah" },
      { name: "Saus Tiram",   amount: "1", satuan: "sdm"  },
    ],
  },
  {
    id: 2,
    title: "Sup Telur Wortel",
    image: food8,           // getUnsplashImage("egg carrot soup")
    time: "20 Menit",
    portion: "3 Porsi",
    available: false,
    isFavorite: true,
    description:
      "Sup hangat dengan telur dan wortel segar, cocok untuk sarapan atau makan siang keluarga.",
    ingredients: [
      { name: "Telur",        amount: "3", satuan: "butir" },
      { name: "Wortel",       amount: "2", satuan: "buah"  },
      { name: "Bawang Putih", amount: "2", satuan: "buah"  },
    ],
  },
  {
    id: 3,
    title: "Orak-arik Sayur",
    image: food9,           // getUnsplashImage("scrambled egg vegetable")
    time: "15 Menit",
    portion: "2 Porsi",
    available: false,
    isFavorite: false,
    description:
      "Orak-arik sayur dengan wortel dan kol, menu sehat dan cepat untuk hari yang sibuk.",
    ingredients: [
      { name: "Wortel", amount: "1", satuan: "buah"  },
      { name: "Kol",    amount: "1", satuan: "ikat"  },
      { name: "Telur",  amount: "2", satuan: "butir" },
    ],
  },
  {
    id: 4,
    title: "Nasi Goreng",
    image: food11,          // getUnsplashImage("indonesian fried rice")
    time: "35 Menit",
    portion: "2 Porsi",
    available: false,
    isFavorite: false,
    description:
      "Nasi goreng khas Indonesia dengan bumbu bawang dan kecap manis yang gurih.",
    ingredients: [
      { name: "Nasi",         amount: "2", satuan: "porsi" },
      { name: "Bawang Putih", amount: "3", satuan: "buah"  },
      { name: "Telur",        amount: "1", satuan: "butir" },
    ],
  },
  {
    id: 5,
    title: "Sambal Goreng Tempe",
    image: food10,          // getUnsplashImage("tempeh sambal indonesian")
    time: "45 Menit",
    portion: "1 Porsi",
    available: true,
    isFavorite: true,
    description:
      "Sambal goreng tempe pedas khas Indonesia yang cocok disajikan dengan nasi hangat.",
    ingredients: [
      { name: "Tempe",        amount: "1", satuan: "bungkus" },
      { name: "Cabe Merah",   amount: "5", satuan: "buah"    },
      { name: "Bawang Putih", amount: "2", satuan: "buah"    },
    ],
  },
  {
    id: 6,
    title: "Sate Ayam",
    image: food7,           // getUnsplashImage("chicken satay peanut sauce")
    time: "60 Menit",
    portion: "2 Porsi",
    available: true,
    isFavorite: false,
    description:
      "Sate ayam dengan bumbu kacang khas Indonesia, dibakar hingga kecoklatan.",
    ingredients: [
      { name: "Daging Ayam",  amount: "0.5", satuan: "Kg"   },
      { name: "Bawang Putih", amount: "3",   satuan: "buah" },
    ],
  },
  {
    id: 7,
    title: "Telur Balado",
    image: food8,           // getUnsplashImage("egg balado spicy")
    time: "45 Menit",
    portion: "1 Porsi",
    available: true,
    isFavorite: false,
    description:
      "Telur balado dengan sambal merah yang pedas dan gurih, sajian khas Minang.",
    ingredients: [
      { name: "Telur",      amount: "4", satuan: "butir" },
      { name: "Cabe Merah", amount: "6", satuan: "buah"  },
    ],
  },
  {
    id: 8,
    title: "Sup Ayam",
    image: food9,           // getUnsplashImage("chicken soup clear broth")
    time: "45 Menit",
    portion: "1 Porsi",
    available: true,
    isFavorite: false,
    description:
      "Sup ayam hangat dengan wortel dan kentang, cocok dimakan saat cuaca dingin.",
    ingredients: [
      { name: "Daging Ayam", amount: "0.3", satuan: "Kg"   },
      { name: "Wortel",      amount: "2",   satuan: "buah" },
    ],
  },
  {
    id: 9,
    title: "Nasi Goreng Spesial",
    image: food11,          // getUnsplashImage("special fried rice topping")
    time: "35 Menit",
    portion: "2 Porsi",
    available: false,
    isFavorite: false,
    description:
      "Nasi goreng spesial dengan topping telur, ayam, dan sayuran pilihan.",
    ingredients: [
      { name: "Nasi",         amount: "2", satuan: "porsi" },
      { name: "Telur",        amount: "2", satuan: "butir" },
      { name: "Bawang Putih", amount: "3", satuan: "buah"  },
    ],
  },
  {
    id: 10,
    title: "Tumis Tahu",
    image: food10,          // getUnsplashImage("tofu stir fry cabbage")
    time: "20 Menit",
    portion: "2 Porsi",
    available: true,
    isFavorite: false,
    description:
      "Tumis tahu dengan kol dan bumbu sederhana, sehat dan mudah dibuat.",
    ingredients: [
      { name: "Tahu Putih", amount: "4", satuan: "buah" },
      { name: "Kol",        amount: "1", satuan: "ikat" },
    ],
  },
  {
    id: 11,
    title: "Orak-arik Wortel",
    image: food9,           // getUnsplashImage("carrot egg scramble")
    time: "15 Menit",
    portion: "2 Porsi",
    available: false,
    isFavorite: false,
    description:
      "Orak-arik wortel sederhana dan bergizi, siap dalam 15 menit.",
    ingredients: [
      { name: "Wortel", amount: "2", satuan: "buah"  },
      { name: "Telur",  amount: "2", satuan: "butir" },
    ],
  },
  {
    id: 12,
    title: "Sambal Tempe",
    image: food10,          // getUnsplashImage("tempeh indonesian spicy")
    time: "30 Menit",
    portion: "1 Porsi",
    available: true,
    isFavorite: false,
    description:
      "Sambal tempe pedas dengan bumbu merah yang kaya rasa.",
    ingredients: [
      { name: "Tempe",      amount: "1", satuan: "bungkus" },
      { name: "Cabe Merah", amount: "4", satuan: "buah"    },
    ],
  },
  {
    id: 13,
    title: "Sup Bayam",
    image: food7,           // getUnsplashImage("spinach clear soup")
    time: "20 Menit",
    portion: "2 Porsi",
    available: true,
    isFavorite: false,
    description:
      "Sup bayam segar dengan bumbu bening, ringan dan menyehatkan.",
    ingredients: [
      { name: "Bayam",        amount: "1", satuan: "ikat" },
      { name: "Bawang Putih", amount: "2", satuan: "buah" },
    ],
  },
  {
    id: 14,
    title: "Telur Ceplok",
    image: food8,           // getUnsplashImage("fried egg sunny side up")
    time: "10 Menit",
    portion: "1 Porsi",
    available: true,
    isFavorite: false,
    description:
      "Telur ceplok sederhana, cepat, dan lezat. Menu andalan saat lapar mendadak.",
    ingredients: [
      { name: "Telur", amount: "2", satuan: "butir" },
    ],
  },
  {
    id: 15,
    title: "Nasi Goreng Cabe",
    image: food11,          // getUnsplashImage("spicy fried rice chili")
    time: "25 Menit",
    portion: "2 Porsi",
    available: false,
    isFavorite: false,
    description:
      "Nasi goreng pedas dengan cabe rawit melimpah, cocok untuk pecinta pedas.",
    ingredients: [
      { name: "Nasi",       amount: "2", satuan: "porsi" },
      { name: "Cabe Merah", amount: "8", satuan: "buah"  },
      { name: "Telur",      amount: "1", satuan: "butir" },
    ],
  },
];

// Helper: ambil resep berdasarkan id
export const getResepById = (id) =>
  SEMUA_RESEP.find((r) => r.id === Number(id));

// Helper: resep favorit
export const RESEP_FAVORIT = SEMUA_RESEP.filter((r) => r.isFavorite);

// Helper: semua resep non-favorit
export const RESEP_SEMUA = SEMUA_RESEP.filter((r) => !r.isFavorite);