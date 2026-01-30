import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import YouTubeRecs from "../components/YouTubeRecs";

const API_BASE = "http://localhost:8000";

export default function ResourcesPage() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const lessonRes = await axios.get(`${API_BASE}/daily`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTopic(lessonRes.data.topic);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        logout();
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    } else {
      navigate("/login");
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900/30 to-transparent border-b border-slate-800/50 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center">
            <p className="text-red-400 font-semibold text-sm mb-2 uppercase tracking-wide">
              🎥 Learning Resources
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Curated Video Tutorials
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Watch hand-picked YouTube videos to deepen your understanding of{" "}
              {topic || "the topic"}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <section className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-1 overflow-hidden hover:border-slate-600/50 transition-colors">
          <div className="rounded-lg bg-slate-900/50 backdrop-blur-sm p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-8 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></div>
              <h3 className="text-2xl font-bold text-white">
                Videos for {topic || "Your Learning"}
              </h3>
            </div>
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-700 border-t-blue-500"></div>
              </div>
            ) : (
              <YouTubeRecs topic={topic} />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
