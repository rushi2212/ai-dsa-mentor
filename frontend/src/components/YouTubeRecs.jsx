// src/components/YouTubeRecs.jsx
export default function YouTubeRecs({ topic = '' }) {
  if (!topic) return null;

  const cleanTopic = topic.replace(/\s+/g, '+');

  const recommendations = [
    {
      title: "Striver's Explanation",
      url: `https://www.youtube.com/results?search_query=striver+${cleanTopic}+dsa`
    },
    {
      title: "NeetCode",
      url: `https://www.youtube.com/results?search_query=neetcode+${cleanTopic}`
    },
    {
      title: "take U forward",
      url: `https://www.youtube.com/results?search_query=take+U+forward+${cleanTopic}`
    },
    {
      title: "Abdul Bari (classic)",
      url: `https://www.youtube.com/results?search_query=abdul+bari+${cleanTopic}`
    }
  ];

  return (
    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
      <h3 className="text-lg font-semibold text-amber-300 mb-5">
        Recommended YouTube Videos
      </h3>

      <ul className="space-y-3">
        {recommendations.map((rec, i) => (
          <li key={i}>
            <a
              href={rec.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sky-400 hover:text-sky-300 transition group"
            >
              <span className="mr-3 text-gray-500 group-hover:text-sky-400">→</span>
              {rec.title}
            </a>
          </li>
        ))}
      </ul>

      <p className="text-xs text-gray-500 mt-5 italic">
        Best channels for DSA: Striver, NeetCode, take U forward, Abdul Bari, Kunal Kushwaha
      </p>
    </div>
  );
}