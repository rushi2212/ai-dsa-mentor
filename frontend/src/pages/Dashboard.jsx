import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-6 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full">
              <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest">
                Welcome to Your Learning Hub
              </p>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Master Java{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Data Structures
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Learn, Practice, and Excel with AI-Powered Lessons, Interactive
              Quizzes, and Personalized Guidance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/lesson"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg text-white font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Learning Today
              </a>
              <a
                href="/practice"
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-white font-semibold text-lg transition-all duration-200 shadow-lg"
              >
                Practice Problems
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-slate-900/50 border-t border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose Java DSA Mentor?
            </h2>
            <p className="text-xl text-slate-400">
              Everything you need to master data structures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 rounded-xl border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-300 hover:border-blue-500/50">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Daily Lessons
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Get a new, AI-powered lesson every day. Each lesson includes
                concepts, Java code examples, and real-world applications.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-xl border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-300 hover:border-green-500/50">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Practice Questions
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Solve 10 carefully crafted multiple-choice questions for each
                topic. Get instant feedback on your answers.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-xl border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-300 hover:border-red-500/50">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🎥</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Video Resources
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Curated YouTube tutorials from the best educators to reinforce
                your understanding with visual learning.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-8 rounded-xl border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-300 hover:border-purple-500/50">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Progress Tracking
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Monitor your learning journey with detailed analytics. Track
                which topics you've mastered and where to focus.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group p-8 rounded-xl border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-300 hover:border-amber-500/50">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                AI Doubt Solver
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Ask any question about DSA concepts. Get instant, detailed
                explanations from our AI mentor.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group p-8 rounded-xl border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-300 hover:border-cyan-500/50">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Fast Learning
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Structured learning path designed to maximize retention and help
                you master DSA concepts quickly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Master DSA?
          </h2>
          <p className="text-xl text-slate-300 mb-10">
            Start your journey today and become a DSA expert. Learn from
            experienced mentors, solve real-world problems, and track your
            progress.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/lesson"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg text-white font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Begin Your Learning Path
            </a>
            <a
              href="/progress"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-white font-semibold text-lg transition-all duration-200"
            >
              View Your Progress
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <p className="text-slate-400 text-sm">
            © 2026 Java DSA Mentor. Empowering developers to master data
            structures and algorithms.
          </p>
        </div>
      </footer>
    </div>
  );
}
