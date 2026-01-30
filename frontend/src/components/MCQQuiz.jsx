// src/components/MCQQuiz.jsx
import { useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:8000";

export default function MCQQuiz({ mcqs = [], topic, onRefresh }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [answered, setAnswered] = useState({}); // Track which questions have been answered

  const handleSelect = (questionIndex, optionLetter) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionIndex]: optionLetter }));
    setAnswered((prev) => ({ ...prev, [questionIndex]: true })); // Mark as answered
  };

  const calculateScore = () => {
    let correct = 0;
    mcqs.forEach((q, i) => {
      if (answers[i] === q.correct) correct++;
    });
    return Math.round((correct / mcqs.length) * 100);
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < mcqs.length) {
      alert("Please answer all questions");
      return;
    }

    setSubmitting(true);
    const percentage = calculateScore();

    try {
      await axios.post(`${API_BASE}/progress`, {
        topic,
        status: "completed",
        score: percentage,
      });
      setScore(percentage);
      setSubmitted(true);
      // Don't call onRefresh here to keep questions visible
    } catch (err) {
      console.error(err);
      alert("Failed to save progress. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!mcqs?.length) {
    return (
      <div className="bg-slate-800/40 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 text-center">
        <p className="text-slate-400 text-lg">Loading practice questions...</p>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.keys(answers).reduce((count, idx) => {
    return mcqs[idx]?.correct === answers[idx] ? count + 1 : count;
  }, 0);

  return (
    <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/40 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-slate-700/50 shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">✓</span>
        </div>
        <div>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">
            Practice & Assess
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-white">
            {mcqs.length} Questions
          </h3>
        </div>
      </div>

      {/* Progress Bar */}
      {!submitted && (
        <div className="mb-8 pb-6 border-b border-slate-700/50">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-slate-400">Progress</span>
            <span className="text-sm font-semibold text-green-400">
              {answeredCount}/{mcqs.length}
            </span>
          </div>
          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${(answeredCount / mcqs.length) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Questions */}
      {mcqs.map((q, index) => (
        <div
          key={index}
          className="mb-8 pb-8 border-b border-slate-700/50 last:border-0 last:pb-0"
        >
          {/* Question Header */}
          <div className="flex items-start gap-4 mb-5">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-lg border border-blue-500/30 flex-shrink-0">
              <span className="text-blue-300 font-bold text-sm">
                {index + 1}
              </span>
            </div>
            <p className="text-slate-200 font-medium text-lg leading-relaxed">
              {q.question}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3 ml-12">
            {q.options.map((opt, optIndex) => {
              const letter = String.fromCharCode(65 + optIndex); // A, B, C, D
              const isSelected = answers[index] === letter;
              const isCorrect = letter === q.correct;
              const isAnswered = answered[index];

              let bgClass =
                "bg-slate-800/40 hover:bg-slate-700/40 border-slate-700/50 hover:border-slate-600/70";
              let textClass = "text-slate-300";
              let ringClass = "";

              if (submitted) {
                if (isCorrect) {
                  bgClass =
                    "bg-green-900/20 border-green-500/50 hover:bg-green-900/30";
                  textClass = "text-slate-200";
                } else if (isSelected && !isCorrect) {
                  bgClass = "bg-red-900/20 border-red-500/50";
                  textClass = "text-slate-200";
                } else {
                  bgClass = "bg-slate-800/40 border-slate-700/50";
                  textClass = "text-slate-400";
                }
              } else {
                if (isSelected) {
                  bgClass =
                    "bg-blue-900/30 border-blue-500/70 hover:bg-blue-900/40";
                  textClass = "text-white";
                  ringClass = "ring-2 ring-blue-500/50";
                }
              }

              return (
                <div key={optIndex}>
                  <button
                    onClick={() => handleSelect(index, letter)}
                    disabled={submitted}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-200 border flex items-start gap-3 
                      ${bgClass} ${ringClass} ${submitted ? "cursor-default" : "cursor-pointer"}`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-sm
                      ${
                        submitted
                          ? isCorrect
                            ? "border-green-500 bg-green-500/20 text-green-400"
                            : isSelected && !isCorrect
                              ? "border-red-500 bg-red-500/20 text-red-400"
                              : "border-slate-600 text-slate-500"
                          : isSelected
                            ? "border-blue-500 bg-blue-500/20 text-blue-300"
                            : "border-slate-600 text-slate-500"
                      }`}
                    >
                      {letter}
                    </span>
                    <span className={`text-base leading-relaxed ${textClass}`}>
                      {opt}
                    </span>
                  </button>

                  {/* Immediate Feedback after selection (only for submitted) */}
                  {submitted && isSelected && (
                    <div
                      className={`mt-2 ml-10 text-sm font-semibold flex items-center gap-2 ${isCorrect ? "text-green-400" : "text-red-400"}`}
                    >
                      <span className="text-lg">
                        {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Explanation */}
          {submitted && (
            <div className="mt-6 ml-12 p-4 bg-slate-900/40 rounded-lg border border-slate-700/50">
              <p className="text-sm text-slate-400 mb-2 font-semibold uppercase tracking-wide">
                💡 Explanation
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                {q.explanation}
              </p>
            </div>
          )}
        </div>
      ))}

      {/* Footer Actions */}
      <div className="mt-8 pt-6 border-t border-slate-700/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
        {!submitted ? (
          <>
            <div className="flex gap-4">
              <div className="text-center">
                <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
                  Answered
                </p>
                <p className="text-lg font-bold text-green-400">
                  {answeredCount}/{mcqs.length}
                </p>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              disabled={submitting || answeredCount < mcqs.length}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 
                disabled:from-slate-700 disabled:to-slate-700 disabled:opacity-50 disabled:cursor-not-allowed 
                rounded-lg font-semibold text-white transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {submitting ? "Saving Progress..." : "Submit Answers"}
            </button>
          </>
        ) : (
          <>
            <div className="text-center">
              <p className="text-slate-400 text-sm mb-2">Your Score</p>
              <div className="text-4xl font-bold">
                <span
                  className={
                    score >= 70
                      ? "text-green-400"
                      : score >= 50
                        ? "text-yellow-400"
                        : "text-red-400"
                  }
                >
                  {score}%
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-2">
                {correctCount}/{mcqs.length} correct
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-medium transition-all duration-200"
            >
              Load Next Lesson
            </button>
          </>
        )}
      </div>
    </div>
  );
}
