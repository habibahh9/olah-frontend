import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import { useUnsplashImage } from "../hooks/useUnsplashImage";
import { recipeAPI } from "../utils/api";

export default function ResepPage() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState(
    () => localStorage.getItem("resep_searchQuery") || ""
  );

  useEffect(() => {
    localStorage.setItem("resep_searchQuery", searchQuery);
  }, [searchQuery]);

  const [favoriteMenus, setFavoriteMenus] = useState([]);
  const [allMenus, setAllMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResep = async () => {
      setLoading(true);
      try {
        const res = await recipeAPI.getAll();
        const list = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.recipes)
            ? res.data.recipes
            : [];

        const loved =
          JSON.parse(localStorage.getItem("user") || "{}").lovedRecipes || [];

        const mapped = list.map((r) => ({
          id: r._id,
          title: r.recipeName || r.title || "Resep",
          time: r.cookingTimeMinutes ? `${r.cookingTimeMinutes} Menit` : "-",
          portion: r.servings ? `${r.servings} Porsi` : "-",
          ingredients: Array.isArray(r.ingredients)
            ? r.ingredients.slice(0, 2).map((i) => i.name || i)
            : [],
          available: r.available ?? false,

          isFavorite: loved.includes(r._id),
          imageUrl: r.imageUrl || null,
        }));

        setFavoriteMenus(mapped.filter((r) => r.isFavorite).slice(0, 5));
        setAllMenus(mapped);
      } catch (err) {
        console.error("Gagal fetch resep:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchResep();
  }, []);

  // ✅ Fix: filteredAllMenus tidak lagi menyertakan duplikat favorit
  const query = searchQuery.trim().toLowerCase();

  const filteredFavoriteMenus = query
    ? favoriteMenus.filter((m) => m.title.toLowerCase().includes(query))
    : favoriteMenus;

  const filteredAllMenus = query
    ? allMenus.filter((m) => m.title.toLowerCase().includes(query))
    : allMenus;

  // ─── Recipe Card ──────────────────────────────────────────────────────────
  const RecipeCard = ({ recipe }) => {
    const unsplashUrl = useUnsplashImage(recipe.title);
    const imageUrl = recipe.imageUrl || unsplashUrl;

    return (
      <article
        className="relative h-[220px] cursor-pointer"
        onClick={() => navigate(`/detail-resep/${recipe.id}`)}
      >
        <img
          src={imageUrl}
          alt={recipe.title}
          className="absolute top-0 left-0 w-full h-[215px] object-cover rounded-[12px]"
        />
        <div className="absolute top-[130px] left-0 w-full h-[85px] bg-[#8a8635cc] rounded-[12px]" />

        {/* ✅ Fix: right-[36px] agar tidak tertutup ikon available */}
        <div className="absolute top-[137px] left-[10px] right-[36px]">
          <span className="font-semibold text-white text-sm leading-normal truncate block">
            {recipe.title}
          </span>
        </div>

        {/* Indikator ketersediaan bahan */}
        <div className="absolute top-[138px] right-[8px]">
          {recipe.available ? (
            <div className="w-5 h-5 rounded-full bg-[#36c35c] flex items-center justify-center text-white text-[10px]">
              ✓
            </div>
          ) : (
            <div className="w-5 h-5 rounded-full bg-[#ff2e2e] flex items-center justify-center text-white text-[10px]">
              ✕
            </div>
          )}
        </div>

        <div className="absolute top-[163px] left-[10px] flex items-center gap-1.5 whitespace-nowrap">
          <span className="text-white text-xs">{recipe.time}</span>
          <span className="w-1 h-1 bg-white rounded-full inline-block" />
          <span className="text-white text-xs">{recipe.portion}</span>
        </div>

        <div className="absolute top-[185px] left-[10px] flex gap-1.5">
          {recipe.ingredients.map((ing) => (
            <div
              key={ing}
              className="bg-[#d06224bf] rounded-[10px] px-2 h-[18px] flex items-center justify-center"
            >
              <span className="text-white text-[11px]">{ing}</span>
            </div>
          ))}
        </div>
      </article>
    );
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <PageLayout>
      {/* ✅ Fix: header responsive h-[70px] md:h-[90px] */}
      <div className="h-[70px] md:h-[90px] bg-white shadow-sm flex items-center px-4 md:px-10">
        <h1 className="text-[28px] font-bold text-[#d06224]">Buku Resep</h1>
      </div>

      {/* ✅ Fix: padding responsive px-3 md:px-7 */}
      <div className="px-3 md:px-7 py-4 md:py-5">

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5 mb-5">
          <div className="flex flex-1">
            {/* ✅ Fix: px-6 agar konsisten dengan halaman lain */}
            <input
              type="text"
              placeholder="Cari Resep Masakan"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 h-[40px] rounded-l-full px-6 bg-white outline-none text-sm"
            />
            <button className="w-[50px] h-[40px] rounded-r-full bg-[#d06224] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 28 27" fill="none">
                <path
                  d="M26.5865 24.2967L20.6502 18.3986C22.4301 16.095 23.2611 13.2053 22.9746 10.3156C22.6881 7.42597 21.3056 4.75272 19.1075 2.83817C16.9095 0.923624 14.0604 -0.0888533 11.1383 0.00612555C8.21628 0.101104 5.43999 1.29643 3.37267 3.34962C1.30535 5.4028 0.1018 8.16011 0.00616771 11.0622C-0.0894648 13.9643 0.929981 16.7939 2.85771 18.9769C4.78543 21.16 7.47708 22.533 10.3866 22.8175C13.2962 23.1021 16.2058 22.2768 18.5252 20.5091L24.4665 26.4109C24.606 26.5495 24.7716 26.6594 24.9539 26.7344C25.1363 26.8094 25.3316 26.848 25.529 26.848C25.7263 26.848 25.9217 26.8094 26.104 26.7344C26.2863 26.6594 26.4519 26.5495 26.5915 26.4109C26.731 26.2724 26.8417 26.1078 26.9172 25.9268C26.9927 25.7457 27.0316 25.5517 27.0316 25.3557C27.0316 25.1597 26.9927 24.9657 26.9172 24.7846C26.8417 24.6035 26.731 24.439 26.5915 24.3005L26.5865 24.2967ZM3.02522 11.4464C3.02522 9.77678 3.52374 8.14463 4.45773 6.75637C5.39172 5.36811 6.71924 4.28609 8.27241 3.64714C9.82558 3.00819 11.5346 2.84102 13.1835 3.16675C14.8323 3.49248 16.3469 4.29649 17.5356 5.47711C18.7244 6.65773 19.5339 8.16193 19.8619 9.7995C20.1899 11.4371 20.0215 13.1345 19.3782 14.677C18.7348 16.2196 17.6454 17.538 16.2476 18.4656C14.8497 19.393 13.2346 19.9115 11.5735 19.9115C9.33278 19.9115 7.18377 19.0278 5.6114 17.4657C4.03904 15.9036 3.02522 13.7694 3.02522 11.4464Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>

          <button
            onClick={() => navigate("/bahan-lengkap")}
            className="h-[40px] md:h-[50px] px-10 rounded-full bg-[#9f9b4a] text-white font-medium"
          >
            Bahan Lengkap
          </button>

          {/* ✅ Fix: font-Regular → font-medium */}
          <button
            onClick={() => navigate("/cepat")}
            className="h-[40px] md:h-[50px] px-12 rounded-full bg-[#9f9b4a] text-white font-medium"
          >
            Cepat
          </button>
        </div>

        {/* ─── Menu Favorit ─────────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-lg font-light text-black mb-4">Menu Favorit</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {loading ? (
              <div className="col-span-full text-center text-gray-400 py-10">
                Memuat resep...
              </div>
            ) : filteredFavoriteMenus.length > 0 ? (
              filteredFavoriteMenus.map((menu) => (
                <RecipeCard key={menu.id} recipe={menu} />
              ))
            ) : (
              <div className="col-span-full text-center text-sm text-gray-500 py-10">
                Tidak ada resep favorit
              </div>
            )}
          </div>
        </section>

        {/* ─── Semua Menu ───────────────────────────────────────────── */}
        <section>
          <h2 className="text-lg font-light text-black mb-4">Semua Menu</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {loading ? (
              <div className="col-span-full text-center text-gray-400 py-10">
                Memuat resep...
              </div>
            ) : filteredAllMenus.length > 0 ? (
              filteredAllMenus.map((menu) => (
                <RecipeCard key={menu.id} recipe={menu} />
              ))
            ) : (
              <div className="col-span-full text-center text-sm text-gray-500 py-10">
                Tidak ada resep yang cocok
              </div>
            )}
          </div>
        </section>

      </div>
    </PageLayout>
  );
}