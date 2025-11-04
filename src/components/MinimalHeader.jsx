import { LogOut } from 'lucide-react'

export default function MinimalHeader({ user, totalSeconds, requiredSeconds, onLogout }) {
  const progress = Math.min(100, Math.floor((totalSeconds / requiredSeconds) * 100))

  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600)
    const m = Math.floor((secs % 3600) / 60)
    return `${h}h ${m.toString().padStart(2, '0')}m`
  }

  return (
    <header className="w-full border-b bg-white/80 backdrop-blur sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded bg-black" />
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Plateforme DDA</span>
            <span className="font-semibold text-gray-900">Parcours 15h</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-sm text-gray-700">
            {formatTime(totalSeconds)} / {formatTime(requiredSeconds)}
          </div>
          <div className="w-36 sm:w-56 h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-gray-900 rounded"
              style={{ width: `${progress}%` }}
            />
          </div>
          {user && (
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
