'use client'
import { useState, createContext, useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Default credentials for production
const DEFAULT_CREDENTIALS = {
  username: 'admin',
  password: 'iclone2026'
}

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const checkAuth = () => {
    try {
      const authData = localStorage.getItem('iclone_admin_auth')
      if (authData) {
        const { authenticated, expires } = JSON.parse(authData)
        if (authenticated && new Date(expires) > new Date()) {
          setIsAuthenticated(true)
        } else {
          // Session expired
          localStorage.removeItem('iclone_admin_auth')
        }
      }
    } catch (error) {
      console.error('Auth check error:', error)
      localStorage.removeItem('iclone_admin_auth')
    }
    setLoading(false)
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const login = async (username, password) => {
    if (username === DEFAULT_CREDENTIALS.username && password === DEFAULT_CREDENTIALS.password) {
      const authData = {
        authenticated: true,
        loginTime: new Date().toISOString(),
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
      }
      
      localStorage.setItem('iclone_admin_auth', JSON.stringify(authData))
      setIsAuthenticated(true)
      return { success: true }
    } else {
      return { success: false, error: 'Անվաճավոր տվյալք կամ անվաճավոր գաղտնաբառ' }
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('iclone_admin_auth')
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-xl">Բեռնում...</div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
