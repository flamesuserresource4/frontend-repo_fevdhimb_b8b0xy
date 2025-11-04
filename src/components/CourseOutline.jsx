import { Lock, PlayCircle } from 'lucide-react'

export default function CourseOutline({ modules, activeId, onSelect }) {
  return (
    <div className="bg-white rounded-xl border p-4">
      <h2 className="text-sm font-semibold text-gray-900 mb-3">Parcours</h2>
      <ol className="space-y-2">
        {modules.map((m, idx) => {
          const isActive = m.id === activeId
          const isLocked = m.locked
          const done = m.completed
          return (
            <li key={m.id}>
              <button
                disabled={isLocked}
                onClick={() => onSelect(m.id)}
                className={`w-full flex items-center gap-3 rounded-lg border px-3 py-2 text-left transition ${
                  isActive ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:bg-gray-50'
                } ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="shrink-0">
                  {isLocked ? (
                    <Lock className="h-4 w-4 text-gray-500" />
                  ) : (
                    <PlayCircle className={`h-4 w-4 ${done ? 'text-green-600' : 'text-gray-700'}`} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{idx + 1}. {m.title}</div>
                  <div className="text-xs text-gray-500">Minimum requis: {Math.ceil(m.requiredSeconds / 60)} min</div>
                </div>
                {done && <span className="text-xs font-medium text-green-700">Terminé</span>}
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
