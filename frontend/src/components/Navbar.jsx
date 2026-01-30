import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">J</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Java DSA Mentor</h1>
              <p className="text-xs text-blue-400 font-semibold">
                Master Data Structures
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="/"
              className="px-4 py-2 text-slate-300 hover:text-white text-sm font-medium transition-colors rounded-lg hover:bg-slate-800/50"
            >
              Dashboard
            </a>
            <a
              href="/lesson"
              className="px-4 py-2 text-slate-300 hover:text-white text-sm font-medium transition-colors rounded-lg hover:bg-slate-800/50"
            >
              Lesson
            </a>
            <a
              href="/resources"
              className="px-4 py-2 text-slate-300 hover:text-white text-sm font-medium transition-colors rounded-lg hover:bg-slate-800/50"
            >
              Resources
            </a>
            <a
              href="/practice"
              className="px-4 py-2 text-slate-300 hover:text-white text-sm font-medium transition-colors rounded-lg hover:bg-slate-800/50"
            >
              Practice
            </a>
            <a
              href="/progress"
              className="px-4 py-2 text-slate-300 hover:text-white text-sm font-medium transition-colors rounded-lg hover:bg-slate-800/50"
            >
              Progress
            </a>
            <a
              href="/doubts"
              className="px-4 py-2 text-slate-300 hover:text-white text-sm font-medium transition-colors rounded-lg hover:bg-slate-800/50"
            >
              Doubts
            </a>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg text-white text-sm font-medium border border-red-500/30 transition-all duration-200 shadow-lg hover:shadow-xl ml-2"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-slate-700 space-y-3">
            <a
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-slate-300 hover:text-white text-sm font-medium transition-colors rounded-lg hover:bg-slate-800/50"
            >
              Dashboard
            </a>
            <a
              href="/lesson"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-slate-300 hover:text-white text-sm font-medium transition-colors rounded-lg hover:bg-slate-800/50"
            >
              Lesson
            </a>
            <a
              href="/resources"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-slate-300 hover:text-white text-sm font-medium transition-colors rounded-lg hover:bg-slate-800/50"
            >
              Resources
            </a>
            <a
              href="/practice"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-slate-300 hover:text-white text-sm font-medium transition-colors rounded-lg hover:bg-slate-800/50"
            >
              Practice
            </a>
            <a
              href="/progress"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-slate-300 hover:text-white text-sm font-medium transition-colors rounded-lg hover:bg-slate-800/50"
            >
              Progress
            </a>
            <a
              href="/doubts"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-slate-300 hover:text-white text-sm font-medium transition-colors rounded-lg hover:bg-slate-800/50"
            >
              Doubts
            </a>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg text-white text-sm font-medium transition-all"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
