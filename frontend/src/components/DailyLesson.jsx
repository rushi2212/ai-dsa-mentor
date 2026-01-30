// src/components/DailyLesson.jsx
import ReactMarkdown from "react-markdown";

export default function DailyLesson({ topic, content, isLoading = false }) {
  if (isLoading) {
    return (
      <div className="bg-slate-800/40 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-slate-700/50 animate-pulse">
        <div className="h-8 bg-slate-700 rounded-lg w-3/4 mb-6"></div>
        <div className="space-y-4">
          <div className="h-4 bg-slate-700 rounded w-full"></div>
          <div className="h-4 bg-slate-700 rounded w-5/6"></div>
          <div className="h-4 bg-slate-700 rounded w-4/6"></div>
        </div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="bg-slate-800/40 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 text-center">
        <p className="text-slate-400 text-lg">
          No lesson available yet. Please refresh or try again.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/40 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-slate-700/50 shadow-xl hover:border-slate-600/70 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">📚</span>
        </div>
        <div>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">
            Today's Lesson
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white">{topic}</h2>
        </div>
      </div>

      <div
        className="prose prose-invert 
        prose-headings:text-blue-300 prose-headings:font-bold prose-headings:mt-6 prose-headings:mb-3
        prose-h2:text-2xl prose-h3:text-xl
        prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-4
        prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-a:font-medium prose-a:transition-colors
        prose-code:text-blue-200 prose-code:bg-slate-900/60 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
        prose-pre:bg-slate-900/80 prose-pre:border prose-pre:border-slate-700 prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto
        prose-pre:text-slate-300 prose-pre:text-sm
        prose-li:text-slate-300 prose-li:marker:text-blue-400 prose-li:mb-2
        prose-strong:text-white prose-strong:font-semibold
        prose-em:text-slate-200
        max-w-none"
      >
        <ReactMarkdown>{content || "Loading lesson content..."}</ReactMarkdown>
      </div>
    </div>
  );
}
