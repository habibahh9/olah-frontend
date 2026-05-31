import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoOlah from "../assets/logo-olah.png";
import PageLayout from "../components/layout/PageLayout";
import { useUnsplashImage } from "../hooks/useUnsplashImage";

const CAT_COLORS = {
  "Food Waste": { bg: "#fff3eb", text: "#d06224" },
  "Tips & Trik": { bg: "#ebf5eb", text: "#4a7c4a" },
  "Nutrisi": { bg: "#ebf0ff", text: "#3b5bdb" },
};

export default function ArticlePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const [articles] = useState([
    {
      id: 1,
      title: "Indonesia Buang 23-48 Juta Ton Makanan per Tahun",
      category: "Food Waste",
      author: "BAPPENAS",
      date: "10 Januari 2024",
      readTime: "4 mnt",
      excerpt: "Indonesia menempati posisi kedua dunia sebagai penghasil sampah makanan terbesar. Kerugian ekonomi akibat food waste mencapai Rp 213-551 triliun per tahun.",
      image: null,
      url: "https://www.bappenas.go.id/id/berita/bappenas-food-loss-and-waste",
      featured: true,
    },
    {
      id: 2,
      title: "Gerakan Stop Boros Pangan: Langkah Nyata Pemerintah RI",
      category: "Food Waste",
      author: "Kementan RI",
      date: "20 Februari 2024",
      readTime: "3 mnt",
      excerpt: "Kementerian Pertanian meluncurkan gerakan nasional pengurangan food loss and waste dengan target mengurangi 50% sampah pangan pada 2030.",
      image: null,
      url: "https://www.pertanian.go.id",
      featured: false,
    },
    {
      id: 3,
      title: "Cara Menyimpan Bahan Makanan agar Tidak Cepat Busuk",
      category: "Tips & Trik",
      author: "Kemenkes RI",
      date: "5 Maret 2024",
      readTime: "3 mnt",
      excerpt: "Teknik penyimpanan yang benar bisa memperpanjang umur bahan makanan hingga 2x lebih lama dan mengurangi pemborosan di dapur rumah tangga Indonesia.",
      image: null,
      url: "https://sehatnegeriku.kemkes.go.id/baca/umum/20230316/4042816/bijak-kelola-makanan/",
      featured: false,
    },
    {
      id: 4,
      title: "Mengolah Sisa Makanan Jadi Hidangan Baru ala Indonesia",
      category: "Food Waste",
      author: "OLAH Team",
      date: "15 April 2024",
      readTime: "3 mnt",
      excerpt: "Sisa nasi, sayur layu, dan bahan hampir kedaluwarsa bisa disulap jadi nasi goreng, tumisan, hingga sup lezat. Kurangi sampah dapur dengan kreativitas.",
      image: null,
      url: "https://waste4change.com/blog/cara-mengurangi-sampah-makanan-di-rumah/",
      featured: false,
    },
    {
      id: 5,
      title: "Kompos dari Sampah Dapur: Solusi Rumahan untuk Indonesia",
      category: "Tips & Trik",
      author: "Waste4Change",
      date: "1 Mei 2024",
      readTime: "5 mnt",
      excerpt: "Kulit buah, ampas kopi, dan sisa sayur bisa menjadi pupuk kompos berkualitas. Waste4Change hadir membantu masyarakat Indonesia kelola sampah organik.",
      image: null,
      url: "https://waste4change.com/blog/cara-membuat-kompos-dari-sampah-organik/",
      featured: false,
    },
    {
      id: 6,
      title: "Food Waste dan Dampaknya bagi Ketahanan Pangan Nasional",
      category: "Food Waste",
      author: "BRIN",
      date: "10 Juni 2024",
      readTime: "4 mnt",
      excerpt: "Sampah makanan mengancam ketahanan pangan Indonesia. Peneliti BRIN ungkap hubungan erat antara food waste dan krisis pangan yang mengintai.",
      image: null,
      url: "https://brin.go.id",
      featured: false,
    },
    {
      id: 7,
      title: "Meal Planning ala Indonesia: Hemat, Efisien, Minim Sisa",
      category: "Tips & Trik",
      author: "WWF Indonesia",
      date: "20 Juli 2024",
      readTime: "3 mnt",
      excerpt: "Merencanakan menu mingguan terbukti kurangi food waste 40%. WWF Indonesia bagikan panduan meal planning yang cocok untuk keluarga Indonesia.",
      image: null,
      url: "https://www.wwf.id",
      featured: false,
    },
    {
      id: 8,
      title: "Nilai Gizi Terbuang: Nutrisi yang Hilang Bersama Sampah Makanan",
      category: "Nutrisi",
      author: "Kemenkes RI",
      date: "5 Agustus 2024",
      readTime: "4 mnt",
      excerpt: "Setiap tahun, nutrisi senilai triliunan rupiah terbuang bersama sampah pangan Indonesia. Bijak kelola makanan untuk jaga kesehatan dan lingkungan.",
      image: null,
      url: "https://sehatnegeriku.kemkes.go.id",
      featured: false,
    },
    {
      id: 9,
      title: "Startup Indonesia yang Berjuang Melawan Food Waste",
      category: "Food Waste",
      author: "Tech in Asia",
      date: "15 September 2024",
      readTime: "3 mnt",
      excerpt: "Dari Garda Pangan hingga Surplus, startup lokal Indonesia kini hadir menghubungkan kelebihan makanan dengan mereka yang membutuhkan.",
      image: null,
      url: "https://id.techinasia.com",
      featured: false,
    },
  ]);

  const filtered = articles.filter((a) => {
    const q = searchQuery.toLowerCase();
    return !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q);
  });

  const featured = filtered.find((a) => a.featured);
  const regularList = filtered.filter((a) => !a.featured || searchQuery);

  return (
    <PageLayout>
      {/* HEADER */}
      <div className="relative bg-gradient-to-br from-[#d06224] via-[#c8571f] to-[#ae431e] px-7 pt-8 pb-6 overflow-hidden">
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute top-10 -right-4 w-24 h-24 rounded-full bg-white/5" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
          <div>
            <p className="text-white/70 text-sm font-light">
              Food Waste &bull; Nutrisi &bull; Tips & Trik
            </p>
            <h1 className="text-white text-2xl font-semibold mt-0.5">Artikel</h1>
          </div>
          <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 gap-2 w-full sm:w-[280px]">
            <svg width="16" height="16" viewBox="0 0 28 27" fill="none">
              <path d="M26.5865 24.2967L20.6502 18.3986C22.4301 16.095 23.2611 13.2053 22.9746 10.3156C22.6881 7.42597 21.3056 4.75272 19.1075 2.83817C16.9095 0.923624 14.0604 -0.0888533 11.1383 0.00612555C8.21628 0.101104 5.43999 1.29643 3.37267 3.34962C1.30535 5.4028 0.1018 8.16011 0.00616771 11.0622C-0.0894648 13.9643 0.929981 16.7939 2.85771 18.9769C4.78543 21.16 7.47708 22.533 10.3866 22.8175C13.2962 23.1021 16.2058 22.2768 18.5252 20.5091L24.4665 26.4109C24.7516 26.6951 25.1318 26.848 25.529 26.848C25.9262 26.848 26.3064 26.6951 26.5915 26.4109C26.8767 26.1267 27.0316 25.7449 27.0316 25.3557C27.0316 24.9665 26.8767 24.5847 26.5915 24.3005L26.5865 24.2967ZM3.02522 11.4464C3.02522 9.77678 3.52374 8.14463 4.45773 6.75637C5.39172 5.36811 6.71924 4.28609 8.27241 3.64714C9.82558 3.00819 11.5346 2.84102 13.1835 3.16675C14.8323 3.49248 16.3469 4.29649 17.5356 5.47711C18.7244 6.65773 19.5339 8.16193 19.8619 9.7995C20.1899 11.4371 20.0215 13.1345 19.3782 14.677C18.7348 16.2196 17.6454 17.538 16.2476 18.4656C14.8497 19.393 13.2346 19.9115 11.5735 19.9115C9.33278 19.9115 7.18377 19.0278 5.6114 17.4657C4.03904 15.9036 3.02522 13.7694 3.02522 11.4464Z" fill="white" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari artikel..."
              className="bg-transparent text-white placeholder-white/60 text-sm outline-none flex-1"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-white/70 hover:text-white text-xs">✕</button>
            )}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-4 md:px-7 py-6 flex flex-col gap-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-gray-500 text-base">Artikel tidak ditemukan</p>
            <p className="text-gray-400 text-sm mt-1">Coba kata kunci lain</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 px-5 py-2 bg-[#d06224] text-white rounded-full text-sm font-medium"
            >
              Reset Pencarian
            </button>
          </div>
        ) : (
          <>
            {/* Featured */}
            {featured && !searchQuery && (
              <section>
                <h2 className="text-base font-light text-black mb-3">Artikel Pilihan</h2>
                <FeaturedArticle article={featured} />
              </section>
            )}

            {/* Article Grid */}
            <section>
              <h2 className="text-base font-light text-black mb-3">
                {searchQuery
                  ? `${filtered.length} hasil untuk "${searchQuery}"`
                  : "Artikel Terbaru"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {regularList.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </PageLayout>
  );
}

function ArticleCard({ article }) {
  const colors = CAT_COLORS[article.category] ?? { bg: "#fff3eb", text: "#d06224" };
  const unsplashUrl = useUnsplashImage(article.title);
  const imageUrl = article.image || unsplashUrl;

  return (
    <article
      onClick={() => window.open(article.url, "_blank")}
      className="bg-white rounded-[15px] overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow group"
    >
      <img src={imageUrl} alt={article.title} className="w-full h-[150px] object-cover" />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span
            className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
            style={{ background: colors.bg, color: colors.text }}
          >
            {article.category}
          </span>
          <span className="text-gray-400 text-[11px]">{article.readTime} baca</span>
        </div>
        <h3 className="text-black font-semibold text-sm leading-snug line-clamp-2 group-hover:text-[#d06224] transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-500 text-xs mt-1.5 line-clamp-2 font-light leading-relaxed">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <span className="text-gray-400 text-[11px]">{article.author} · {article.date}</span>
          <span className="text-[#d06224] text-[11px] font-medium group-hover:underline">Baca →</span>
        </div>
      </div>
    </article>
  );
}

function FeaturedArticle({ article }) {
  const unsplashUrl = useUnsplashImage(article.title);
  const imageUrl = article.image || unsplashUrl;

  return (
    <div
      className="relative w-full rounded-[18px] overflow-hidden cursor-pointer shadow-sm group"
      onClick={() => window.open(article.url, "_blank")}
    >
      <img src={imageUrl} alt={article.title} className="w-full h-[220px] object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
            style={{
              background: CAT_COLORS[article.category]?.bg ?? "#fff3eb",
              color: CAT_COLORS[article.category]?.text ?? "#d06224",
            }}
          >
            {article.category}
          </span>
          <span className="text-white/70 text-[11px]">{article.readTime} baca</span>
        </div>
        <h3 className="text-white font-semibold text-lg leading-snug">{article.title}</h3>
        <p className="text-white/80 text-sm mt-1 line-clamp-2">{article.excerpt}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-white/60 text-xs">{article.author} · {article.date}</span>
          <span className="text-white text-xs font-medium group-hover:underline">Baca selengkapnya →</span>
        </div>
      </div>
    </div>
  );
}