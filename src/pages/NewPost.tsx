import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { SaveButton } from '../components/SaveButton'
import './NewPost.css'

export function NewPost() {
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setMessage(null)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return setError('Please log in to create a post.')
    const { error } = await supabase.from('posts').insert({ title, summary, content, author_id: user.id })
    if (error) setError(error.message)
    else setMessage('Post published!')
  }

  return (
    <div className="container new-post">
      <h2>Write a blog</h2>
      <form onSubmit={handleCreate} className="form">
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <input placeholder="Summary" value={summary} onChange={e => setSummary(e.target.value)} required />
        <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} rows={10} required />
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <SaveButton type="submit" />
      </form>
    </div>
  )
}


