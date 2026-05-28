import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import food1 from "../assets/asset1.png";
import food2 from "../assets/asset2.png";
import food3 from "../assets/asset3.png";
import food4 from "../assets/asset4.png";
import logoOlah from "../assets/logo-olah.png";
import { authAPI } from "../utils/api";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (formData.password !== formData.confirmPassword) {
    setError("Kata sandi dan konfirmasi tidak cocok.");
    return;
  }

  setLoading(true);
  try {
    await authAPI.register({
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      password: formData.password,
    });

    // direct ke login dengan email & password ter-isi
    navigate("/login", {
      state: {
        email: formData.email,
        password: formData.password,
      },
    });
  } catch (err) {
    setError(err.message || "Gagal membuat akun. Coba lagi.");
  } finally {
    setLoading(false);
  }
  };

  const passwordStrength = (() => {
    const p = formData.password;
    if (!p) return { label: "Sangat Lemah", count: 1, color: "#7d0000" };
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p) || /[a-z]/.test(p)) score++;
    if (/\d/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    if (score <= 1) return { label: "Sangat Lemah", count: 1, color: "#7d0000" };
    if (score === 2) return { label: "Lemah", count: 2, color: "#c26b1d" };
    if (score === 3) return { label: "Sedang", count: 3, color: "#8a8635" };
    return { label: "Kuat", count: 4, color: "#2f7a39" };
  })();

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

  const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6">
      <div
        className="flex flex-col md:flex-row w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl"
        style={{ minHeight: 620 }}
      >
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 md:px-14 py-8 md:py-10 bg-white">
          <div className="mb-6 flex justify-center">
            <img src={logoOlah} alt="OLAH Logo" className="h-14 w-auto object-contain" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-6">Buat Akun Baru</h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* nama depan & belakang */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label className="block text-sm font-bold text-[#E87722] mb-1">Nama Depan</label>
                <input
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange("firstName")}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#E87722] focus:border-transparent transition"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-bold text-[#E87722] mb-1">Nama Belakang</label>
                <input
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange("lastName")}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#E87722] focus:border-transparent transition"
                />
              </div>
            </div>

            {/* email */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">Email</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange("email")}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#E87722] focus:border-transparent transition"
              />
            </div>

            {/* kata sandi */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">Kata Sandi</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange("password")}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#E87722] focus:border-transparent transition pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {/* strength bar */}
              <div className="mt-2 flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-1 flex-1 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: i <= passwordStrength.count ? passwordStrength.color : "#e5e7eb",
                    }}
                  />
                ))}
              </div>
              <p className="text-xs mt-1" style={{ color: passwordStrength.color }}>
                {formData.password ? passwordStrength.label : ""}
              </p>
            </div>

            {/* konfirmasi kata sandi */}
            <div>
              <label className="block text-sm font-bold text-[#E87722] mb-1">Konfirmasi Kata Sandi</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#E87722] focus:border-transparent transition pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

          {error && (
            <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              {error}
            </div>
          )}

          {/* tombol submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E87722] hover:bg-[#d06a1a] disabled:bg-[#f0a875] disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl tracking-widest text-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            {loading ? "Memproses..." : "BUAT AKUN"}
          </button>
          </form>

          <p className="mt-5 text-center text-sm text-gray-500">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-[#E87722] font-semibold hover:underline">
              Masuk
            </Link>
          </p>
        </div>

        {/* mobile */}
        <div
          className="hidden md:block w-1/2 relative overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #f5cda8 0%, #e09060 35%, #c96030 70%, #a84020 100%)",
          }}
        >
          <div
            className="absolute inset-x-0 top-0 pointer-events-none"
            style={{
              height: "35%",
              zIndex: 0,
              background: "linear-gradient(to bottom, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 100%)",
            }}
          />

          <div className="absolute rounded-full overflow-hidden" style={{ width: 148, height: 148, left: "4%", top: "4%", zIndex: 10, boxShadow: "0 12px 40px rgba(0,0,0,0.35)" }}>
            <img src={food1} alt="makanan 1" className="w-full h-full object-cover" style={{ transform: "scale(1.35)" }} />
          </div>
          <div className="absolute rounded-full overflow-hidden" style={{ width: 148, height: 148, right: "35%", top: "22%", zIndex: 10, boxShadow: "0 12px 40px rgba(0,0,0,0.35)" }}>
            <img src={food2} alt="makanan 2" className="w-full h-full object-cover" style={{ transform: "scale(1.35)" }} />
          </div>
          <div className="absolute rounded-full overflow-hidden" style={{ width: 148, height: 148, right: "35%", top: "50%", zIndex: 10, boxShadow: "0 12px 40px rgba(0,0,0,0.35)" }}>
            <img src={food3} alt="makanan 3" className="w-full h-full object-cover" style={{ transform: "scale(1.35)" }} />
          </div>
          <div className="absolute rounded-full overflow-hidden" style={{ width: 148, height: 148, left: "4%", top: "70%", zIndex: 10, boxShadow: "0 12px 40px rgba(0,0,0,0.35)" }}>
            <img src={food4} alt="makanan 4" className="w-full h-full object-cover" style={{ transform: "scale(1.35)" }} />
          </div>

          <div className="absolute bottom-7 right-7 text-right" style={{ zIndex: 20 }}>
            <p className="text-white/80 text-sm font-medium">Punya Sisa Bahan Makanan?</p>
            <p className="text-white text-base">
              di <span className="font-extrabold">OLAH</span> Aja!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}