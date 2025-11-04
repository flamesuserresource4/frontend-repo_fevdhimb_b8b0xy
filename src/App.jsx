import { useMemo, useState } from "react";
import MinimalHeader from "./components/MinimalHeader";
import LoginForm from "./components/LoginForm";
import ProgressOverview from "./components/ProgressOverview";
import ContentPlayer from "./components/ContentPlayer";

export default function App() {
  // Minimal in-memory state to illustrate the MVP UX without backend calls
  const [user, setUser] = useState(null);
  const [activeModule, setActiveModule] = useState(null);
  const [progress, setProgress] = useState({ completed: [], timeByModule: {} });

  const modules = useMemo(
    () => [
      {
        id: "intro",
        title: "Introduction au parcours DDA",
        type: "text",
        requiredMinutes: 5,
      },
      {
        id: "m1",
        title: "Module 1 – Fondamentaux",
        type: "video",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        requiredMinutes: 10,
      },
      {
        id: "m2",
        title: "Module 2 – Documentation (PDF)",
        type: "pdf",
        src: "",
        requiredMinutes: 8,
      },
      {
        id: "quiz",
        title: "Quiz final (aperçu)",
        type: "text",
        requiredMinutes: 2,
      },
    ],
    []
  );

  const totalRequiredMinutes = useMemo(() => 15 * 60 / 60, []); // 15h target shown in minutes

  const handleLogout = () => {
    setUser(null);
    setProgress({ completed: [], timeByModule: {} });
    setActiveModule(null);
  };

  const handleForgot = () => {
    alert("Un lien de réinitialisation sera envoyé par l'orchestrateur.");
  };

  const openModule = (m) => setActiveModule(m);

  const heartbeat = (deltaSec) => {
    if (!activeModule) return;
    setProgress((p) => ({
      ...p,
      timeByModule: {
        ...p.timeByModule,
        [activeModule.id]: (p.timeByModule?.[activeModule.id] || 0) + deltaSec,
      },
    }));
  };

  const completeModule = (deltaSec) => {
    setProgress((p) => ({
      completed: Array.from(new Set([...(p.completed || []), activeModule.id])),
      timeByModule: {
        ...p.timeByModule,
        [activeModule.id]: (p.timeByModule?.[activeModule.id] || 0) + deltaSec,
      },
    }));
    setActiveModule(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <MinimalHeader user={user} onLogout={handleLogout} />

      <main className="mx-auto max-w-5xl px-4 py-10">
        {!user ? (
          <div className="flex flex-col items-center">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-semibold">Plateforme e-learning DDA</h1>
              <p className="mt-1 text-sm text-gray-600">
                Interface minimaliste, pilotée par orchestrateur, centrée conformité.
              </p>
            </div>
            <LoginForm onSuccess={setUser} onForgotPassword={handleForgot} />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-base font-semibold">Bonjour, {user.name}</h2>
              <p className="mt-1 text-sm text-gray-600">
                Accédez directement à votre parcours. Les modules se débloquent dans l'ordre et le temps actif est suivi.
              </p>
            </div>

            <ProgressOverview
              modules={modules}
              progress={progress}
              totalRequiredMinutes={15 * 60} // display label in minutes
              onOpenModule={openModule}
            />
          </div>
        )}
      </main>

      {activeModule && (
        <ContentPlayer
          module={activeModule}
          trackedSeconds={progress.timeByModule?.[activeModule.id] || 0}
          onClose={() => setActiveModule(null)}
          onHeartbeat={heartbeat}
          onComplete={completeModule}
        />
      )}
    </div>
  );
}
