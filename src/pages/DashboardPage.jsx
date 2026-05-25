import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import { useUnsplashImage } from "../hooks/useUnsplashImage";
import { recipeAPI, pantryAPI, notificationAPI } from "../utils/api";
import heroImg from "../assets/asset6.png";

function loadStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : fallback;
  } catch { return fallback; }
}

function saveStorage(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { }
}

export default function DashboardPage() {
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState(
    () => loadStorage("dashboard_activeFilter", "Semua")
  );
  const [showAllExpiring, setShowAllExpiring] = useState(
    () => loadStorage("dashboard_showAllExpiring", false)
  );
  const [recipeCards, setRecipeCards] = useState([]);
  const [expiringItems, setExpiringItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Pengguna");
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [notifications, setNotifications] = useState([]);

  const recommendationFilters = ["Semua", "Cepat", "Favorit"];

  useEffect(() => { saveStorage("dashboard_activeFilter", activeFilter); }, [activeFilter]);
  useEffect(() => { saveStorage("dashboard_showAllExpiring", showAllExpiring); }, [showAllExpiring]);
  useEffect(() => {
    const favoritesMap = {};
    recipeCards.forEach((r) => { favoritesMap[r.id] = r.isFavorite; });
    saveStorage("dashboard_favorites", favoritesMap);
  }, [recipeCards]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Ambil resep
        const resepRes = await recipeAPI.getAll();
        console.log("resepRes:", resepRes);
        const recipes = Array.isArray(resepRes.data)
          ? resepRes.data
          : Array.isArray(resepRes.data?.recipes)
            ? resepRes.data.recipes
            : [];
        setRecipeCards(recipes);

        // Ambil pantry
        const pantryRes = await pantryAPI.getAll();
        console.log("pantryRes:", pantryRes);
        const pantryList = Array.isArray(pantryRes.data)
          ? pantryRes.data
          : Array.isArray(pantryRes.data?.items)
            ? pantryRes.data.items
            : [];
        const expiring = pantryList
          .filter((item) => item.daysLeft <= 5)
          .map((item) => ({
            name: item.name,
            days: `${item.daysLeft} Hari Lagi`,
            percent: Math.min(100, (item.daysLeft / 7) * 100),
          }));
        setExpiringItems(expiring);
        
        const notifRes = await notificationAPI.getAll();
        const notifList = Array.isArray(notifRes.data?.notifications)
          ? notifRes.data.notifications
          : [];
        setNotifications(notifList);
        // Ambil nama user
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user?.name) setUserName(user.name);

      } catch (err) {
        console.error("Gagal fetch data dashboard:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setRecipeCards((prev) =>
      prev.map((r) => r.id === id ? { ...r, isFavorite: !r.isFavorite } : r)
    );
  };

  const RecipeCard = ({ recipe }) => {
    const imageUrl = useUnsplashImage(recipe.title);
    return (
      <article
        className="relative h-[180px] sm:h-[220px] cursor-pointer"
        onClick={() => navigate(`/detail-resep/${recipe.id}`)}
      >
        <img
          src={imageUrl}
          alt={recipe.title}
          className="absolute top-0 left-0 w-full h-[175px] sm:h-[215px] object-cover rounded-[12px]"
        />
        <div className="absolute top-[95px] sm:top-[130px] left-0 w-full h-[80px] sm:h-[85px] bg-[#8a8635cc] rounded-[12px]" />
        <div className="absolute top-[100px] sm:top-[137px] left-[8px] right-[8px] sm:left-[10px] sm:right-[10px]">
          <span className="font-semibold text-white text-xs sm:text-sm leading-normal truncate block">
            {recipe.title}
          </span>
        </div>
        <button
          onClick={(e) => toggleFavorite(recipe.id, e)}
          className="absolute top-[118px] sm:top-[155px] right-[8px] sm:right-[10px] p-1"
        >
          <svg width="16" height="15" viewBox="0 0 20 19" fill="none">
            <path
              d="M9.316 18.362C9.44273 18.4518 9.5942 18.5 9.7495 18.5C9.9048 18.5 10.0563 18.4518 10.183 18.362L9.75 17.75L10.184 18.362L10.192 18.356L10.213 18.341L10.293 18.283C10.3623 18.233 10.4607 18.16 10.588 18.064C12.074 16.9424 13.4767 15.7145 14.785 14.39C15.933 13.222 17.1 11.857 17.984 10.409C18.864 8.969 19.5 7.385 19.5 5.797C19.5 3.912 18.915 2.439 17.88 1.439C16.85 0.445 15.46 0 14 0C12.275 0 10.752 0.833 9.75 2.117C8.748 0.833 7.224 0 5.5 0C2.42 0 0 2.639 0 5.797C0 7.385 0.637 8.968 1.516 10.409C2.4 11.857 3.567 13.222 4.715 14.391C6.10981 15.8021 7.61161 17.1034 9.207 18.283L9.287 18.341L9.308 18.356L9.316 18.362Z"
              fill={recipe.isFavorite ? "white" : "none"}
              stroke="white"
              strokeWidth={recipe.isFavorite ? "0" : "1.5"}
            />
          </svg>
        </button>
        <div className="absolute top-[127px] sm:top-[162px] left-[8px] sm:left-[10px] flex items-center gap-1 whitespace-nowrap">
          <span className="text-white text-[10px] sm:text-xs">{recipe.time}</span>
          <span className="w-1 h-1 bg-white rounded-full inline-block" />
          <span className="text-white text-[10px] sm:text-xs">{recipe.portion}</span>
        </div>
        <div className="absolute top-[145px] sm:top-[185px] left-[8px] sm:left-[10px] flex gap-1">
          {recipe.ingredients.slice(0, 2).map((ing) => (
            <div key={ing} className="bg-[#d06224bf] rounded-[10px] px-1.5 h-[16px] sm:h-[18px] flex items-center justify-center">
              <span className="text-white text-[9px] sm:text-[11px]">{ing}</span>
            </div>
          ))}
        </div>
      </article>
    );
  };

  const visibleExpiring = showAllExpiring ? expiringItems : expiringItems.slice(0, 4);

  const filteredRecipes = useMemo(() => {
    let results = recipeCards;
    if (activeFilter === "Cepat") results = results.filter((r) => parseInt(r.time) < 20);
    if (activeFilter === "Favorit") results = results.filter((r) => r.isFavorite);
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

        <div className="absolute top-[20px] left-4 sm:left-[40px] w-[55%] sm:w-[calc(100%-340px)] max-w-[380px]">
          <p className="text-white text-lg sm:text-2xl font-normal leading-tight">Selamat Pagi, {userName}!</p>
          <h1 className="text-white text-xl sm:text-[28px] font-semibold mt-0.5 leading-snug">Mau Masak Apa Hari Ini?</h1>
          <p className="text-white/80 text-xs sm:text-base mt-1 hidden sm:block">
            Punya Sisa Bahan Makanan? di <strong>OLAH</strong> Aja!
          </p>
          <div className="flex gap-2 mt-2 sm:mt-3">
            <button className="h-7 sm:h-8 px-3 sm:px-4 bg-white rounded-[25px] text-[#d06224] font-semibold text-xs sm:text-sm whitespace-nowrap">
              Tentang OLAH
            </button>
            <button
              onClick={() => navigate("/artikel")}
              className="h-7 sm:h-8 px-3 sm:px-4 rounded-[25px] border-2 border-white text-white font-normal text-xs sm:text-sm whitespace-nowrap"
            >
              Lihat Artikel
            </button>
          </div>
        </div>

        <div className="absolute top-3 left-4 right-4 sm:top-[32px] sm:bottom-auto sm:left-auto sm:right-8 sm:w-[300px] flex gap-0">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => {
              const v = e.target.value;
              setSearchQuery(v);
              setAppliedSearch(v);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") setAppliedSearch(searchQuery.trim());
            }}
            placeholder="Cari Resep atau Bahan"
            className="flex-1 px-4 py-2 rounded-l-full bg-white/90 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setAppliedSearch(searchQuery.trim())}
            className="bg-[#E87722] px-4 rounded-r-full flex items-center justify-center"
          >
            <svg width="16" height="16" viewBox="0 0 28 27" fill="none">
              <path d="M26.5865 24.2967L20.6502 18.3986C22.4301 16.095 23.2611 13.2053 22.9746 10.3156C22.6881 7.42597 21.3056 4.75272 19.1075 2.83817C16.9095 0.923624 14.0604 -0.0888533 11.1383 0.00612555C8.21628 0.101104 5.43999 1.29643 3.37267 3.34962C1.30535 5.4028 0.1018 8.16011 0.00616771 11.0622C-0.0894648 13.9643 0.929981 16.7939 2.85771 18.9769C4.78543 21.16 7.47708 22.533 10.3866 22.8175C13.2962 23.1021 16.2058 22.2768 18.5252 20.5091L24.4665 26.4109C24.606 26.5495 24.7716 26.6594 24.9539 26.7344C25.1363 26.8094 25.3316 26.848 25.529 26.848C25.7263 26.848 25.9217 26.8094 26.104 26.7344C26.2863 26.6594 26.4519 26.5495 26.5915 26.4109C26.731 26.2724 26.8417 26.1078 26.9172 25.9268C26.9927 25.7457 27.0316 25.5517 27.0316 25.3557C27.0316 25.1597 26.9927 24.9657 26.9172 24.7846C26.8417 24.6035 26.731 24.439 26.5915 24.3005L26.5865 24.2967ZM3.02522 11.4464C3.02522 9.77678 3.52374 8.14463 4.45773 6.75637C5.39172 5.36811 6.71924 4.28609 8.27241 3.64714C9.82558 3.00819 11.5346 2.84102 13.1835 3.16675C14.8323 3.49248 16.3469 4.29649 17.5356 5.47711C18.7244 6.65773 19.5339 8.16193 19.8619 9.7995C20.1899 11.4371 20.0215 13.1345 19.3782 14.677C18.7348 16.2196 17.6454 17.538 16.2476 18.4656C14.8497 19.393 13.2346 19.9115 11.5735 19.9115C9.33278 19.9115 7.18377 19.0278 5.6114 17.4657C4.03904 15.9036 3.02522 13.7694 3.02522 11.4464Z" fill="white" />
            </svg>
          </button>
        </div>
      </section>

      <div className="px-4 sm:px-7 py-5 flex flex-col gap-6 overflow-hidden">

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
                  className={`flex-1 h-full text-sm font-medium transition ${isActive ? "bg-[#d06224] text-white" : "text-[#99999980]"}`}
                >
                  {f}
                </button>
              );
            })}
          </div>

          {/* Recipe cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 w-full">
            {loading ? (
              <div className="col-span-full text-center text-gray-400 py-6">
                Memuat resep...
              </div>
            ) : appliedSearch && appliedSearch.trim() !== "" && filteredRecipes.length === 0 ? (
              <div className="col-span-full bg-white rounded-[12px] p-6 text-center text-gray-500">
                Tidak ditemukan resep atau bahan untuk "
                <span className="font-semibold text-black">{appliedSearch}</span>"
              </div>
            ) : filteredRecipes.length === 0 ? (
              <div className="col-span-full text-center text-gray-400 py-6">
                Belum ada resep tersedia.
              </div>
            ) : (
              filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))
            )}
          </div>
        </section>

        {/* Bahan Kadaluarsa + Notifikasi */}
        <section className="flex flex-col lg:flex-row gap-5">

          {/* Bahan Kadaluarsa */}
          <div className="flex-1 bg-white rounded-[15px] p-4 sm:p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="flex flex-col items-center gap-3 shrink-0">
                <svg width="200" height="200" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#ae431e" strokeWidth="20" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#d06224" strokeWidth="20"
                    strokeDasharray={`${72 * 2.513} ${(100 - 72) * 2.513}`}
                    strokeDashoffset="62.8" strokeLinecap="butt" transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#d06224] inline-block" />
                    <span className="text-xs text-gray-500">Terselamatkan 72%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ae431e] inline-block" />
                    <span className="text-xs text-gray-500">Terbuang 35%</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 min-w-0 w-full">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-base sm:text-lg font-light text-black">Bahan Segera Kadaluarsa</h2>
                  <button
                    onClick={() => setShowAllExpiring(!showAllExpiring)}
                    className="text-sm text-[#d06224] font-semibold shrink-0 ml-2"
                  >
                    {showAllExpiring ? "Lihat Sedikit" : "Lihat Semua"}
                  </button>
                </div>
                <div className="flex flex-col gap-4 sm:gap-5">
                  {visibleExpiring.length === 0 ? (
                    <p className="text-sm text-gray-400">Tidak ada bahan yang hampir kadaluarsa.</p>
                  ) : (
                    visibleExpiring.map((item) => (
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
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Notifikasi */}
          <div className="w-full lg:w-[450px] bg-white rounded-[15px] p-4 sm:p-5 shadow-sm">
            <h2 className="text-base sm:text-lg font-light text-black mb-3">Notifikasi Terbaru</h2>
            <div className="flex flex-col gap-2">
              {notifications.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-gray-400 text-sm">Tidak ada notifikasi saat ini.</p>
                </div>
              ) : (
                notifications.map((n) => (
                  <div key={n.id} className="bg-[#d9d9d980] rounded-[15px] px-4 py-3">
                    <p className="text-[#d06224] text-sm font-medium">{n.category}</p>
                    <p className="text-black text-sm font-light mt-0.5">{n.message}</p>
                    <p className="text-[#99999980] text-[10px] mt-1">{n.time}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}