import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import food7 from "../assets/asset7.png";
import food8 from "../assets/asset8.png";
import food9 from "../assets/asset9.png";
import food10 from "../assets/asset10.png";
import food11 from "../assets/asset11.png";
import heroImg from "../assets/asset6.png";

// ── Data awal resep (fallback jika localStorage kosong) ──────────────────────
const INITIAL_RECIPES = [
  { id: 5,  title: "Tumis Bayam Tahu",    time: "30 Menit", portion: "2 Porsi", ingredients: ["Bayam", "Tahu"],   image: food7,  isFavorite: false },
  { id: 6,  title: "Sup Telur Wortel",    time: "20 Menit", portion: "2 Porsi", ingredients: ["Telur", "Wortel"], image: food8,  isFavorite: true  },
  { id: 7,  title: "Orak-arik Sayur",     time: "15 Menit", portion: "2 Porsi", ingredients: ["Wortel", "Kol"],   image: food9,  isFavorite: false },
  { id: 8,  title: "Sambal Goreng Tempe", time: "45 Menit", portion: "1 Porsi", ingredients: ["Tempe", "Cabe"],   image: food10, isFavorite: true  },
  { id: 9,  title: "Nasi Goreng",         time: "35 Menit", portion: "2 Porsi", ingredients: ["Bawang", "Nasi"],  image: food11, isFavorite: false },
  { id: 10, title: "Tumis Bayam Tahu",    time: "30 Menit", portion: "2 Porsi", ingredients: ["Bayam", "Tahu"],   image: food7,  isFavorite: false },
  { id: 11, title: "Sup Telur Wortel",    time: "20 Menit", portion: "2 Porsi", ingredients: ["Telur", "Wortel"], image: food8,  isFavorite: false },
  { id: 12, title: "Orak-arik Sayur",     time: "15 Menit", portion: "2 Porsi", ingredients: ["Wortel", "Kol"],   image: food9,  isFavorite: true  },
  { id: 13, title: "Sambal Goreng Tempe", time: "45 Menit", portion: "1 Porsi", ingredients: ["Tempe", "Cabe"],   image: food10, isFavorite: false },
  { id: 14, title: "Nasi Goreng",         time: "35 Menit", portion: "2 Porsi", ingredients: ["Bawang", "Nasi"],  image: food11, isFavorite: false },
];

// ── Helper: baca dari localStorage dengan fallback ───────────────────────────
function loadStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

// ── Helper: tulis ke localStorage ───────────────────────────────────────────
function saveStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage penuh atau private mode — abaikan
  }
}

export default function DashboardPage() {
  const navigate = useNavigate();

  // ── STATE dengan localStorage ─────────────────────────────────────────────

  // 1. activeFilter — tersimpan agar filter aktif tidak reset saat balik ke halaman
  const [activeFilter, setActiveFilter] = useState(
    () => loadStorage("dashboard_activeFilter", "Semua")
  );

  // 2. showAllExpiring — tersimpan agar pilihan lihat semua/sedikit tidak reset
  const [showAllExpiring, setShowAllExpiring] = useState(
    () => loadStorage("dashboard_showAllExpiring", false)
  );

  // 3. recipeCards — tersimpan khusus untuk status isFavorite per resep
  //    Gambar (image) tidak bisa disimpan di localStorage karena berupa objek JS,
  //    jadi kita simpan hanya isFavorite-nya, lalu gabungkan kembali dengan data awal.
  const [recipeCards, setRecipeCards] = useState(() => {
    const savedFavorites = loadStorage("dashboard_favorites", null);
    if (savedFavorites) {
      // Gabungkan data awal dengan status favorit yang tersimpan
      return INITIAL_RECIPES.map((r) => ({
        ...r,
        isFavorite: savedFavorites[r.id] ?? r.isFavorite,
      }));
    }
    return INITIAL_RECIPES;
  });

  // ── State biasa (tidak perlu localStorage) ────────────────────────────────
  const [searchQuery, setSearchQuery]       = useState("");
  const [appliedSearch, setAppliedSearch]   = useState("");

  const recommendationFilters = ["Semua", "Cepat", "Favorit"];

  // ── Simpan ke localStorage setiap kali state berubah ─────────────────────

  // Simpan activeFilter
  useEffect(() => {
    saveStorage("dashboard_activeFilter", activeFilter);
  }, [activeFilter]);

  // Simpan showAllExpiring
  useEffect(() => {
    saveStorage("dashboard_showAllExpiring", showAllExpiring);
  }, [showAllExpiring]);

  // Simpan hanya isFavorite per id (bukan gambar/objek besar)
  useEffect(() => {
    const favoritesMap = {};
    recipeCards.forEach((r) => { favoritesMap[r.id] = r.isFavorite; });
    saveStorage("dashboard_favorites", favoritesMap);
  }, [recipeCards]);

  // ── Fungsi toggle favorit ─────────────────────────────────────────────────
  const toggleFavorite = (id, e) => {
    e.stopPropagation(); // cegah navigasi ke detail resep
    setRecipeCards((prev) =>
      prev.map((r) => r.id === id ? { ...r, isFavorite: !r.isFavorite } : r)
    );
  };

  // ── Data statis (tidak perlu localStorage) ────────────────────────────────
  const expiringItems = [
    { name: "Wortel", days: "3 Hari Lagi", percent: 65 },
    { name: "Bayam",  days: "2 Hari Lagi", percent: 45 },
    { name: "Tahu",   days: "1 Hari Lagi", percent: 20 },
    { name: "Kol",    days: "2 Hari Lagi", percent: 45 },
    { name: "Cabe",   days: "4 Hari Lagi", percent: 80 },
  ];

  const visibleExpiring = showAllExpiring ? expiringItems : expiringItems.slice(0, 4);

  const notifications = [
    { id: 1, category: "Stok",             message: "Stok sayuran hampir habis",  time: "2 jam lalu"  },
    { id: 2, category: "Bahan Kadaluarsa", message: "Kentang sudah kadaluarsa",   time: "1 hari lalu" },
  ];

  // ── Filter resep ──────────────────────────────────────────────────────────
  const filteredRecipes = useMemo(() => {
    let results = recipeCards;
    if (activeFilter === "Cepat") {
      results = results.filter((r) => parseInt(r.time) < 20);
    }
    if (activeFilter === "Favorit") {
      results = results.filter((r) => r.isFavorite);
    }
    if (appliedSearch && appliedSearch.trim() !== "") {
      const q = appliedSearch.toLowerCase();
      results = results.filter((r) =>
        r.title.toLowerCase().includes(q) ||
        r.ingredients.some((ing) => ing.toLowerCase().includes(q))
      );
    }
    return results;
  }, [activeFilter, recipeCards, appliedSearch]);

  return (
    <PageLayout>

        {/* Hero Banner */}
        <section className="relative h-[220px] overflow-hidden">
          <img src={heroImg} alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(232,179,148,0.74)_38%,rgba(208,98,36,1)_100%)]" />
          <div className="absolute top-[28px] left-4 sm:left-[40px] w-[calc(100%-32px)] max-w-[400px]">
            <p className="text-white text-2xl font-normal">Selamat Pagi,</p>
            <h1 className="text-white text-[28px] font-semibold mt-1">Mau Masak Apa Hari Ini?</h1>
            <p className="text-white/80 text-base mt-1">
              Punya Sisa Bahan Makanan? di <strong>OLAH</strong> Aja!
            </p>
            <div className="flex gap-3 mt-3">
              <button className="w-[130px] h-8 bg-white rounded-[25px] text-[#d06224] font-semibold text-sm">
                Tentang OLAH
              </button>
              <button
                onClick={() => navigate("/artikel")}
                className="w-[105px] h-8 rounded-[25px] border-2 border-white text-white font-normal text-sm"
              >
                Lihat Artikel
              </button>
            </div>
          </div>
          {/* Search bar */}
          <div className="absolute top-[32px] left-4 right-4 sm:right-8 sm:left-auto flex flex-col sm:flex-row gap-2">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                const v = e.target.value;
                setSearchQuery(v);
                setAppliedSearch(v);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setAppliedSearch(searchQuery.trim());
                }
              }}
              placeholder="Cari Resep atau Bahan"
              className="w-full sm:w-[300px] px-4 py-2.5 rounded-l-full bg-white/90 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setAppliedSearch(searchQuery.trim())}
              className="bg-[#E87722] px-4 rounded-r-full flex items-center justify-center"
            >
              <svg width="16" height="16" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26.5865 24.2967L20.6502 18.3986C22.4301 16.095 23.2611 13.2053 22.9746 10.3156C22.6881 7.42597 21.3056 4.75272 19.1075 2.83817C16.9095 0.923624 14.0604 -0.0888533 11.1383 0.00612555C8.21628 0.101104 5.43999 1.29643 3.37267 3.34962C1.30535 5.4028 0.1018 8.16011 0.00616771 11.0622C-0.0894648 13.9643 0.929981 16.7939 2.85771 18.9769C4.78543 21.16 7.47708 22.533 10.3866 22.8175C13.2962 23.1021 16.2058 22.2768 18.5252 20.5091L24.4665 26.4109C24.606 26.5495 24.7716 26.6594 24.9539 26.7344C25.1363 26.8094 25.3316 26.848 25.529 26.848C25.7263 26.848 25.9217 26.8094 26.104 26.7344C26.2863 26.6594 26.4519 26.5495 26.5915 26.4109C26.731 26.2724 26.8417 26.1078 26.9172 25.9268C26.9927 25.7457 27.0316 25.5517 27.0316 25.3557C27.0316 25.1597 26.9927 24.9657 26.9172 24.7846C26.8417 24.6035 26.731 24.439 26.5915 24.3005L26.5865 24.2967ZM3.02522 11.4464C3.02522 9.77678 3.52374 8.14463 4.45773 6.75637C5.39172 5.36811 6.71924 4.28609 8.27241 3.64714C9.82558 3.00819 11.5346 2.84102 13.1835 3.16675C14.8323 3.49248 16.3469 4.29649 17.5356 5.47711C18.7244 6.65773 19.5339 8.16193 19.8619 9.7995C20.1899 11.4371 20.0215 13.1345 19.3782 14.677C18.7348 16.2196 17.6454 17.538 16.2476 18.4656C14.8497 19.393 13.2346 19.9115 11.5735 19.9115C9.33278 19.9115 7.18377 19.0278 5.6114 17.4657C4.03904 15.9036 3.02522 13.7694 3.02522 11.4464Z" fill="white"/>
              </svg>
            </button>
          </div>
        </section>

        <div className="px-7 py-5 flex flex-col gap-6 overflow-hidden">

          {/* Rekomendasi */}
          <section>
            <h2 className="text-lg font-light text-black mb-2">Rekomendasi Makanan Untukmu</h2>

            {/* Filter tabs */}
            <div className="flex gap-0 mb-5 h-[30px] w-full max-w-[330px] rounded-[15px] bg-white shadow-sm overflow-hidden">
              {recommendationFilters.map((f) => {
                const isActive = activeFilter === f;
                return (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`flex-1 h-full text-sm font-medium transition ${
                      isActive ? "bg-[#d06224] text-white" : "text-[#99999980]"
                    }`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>

            {/* Recipe cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 w-full">
              {appliedSearch && appliedSearch.trim() !== "" && filteredRecipes.length === 0 ? (
                <div className="col-span-full bg-white rounded-[12px] p-6 text-center text-gray-500">
                  Tidak ditemukan resep atau bahan untuk "
                  <span className="font-semibold text-black">{appliedSearch}</span>"
                </div>
              ) : (
                filteredRecipes.map((recipe) => (
                  <article
                    key={recipe.id}
                    className="relative h-[220px] cursor-pointer"
                    onClick={() => navigate(`/detail-resep/${recipe.id}`)}
                  >
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="absolute top-0 left-0 w-full h-[215px] object-cover rounded-[12px]"
                    />
                    <div className="absolute top-[130px] left-0 w-full h-[85px] bg-[#8a8635cc] rounded-[12px]" />
                    <div className="absolute top-[137px] left-[10px] right-[10px]">
                      <span className="font-semibold text-white text-sm leading-normal truncate block">
                        {recipe.title}
                      </span>
                    </div>

                    {/* ── Ikon hati: klik untuk toggle favorit ── */}
                    <button
                      onClick={(e) => toggleFavorite(recipe.id, e)}
                      className="absolute top-[155px] right-[10px] p-1"
                      title={recipe.isFavorite ? "Hapus dari favorit" : "Tambah ke favorit"}
                    >
                      <svg
                        width="18" height="17" viewBox="0 0 20 19" fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.316 18.362C9.44273 18.4518 9.5942 18.5 9.7495 18.5C9.9048 18.5 10.0563 18.4518 10.183 18.362L9.75 17.75L10.184 18.362L10.192 18.356L10.213 18.341L10.293 18.283C10.3623 18.233 10.4607 18.16 10.588 18.064C12.074 16.9424 13.4767 15.7145 14.785 14.39C15.933 13.222 17.1 11.857 17.984 10.409C18.864 8.969 19.5 7.385 19.5 5.797C19.5 3.912 18.915 2.439 17.88 1.439C16.85 0.445 15.46 0 14 0C12.275 0 10.752 0.833 9.75 2.117C8.748 0.833 7.224 0 5.5 0C2.42 0 0 2.639 0 5.797C0 7.385 0.637 8.968 1.516 10.409C2.4 11.857 3.567 13.222 4.715 14.391C6.10981 15.8021 7.61161 17.1034 9.207 18.283L9.287 18.341L9.308 18.356L9.316 18.362Z"
                          fill={recipe.isFavorite ? "white" : "none"}
                          stroke="white"
                          strokeWidth={recipe.isFavorite ? "0" : "1.5"}
                        />
                      </svg>
                    </button>

                    <div className="absolute top-[162px] left-[10px] flex items-center gap-1.5 whitespace-nowrap">
                      <span className="text-white text-xs">{recipe.time}</span>
                      <span className="w-1 h-1 bg-white rounded-full inline-block" />
                      <span className="text-white text-xs">{recipe.portion}</span>
                    </div>
                    <div className="absolute top-[185px] left-[10px] flex gap-1.5">
                      {recipe.ingredients.map((ing) => (
                        <div key={ing} className="bg-[#d06224bf] rounded-[10px] px-2 h-[18px] flex items-center justify-center">
                          <span className="text-white text-[11px]">{ing}</span>
                        </div>
                      ))}
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>

          {/* Bahan Kadaluarsa + Notifikasi */}
          <section className="flex flex-col lg:flex-row gap-5">

            {/* Bahan Kadaluarsa */}
            <div className="flex-1 bg-white rounded-[15px] p-5 shadow-sm">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

                {/* Dua Pie Chart */}
                <div className="flex gap-5 shrink-0">
                  <div className="flex flex-col items-center gap-2">
                    <svg width="140" height="140" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#e8d5c8" strokeWidth="20" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#d06224" strokeWidth="20"
                        strokeDasharray={`${72 * 2.513} ${(100 - 72) * 2.513}`}
                        strokeDashoffset="62.8" strokeLinecap="butt" transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#d06224] inline-block" />
                        <span className="text-[10px] text-gray-500">Terselamatkan 72%</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#e8d5c8] inline-block" />
                        <span className="text-[10px] text-gray-500">Sisa 28%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <svg width="140" height="140" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#e8d5c8" strokeWidth="20" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#ae431e" strokeWidth="20"
                        strokeDasharray={`${35 * 2.513} ${(100 - 35) * 2.513}`}
                        strokeDashoffset="62.8" strokeLinecap="butt" transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#ae431e] inline-block" />
                        <span className="text-[10px] text-gray-500">Terbuang 35%</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#e8d5c8] inline-block" />
                        <span className="text-[10px] text-gray-500">Sisa 65%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bar List */}
                <div className="flex-1 min-w-0 w-full">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-light text-black">Bahan Segera Kadaluarsa</h2>
                    <button
                      onClick={() => setShowAllExpiring(!showAllExpiring)}
                      className="text-sm text-[#d06224] font-semibold"
                    >
                      {showAllExpiring ? "Lihat Sedikit" : "Lihat Semua"}
                    </button>
                  </div>
                  <div className="flex flex-col gap-5">
                    {visibleExpiring.map((item) => (
                      <div key={item.name}>
                        <div className="flex justify-between mb-0.5">
                          <span className="text-xs font-medium text-black">{item.name}</span>
                          <span className="text-[10px] text-gray-400">{item.days}</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${item.percent}%`,
                              background: item.percent <= 25 ? "#ae431e" : item.percent >= 75 ? "#8a8635" : "#d06224"
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Notifikasi */}
            <div className="w-full lg:w-[450px] bg-white rounded-[15px] p-5 shadow-sm">
              <h2 className="text-lg font-light text-black mb-3">Notifikasi Terbaru</h2>
              <div className="flex flex-col gap-2">
                {notifications.map((n) => (
                  <div key={n.id} className="bg-[#d9d9d980] rounded-[15px] px-4 py-3">
                    <p className="text-[#d06224] text-sm font-medium">{n.category}</p>
                    <p className="text-black text-sm font-light mt-0.5">{n.message}</p>
                    <p className="text-[#99999980] text-[10px] mt-1">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>

          </section>

        </div>
    </PageLayout>
  );
}
