import { useState } from "react";
import { User, Lock } from "lucide-react";

export default function LoginForm({ onSuccess, onForgotPassword }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate a minimal login flow (no backend calls in this MVP UI scaffold)
    setTimeout(() => {
      setLoading(false);
      if (email && password) {
        const isAdmin = email.toLowerCase().includes("admin");
        onSuccess({
          id: isAdmin ? "admin-1" : "user-1",
          role: isAdmin ? "admin" : "learner",
          name: isAdmin ? "Admin" : "Apprenant",
          email,
        });
      } else {
        setError("Identifiants invalides");
      }
    }, 600);
  };

  return (
    <div className="w-full max-w-sm mx-auto rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="text-lg font-semibold text-gray-900 mb-1">Connexion</h1>
      <p className="text-sm text-gray-500 mb-6">Accéder à votre parcours DDA</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="email"
            className="w-full rounded-md border border-gray-300 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="password"
            className="w-full rounded-md border border-gray-300 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-70"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>

      <button
        onClick={onForgotPassword}
        className="mt-4 w-full text-center text-xs text-gray-500 hover:text-gray-700"
      >
        Mot de passe oublié ?
      </button>
    </div>
  );
}
