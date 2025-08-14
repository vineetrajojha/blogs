import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import bg from '../assets/placeholder.png'
import { Button } from '../components/Button'
import './Auth.css'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
  }

  return (
    <div className="auth-grid">
      <div className="auth-left">
        <div className="auth-left-inner">
          <h1>Bonjour!</h1>
          <p className="auth-desc">Pour vous connecter à votre compte, renseignez votre adresse email ainsi que votre mot de passe.</p>
          <form onSubmit={handleLogin} className="auth-form">
            <input type="email" placeholder="Votre adresse email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Votre mot de passe" value={password} onChange={e => setPassword(e.target.value)} required />
            <a className="auth-link" href="#">Mot de passe oublié?</a>
            {error && <p className="error">{error}</p>}
            <Button className="auth-button" type="submit">
              Étape suivante
              <svg className="svg" viewBox="0 0 512 512">
                <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"></path>
              </svg>
            </Button>
          </form>
          <p className="auth-help">N'hesitez pas à nous contacter <a href="mailto:support@bonsante.com">support@bonsante.com</a></p>
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


