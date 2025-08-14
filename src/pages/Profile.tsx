import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { BlogCard } from '../components/BlogCard'
import './Profile.css'

type Post = { id: string; title: string; summary: string; created_at: string }

export function Profile() {
  const [username, setUsername] = useState<string>('')
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    let active = true
    ;(async () => {
      const { data: userRes } = await supabase.auth.getUser()
      const user = userRes?.user
      if (!user) return
      const { data: profile } = await supabase.from('profiles').select('username').eq('id', user.id).single()
      if (active && profile?.username) setUsername(profile.username)
      const { data: posts } = await supabase.from('posts').select('id,title,summary,created_at').eq('author_id', user.id).order('created_at', { ascending: false })
      if (active && posts) setPosts(posts as Post[])
    })()
    return () => { active = false }
  }, [])

  return (
    <div className="container profile">
      <h2>{username ? `${username}'s profile` : 'Your profile'}</h2>
      <div className="grid">
        {posts.map(p => (
          <BlogCard key={p.id} id={p.id} title={p.title} summary={p.summary} createdAt={p.created_at} />
        ))}
      </div>
    </div>
  )
}


