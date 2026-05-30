import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import { useUnsplashImage } from "../hooks/useUnsplashImage";
import { recipeAPI, shoppingListAPI, riwayatAPI } from "../utils/api";

export default function DetailResepPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isFavorite, setIsFavorite] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  // ── Fetch detail resep ──────────────────────────────────────────────────────
  useEffect(() => {
    const fetchRecipeDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await recipeAPI.getById(id);
        const data = res?.data?.recipe ?? res?.recipe ?? res;
        const isLoved = res?.data?.isLoved ?? false;

        const normalized = {
          ...data,
          title: data.recipe_name || data.recipeName || data.title || "Resep",
          time: data.cookingTimeMinutes
            ? `${data.cookingTimeMinutes} Menit`
            : data.cookTime
            ? `${data.cookTime} Menit`
            : null,
          portion: data.servings ? `${data.servings} Porsi` : null,
          ingredients: Array.isArray(data.ingredients)
            ? data.ingredients.filter(Boolean)
            : [],
          steps: Array.isArray(data.steps) ? data.steps.filter(Boolean) : [],
          loveCount: data.loveCount ?? 0,
          category: data.category || null,
          url: data.url || null,
          imageUrl: data.imageUrl || null,
          available: data.available ?? false,
        };

        setRecipe(normalized);
        setIsFavorite(isLoved);
        setCartItems(
          normalized.ingredients.map((ing) =>
            typeof ing === "object" ? Boolean(ing.inCart) : false
          )
        );
      } catch (err) {
        console.error("Gagal mengambil detail resep:", err);
        setError("Gagal memuat resep. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRecipeDetail();
  }, [id]);

  // ── Gambar ──────────────────────────────────────────────────────────────────
  const unsplashUrl = useUnsplashImage(recipe?.title || "Food");
  const imageUrl = recipe?.imageUrl || unsplashUrl;

  // ── Toggle favorit ──────────────────────────────────────────────────────────
  const handleToggleFavorite = async () => {
    try {
      await recipeAPI.toggleLove(id);
      setIsFavorite((prev) => {
        const next = !prev;
        // Sinkronisasi ke user.lovedRecipes di localStorage
        try {
          const user = JSON.parse(localStorage.getItem("user") || "{}");
          const lovedIds = Array.isArray(user.lovedRecipes)
            ? user.lovedRecipes.map(String)
            : [];
          user.lovedRecipes = next
            ? [...new Set([...lovedIds, String(id)])]   // tambah
            : lovedIds.filter((v) => v !== String(id)); // hapus
          localStorage.setItem("user", JSON.stringify(user));
          // Beritahu ResepPage & DashboardPage untuk refresh ikon
          window.dispatchEvent(new Event("storage"));
        } catch {}
        return next;
      });
    } catch (err) {
      console.error("Gagal toggle favorit:", err);
      alert("Gagal memperbarui favorit. Periksa koneksimu.");
    }
  };

  // ── Toggle keranjang ────────────────────────────────────────────────────────
  const toggleCart = async (index, ingredient) => {
    const isCurrentlyInCart = cartItems[index];
    setCartItems((prev) => prev.map((v, i) => (i === index ? !v : v)));

    const ingredientName =
      typeof ingredient === "string"
        ? ingredient
        : ingredient.name || String(ingredient);

    try {
      if (!isCurrentlyInCart) {
        await shoppingListAPI.addItem({
          recipeId: id,
          ingredientName,
          amount: "Secukupnya",
        });
      } else {
        await shoppingListAPI.deleteItem(ingredientName);
      }
    } catch (err) {
      console.error("Gagal sinkronisasi keranjang:", err);
      setCartItems((prev) => prev.map((v, i) => (i === index ? !v : v)));
      alert("Gagal memperbarui keranjang. Periksa koneksi internetmu.");
    }
  };

  // ── Mulai Masak ─────────────────────────────────────────────────────────────
  const handleMulaiMasak = () => {
  navigate(`/detail-masak/${id}`);
  };

  // ── Loading ─────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <PageLayout>
        <div className="flex-1 flex items-center justify-center min-h-[50vh]">
          <span className="text-[#d06224] font-medium animate-pulse">
            Memuat Detail Resep...
          </span>
        </div>
      </PageLayout>
    );
  }

  // ── Error ───────────────────────────────────────────────────────────────────
  if (error || !recipe) {
    return (
      <PageLayout>
        <div className="flex-1 flex flex-col items-center justify-center gap-4 min-h-[50vh]">
          <span className="text-gray-500">{error || "Resep tidak ditemukan"}</span>
          <button
            onClick={() => navigate(-1)}
            className="text-[#d06224] underline text-sm"
          >
            Kembali
          </button>
        </div>
      </PageLayout>
    );
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <PageLayout>
      {/* Header */}
      <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 border-b border-gray-200 bg-white flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="mr-3 text-[#d06224] hover:bg-[#f5ede6] p-1.5 rounded-lg transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="text-2xl font-semibold text-[#d06224]">Detail Resep</h1>
      </div>

      {/* Konten */}
      <div className="px-4 md:px-10 py-4 md:py-6 flex flex-col gap-6 flex-1">

        {/* Judul Resep */}
        <h2 className="text-2xl font-semibold text-black capitalize">{recipe.title}</h2>

        {/* Gambar + Info */}
        <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-start">
          <img
            src={imageUrl}
            alt={recipe.title}
            className="w-full md:w-[300px] h-[200px] md:h-[250px] object-cover rounded-[15px] shrink-0"
          />

          <div className="flex flex-col gap-4 flex-1">
            {/* Tombol Favorit */}
            <button
              onClick={handleToggleFavorite}
              className={`w-full md:w-[260px] h-[46px] rounded-[15px] font-medium text-base transition ${
                isFavorite ? "bg-[#8a8635] text-white" : "bg-[#d06224] text-white"
              }`}
            >
              {isFavorite ? "✓ Ditambahkan Ke Favorit" : "Tambahkan Ke Favorit"}
            </button>


            {/* Card Durasi & Porsi */}
            <div className="flex gap-3 flex-wrap">
              {recipe.time && (
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-[#d06224]/20 rounded-[15px] shadow-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#d06224" strokeWidth="2"/>
                    <path d="M12 6v6l4 2" stroke="#d06224" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span className="text-[#d06224] font-semibold text-sm">{recipe.time}</span>
                </div>
              )}
      
            </div>

            {/* Button Sumber Resep */}
            {recipe.url && (
              <a
                href={recipe.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-full md:w-[260px] h-[46px] px-4 rounded-[15px] border-2 border-[#d06224] text-[#d06224] font-medium text-sm hover:bg-[#d06224] hover:text-white transition-all duration-300"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                  <path
                    d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 3h6v6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 14L21 3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Lihat Sumber Asli Resep
              </a>
            )}
          </div>
        </div>

        {/* Daftar Bahan */}
        <div>
          <h3 className="text-lg font-semibold text-black mb-4">Bahan - Bahan</h3>
          <div className="flex flex-col gap-3 max-w-[700px]">
            {recipe.ingredients.length === 0 ? (
              <p className="text-sm text-gray-400">Tidak ada bahan tersedia.</p>
            ) : (
              recipe.ingredients.map((item, index) => {
                const name =
                  typeof item === "string" ? item : item.name || String(item);

                // Siap untuk quantity & unit nanti
                const quantity =
                  typeof item === "object" && item.quantity ? item.quantity : null;
                const unit =
                  typeof item === "object" && item.unit ? item.unit : "";

                return (
                  <div
                    key={`${name}-${index}`}
                    className={`flex items-center h-12 rounded-[12px] px-4 transition-colors duration-300 shadow-sm ${
                      cartItems[index] ? "bg-[#ae431e]" : "bg-white"
                    }`}
                  >
                    {/* Nama bahan */}
                    <span
                      className={`flex-1 text-sm font-medium capitalize transition-colors ${
                        cartItems[index] ? "text-white" : "text-[#ae431e]"
                      }`}
                    >
                      {name}
                    </span>

                    {/* Badge quantity — tampil jika ada, siap untuk nanti */}
                    {quantity && (
                      <span
                        className={`text-xs font-semibold capitalize px-2 py-0.5 rounded-full mr-3 ${
                          cartItems[index]
                            ? "bg-white/20 text-white"
                            : "bg-[#f5ede6] text-[#d06224]"
                        }`}
                      >
                        {quantity} {unit}
                      </span>
                    )}

                    {/* Tombol keranjang */}
                    <button
                      onClick={() => toggleCart(index, item)}
                      className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 transition-all duration-300 active:scale-90 ${
                        cartItems[index]
                          ? "bg-[#d06224] shadow-inner"
                          : "bg-white border border-gray-200 hover:border-[#d06224]"
                      }`}
                    >
                      <svg width="18" height="18" viewBox="0 0 44 49" fill="none">
                        <path
                          d="M43.6163 9.65765C43.4633 9.45521 43.272 9.29238 43.0559 9.18066C42.8398 9.06894 42.6042 9.01106 42.3657 9.0111H9.50783L8.26945 1.48007C8.20124 1.06481 8.00342 0.689203 7.71049 0.418726C7.41755 0.148248 7.04808 6.09989e-05 6.66648 0H1.62945C1.19729 0 0.782835 0.189876 0.477254 0.527858C0.171673 0.86584 0 1.32424 0 1.80222C0 2.2802 0.171673 2.7386 0.477254 3.07658C0.782835 3.41457 1.19729 3.60444 1.62945 3.60444H5.29571L10.5018 35.2086C10.6552 36.1459 11.0297 37.0218 11.5874 37.7475C10.8176 38.5428 10.262 39.5583 9.98212 40.6815C9.70228 41.8048 9.70917 42.9918 10.002 44.1109C10.2949 45.23 10.8623 46.2376 11.6412 47.0219C12.4202 47.8062 13.3804 48.3365 14.4152 48.5541C15.4501 48.7716 16.5192 48.668 17.504 48.2545C18.4889 47.8411 19.3509 47.134 19.9946 46.2118C20.6383 45.2896 21.0385 44.1882 21.1508 43.0297C21.2631 41.8713 21.0832 40.7011 20.6309 39.6489H29.8821C29.5175 40.493 29.3289 41.4168 29.3301 42.3522C29.3301 43.5998 29.6646 44.8193 30.2912 45.8566C30.9179 46.8939 31.8086 47.7024 32.8507 48.1798C33.8928 48.6572 35.0395 48.7822 36.1458 48.5388C37.252 48.2954 38.2682 47.6946 39.0658 46.8125C39.8634 45.9303 40.4066 44.8064 40.6266 43.5828C40.8467 42.3592 40.7337 41.0909 40.3021 39.9383C39.8704 38.7857 39.1395 37.8006 38.2016 37.1075C37.2637 36.4144 36.1611 36.0444 35.0331 36.0444H15.3107C14.9291 36.0444 14.5596 35.8962 14.2667 35.6257C13.9738 35.3552 13.7759 34.9796 13.7077 34.5643L13.0621 30.6378H36.6891C37.8339 30.6376 38.9423 30.193 39.8211 29.3816C40.6999 28.5701 41.2934 27.4433 41.498 26.1975L43.9747 11.1355C44.0167 10.8751 44.0063 10.6078 43.9443 10.3524C43.8824 10.097 43.7704 9.85981 43.6163 9.65765ZM38.292 25.5532C38.2236 25.9696 38.0249 26.3461 37.7307 26.6168C37.4365 26.8874 37.0656 27.0348 36.683 27.0333H12.4694L10.1005 12.6155H40.4124L38.292 25.5532Z"
                          fill={cartItems[index] ? "white" : "#d06224"}
                        />
                      </svg>
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Tombol Mulai Masak */}
        <button
          onClick={handleMulaiMasak}
          className="w-full h-[50px] bg-[#d06224] rounded-[15px] text-white font-semibold text-lg mt-auto mb-6 hover:bg-[#b85520] transition active:scale-[0.98]"
        >
          Mulai Masak
        </button>
      </div>
    </PageLayout>
  );
}