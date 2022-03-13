import { Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'

export const RequireAuth: React.FC = ({ children }) => {
    let { query, user } = useAuth()
    if (query && !user) return <Navigate to="/" replace />
    return <>{children}</>
}