import { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import { pantryAPI } from "../utils/api";

function IconTrash({ size = 14, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DeleteModal({ item, onConfirm, onCancel }) {
  if (!item) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" style={{ backgroundColor: "rgba(0,0,0,0.4)" }} onClick={onCancel}>
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-[320px]" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
            <IconTrash size={26} color="#e53e3e" />
          </div>
        </div>
        <h3 className="text-center text-[16px] font-semibold text-gray-800 mb-1">Hapus Bahan?</h3>
        <p className="text-center text-sm text-gray-500 mb-6">
          <span className="font-medium text-[#d06224]">{item.name}</span> akan dihapus dari daftar bahan kamu.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 h-[40px] rounded-full border border-gray-200 text-sm text-gray-600 font-medium hover:bg-gray-50 transition">Batal</button>
          <button onClick={onConfirm} className="flex-1 h-[40px] rounded-full bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition">Hapus</button>
        </div>
      </div>
    </div>
  );
}

export default function BahanPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState(null);

  const handleSort = () => {
    setSortOrder((prev) => {
      if (prev === null) return "asc";
      if (prev === "asc") return "desc";
      return null;
    });
  };

  const [categories, setCategories] = useState([
    { id: "sayuran", label: "Sayuran", color: "#d06224", items: [] },
    { id: "protein", label: "Protein", color: "#d06224", items: [] },
    { id: "lainnya", label: "Lainnya", color: "#d06224", items: [] },
  ]);

  // ── Fetch pantry dari API ────────────────────────────────────────────────
  useEffect(() => {
    const fetchPantry = async () => {
      setLoading(true);
      try {
        const res = await pantryAPI.getAll();
        const pantryList = Array.isArray(res.data?.pantry) ? res.data.pantry : [];
        const grouped = { sayuran: [], protein: [], lainnya: [] };

        pantryList.forEach((item) => {
          const now = new Date();
          const expiry = item.expiryDate ? new Date(item.expiryDate) : null;
          const daysLeft = expiry ? Math.ceil((expiry - now) / (1000 * 60 * 60 * 24)) : null;

          const mapped = {
            id: item._id,
            name: item.name,
            qty: item.quantity ? `${item.quantity} ${item.unit || ""}`.trim() : "-",
            days: daysLeft !== null ? (daysLeft > 0 ? `${daysLeft} Hari` : "Kadaluarsa") : "-",
            image: item.image || null,
          };

          const kat = item.category || "lainnya";
          if (grouped[kat]) grouped[kat].push(mapped);
          else grouped["lainnya"].push(mapped);
        });

        setCategories((prev) => prev.map((cat) => ({ ...cat, items: grouped[cat.id] || [] })));
      } catch (err) {
        console.error("Gagal fetch pantry:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPantry();
  }, []);

  // ── Tangkap item baru dari TambahItemPage ────────────────────────────────
  useEffect(() => {
    if (location.state?.newItem) {
      const item = location.state.newItem;
      setCategories((prev) =>
        prev.map((cat) => cat.id === item.kategori ? { ...cat, items: [...cat.items, item] } : cat)
      );
      window.history.replaceState({}, "");
    }
  }, [location.state]);

  // ── Hapus item ───────────────────────────────────────────────────────────
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await pantryAPI.deleteItem(deleteTarget.id);
      setCategories((prev) =>
        prev.map((cat) => ({ ...cat, items: cat.items.filter((item) => item.id !== deleteTarget.id) }))
      );
    } catch (err) {
      console.error("Gagal hapus bahan:", err.message);
    } finally {
      setDeleteTarget(null);
    }
  };

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return categories.map((cat) => ({
        ...cat,
        items: sortOrder
          ? [...cat.items].sort((a, b) => sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))
          : cat.items,
      }));
    }
    const q = searchQuery.toLowerCase();
    return categories
      .map((cat) => ({
        ...cat,
        items: cat.items
          .filter((item) => item.name.toLowerCase().includes(q))
          .sort((a, b) =>
            sortOrder === "asc" ? a.name.localeCompare(b.name)
            : sortOrder === "desc" ? b.name.localeCompare(a.name) : 0
          ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [searchQuery, categories, sortOrder]);

  const allItems = filteredCategories.flatMap((cat) => cat.items);

  return (
    <PageLayout>
      <DeleteModal item={deleteTarget} onConfirm={handleDeleteConfirm} onCancel={() => setDeleteTarget(null)} />

      {/* HEADER */}
      <div className="h-[70px] md:h-[90px] bg-white shadow-sm flex items-center px-4 md:px-10">
        <h1 className="text-[22px] md:text-[28px] font-bold text-[#d06224]">Bahan Makanan</h1>
      </div>

      {/* CONTENT */}
      <div className="px-3 md:px-7 py-4 md:py-5">

        {/* SEARCH + ACTIONS */}
        <div className="flex flex-col gap-3 mb-5">
          <div className="flex">
            <input
              type="text"
              placeholder="Cari Bahan Makanan"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 h-[42px] rounded-l-full px-5 bg-white outline-none text-sm shadow-sm min-w-0"
            />
            <button className="w-[48px] h-[42px] shrink-0 rounded-r-full bg-[#d06224] flex items-center justify-center shadow-sm">
              <svg width="16" height="16" viewBox="0 0 28 27" fill="none">
                <path d="M26.5865 24.2967L20.6502 18.3986C22.4301 16.095 23.2611 13.2053 22.9746 10.3156C22.6881 7.42597 21.3056 4.75272 19.1075 2.83817C16.9095 0.923624 14.0604 -0.0888533 11.1383 0.00612555C8.21628 0.101104 5.43999 1.29643 3.37267 3.34962C1.30535 5.4028 0.1018 8.16011 0.00616771 11.0622C-0.0894648 13.9643 0.929981 16.7939 2.85771 18.9769C4.78543 21.16 7.47708 22.533 10.3866 22.8175C13.2962 23.1021 16.2058 22.2768 18.5252 20.5091L24.4665 26.4109C24.606 26.5495 24.7716 26.6594 24.9539 26.7344C25.1363 26.8094 25.3316 26.848 25.529 26.848C25.7263 26.848 25.9217 26.8094 26.104 26.7344C26.2863 26.6594 26.4519 26.5495 26.5915 26.4109C26.731 26.2724 26.8417 26.1078 26.9172 25.9268C26.9927 25.7457 27.0316 25.5517 27.0316 25.3557C27.0316 25.1597 26.9927 24.9657 26.9172 24.7846C26.8417 24.6035 26.731 24.439 26.5915 24.3005L26.5865 24.2967ZM3.02522 11.4464C3.02522 9.77678 3.52374 8.14463 4.45773 6.75637C5.39172 5.36811 6.71924 4.28609 8.27241 3.64714C9.82558 3.00819 11.5346 2.84102 13.1835 3.16675C14.8323 3.49248 16.3469 4.29649 17.5356 5.47711C18.7244 6.65773 19.5339 8.16193 19.8619 9.7995C20.1899 11.4371 20.0215 13.1345 19.3782 14.677C18.7348 16.2196 17.6454 17.538 16.2476 18.4656C14.8497 19.393 13.2346 19.9115 11.5735 19.9115C9.33278 19.9115 7.18377 19.0278 5.6114 17.4657C4.03904 15.9036 3.02522 13.7694 3.02522 11.4464Z" fill="white" />
              </svg>
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSort}
              className={`flex-1 h-[40px] rounded-full text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors ${sortOrder ? "bg-[#7a763a]" : "bg-[#9f9b4a]"}`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M3 6H21M6 12H18M10 18H14" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              {sortOrder === "asc" ? "A → Z" : sortOrder === "desc" ? "Z → A" : "Urutkan"}
            </button>
            <button
              onClick={() => navigate("/tambah-item")}
              className="flex-1 h-[40px] rounded-full bg-[#d06224] text-white text-sm font-medium flex items-center justify-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              Tambah Item
            </button>
          </div>
        </div>

        {/* CARD GRID */}
        <div className="bg-white rounded-2xl p-3 md:p-5 shadow-sm">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <p className="text-sm text-gray-400">Memuat bahan...</p>
            </div>
          ) : allItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-300">
              <p className="text-sm">Tidak ada bahan ditemukan</p>
              <button onClick={() => navigate("/tambah-item")} className="mt-4 px-5 py-2 bg-[#d06224] text-white rounded-full text-sm font-medium">
                + Tambah Bahan
              </button>
            </div>
          ) : (
            <>
              {/* ── MOBILE LIST ── */}
              <div className="flex flex-col gap-2 sm:hidden">
                {allItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm">
                    
                    {/* Gambar */}
                    <div className="w-[72px] h-[72px] shrink-0 overflow-hidden border-r-2 border-[#d06224]">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-[#f5ede7] flex items-center justify-center">
                          <span className="text-2xl">🥬</span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 py-2 min-w-0">
                      <p className="text-sm font-semibold text-[#d06224] truncate leading-snug">{item.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.qty}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="9" stroke="#d06224" strokeWidth="2" />
                          <path d="M12 7V12L15 15" stroke="#d06224" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span className="text-xs text-gray-400">{item.days}</span>
                      </div>
                    </div>

                    {/* Tombol Hapus */}
                    <button
                      onClick={() => setDeleteTarget(item)}
                      aria-label={`Hapus ${item.name}`}
                      className="w-[40px] h-[40px] shrink-0 mr-2 rounded-full bg-red-50 flex items-center justify-center hover:bg-red-100 transition"
                    >
                      <IconTrash size={15} color="#e53e3e" />
                    </button>
                  </div>
                ))}
              </div>

              {/* ── DESKTOP GRID ── */}
              <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {allItems.map((item) => (
                  <div key={item.id} className="group relative rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow shadow-sm border border-gray-100">
                    
                    {/* Gambar */}
                    <div className="w-full h-[140px] overflow-hidden border-b-2 border-[#d06224]">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-[#f5ede7] flex items-center justify-center">
                          <span className="text-5xl">🥬</span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="px-3 py-2.5 bg-[#d06224bf]">
                      <p className="text-sm font-semibold text-white truncate leading-snug mb-1">{item.name}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/80">{item.qty}</span>
                        <div className="flex items-center gap-1">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" />
                            <path d="M12 7V12L15 15" stroke="white" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                          <span className="text-xs text-white">{item.days}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tombol Hapus */}
                    <button
                      onClick={() => setDeleteTarget(item)}
                      aria-label={`Hapus ${item.name}`}
                      className="absolute top-2 right-2 w-[30px] h-[30px] rounded-full bg-white/90 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                    >
                      <IconTrash size={13} color="#e53e3e" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
}