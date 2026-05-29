import { useState, useEffect } from "react";
import PageLayout from "../components/layout/PageLayout"; 
import profilePhoto from "../assets/asset5.png";
import { userAPI } from "../utils/api"; 

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    namaDepan: "",
    namaBelakang: "",
    namaTampilan: "",
    email: "",
    bio: "",
  });

  const [joinDate, setJoinDate] = useState("Memuat...");
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // 1. Ambil data profil (GET) menggunakan Axios
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await userAPI.getProfile();
        const userData = result.data.user;

        const fullName = userData.name || "";
        const nameParts = fullName.split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        setFormData({
          namaDepan: firstName,
          namaBelakang: lastName,
          namaTampilan: fullName,
          email: userData.email || "", 
          bio: userData.bio || "",
        });

        if (userData.createdAt) {
          const formattedDate = new Date(userData.createdAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric"
          });
          setJoinDate(formattedDate);
        }
      } catch (error) {
        console.error("Error fetching profile:", error.message);
      } finally {
        setIsFetching(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Simpan pembaruan profil (PUT) menggunakan Axios
  const handleSave = async () => {
    setIsLoading(true);
    try {
      const payloadName = `${formData.namaDepan} ${formData.namaBelakang}`.trim();
      const payload = {
        name: payloadName,
        bio: formData.bio
      };

      await userAPI.updateProfile(payload);

      setFormData(prev => ({
        ...prev,
        namaTampilan: payloadName
      }));

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error("Error saving profile:", error.message);
      alert(error.message || "Terjadi kesalahan saat menyimpan profil.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      {/* Header */}
      <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 border-b border-gray-200 bg-white">
        <h1 className="text-2xl font-semibold text-[#d06224]">Profil Anda</h1>
      </div>

      {isFetching ? (
        <div className="flex-1 flex items-center justify-center min-h-[50vh]">
           <p className="text-gray-500 font-medium">Memuat profil...</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6 px-4 md:px-8 py-5 md:py-7 flex-1">

          {/* KARTU PROFIL (KIRI) */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm flex flex-col items-center py-8 px-6 h-fit">
            <h2 className="text-lg font-semibold text-[#d06224] tracking-widest mb-5">PROFIL</h2>

            <div className="w-[110px] h-[110px] rounded-full overflow-hidden border-4 border-[#d06224]/20 mb-4 bg-gray-100">
              <img src={profilePhoto} alt="Foto Profil" className="w-full h-full object-cover" />
            </div>

            <h3 className="text-xl font-bold text-gray-800 tracking-wider mb-1 text-center">
              {formData.namaTampilan.toUpperCase()}
            </h3>
            <p className="text-gray-500 text-sm text-center mb-6 leading-relaxed">
              {formData.bio || "Belum ada bio."}
            </p>

            <div className="w-full flex flex-col gap-0 divide-y divide-gray-100">
              <div className="flex items-center gap-3 py-4">
                <div className="w-9 h-9 rounded-lg bg-[#f5ede6] flex items-center justify-center shrink-0">
                  <svg width="18" height="14" viewBox="0 0 24 20" fill="none"><path d="M21.6 0H2.4C1.08 0 0.012 1.08 0.012 2.4L0 16.8C0 18.12 1.08 19.2 2.4 19.2H21.6C22.92 19.2 24 18.12 24 16.8V2.4C24 1.08 22.92 0 21.6 0ZM21.6 4.8L12 10.8L2.4 4.8V2.4L12 8.4L21.6 2.4V4.8Z" fill="#d06224"/></svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#d06224]">Email</p>
                  <p className="text-sm text-gray-600">{formData.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 py-4">
                <div className="w-9 h-9 rounded-lg bg-[#f0eedb] flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM7 10H12V15H7V10Z" fill="#8a8635"/></svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#8a8635]">Bergabung Sejak</p>
                  <p className="text-sm text-gray-600">{joinDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* FORM KELOLA PROFIL (KANAN) */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm p-7 h-fit">
            <h2 className="text-lg font-light text-gray-700 mb-5">Kelola Profil</h2>

            <div className="flex flex-col gap-5">
              <div className="flex gap-5">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Depan</label>
                  <input type="text" name="namaDepan" value={formData.namaDepan} onChange={handleChange} className="w-full px-3 py-2.5 bg-[#f5f5f5] rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#d06224]/30" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Belakang</label>
                  <input type="text" name="namaBelakang" value={formData.namaBelakang} onChange={handleChange} className="w-full px-3 py-2.5 bg-[#f5f5f5] rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#d06224]/30" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Tampilan</label>
                <input type="text" name="namaTampilan" value={`${formData.namaDepan} ${formData.namaBelakang}`.trim()} readOnly className="w-full px-3 py-2.5 bg-gray-100 rounded-lg text-sm text-gray-500 focus:outline-none cursor-not-allowed" />
                <p className="text-[10px] text-gray-400 mt-1">Nama tampilan digabungkan otomatis dari Nama Depan dan Belakang.</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                <input type="email" name="email" value={formData.email} readOnly className="w-full px-3 py-2.5 bg-gray-100 rounded-lg text-sm text-gray-500 focus:outline-none cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Bio</label>
                <textarea name="bio" value={formData.bio} onChange={handleChange} rows={4} className="w-full px-3 py-2.5 bg-[#f5f5f5] rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#d06224]/30 resize-none" />
              </div>
              <div className="flex justify-end mt-2">
                <button onClick={handleSave} disabled={isLoading} className={`px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 ${isLoading ? "bg-gray-400 cursor-not-allowed" : saved ? "bg-[#8a8635]" : "bg-[#d06224] hover:bg-[#ae431e] active:scale-95"}`}>
                  {isLoading ? "Menyimpan..." : saved ? "Tersimpan ✓" : "Simpan Perubahan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}