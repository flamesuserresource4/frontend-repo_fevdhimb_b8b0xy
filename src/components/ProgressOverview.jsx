import { CheckCircle2, Lock, Play, Clock } from "lucide-react";

export default function ProgressOverview({ modules, progress, totalRequiredMinutes, onOpenModule }) {
  const totalSeconds = Object.values(progress.timeByModule || {}).reduce((acc, v) => acc + (v || 0), 0);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const remaining = Math.max(totalRequiredMinutes - totalMinutes, 0);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">Votre parcours</h2>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Clock className="h-4 w-4" />
            <span>
              {totalMinutes}m / {totalRequiredMinutes}m
            </span>
            {remaining > 0 && (
              <span className="ml-2 text-xs text-gray-500">reste {remaining}m</span>
            )}
          </div>
        </div>

        <ul className="space-y-3">
          {modules.map((m, idx) => {
            const locked = idx > 0 && !progress.completed.includes(modules[idx - 1].id);
            const completed = progress.completed.includes(m.id);
            return (
              <li
                key={m.id}
                className={`flex items-center justify-between rounded-lg border px-4 py-3 ${
                  completed ? "border-green-200 bg-green-50" : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  {completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : locked ? (
                    <Lock className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Play className="h-5 w-5 text-indigo-600" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{m.title}</p>
                    <p className="text-xs text-gray-500">
                      Minimum: {m.requiredMinutes}m {m.type === "video" ? "+ 90% vidéo" : "de lecture"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">
                    {(Math.floor((progress.timeByModule?.[m.id] || 0) / 60))}m suivis
                  </span>
                  <button
                    disabled={locked || completed}
                    onClick={() => onOpenModule(m)}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium ${
                      locked || completed
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                  >
                    {completed ? "Terminé" : locked ? "Verrouillé" : "Ouvrir"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
