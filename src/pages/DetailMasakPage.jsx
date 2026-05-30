import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { recipeAPI, riwayatAPI } from "../utils/api";
import PageLayout from "../components/layout/PageLayout";

export default function DetailMasakPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [steps, setSteps] = useState([]);
  const [checkedSteps, setCheckedSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recipeName, setRecipeName] = useState("");

  const toggleStep = (index) => {
    setCheckedSteps((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      try {
        const res = await recipeAPI.getById(id);
        const data = res?.data?.recipe ?? res?.recipe ?? res;
        const rawSteps = Array.isArray(data.steps) ? data.steps : [];
        const normalized = rawSteps.map((s, i) => ({
          id: i + 1,
          text: typeof s === "string" ? s : s.step || s.text || String(s),
        }));
        setSteps(normalized);
        setCheckedSteps(normalized.map(() => false));
        setRecipeName(data.recipeName || data.recipe_name || data.title || "Resep");
      } catch (err) {
        console.error("Gagal memuat langkah masak:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-[#f4f4f4] flex items-center justify-center">
      <span className="text-[#d06224] font-medium animate-pulse">Memuat Langkah Masak...</span>
    </div>
  );

  return (
    <PageLayout>
      {/* HEADER */}
      <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 border-b border-gray-200 bg-white flex items-center justify-between">
        <h1 className="text-2xl font-semibold capitalize text-[#d06224]">
          {recipeName || "Buku Resep"}
        </h1>
        <button
          onClick={async () => {
            try {
              await riwayatAPI.addItem({ recipeId: id });
            } catch (err) {
              console.error("Gagal simpan riwayat:", err);
            } finally {
              navigate("/resep");
            }
          }}
          className="h-[42px] px-6 bg-[#d06224] text-white font-semibold text-sm rounded-xl hover:bg-[#b85520] transition-all active:scale-95"
        >
          Selesai
        </button>
      </div>

      {/* CONTENT */}
      <div className="px-4 md:px-10 py-4 md:py-6 flex flex-col gap-4">
        <h2 className="text-lg font-light text-black">Cara Membuat</h2>
        <div className="flex flex-col gap-4">
          {steps.length === 0 ? (
            <p className="text-sm text-gray-400">Tidak ada langkah tersedia.</p>
          ) : (
            steps.map((step, index) => {
              const done = checkedSteps[index];
              return (
                <div
                  key={step.id}
                  className="flex items-center gap-5 bg-white rounded-[15px] px-5 py-4 cursor-pointer"
                  onClick={() => toggleStep(index)}
                >
                  <div className={`w-10 h-10 md:w-14 md:h-14 rounded-[12px] flex items-center justify-center shrink-0 text-xl md:text-2xl font-semibold transition ${done ? "bg-[#f5c5ac] text-[#d06224]/50" : "bg-[#d06224] text-white"
                    }`}>
                    {step.id}
                  </div>
                  <p className={`flex-1 text-base font-medium leading-relaxed transition capitalize ${done ? "text-[#d06224]/40 line-through" : "text-[#d06224]"
                    }`}>
                    {step.text}
                  </p>
                  <div className="w-9 h-9 rounded-[8px] border-2 border-[#d06224] bg-white flex items-center justify-center shrink-0 transition">
                    {done && (
                      <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                        <path d="M1 7L6.5 12.5L17 1" stroke="#d06224" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </PageLayout>
  );
}