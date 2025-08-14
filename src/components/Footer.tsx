import './Footer.css'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Blogs. All rights reserved.</p>
      </div>
    </footer>
  )
}


