import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import bg from '../assets/placeholder.png'
import './Auth.css'

export function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    setError(null)
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) return setError(error.message)

    const userId = data.user?.id
    if (userId) {
      await supabase.from('profiles').insert({ id: userId, username })
    }
    setMessage('Check your email to confirm your account.')
  }

  return (
    <div className="auth-grid">
      <div className="auth-left">
        <div className="auth-left-inner">
          <h1>Bonjour!</h1>
          <p className="auth-desc">Pour créer votre compte, renseignez votre email, mot de passe et votre nom d'utilisateur.</p>
          <form onSubmit={handleSignUp} className="auth-form">
            <input placeholder="Nom d'utilisateur" value={username} onChange={e => setUsername(e.target.value)} required />
            <input type="email" placeholder="Votre adresse email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Votre mot de passe" value={password} onChange={e => setPassword(e.target.value)} required />
            {error && <p className="error">{error}</p>}
            {message && <p className="success">{message}</p>}
            <button className="auth-button" type="submit">Créer le compte</button>
          </form>
          <p className="auth-help">Besoin d'aide? <a href="mailto:support@bonsante.com">support@bonsante.com</a></p>
        </div>
      </div>

      <div className="auth-right" style={{ backgroundImage: `url(${bg})` }}>
        <div className="auth-overlay">
          <div className="auth-badge" />
          <h3 className="overlay-title">Precision medicine is the new gold standard for cancer treatment</h3>
          <p className="overlay-text">The resulting interactive report includes updated information about approved or investigational treatments for each patient.</p>
        </div>
      </div>
    </div>
  )
}


