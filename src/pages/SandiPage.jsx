import { useState, useEffect } from "react";
import PageLayout from "../components/layout/PageLayout"; 
import profilePhoto from "../assets/asset5.png";
import { userAPI } from "../utils/api"; 

export default function SandiPage() {
  const [showSaatIni, setShowSaatIni] = useState(false);
  const [showBaru, setShowBaru] = useState(false);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);

  const [form, setForm] = useState({
    sandiSaatIni: "",
    sandiBaru: "",
    konfirmasi: "",
  });

  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [userData, setUserData] = useState({
    namaTampilan: "Memuat...",
    email: "Memuat...",
    bio: "",
    joinDate: "Memuat..."
  });

  // 1. Fetch Profile Data menggunakan Axios
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await userAPI.getProfile();
        const user = result.data.user;
        
        let formattedDate = "Memuat...";
        if (user.createdAt) {
          formattedDate = new Date(user.createdAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric"
          });
        }

        setUserData({
          namaTampilan: user.name || "",
          email: user.email || "",
          bio: user.bio || "Belum ada bio.",
          joinDate: formattedDate
        });
      } catch (error) {
        console.error("Error fetching profile:", error.message);
      } finally {
        setIsFetching(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 2. Handle API Ubah Sandi menggunakan Axios
  const handleSave = async () => {
    setIsLoading(true);
    try {
      const payload = {
        currentPassword: form.sandiSaatIni,
        newPassword: form.sandiBaru
      };

      await userAPI.changePassword(payload);

      setSaved(true);
      setForm({ sandiSaatIni: "", sandiBaru: "", konfirmasi: "" });
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error("Error changing password:", error.message);
      alert(error.message || "Terjadi kesalahan saat mengubah kata sandi.");
    } finally {
      setIsLoading(false);
    }
  };

  const getStrength = (password) => {
    if (!password) return null;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (score <= 1) return { label: "Sangat Lemah", color: "#d06224", bars: 1 };
    if (score === 2) return { label: "Lemah", color: "#e87722", bars: 2 };
    if (score === 3) return { label: "Kuat", color: "#8a8635", bars: 3 };
    return { label: "Sangat Kuat", color: "#4caf50", bars: 4 };
  };

  const strength = getStrength(form.sandiBaru);
  const isMatch = form.konfirmasi && form.sandiBaru === form.konfirmasi;

  const EyeIcon = ({ show, onClick }) => (
    <button type="button" onClick={onClick} className="text-gray-400 hover:text-gray-600 focus:outline-none">
      {show ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="1" y1="1" x2="23" y2="23" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/></svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="3" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      )}
    </button>
  );

  return (
    <PageLayout>
      <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 border-b border-gray-200 bg-white">
        <h1 className="text-2xl font-semibold text-[#d06224]">Profil Anda</h1>
      </div>

      {isFetching ? (
        <div className="flex-1 flex items-center justify-center min-h-[50vh]">
           <p className="text-gray-500 font-medium">Memuat data...</p>
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
              {userData.namaTampilan.toUpperCase()}
            </h3>
            <p className="text-gray-500 text-sm text-center mb-6 leading-relaxed">
              {userData.bio}
            </p>
            <div className="w-full flex flex-col gap-0 divide-y divide-gray-100">
              <div className="flex items-center gap-3 py-4">
                <div className="w-9 h-9 rounded-lg bg-[#f5ede6] flex items-center justify-center shrink-0">
                  <svg width="18" height="14" viewBox="0 0 24 20" fill="none"><path d="M21.6 0H2.4C1.08 0 0.012 1.08 0.012 2.4L0 16.8C0 18.12 1.08 19.2 2.4 19.2H21.6C22.92 19.2 24 18.12 24 16.8V2.4C24 1.08 22.92 0 21.6 0ZM21.6 4.8L12 10.8L2.4 4.8V2.4L12 8.4L21.6 2.4V4.8Z" fill="#d06224"/></svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#d06224]">Email</p>
                  <p className="text-sm text-gray-600">{userData.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 py-4">
                <div className="w-9 h-9 rounded-lg bg-[#f0eedb] flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM7 10H12V15H7V10Z" fill="#8a8635"/></svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#8a8635]">Bergabung Sejak</p>
                  <p className="text-sm text-gray-600">{userData.joinDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* FORM UBAH KATA SANDI (KANAN) */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm p-7 h-fit">
            <h2 className="text-lg font-light text-gray-700 mb-5">Ubah Kata Sandi</h2>
            <div className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kata Sandi Saat Ini</label>
                <div className="relative">
                  <input type={showSaatIni ? "text" : "password"} name="sandiSaatIni" value={form.sandiSaatIni} onChange={handleChange} placeholder="••••••••" className="w-full px-3 py-2.5 pr-10 bg-[#f5f5f5] rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#d06224]/30" />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <EyeIcon show={showSaatIni} onClick={() => setShowSaatIni(!showSaatIni)} />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kata Sandi Baru</label>
                <div className="relative">
                  <input type={showBaru ? "text" : "password"} name="sandiBaru" value={form.sandiBaru} onChange={handleChange} placeholder="••••••••" className="w-full px-3 py-2.5 pr-10 bg-[#f5f5f5] rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#d06224]/30" />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <EyeIcon show={showBaru} onClick={() => setShowBaru(!showBaru)} />
                  </div>
                </div>
                {form.sandiBaru && strength && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-1 flex-1 rounded-full transition-all duration-300" style={{ backgroundColor: i <= strength.bars ? strength.color : "#e5e7eb" }} />
                      ))}
                    </div>
                    <p className="text-xs font-medium" style={{ color: strength.color }}>{strength.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Min. 8 karakter, kombinasi huruf besar, angka, dan simbol</p>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Konfirmasi Kata Sandi</label>
                <div className="relative">
                  <input type={showKonfirmasi ? "text" : "password"} name="konfirmasi" value={form.konfirmasi} onChange={handleChange} placeholder="••••••••" className="w-full px-3 py-2.5 pr-10 bg-[#f5f5f5] rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#d06224]/30" />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <EyeIcon show={showKonfirmasi} onClick={() => setShowKonfirmasi(!showKonfirmasi)} />
                  </div>
                </div>
                {form.konfirmasi && (
                  <p className={`text-xs mt-1 ${isMatch ? "text-[#8a8635]" : "text-[#d06224]"}`}>
                    {isMatch ? "Kata sandi cocok ✓" : "Kata sandi tidak cocok"}
                  </p>
                )}
              </div>
              <div className="flex justify-end mt-2">
                <button onClick={handleSave} disabled={!isMatch || !form.sandiSaatIni || isLoading} className={`px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 ${isLoading ? "bg-gray-400 cursor-not-allowed" : saved ? "bg-[#8a8635]" : (!isMatch || !form.sandiSaatIni) ? "bg-gray-300 cursor-not-allowed" : "bg-[#d06224] hover:bg-[#ae431e] active:scale-95"}`}>
                  {isLoading ? "Menyimpan..." : saved ? "Berhasil Diubah ✓" : "Ubah Kata Sandi"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}