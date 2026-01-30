// src/components/ProgressDashboard.jsx
export default function ProgressDashboard({ progress = [], totalTopics = 16 }) {
  const completedCount = progress.filter(
    (p) => p.status === "completed",
  ).length;
  const progressPercentage = Math.round((completedCount / totalTopics) * 100);
  const averageScore =
    progress.length > 0
      ? Math.round(
          progress
            .filter((p) => p.status === "completed" && p.score)
            .reduce((sum, p) => sum + p.score, 0) /
            progress.filter((p) => p.status === "completed").length,
        )
      : 0;

  return (
    <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/40 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-slate-700/50 shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">📈</span>
        </div>
        <div>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">
            Track Your Growth
          </p>
          <h3 className="text-2xl font-bold text-white">Learning Progress</h3>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-slate-900/40 rounded-lg p-4 border border-slate-700/50">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2">
            Completed
          </p>
          <p className="text-3xl font-bold text-green-400">
            {completedCount}/{totalTopics}
          </p>
        </div>
        <div className="bg-slate-900/40 rounded-lg p-4 border border-slate-700/50">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2">
            Avg Score
          </p>
          <p className="text-3xl font-bold text-blue-400">{averageScore}%</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm font-semibold text-slate-300">
            Overall Progress
          </p>
          <p className="text-sm font-bold text-blue-400">
            {progressPercentage}%
          </p>
        </div>
        <div className="w-full h-3 bg-slate-900/60 rounded-full overflow-hidden border border-slate-700/50">
          <div
            className="h-full bg-gradient-to-r from-green-500 via-emerald-500 to-blue-500 transition-all duration-700 ease-out rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Topic List */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-slate-300 mb-4">
          Topics Completed
        </p>
        <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
          {progress.length === 0 ? (
            <p className="text-slate-500 text-center py-8 text-sm">
              Complete lessons to track your progress here
            </p>
          ) : (
            progress.map((item, i) => {
              const isCompleted = item.status === "completed";
              return (
                <div
                  key={i}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 border
                    ${
                      isCompleted
                        ? "bg-green-900/15 border-green-500/30 hover:bg-green-900/25"
                        : "bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/60"
                    }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {isCompleted && (
                      <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-400 text-xs font-bold">
                          ✓
                        </span>
                      </div>
                    )}
                    {!isCompleted && (
                      <div className="w-5 h-5 rounded-full bg-slate-700/40 border border-slate-600 flex-shrink-0"></div>
                    )}
                    <span
                      className={`text-sm font-medium truncate ${
                        isCompleted ? "text-slate-200" : "text-slate-400"
                      }`}
                    >
                      {item.topic}
                    </span>
                  </div>
                  {isCompleted && (
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-500/20 text-green-300 flex-shrink-0">
                      {item.score}%
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Motivational Message */}
      {completedCount > 0 && (
        <div className="mt-6 pt-6 border-t border-slate-700/50">
          <p className="text-xs text-slate-400 text-center">
            {completedCount < 5
              ? "🚀 Great start! Keep learning consistently."
              : completedCount < 10
                ? "💪 Awesome progress! You're on a roll."
                : "🎯 Excellent dedication! You're mastering Java DSA!"}
          </p>
        </div>
      )}
    </div>
  );
}
