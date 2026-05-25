import { useNavigate } from "react-router-dom";

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="flex justify-between items-center px-8 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-purple-600 rounded-md flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2C5.8 2 4 3.8 4 6c0 1.5.8 2.8 2 3.5V11h4V9.5c1.2-.7 2-2 2-3.5 0-2.2-1.8-4-4-4z" fill="white"/>
              <rect x="5.5" y="11.5" width="5" height="1.5" rx="0.75" fill="white"/>
              <rect x="6" y="13.5" width="4" height="1" rx="0.5" fill="white"/>
            </svg>
          </div>
          <span className="text-lg font-semibold text-gray-900">Brainly</span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/signin")}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
          >
            Sign in
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors cursor-pointer"
          >
            Get started
          </button>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-purple-200 text-purple-600 text-xs font-medium px-3 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
            Your second brain, organised
          </div>

          <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-5 tracking-tight">
            Save everything
            <br />
            <span className="text-purple-600">find it later</span>
          </h1>

          <p className="text-lg text-gray-500 mb-10 max-w-md mx-auto leading-relaxed">
            Brainly lets you collect YouTube videos, tweets, links and notes in one place — then share your entire brain with anyone.
          </p>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate("/signup")}
              className="px-6 py-3 text-sm font-medium text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors cursor-pointer"
            >
              Create free account
            </button>
            <button
              onClick={() => navigate("/signin")}
              className="px-6 py-3 text-sm font-medium text-gray-600 border border-gray-200 hover:border-gray-300 hover:text-gray-900 rounded-lg transition-colors cursor-pointer"
            >
              Sign in
            </button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-3 gap-6 max-w-xl w-full">
          {[
            { icon: "🎥", label: "YouTube", desc: "Save videos with context" },
            { icon: "𝕏", label: "Twitter", desc: "Bookmark tweets that matter" },
            { icon: "📝", label: "Notes", desc: "Write and organise ideas" },
          ].map(({ icon, label, desc }) => (
            <div
              key={label}
              className="p-4 rounded-xl border border-gray-100 bg-gray-200 text-left"
            >
              <div className="text-xl mb-2">{icon}</div>
              <div className="text-sm font-medium text-gray-800">{label}</div>
              <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
            </div>
          ))}
        </div>
      </main>

      <footer className="text-center py-6 text-xs text-gray-400">
        Built with React + TypeScript
      </footer>
    </div>
  );
}