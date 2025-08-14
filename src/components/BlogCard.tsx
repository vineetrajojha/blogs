import './BlogCard.css'

type BlogCardProps = {
  id: string
  title: string
  summary: string
  author?: string
  createdAt?: string
}

export function BlogCard({ title, summary, author, createdAt }: BlogCardProps) {
  return (
    <article className="blog-card">
      <h3>{title}</h3>
      <p className="muted">{summary}</p>
      <div className="meta">
        {author && <span>{author}</span>}
        {createdAt && <span> · {new Date(createdAt).toLocaleDateString()}</span>}
      </div>
    </article>
  )
}


