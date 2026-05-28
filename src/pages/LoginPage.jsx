import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { authAPI } from "../utils/api"; 
import food1 from "../assets/asset1.png";
import food2 from "../assets/asset2.png";
import food3 from "../assets/asset3.png";
import food4 from "../assets/asset4.png";
import logoOlah from "../assets/logo-olah.png";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState(location.state?.password || "");
  const [error, setError] = useState("");      
  const [loading, setLoading] = useState(false); 

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await authAPI.login({ email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ingat saya
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Email atau kata sandi salah.");
    } finally {
      setLoading(false);
    }
  };

  // auto fill email
  useState(() => {
    const saved = localStorage.getItem("rememberedEmail");
    if (saved) {
      setEmail(saved);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6">
      <div
        className="flex flex-col md:flex-row w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl"
        style={{ minHeight: 620 }}
      >
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 md:px-14 py-10 md:py-12 bg-white">
          <div className="mb-8 flex justify-center">
            <img src={logoOlah} alt="OLAH Logo" className="h-14 w-auto object-contain" />
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Masuk ke <span className="text-[#E87722]">OLAH</span>
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed">
              Selamat datang!<br />
              Masuk untuk melihat rekomendasi resep dan stok bahan kamu.
            </p>
          </div>

          {/* tampilan error */}
          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">Email</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#E87722] focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">Kata Sandi</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#E87722] focus:border-transparent transition pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="w-4 h-4 accent-[#E87722] cursor-pointer"
                />
                <span className="text-sm text-gray-600">Ingat Saya</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-[#E87722] font-medium hover:underline">
                Lupa Kata Sandi?
              </Link>
            </div>

            {/* tombol loading */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E87722] hover:bg-[#d06a1a] disabled:bg-[#f0a875] disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl tracking-widest text-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              {loading ? "Memproses..." : "MASUK"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-gray-500">
            Belum punya akun?{" "}
            <Link to="/register" className="text-[#E87722] font-semibold hover:underline">
              Daftar sekarang
            </Link>
          </p>
        </div>

        <div
          className="hidden md:block w-1/2 relative overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #f5cda8 0%, #e09060 35%, #c96030 70%, #a84020 100%)",
          }}
        >
          <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: "35%", zIndex: 0, background: "linear-gradient(to bottom, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 100%)" }} />
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
            <p className="text-white text-base">di <span className="font-extrabold">OLAH</span> Aja!</p>
          </div>
        </div>

      </div>
    </div>
  );
}