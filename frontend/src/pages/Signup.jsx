import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const success = await register(email, password);

    if (success) {
      // Auto-login after successful registration
      const loginSuccess = await login(email, password);
      if (loginSuccess) {
        navigate("/");
      } else {
        navigate("/login");
      }
    } else {
      setError("Registration failed. Email may already be in use.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 px-4">
      {/* Left side branding - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center pr-12">
        <div className="max-w-md">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <span className="text-white font-bold text-4xl">J</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Java DSA Mentor
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            Start your journey to master data structures and algorithms
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400 font-bold">✓</span>
              </div>
              <span className="text-slate-300">Personalized Learning</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400 font-bold">✓</span>
              </div>
              <span className="text-slate-300">Java-Focused Content</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400 font-bold">✓</span>
              </div>
              <span className="text-slate-300">AI-Powered Guidance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Signup Form */}
      <div className="w-full lg:w-1/2 max-w-md">
        <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/40 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-slate-700/50 shadow-2xl">
          {/* Mobile branding */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">J</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-1">
              Java DSA Mentor
            </h1>
            <p className="text-slate-400">
              Create your account and start learning
            </p>
          </div>

          {/* Desktop branding */}
          <div className="hidden lg:block text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              Join Us Today
            </h1>
            <p className="text-slate-400">Create your account to get started</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/15 border border-red-500/50 rounded-lg text-red-300 text-sm flex items-start gap-3">
              <span className="font-bold mt-0.5">⚠</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-900/40 border border-slate-700/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white placeholder-slate-500 transition-all duration-200 hover:border-slate-600/70"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-900/40 border border-slate-700/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white placeholder-slate-500 transition-all duration-200 hover:border-slate-600/70"
                placeholder="••••••••"
              />
              <p className="text-xs text-slate-400 mt-2">
                At least 6 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-900/40 border border-slate-700/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white placeholder-slate-500 transition-all duration-200 hover:border-slate-600/70"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed rounded-lg font-semibold text-white transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-700/50">
            <p className="text-center text-slate-400 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
