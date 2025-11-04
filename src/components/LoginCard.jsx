import { useState } from 'react'
import { Lock } from 'lucide-react'

export default function LoginCard({ onLogin, onForgot }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    // MVP front-only: simple local validation
    setTimeout(() => {
      setLoading(false)
      if (email && password) {
        onLogin({ id: 'demo-user', email })
      } else {
        setError("Identifiants invalides")
      }
    }, 600)
  }

  return (
    <div className="max-w-sm w-full bg-white shadow-lg rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-9 w-9 rounded bg-black flex items-center justify-center">
          <Lock className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Connexion</h1>
          <p className="text-sm text-gray-600">Accédez à votre parcours DDA</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
            autoComplete="username"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
            autoComplete="current-password"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 text-white rounded-md py-2 font-medium hover:bg-black transition disabled:opacity-60"
        >
          {loading ? 'Connexion…' : 'Se connecter'}
        </button>
        <button
          type="button"
          onClick={onForgot}
          className="w-full text-sm text-gray-600 underline underline-offset-4 hover:text-gray-900"
        >
          Mot de passe oublié ?
        </button>
      </form>
    </div>
  )
}
