import { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import food14 from "../assets/asset14.png"; // Wortel
import food15 from "../assets/asset15.png"; // Bayam
import food16 from "../assets/asset16.png"; // Cabe
import food17 from "../assets/asset17.png"; // Sawi
import food18 from "../assets/asset18.png"; // Kangkung
import food19 from "../assets/asset19.png"; // Daging Ayam
import food20 from "../assets/asset20.png"; // Daging Sapi
import food21 from "../assets/asset21.png"; // Santan / Lainnya

function loadStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function saveStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

/* ── Ikon Trash ── */
function IconTrash({ size = 14, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ── Modal Konfirmasi Hapus ── */
function DeleteModal({ item, onConfirm, onCancel }) {
  if (!item) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-[320px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ikon peringatan */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
            <IconTrash size={26} color="#e53e3e" />
          </div>
        </div>
        <h3 className="text-center text-[16px] font-semibold text-gray-800 mb-1">
          Hapus Bahan?
        </h3>
        <p className="text-center text-sm text-gray-500 mb-6">
          <span className="font-medium text-[#d06224]">{item.name}</span> akan dihapus
          dari daftar bahan kamu.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 h-[40px] rounded-full border border-gray-200 text-sm text-gray-600 font-medium hover:bg-gray-50 transition"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 h-[40px] rounded-full bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BahanPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null); // item yang akan dihapus

  const [sortOrder, setSortOrder] = useState(
    () => loadStorage("bahan_sortOrder", null)
  );

  const handleSort = () => {
    setSortOrder((prev) => {
      if (prev === null) return "asc";
      if (prev === "asc") return "desc";
      return null;
    });
  };

  /* Hapus item dari semua kategori berdasarkan id */
  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => item.id !== deleteTarget.id),
      }))
    );
    setDeleteTarget(null);
  };

  useEffect(() => {
    if (location.state?.newItem) {
      const item = location.state.newItem;
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === item.kategori
            ? { ...cat, items: [...cat.items, item] }
            : cat
        )
      );
      window.history.replaceState({}, "");
    }
  }, [location.state]);

  const [categories, setCategories] = useState(() => {
    const savedItems = loadStorage("bahan_items", null);
    const initial = [
      {
        id: "sayuran",
        label: "Sayuran",
        color: "#d06224",
        icon: (
          <svg width="22" height="22" viewBox="0 0 47 53" fill="none">
            <path d="M45.2583 11.7029H39.0123L44.7489 5.28092C44.9107 5.0997 45.0391 4.88456 45.1267 4.64779C45.2142 4.41101 45.2593 4.15724 45.2593 3.90096C45.2593 3.64467 45.2142 3.3909 45.1267 3.15412C45.0391 2.91735 44.9107 2.70221 44.7489 2.52099C44.5871 2.33977 44.395 2.19602 44.1836 2.09795C43.9721 1.99987 43.7455 1.94939 43.5167 1.94939C43.2878 1.94939 43.0612 1.99987 42.8498 2.09795C42.6384 2.19602 42.4463 2.33977 42.2845 2.52099L36.5501 8.94538V1.95048C36.5501 1.43318 36.3666 0.937067 36.04 0.571282C35.7133 0.205496 35.2703 0 34.8084 0C34.3465 0 33.9035 0.205496 33.5769 0.571282C33.2503 0.937067 33.0668 1.43318 33.0668 1.95048V9.89136C30.4129 8.17563 27.328 7.48752 24.2897 7.93356C21.2514 8.37961 18.4291 9.93492 16.2598 12.3587C7.52975 21.9624 0.965885 44.8049 0.325826 47.0894C0.0240474 47.8149 -0.0711896 48.6267 0.0530321 49.4148C0.177254 50.203 0.514922 50.9292 1.02024 51.4951C1.52556 52.061 2.17407 52.4392 2.87782 52.5783C3.58157 52.7174 4.30649 52.6108 4.95427 52.2728C6.99419 51.556 27.4173 44.1954 35.971 34.4235C38.1337 31.9934 39.521 28.8327 39.9181 25.4307C40.3152 22.0286 39.7 18.5748 38.1676 15.6038H45.2583C45.7203 15.6038 46.1633 15.3983 46.4899 15.0325C46.8165 14.6668 47 14.1706 47 13.6533C47 13.136 46.8165 12.6399 46.4899 12.2741C46.1633 11.9084 45.7203 11.7029 45.2583 11.7029Z" fill="currentColor"/>
          </svg>
        ),
        items: [
          { id: 1, name: "Wortel",   qty: "2 Kg",   days: "7 Hari", image: food14 },
          { id: 2, name: "Bayam",    qty: "1 Ikat",  days: "2 Hari", image: food15 },
          { id: 3, name: "Cabe",     qty: "0.5 Kg",  days: "7 Hari", image: food16 },
          { id: 4, name: "Sawi",     qty: "1 Ikat",  days: "2 Hari", image: food17 },
          { id: 5, name: "Kangkung", qty: "1 Ikat",  days: "2 Hari", image: food18 },
        ],
      },
      {
        id: "protein",
        label: "Protein",
        color: "#d06224",
        icon: (
          <svg width="22" height="22" viewBox="0 0 50 50" fill="none">
            <path d="M45 16C45 16 43 10 38 8C35 7 31 7 25 7C19 7 15 7 12 8C7 10 5 16 5 16H2C2 16 1 17 2 18L4 22C4 22 3 24 3 27C3 33 6 37 10 39V44C10 45 11 46 12 46H16C17 46 18 45 18 44V40H32V44C32 45 33 46 34 46H38C39 46 40 45 40 44V39C44 37 47 33 47 27C47 24 46 22 46 22L48 18C49 17 48 16 45 16ZM17 30C15.3 30 14 28.7 14 27C14 25.3 15.3 24 17 24C18.7 24 20 25.3 20 27C20 28.7 18.7 30 17 30ZM33 30C31.3 30 30 28.7 30 27C30 25.3 31.3 24 33 24C34.7 24 36 25.3 36 27C36 28.7 34.7 30 33 30Z" fill="currentColor"/>
          </svg>
        ),
        items: [
          { id: 6, name: "Daging Ayam", qty: "1 Kg", days: "5 Hari", image: food19 },
          { id: 7, name: "Daging Sapi", qty: "2 Kg", days: "7 Hari", image: food20 },
        ],
      },
      {
        id: "lainnya",
        label: "Lainnya",
        color: "#d06224",
        icon: (
          <svg width="22" height="22" viewBox="0 0 46 53" fill="none">
            <path d="M36.4167 21.9324C36.4167 22.5141 36.2147 23.0719 35.8553 23.4832C35.4958 23.8945 35.0083 24.1256 34.5 24.1256H19.1667C18.6583 24.1256 18.1708 23.8945 17.8114 23.4832C17.4519 23.0719 17.25 22.5141 17.25 21.9324C17.25 21.3507 17.4519 20.7928 17.8114 20.3815C18.1708 19.9702 18.6583 19.7391 19.1667 19.7391H34.5C35.0083 19.7391 35.4958 19.9702 35.8553 20.3815C36.2147 20.7928 36.4167 21.3507 36.4167 21.9324ZM46 4.38647V48.2512C46 49.4146 45.5961 50.5303 44.8772 51.3529C44.1584 52.1755 43.1833 52.6377 42.1667 52.6377H3.83333C2.81667 52.6377 1.84165 52.1755 1.12276 51.3529C0.403868 50.5303 0 49.4146 0 48.2512V4.38647C0 3.22311 0.403868 2.10739 1.12276 1.28477C1.84165 0.462145 2.81667 0 3.83333 0H42.1667C43.1833 0 44.1584 0.462145 44.8772 1.28477C45.5961 2.10739 46 3.22311 46 4.38647ZM3.83333 48.2512H9.58333V4.38647H3.83333V48.2512ZM42.1667 48.2512V4.38647H13.4167V48.2512H42.1667Z" fill="currentColor"/>
          </svg>
        ),
        items: [
          { id: 8, name: "Santan", qty: "1 Ltr", days: "3 Hari", image: food21 },
        ],
      },
    ];

    if (!savedItems) return initial;

    const imageMap = {
      1: food14, 2: food15, 3: food16, 4: food17, 5: food18,
      6: food19, 7: food20, 8: food21,
    };

    return initial.map((cat) => ({
      ...cat,
      items: savedItems[cat.id]
        ? savedItems[cat.id].map((item) => ({
            ...item,
            image: imageMap[item.id] ?? null,
          }))
        : cat.items,
    }));
  });

  useEffect(() => { saveStorage("bahan_sortOrder", sortOrder); }, [sortOrder]);

  useEffect(() => {
    const itemsMap = {};
    categories.forEach((cat) => {
      itemsMap[cat.id] = cat.items.map(({ image, ...rest }) => rest);
    });
    saveStorage("bahan_items", itemsMap);
  }, [categories]);

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return categories.map((cat) => ({
        ...cat,
        items: sortOrder
          ? [...cat.items].sort((a, b) =>
              sortOrder === "asc"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
            )
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
            sortOrder === "asc"
              ? a.name.localeCompare(b.name)
              : sortOrder === "desc"
              ? b.name.localeCompare(a.name)
              : 0
          ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [searchQuery, categories, sortOrder]);

  const allItems = filteredCategories.flatMap((cat) => cat.items);

  return (
    <PageLayout>
      {/* Modal konfirmasi hapus */}
      <DeleteModal
        item={deleteTarget}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* HEADER */}
      <div className="h-[70px] md:h-[90px] bg-white shadow-sm flex items-center px-4 md:px-10">
        <h1 className="text-[22px] md:text-[28px] font-bold text-[#d06224]">
          Bahan Makanan
        </h1>
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
                <path d="M26.5865 24.2967L20.6502 18.3986C22.4301 16.095 23.2611 13.2053 22.9746 10.3156C22.6881 7.42597 21.3056 4.75272 19.1075 2.83817C16.9095 0.923624 14.0604 -0.0888533 11.1383 0.00612555C8.21628 0.101104 5.43999 1.29643 3.37267 3.34962C1.30535 5.4028 0.1018 8.16011 0.00616771 11.0622C-0.0894648 13.9643 0.929981 16.7939 2.85771 18.9769C4.78543 21.16 7.47708 22.533 10.3866 22.8175C13.2962 23.1021 16.2058 22.2768 18.5252 20.5091L24.4665 26.4109C24.606 26.5495 24.7716 26.6594 24.9539 26.7344C25.1363 26.8094 25.3316 26.848 25.529 26.848C25.7263 26.848 25.9217 26.8094 26.104 26.7344C26.2863 26.6594 26.4519 26.5495 26.5915 26.4109C26.731 26.2724 26.8417 26.1078 26.9172 25.9268C26.9927 25.7457 27.0316 25.5517 27.0316 25.3557C27.0316 25.1597 26.9927 24.9657 26.9172 24.7846C26.8417 24.6035 26.731 24.439 26.5915 24.3005L26.5865 24.2967ZM3.02522 11.4464C3.02522 9.77678 3.52374 8.14463 4.45773 6.75637C5.39172 5.36811 6.71924 4.28609 8.27241 3.64714C9.82558 3.00819 11.5346 2.84102 13.1835 3.16675C14.8323 3.49248 16.3469 4.29649 17.5356 5.47711C18.7244 6.65773 19.5339 8.16193 19.8619 9.7995C20.1899 11.4371 20.0215 13.1345 19.3782 14.677C18.7348 16.2196 17.6454 17.538 16.2476 18.4656C14.8497 19.393 13.2346 19.9115 11.5735 19.9115C9.33278 19.9115 7.18377 19.0278 5.6114 17.4657C4.03904 15.9036 3.02522 13.7694 3.02522 11.4464Z" fill="white"/>
              </svg>
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSort}
              className={`flex-1 h-[40px] rounded-full text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors
                ${sortOrder ? "bg-[#7a763a]" : "bg-[#9f9b4a]"}`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M3 6H21M6 12H18M10 18H14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              {sortOrder === "asc" ? "A → Z" : sortOrder === "desc" ? "Z → A" : "Urutkan"}
            </button>
            <button
              onClick={() => navigate("/tambah-item")}
              className="flex-1 h-[40px] rounded-full bg-[#d06224] text-white text-sm font-medium flex items-center justify-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
              Tambah Item
            </button>
          </div>
        </div>

        {/* CARD GRID */}
        <div className="bg-white rounded-2xl p-3 md:p-5 shadow-sm">
          {allItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-300">
              <p className="text-sm">Tidak ada bahan ditemukan</p>
            </div>
          ) : (
            <>
              {/* ── MOBILE LIST (< sm) — layout horizontal ── */}
              <div className="flex flex-col gap-2 sm:hidden">
                {allItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm"
                  >
                    {/* Gambar */}
                    <div className="w-[72px] h-[72px] shrink-0 overflow-hidden border-r-2 border-[#d06224]">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 py-2 min-w-0">
                      <p className="text-sm font-semibold text-[#d06224] truncate leading-snug">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.qty}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="9" stroke="#d06224" strokeWidth="2"/>
                          <path d="M12 7V12L15 15" stroke="#d06224" strokeWidth="2" strokeLinecap="round"/>
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

              {/* ── DESKTOP GRID (sm ke atas) — kartu vertikal ── */}
              <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {allItems.map((item) => (
                  <div
                    key={item.id}
                    className="group relative rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow shadow-sm border border-gray-100"
                  >
                    {/* Gambar */}
                    <div className="w-full h-[140px] overflow-hidden border-b-2 border-[#d06224]">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Info */}
                    <div className="px-3 py-2.5 bg-[#d06224bf]">
                      <p className="text-sm font-semibold text-white truncate leading-snug mb-1">
                        {item.name}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/80">{item.qty}</span>
                        <div className="flex items-center gap-1">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2"/>
                            <path d="M12 7V12L15 15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          <span className="text-xs text-white">{item.days}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tombol Hapus — muncul saat hover di sudut kanan atas */}
                    <button
                      onClick={() => setDeleteTarget(item)}
                      aria-label={`Hapus ${item.name}`}
                      className="absolute top-2 right-2 w-[30px] h-[30px] rounded-full bg-white/90 flex items-center justify-center shadow-sm
                                 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
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