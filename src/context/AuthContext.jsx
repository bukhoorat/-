import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('zaren-admin-token'))
  const [username, setUsername] = useState(() => localStorage.getItem('zaren-admin-user'))

  const login = useCallback((newToken, user) => {
    setToken(newToken)
    setUsername(user)
    localStorage.setItem('zaren-admin-token', newToken)
    localStorage.setItem('zaren-admin-user', user)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUsername(null)
    localStorage.removeItem('zaren-admin-token')
    localStorage.removeItem('zaren-admin-user')
  }, [])

  return (
    <AuthContext.Provider value={{ token, username, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
