import PageLayout from "../components/layout/PageLayout";
import logoOlah from "../assets/logo-OLAH-1.png";

export default function AboutPage() {
  const teamMembers = [
    { role: "AI Engineer", members: ["Maghfur Hasani", "Angelin Viona Lumban Tobing"] },
    { role: "Full-Stack Developer", members: ["Putri Anisa", "Marita Habibah"] },
    { role: "Data Scientist", members: ["Yunita Asri Prameswari", "Titania Rahmawati"] },
  ];

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <img src={logoOlah} alt="OLAH Logo" className="w-24 h-24 mx-auto mb-6 object-contain" />
          <h1 className="text-4xl font-bold text-[#d06224] mb-4">Tentang OLAH</h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            <strong>OLAH</strong> adalah platform inovatif yang dirancang untuk membantu masyarakat Indonesia mengelola stok bahan makanan secara cerdas guna mengurangi limbah pangan (*food waste*). 
            Melalui sistem inventaris pintar dan rekomendasi resep berbasis AI, kami hadir untuk mengubah sisa bahan di dapur Anda menjadi hidangan lezat.
          </p>
        </div>

        {/* Team Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">Tim Pengembang</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {teamMembers.map((group) => (
              <div key={group.role} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                <h3 className="text-[#d06224] font-bold mb-4 uppercase text-sm tracking-wider">{group.role}</h3>
                <ul className="space-y-2">
                  {group.members.map((name) => (
                    <li key={name} className="text-gray-700 font-medium">{name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Info */}
        <div className="mt-16 text-center text-gray-400 text-sm">
          <p>Dikembangkan oleh Tim CC26-PSU127</p>
          <p className="mt-1">© 2026 OLAH. All rights reserved.</p>
        </div>
      </div>
    </PageLayout>
  );
}