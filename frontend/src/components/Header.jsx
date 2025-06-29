import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../store/slices/authSlice'

const Header = () => {
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <header className="shadow-sm bg-white mb-4">
      <div className="container d-flex justify-content-between align-items-center py-3">
        <Link to="/" className="text-decoration-none text-primary h4 mb-0">Hexlet Chat</Link>
        {user && (
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleLogout}
          >
            Выйти
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
