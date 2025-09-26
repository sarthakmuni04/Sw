import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function SignupPage() {
  const { signup } = useAuth()
  const nav = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await signup(name, email, password)
      nav('/')
    } catch (e: any) {
      // Try to fetch server message for better feedback
      try {
        const res = await fetch('/api/auth/signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ name, email, password }) })
        const data = await res.json().catch(() => ({}))
        setError(data?.message || 'Signup failed')
      } catch (_) {
        setError('Signup failed')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={onSubmit} className="card">
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <div className="error">{error}</div>}
        <button disabled={loading}>{loading ? 'Creating…' : 'Create account'}</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  )
}


