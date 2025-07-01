import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../store/slices/authSlice'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const user = useSelector(state => state.auth.user)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <header className="shadow-sm bg-white mb-4">
      <div className="container d-flex justify-content-between align-items-center py-3">
        <Link to="/" className="text-decoration-none text-primary h4 mb-0">
          {t('nav.logo')}
        </Link>
        {user && (
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleLogout}
          >
            {t('nav.logout')}
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
