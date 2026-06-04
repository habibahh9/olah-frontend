import { useEffect, useRef, useState } from "react";
import { Chart, ArcElement, DoughnutController, Tooltip } from "chart.js";
import { pantryAPI } from "../utils/api";

Chart.register(ArcElement, DoughnutController, Tooltip);

// ── Konfigurasi tiap kategori ────────────────────────────────────────────────
const CATEGORIES = [
  {
    key: "expired",
    label: "Kadaluarsa",
    color: "#7d0000",
    bgColor: "#7d000015",
    dotColor: "#7d0000",
    badge: "Expired",
  },
  {
    key: "nearExpiry",
    label: "Mendekati Kadaluarsa",
    color: "#d06224",
    bgColor: "#d0622415",
    dotColor: "#d06224",
    badge: "Segera",
  },
];

const formatDays = (daysLeft) => {
  if (daysLeft === null || daysLeft === undefined) return "Tanpa tanggal";
  if (daysLeft <= 0) return "Sudah Kadaluarsa";
  if (daysLeft === 1) return "Besok";
  return `${daysLeft} Hari Lagi`;
};

export default function ExpiringSection() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openCategory, setOpenCategory] = useState("expired"); // kategori yang di-expand

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await pantryAPI.getStats();
        setStats(res?.data ?? null);
      } catch (err) {
        console.error("Gagal fetch pantry stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // ── Chart doughnut ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!chartRef.current || !stats) return;
    if (chartInstance.current) chartInstance.current.destroy();

    const expired    = stats.categories?.expired?.length    ?? 0;
    const nearExpiry = stats.categories?.nearExpiry?.length ?? 0;
    const stillFresh = stats.categories?.stillFresh?.length ?? 0;
    const hasData    = expired + nearExpiry + stillFresh > 0;

    chartInstance.current = new Chart(chartRef.current, {
      type: "doughnut",
      data: {
        labels: ["Kadaluarsa", "Mendekati Kadaluarsa", "Masih Lama"],
        datasets: [{
          data: hasData ? [expired, nearExpiry, stillFresh] : [1, 1, 1],
          backgroundColor: hasData
            ? ["#7d0000", "#d06224", "#8a8635"]
            : ["#e5e7eb", "#e5e7eb", "#e5e7eb"],
          hoverBackgroundColor: ["#5a0000", "#b85520", "#6e6b28"],
          borderWidth: 3,
          borderColor: "#ffffff",
          hoverBorderWidth: 4,
          hoverOffset: 8,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: "68%",
        animation: { animateRotate: true, duration: 900, easing: "easeInOutQuart" },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: "rgba(30,20,10,0.88)",
            titleFont: { size: 12, weight: "600" },
            bodyFont: { size: 11 },
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: (ctx) => {
                const total = expired + nearExpiry + stillFresh;
                const pct = total > 0 ? Math.round((ctx.parsed / total) * 100) : 0;
                return ` ${ctx.parsed} bahan (${pct}%)`;
              },
            },
          },
        },
      },
    });

    return () => { if (chartInstance.current) chartInstance.current.destroy(); };
  }, [stats]);

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex-1 bg-white rounded-[15px] p-5 shadow-sm flex items-center justify-center h-[200px]">
        <span className="text-sm text-gray-400 animate-pulse">Memuat statistik pantry...</span>
      </div>
    );
  }

  const chart = stats?.chart ?? { saved: 0, wasted: 0, savedPct: 0, wastedPct: 0, total: 0 };
  const cats       = stats?.categories ?? { expired: [], nearExpiry: [] };
  const hasAnyItem = (
    (cats.expired?.length ?? 0) +
    (cats.nearExpiry?.length ?? 0) +
    (cats.stillFresh?.length ?? 0)
  ) > 0;

  return (
    <div className="flex-1 bg-white rounded-[15px] p-4 sm:p-5 shadow-sm">
      <h2 className="text-base sm:text-lg font-light text-black mb-4">
        Statistik Bahan & Status Kadaluarsa
      </h2>

      <div className="flex flex-col sm:flex-row gap-5 items-start">

        {/* ── Kiri: Doughnut ─────────────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-3 shrink-0 w-full sm:w-[180px]">
          <div className="relative w-[150px] h-[150px]">
            <canvas ref={chartRef} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              {hasAnyItem ? (
                <>
                  <span className="text-xl font-bold text-[#8a8635]">
                    {Math.round(((cats.stillFresh?.length ?? 0) /
                      ((cats.expired?.length ?? 0) + (cats.nearExpiry?.length ?? 0) + (cats.stillFresh?.length ?? 0))) * 100)}%
                  </span>
                  <span className="text-[10px] text-gray-400 mt-0.5 text-center leading-tight">masih aman</span>
                </>
              ) : (
                <span className="text-[10px] text-gray-400 text-center px-2 leading-tight">Belum ada data</span>
              )}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-2 w-full">
            {CATEGORIES.map((cat) => (
              <div className="flex items-start justify-between gap-2 px-1">
                <div className="flex items-start gap-1.5">
                  <span className="w-3 h-3 rounded-full shrink-0 mt-0.5" style={{ backgroundColor: cat.dotColor }} />
                  <span className="text-xs text-gray-500">{cat.label}</span>
                </div>
                <span className="text-xs font-semibold self-start whitespace-nowrap" style={{ color: cat.color }}>
                  {cats[cat.key]?.length ?? 0} bahan
                </span>
              </div>
            ))}
            <div className="border-t border-gray-100 my-1" />
            <div className="flex items-center justify-between gap-2 px-1">
              <span className="text-xs text-gray-400">Bahan Tersedia</span>
              <span className="text-xs font-semibold text-gray-600">{stats?.summary?.active ?? 0} bahan</span>
            </div>
          </div>
        </div>

        {/* ── Kanan: 3 Kategori Accordion ────────────────────────────────── */}
        <div className="flex-1 min-w-0 w-full flex flex-col gap-2">
          {CATEGORIES.map((cat) => {
            const items = cats[cat.key] ?? [];
            const isOpen = openCategory === cat.key;
            const count = items.length;

            return (
              <div
                key={cat.key}
                className="rounded-[12px] overflow-hidden border transition-all duration-200"
                style={{ borderColor: isOpen ? cat.color + "40" : "#f0f0f0" }}
              >
                {/* Header accordion */}
                <button
                  className="w-full flex items-center justify-between px-3 py-2.5 transition-colors"
                  style={{ background: isOpen ? cat.bgColor : "transparent" }}
                  onClick={() => setOpenCategory(isOpen ? null : cat.key)}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: cat.dotColor }}
                    />
                    <span className="text-sm font-medium text-gray-700">{cat.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Badge jumlah */}
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: count > 0 ? cat.color + "20" : "#f0f0f0",
                        color: count > 0 ? cat.color : "#9ca3af",
                      }}
                    >
                      {count} bahan
                    </span>
                    {/* Chevron */}
                    <svg
                      width="14" height="14" viewBox="0 0 24 24" fill="none"
                      className="transition-transform duration-200 shrink-0"
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        color: cat.color,
                      }}
                    >
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>

                {/* Body accordion */}
                {isOpen && (
                  <div className="px-3 pb-3 pt-1 flex flex-col gap-1.5">
                    {count === 0 ? (
                      <div className="flex items-center justify-center py-4 gap-2 text-gray-300">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            stroke="#8a8635" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-xs text-gray-400">Tidak ada bahan di kategori ini</p>
                      </div>
                    ) : (
                      items.map((item) => (
                        <div
                          key={String(item.id)}
                          className="flex items-center gap-2 px-2 py-1.5 rounded-[8px] bg-white border border-gray-100"
                        >
                          <span className="flex-1 text-sm text-gray-800 capitalize truncate">{item.name}</span>
                          <span
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                            style={{ backgroundColor: cat.color + "15", color: cat.color }}
                          >
                            {formatDays(item.daysLeft)}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
