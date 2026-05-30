import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import food1 from "../assets/asset1.png";
import food2 from "../assets/asset2.png";
import food3 from "../assets/asset3.png";
import food4 from "../assets/asset4.png";
import logoOlah from "../assets/logo-OLAH-1.png";
import { authAPI } from "../utils/api";

// ── Step indicator ─────────────────────────────────────────────────────────────
const StepDots = ({ current }) => (
  <div className="flex items-center justify-center gap-2 mb-6">
    {[1, 2, 3].map((s) => (
      <div
        key={s}
        className="transition-all duration-300 rounded-full"
        style={{
          width:  s === current ? 24 : 8,
          height: 8,
          backgroundColor: s <= current ? "#E87722" : "#e5e7eb",
        }}
      />
    ))}
  </div>
);

// ── Eye icons ──────────────────────────────────────────────────────────────────
const EyeIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);
const EyeOffIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

// ── Password strength ──────────────────────────────────────────────────────────
const getStrength = (p) => {
  if (!p) return { label: "Sangat Lemah", count: 1, color: "#7d0000" };
  let score = 0;
  if (p.length >= 8) score++;
  if (/[A-Z]/.test(p) || /[a-z]/.test(p)) score++;
  if (/\d/.test(p)) score++;
  if (/[^A-Za-z0-9]/.test(p)) score++;
  if (score <= 1) return { label: "Sangat Lemah", count: 1, color: "#7d0000" };
  if (score === 2) return { label: "Lemah",        count: 2, color: "#c26b1d" };
  if (score === 3) return { label: "Sedang",       count: 3, color: "#8a8635" };
  return               { label: "Kuat",            count: 4, color: "#2f7a39" };
};

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  // ── State ──────────────────────────────────────────────────────────────────
  const [step, setStep]               = useState(1); // 1 = email, 2 = OTP, 3 = new password
  const [email, setEmail]             = useState("");
  const [otp, setOtp]                 = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showNew, setShowNew]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError]             = useState("");
  const [loading, setLoading]         = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const strength = getStrength(newPassword);

  // ── Step 1: kirim email ────────────────────────────────────────────────────
  const handleSendEmail = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) { setError("Email wajib diisi."); return; }
    setLoading(true);
    try {
      await authAPI.forgotPassword({ email: email.trim() });
      setStep(2);
      startResendCooldown();
    } catch (err) {
      setError(err.message || "Gagal mengirim email. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  // ── Step 2: verifikasi OTP ─────────────────────────────────────────────────
  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (paste.length === 6) {
      setOtp(paste.split(""));
      document.getElementById("otp-5")?.focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    const code = otp.join("");
    if (code.length < 6) { setError("Masukkan 6 digit kode OTP."); return; }
    setLoading(true);
    try {
      await authAPI.verifyOtp({ email, otp: code });
      setStep(3);
    } catch (err) {
      setError(err.message || "Kode OTP salah atau sudah kadaluarsa.");
    } finally {
      setLoading(false);
    }
  };

  const startResendCooldown = () => {
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setError("");
    setLoading(true);
    try {
      await authAPI.forgotPassword({ email });
      startResendCooldown();
    } catch (err) {
      setError(err.message || "Gagal mengirim ulang kode.");
    } finally {
      setLoading(false);
    }
  };

  // ── Step 3: reset password ─────────────────────────────────────────────────
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    if (newPassword !== confirmPass) {
      setError("Kata sandi dan konfirmasi tidak cocok.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Kata sandi minimal 8 karakter.");
      return;
    }
    setLoading(true);
    try {
      await authAPI.resetPassword({
        email,
        otp: otp.join(""),
        newPassword,
      });
      navigate("/login", {
        state: { message: "Kata sandi berhasil direset. Silakan masuk." },
      });
    } catch (err) {
      setError(err.message || "Gagal mereset kata sandi. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  // ── Panel kiri: konten per step ────────────────────────────────────────────
  const renderForm = () => {
    // ── Step 1: Email ────────────────────────────────────────────────────────
    if (step === 1) return (
      <form className="space-y-4" onSubmit={handleSendEmail}>
        <div>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            Masukkan email yang terdaftar. Kami akan mengirimkan kode verifikasi ke email tersebut.
          </p>
          <label className="block text-sm font-bold text-gray-800 mb-1">Email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#E87722] focus:border-transparent transition"
            autoFocus
          />
        </div>

        {error && (
          <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#E87722] hover:bg-[#d06a1a] disabled:bg-[#f0a875] disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl tracking-widest text-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          {loading ? "Mengirim..." : "KIRIM KODE"}
        </button>
      </form>
    );

    // ── Step 2: OTP ──────────────────────────────────────────────────────────
    if (step === 2) return (
      <form className="space-y-4" onSubmit={handleVerifyOtp}>
        <p className="text-sm text-gray-500 leading-relaxed">
          Kode OTP telah dikirim ke{" "}
          <span className="font-semibold text-[#E87722]">{email}</span>.
          Masukkan 6 digit kode di bawah ini.
        </p>

        {/* OTP inputs */}
        <div className="flex gap-2 justify-center" onPaste={handleOtpPaste}>
          {otp.map((digit, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(i, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(i, e)}
              className="w-11 h-12 text-center text-lg font-bold border-2 rounded-xl bg-gray-50 text-gray-800 focus:outline-none transition-all duration-200"
              style={{
                borderColor: digit ? "#E87722" : "#e5e7eb",
                boxShadow: digit ? "0 0 0 3px rgba(232,119,34,0.15)" : "none",
              }}
            />
          ))}
        </div>

        {error && (
          <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#E87722] hover:bg-[#d06a1a] disabled:bg-[#f0a875] disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl tracking-widest text-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          {loading ? "Memverifikasi..." : "VERIFIKASI"}
        </button>

        {/* Resend */}
        <p className="text-center text-sm text-gray-500">
          Tidak menerima kode?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={resendCooldown > 0}
            className="font-semibold transition"
            style={{ color: resendCooldown > 0 ? "#9ca3af" : "#E87722" }}
          >
            {resendCooldown > 0 ? `Kirim ulang (${resendCooldown}s)` : "Kirim ulang"}
          </button>
        </p>

        <button
          type="button"
          onClick={() => { setStep(1); setError(""); setOtp(["","","","","",""]); }}
          className="w-full text-sm text-gray-400 hover:text-gray-600 transition"
        >
          ← Ganti email
        </button>
      </form>
    );

    // ── Step 3: New Password ─────────────────────────────────────────────────
    return (
      <form className="space-y-4" onSubmit={handleResetPassword}>
        <p className="text-sm text-gray-500 leading-relaxed">
          Buat kata sandi baru untuk akunmu.
        </p>

        {/* Kata sandi baru */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-1">Kata Sandi Baru</label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#E87722] focus:border-transparent transition pr-12"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              {showNew ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          {/* Strength bar */}
          <div className="mt-2 flex gap-1">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-1 flex-1 rounded-full transition-all duration-300"
                style={{ backgroundColor: i <= strength.count ? strength.color : "#e5e7eb" }}
              />
            ))}
          </div>
          <p className="text-xs mt-1" style={{ color: strength.color }}>
            {newPassword ? strength.label : ""}
          </p>
        </div>

        {/* Konfirmasi */}
        <div>
          <label className="block text-sm font-bold text-[#E87722] mb-1">Konfirmasi Kata Sandi</label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#E87722] focus:border-transparent transition pr-12"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          {/* Match indicator */}
          {confirmPass && (
            <p className="text-xs mt-1" style={{ color: confirmPass === newPassword ? "#2f7a39" : "#7d0000" }}>
              {confirmPass === newPassword ? "✓ Kata sandi cocok" : "✕ Kata sandi tidak cocok"}
            </p>
          )}
        </div>

        {error && (
          <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#E87722] hover:bg-[#d06a1a] disabled:bg-[#f0a875] disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl tracking-widest text-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          {loading ? "Menyimpan..." : "SIMPAN KATA SANDI"}
        </button>
      </form>
    );
  };

  const stepTitles = ["Lupa Kata Sandi", "Verifikasi Email", "Buat Kata Sandi Baru"];

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6">
      <div
        className="flex flex-col md:flex-row w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl"
        style={{ minHeight: 620 }}
      >
        {/* ── PANEL KIRI ── */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 md:px-14 py-8 md:py-10 bg-white">
          <div className="mb-6 flex justify-center">
            <img src={logoOlah} alt="OLAH Logo" className="h-10 w-auto object-contain" />
          </div>

          <StepDots current={step} />

          <h1 className="text-xl font-bold text-gray-900 mb-6">
            {stepTitles[step - 1]}
          </h1>

          {renderForm()}

          <p className="mt-5 text-center text-sm text-gray-500">
            Ingat kata sandi?{" "}
            <Link to="/login" className="text-[#E87722] font-semibold hover:underline">
              Masuk
            </Link>
          </p>
        </div>

        {/* ── PANEL KANAN — hidden di mobile ── */}
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
            <img src={food1} alt="" className="w-full h-full object-cover" style={{ transform: "scale(1.35)" }} />
          </div>
          <div className="absolute rounded-full overflow-hidden" style={{ width: 148, height: 148, right: "35%", top: "22%", zIndex: 10, boxShadow: "0 12px 40px rgba(0,0,0,0.35)" }}>
            <img src={food2} alt="" className="w-full h-full object-cover" style={{ transform: "scale(1.35)" }} />
          </div>
          <div className="absolute rounded-full overflow-hidden" style={{ width: 148, height: 148, right: "35%", top: "50%", zIndex: 10, boxShadow: "0 12px 40px rgba(0,0,0,0.35)" }}>
            <img src={food3} alt="" className="w-full h-full object-cover" style={{ transform: "scale(1.35)" }} />
          </div>
          <div className="absolute rounded-full overflow-hidden" style={{ width: 148, height: 148, left: "4%", top: "70%", zIndex: 10, boxShadow: "0 12px 40px rgba(0,0,0,0.35)" }}>
            <img src={food4} alt="" className="w-full h-full object-cover" style={{ transform: "scale(1.35)" }} />
          </div>

          {/* Teks step info di panel kanan */}
          <div className="absolute inset-0 flex flex-col items-end justify-end p-7" style={{ zIndex: 20 }}>
            <div className="text-right">
              <p className="text-white/80 text-sm font-medium">
                {step === 1 && "Tenang, kami bantu kamu!"}
                {step === 2 && "Cek kotak masuk emailmu."}
                {step === 3 && "Hampir selesai!"}
              </p>
              <p className="text-white text-base">
                di <span className="font-extrabold">OLAH</span> Aja!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}