// src/components/DoubtChat.jsx
import { useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:8000';

export default function DoubtChat({ currentTopic = '' }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAsk = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setError('');
    setAnswer('');

    try {
      const res = await axios.post(`${API_BASE}/doubt`, {
        doubt: question,
        topic: currentTopic
      });
      setAnswer(res.data.answer);
    } catch (err) {
      console.error(err);
      setError("Sorry, couldn't get an answer right now. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/70 p-6 rounded-xl border border-gray-700">
      <h3 className="text-xl font-semibold text-sky-300 mb-5">
        Ask Your Doubt
      </h3>

      <textarea
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="e.g. Can you explain two-pointer technique with an example?"
        className="w-full h-28 p-4 bg-gray-950 border border-gray-600 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 resize-none text-gray-200"
      />

      <button
        onClick={handleAsk}
        disabled={loading || !question.trim()}
        className="mt-4 px-6 py-3 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition w-full sm:w-auto"
      >
        {loading ? 'Thinking...' : 'Ask AI Tutor'}
      </button>

      {error && (
        <p className="mt-4 text-red-400 text-sm">{error}</p>
      )}

      {answer && (
        <div className="mt-6 p-5 bg-gray-950/80 rounded-lg border border-gray-700">
          <p className="whitespace-pre-wrap text-gray-200 leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}