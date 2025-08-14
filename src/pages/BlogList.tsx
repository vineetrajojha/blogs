import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { BlogCard } from '../components/BlogCard'
import './BlogList.css'

type ProfileRel = { username: string } | { username: string }[] | null
type Blog = { id: string; title: string; summary: string; created_at: string; profiles?: ProfileRel }

export function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    let active = true
    ;(async () => {
      const { data } = await supabase
        .from('posts')
        .select('id,title,summary,created_at,profiles(username)')
        .order('created_at', { ascending: false })
        .limit(12)
      if (active && data) setBlogs(data as unknown as Blog[])
    })()
    return () => { active = false }
  }, [])

  return (
    <div className="container blog-list">
      <h2>Latest blogs</h2>
      <div className="grid">
        {blogs.map(b => {
          const author = Array.isArray(b.profiles) ? b.profiles[0]?.username : b.profiles?.username
          return (
            <BlogCard key={b.id} id={b.id} title={b.title} summary={b.summary} author={author} createdAt={b.created_at} />
          )
        })}
      </div>
    </div>
  )
}


