import { useEffect, useRef, useState } from "react";
import { Chart, ArcElement, DoughnutController, Tooltip } from "chart.js";
import { pantryAPI } from "../utils/api";

Chart.register(ArcElement, DoughnutController, Tooltip);

const getUrgencyColor = (daysLeft) => {
  if (daysLeft <= 0) return "#7d0000";
  if (daysLeft <= 1) return "#ae431e";
  if (daysLeft <= 3) return "#d06224";
  return "#c4922a";
};

const getUrgencyLabel = (daysLeft) => {
  if (daysLeft <= 0) return "Expired";
  if (daysLeft <= 1) return "Kritis";
  if (daysLeft <= 3) return "Segera";
  return "Perhatian";
};

export default function ExpiringSection() {
  const chartRef        = useRef(null);
  const chartInstance   = useRef(null);
  const [stats, setStats]               = useState(null);
  const [loading, setLoading]           = useState(true);
  const [showAll, setShowAll]           = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

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

  useEffect(() => {
    if (!chartRef.current || !stats) return;
    if (chartInstance.current) chartInstance.current.destroy();

    const { saved, wasted } = stats.chart;
    const hasData = saved > 0 || wasted > 0;

    chartInstance.current = new Chart(chartRef.current, {
      type: "doughnut",
      data: {
        labels: ["Terselamatkan", "Terbuang"],
        datasets: [{
          data: hasData ? [saved, wasted] : [1, 0],
          backgroundColor: hasData ? ["#8a8635", "#ae431e"] : ["#e5e7eb", "#e5e7eb"],
          hoverBackgroundColor: ["#6e6b28", "#8c3418"],
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
            bodyFont:  { size: 11 },
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: (ctx) => {
                const total = saved + wasted;
                const pct   = total > 0 ? Math.round((ctx.parsed / total) * 100) : 0;
                return ` ${ctx.parsed} bahan (${pct}%)`;
              },
            },
          },
        },
      },
    });

    return () => { if (chartInstance.current) chartInstance.current.destroy(); };
  }, [stats]);

  if (loading) {
    return (
      <div className="flex-1 bg-white rounded-[15px] p-5 shadow-sm flex items-center justify-center h-[200px]">
        <span className="text-sm text-gray-400 animate-pulse">Memuat statistik pantry...</span>
      </div>
    );
  }

  const chart        = stats?.chart        ?? { saved: 0, wasted: 0, savedPct: 0, wastedPct: 0, total: 0 };
  const expiringSoon = stats?.expiringSoon ?? [];
  const visibleItems = showAll ? expiringSoon : expiringSoon.slice(0, 5);

  return (
    <div className="flex-1 bg-white rounded-[15px] p-4 sm:p-5 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base sm:text-lg font-light text-black">
          Statistik Bahan & Hampir Kadaluarsa
        </h2>
        {expiringSoon.length > 5 && (
          <button onClick={() => setShowAll(!showAll)} className="text-sm text-[#d06224] font-semibold shrink-0 ml-2">
            {showAll ? "Lihat Sedikit" : "Lihat Semua"}
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-5 items-start">

        {/* Kiri: Doughnut chart */}
        <div className="flex flex-col items-center gap-3 shrink-0 w-full sm:w-[180px]">
          <div className="relative w-[150px] h-[150px]">
            <canvas ref={chartRef} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              {chart.total > 0 ? (
                <>
                  <span className="text-xl font-bold text-[#8a8635]">{chart.savedPct}%</span>
                  <span className="text-[10px] text-gray-400 mt-0.5 text-center leading-tight">terselamatkan</span>
                </>
              ) : (
                <span className="text-[10px] text-gray-400 text-center px-2 leading-tight">Belum ada data</span>
              )}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#8a8635] shrink-0" />
                <span className="text-xs text-gray-500">Terselamatkan</span>
              </div>
              <span className="text-xs font-semibold text-[#8a8635]">{chart.saved} bahan</span>
            </div>
            <div className="flex items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ae431e] shrink-0" />
                <span className="text-xs text-gray-500">Terbuang</span>
              </div>
              <span className="text-xs font-semibold text-[#ae431e]">{chart.wasted} bahan</span>
            </div>
            <div className="border-t border-gray-100 my-1" />
            <div className="flex items-center justify-between gap-2 px-1">
              <span className="text-xs text-gray-400">Aktif di dapur</span>
              <span className="text-xs font-semibold text-gray-600">{stats?.summary?.active ?? 0} bahan</span>
            </div>
          </div>
        </div>

        {/* Kanan: List bahan hampir kadaluarsa */}
        <div className="flex-1 min-w-0 w-full">
          <p className="text-xs text-gray-400 mb-3 font-medium uppercase tracking-wide">
            Segera Habis / Kadaluarsa
          </p>

          {expiringSoon.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 gap-2">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke="#8a8635" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="text-sm text-gray-400 text-center">Semua bahan masih segar!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {visibleItems.map((item, i) => {
                const color   = getUrgencyColor(item.daysLeft);
                const urgency = getUrgencyLabel(item.daysLeft);
                const isHov   = hoveredIndex === i;
                return (
                  <div
                    key={String(item.id)}
                    className="flex items-center gap-3 px-3 py-2 rounded-[10px] transition-all duration-200 cursor-default"
                    style={{
                      background: isHov ? `${color}12` : "transparent",
                      border: `1px solid ${isHov ? color + "40" : "transparent"}`,
                    }}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                    <span className="flex-1 text-sm font-medium text-gray-800 capitalize truncate">{item.name}</span>
                    {item.quantity && (
                      <span className="text-xs text-gray-400 shrink-0">
                        {item.quantity}{item.unit ? ` ${item.unit}` : ""}
                      </span>
                    )}
                    <span className="text-xs text-gray-400 shrink-0 ml-1">{item.days}</span>
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                      style={{ backgroundColor: color + "20", color }}
                    >
                      {urgency}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}