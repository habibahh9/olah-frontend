import PageLayout from "../components/layout/PageLayout";
import logoOlah from "../assets/logo-OLAH-1.png";

export default function AboutPage() {
  const teamMembers = [
    { role: "AI Engineer", members: ["Maghfur Hasani", "Angelin Viona Lumban Tobing"] },
    { role: "Full-Stack Developer", members: ["Putri Anisa", "Marita Habibah"] },
    { role: "Data Scientist", members: ["Yunita Asri Prameswari", "Titania Rahmawati"] },
  ];

  const features = [
    { label: "Rekomendasi resep adaptif berbasis bahan yang kamu miliki" },
    { label: "Pengingat masa simpan bahan agar tidak terbuang sia-sia" },
    { label: "Daftar belanja otomatis untuk pengelolaan stok lebih efisien" },
  ];

  return (
    <PageLayout>
      <div className="min-h-screen bg-[#f4f4f4] px-4 sm:px-7 py-8">
        <div className="max-w-2xl mx-auto flex flex-col gap-5">

          {/* Hero Header */}
          <div className="flex flex-col items-center text-center pt-2 pb-1">
            <img src={logoOlah} alt="OLAH Logo" className="w-auto h-auto max-w-[180px] max-h-[120px] object-contain mb-2" />
          </div>

          {/* Tentang OLAH — deskripsi platform */}
          <div className="bg-[#fff5ef] border border-[#f0c4a8] rounded-[15px] p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-5 rounded-full bg-[#d06224]" />
              <h2 className="text-base font-medium text-black">Tentang OLAH</h2>
            </div>
            <p className="text-gray-500 text-sm font-light leading-relaxed">
              <strong className="font-medium text-black">OLAH</strong> adalah platform inovatif yang dirancang
              untuk membantu masyarakat Indonesia mengelola stok bahan makanan secara cerdas guna mengurangi
              limbah pangan. Melalui sistem inventaris pintar dan rekomendasi resep berbasis AI, kami hadir
              untuk mengubah sisa bahan di dapur Anda menjadi hidangan lezat.
            </p>
          </div>

          {/* Fitur Unggulan */}
          <div className="bg-white rounded-[15px] shadow-sm p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-5 rounded-full bg-[#d06224]" />
              <h2 className="text-base font-medium text-black">Apa yang Bisa OLAH Lakukan?</h2>
            </div>
            <div className="flex flex-col gap-3">
              {features.map((f) => (
                <div key={f.label} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#d06224] shrink-0" />
                  <p className="text-gray-500 text-sm font-light leading-snug">{f.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tema & Tujuan */}
          <div className="bg-[#fff5ef] border border-[#f0c4a8] rounded-[15px] p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1 h-5 rounded-full bg-[#d06224]" />
              <h2 className="text-base font-medium text-black">Tema Proyek</h2>
            </div>
            <p className="text-gray-500 text-sm font-light leading-relaxed">
              OLAH selaras dengan tema{" "}
              <span className="text-[#d06224] font-medium">Sustainable Living & Responsible Consumption</span>.
              Dengan memanfaatkan teknologi AI secara bermakna, OLAH diharapkan menjadi MVP yang membantu
              aktivitas memasak sehari-hari sekaligus mendukung gaya hidup yang lebih bertanggung jawab.
            </p>
          </div>

          {/* Tim Pengembang */}
          <div className="bg-white rounded-[15px] shadow-sm p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-5 rounded-full bg-[#d06224]" />
              <h2 className="text-base font-medium text-black">Tim Pengembang</h2>
            </div>
            <div className="flex flex-col gap-2.5">
              {teamMembers.map((group) => (
                <div key={group.role} className="flex items-start gap-3">
                  <span className="text-[#d06224] text-sm font-medium w-[150px] shrink-0 pt-0.5">{group.role}</span>
                  <div className="flex flex-col gap-0.5">
                    {group.members.map((name) => (
                      <span key={name} className="text-gray-500 text-sm font-light">{name}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-[#99999980] text-[14px] pb-2">
            Tim CC26-PSU127 · © 2026 OLAH. All rights reserved.
          </p>

        </div>
      </div>
    </PageLayout>
  );
}