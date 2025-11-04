import { useEffect, useMemo, useRef, useState } from "react";
import { X, Clock, Check, FileText, Video } from "lucide-react";

export default function ContentPlayer({ module, trackedSeconds = 0, onClose, onComplete, onHeartbeat }) {
  const [seconds, setSeconds] = useState(0);
  const [focused, setFocused] = useState(true);
  const [playing, setPlaying] = useState(module.type !== "video" ? true : false);
  const [watchedPercent, setWatchedPercent] = useState(0);
  const intervalRef = useRef(null);
  const videoRef = useRef(null);

  const minSeconds = useMemo(() => (module.requiredMinutes || 0) * 60, [module]);
  const meetTime = seconds + trackedSeconds >= minSeconds;
  const meetVideo = module.type !== "video" || watchedPercent >= 90;
  const canComplete = meetTime && meetVideo;

  // Focus tracking
  useEffect(() => {
    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  // Heartbeat timer: only count while focused and (playing for video)
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const eligible = focused && (module.type === "video" ? playing : true);
      if (eligible) {
        setSeconds((s) => s + 1);
        if (onHeartbeat) onHeartbeat(1);
      }
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [focused, playing, module.type, onHeartbeat]);

  // Video progress tracking
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const update = () => {
      const pct = v.duration ? (v.currentTime / v.duration) * 100 : 0;
      setWatchedPercent(Math.min(100, Math.floor(pct)));
    };
    v.addEventListener("timeupdate", update);
    return () => v.removeEventListener("timeupdate", update);
  }, [module.src]);

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="mx-auto flex h-full max-w-5xl flex-col">
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <div>
            <h3 className="text-base font-semibold text-gray-900">{module.title}</h3>
            <p className="text-xs text-gray-500">
              Minimum requis: {module.requiredMinutes}m{module.type === "video" ? ", 90% de visionnage" : ""}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md border border-gray-200 bg-white p-2 text-gray-600 hover:bg-gray-50"
            aria-label="Fermer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="relative flex-1 overflow-hidden">
          {module.type === "video" ? (
            <div className="h-full w-full flex items-center justify-center bg-black">
              <video
                ref={videoRef}
                src={module.src}
                className="h-full max-h-full w-full object-contain bg-black"
                controls
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
              />
            </div>
          ) : (
            <div className="h-full w-full overflow-auto p-8">
              <article className="prose prose-sm max-w-none">
                {module.type === "pdf" ? (
                  <div className="flex h-full min-h-[60vh] w-full items-center justify-center rounded-lg border border-dashed p-8 text-gray-500">
                    <FileText className="mr-2 h-5 w-5" /> Aperçu PDF factice (intégration lecteur à connecter)
                  </div>
                ) : (
                  <div className="space-y-4 text-gray-700">
                    <h4 className="text-lg font-semibold">{module.title}</h4>
                    <p>
                      Contenu textuel d'exemple pour simuler une lecture. Faites défiler et
                      restez sur la page pour que le temps actif soit comptabilisé conformément aux exigences de conformité.
                    </p>
                    <p>
                      Cette zone accueillera le contenu pédagogique (texte, images, schémas). Le comptage du temps ne progresse
                      que lorsque l'onglet est actif.
                    </p>
                  </div>
                )}
              </article>
            </div>
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/80 to-transparent h-24" />
        </div>

        <div className="border-t border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-700">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-4 w-4" /> {Math.floor((seconds + trackedSeconds) / 60)}m suivis
            </span>
            {module.type === "video" && (
              <span className="inline-flex items-center gap-1">
                <Video className="h-4 w-4" /> {watchedPercent}% visionné
              </span>
            )}
          </div>

          <button
            onClick={() => canComplete && onComplete(seconds)}
            disabled={!canComplete}
            className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium ${
              canComplete
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Check className="h-4 w-4" /> Marquer comme terminé
          </button>
        </div>
      </div>
    </div>
  );
}
