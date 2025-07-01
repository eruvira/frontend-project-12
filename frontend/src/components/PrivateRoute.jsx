import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user)

  if (!user || !user.token) {
    return <Navigate to="/login" />
  }

  return children
}

export default PrivateRoute
