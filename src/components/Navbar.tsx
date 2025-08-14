import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand">blogs.sh</Link>
        <ul className="nav-links">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/blogs">Blogs</NavLink></li>
          <li><NavLink to="/new">Write</NavLink></li>
          <li><NavLink to="/login">Log in</NavLink></li>
          <li className="accent"><NavLink to="/signup">Create account</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}


