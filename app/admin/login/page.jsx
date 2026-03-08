'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock, Eye, EyeOff, LogIn } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Default credentials for production
const DEFAULT_CREDENTIALS = {
  username: 'admin',
  password: 'iclone2026'
}

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  // Check if already authenticated
  useEffect(() => {
    const authData = localStorage.getItem('iclone_admin_auth')
    if (authData) {
      try {
        const { expires } = JSON.parse(authData)
        if (new Date(expires) > new Date()) {
          router.push('/admin')
        }
      } catch (error) {
        console.error('Auth check error:', error)
      }
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validate credentials
    if (username === DEFAULT_CREDENTIALS.username && password === DEFAULT_CREDENTIALS.password) {
      // Set authentication cookie/session
      const authData = {
        authenticated: true,
        loginTime: new Date().toISOString(),
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
      }
      
      localStorage.setItem('iclone_admin_auth', JSON.stringify(authData))
      
      // Redirect to admin dashboard
      setTimeout(() => {
        router.push('/admin')
      }, 500)
    } else {
      setError('Անվաճավոր տվյալք կամ անվաճավոր')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="w-full max-w-md"
      >
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4"
          >
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
              <Shield size={24} className="text-white" />
            </div>
            <h1 className="text-3xl font-black text-white">
              <span className="text-green-600">I</span>Clone
              <span className="text-slate-300">EVN</span>
            </h1>
          </motion.div>
          <p className="text-slate-400 text-sm mt-2">Ադմինիստրատիվ կառավարում</p>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-2xl p-8 border border border-slate-200"
        >
          <div className="text-center mb-6">
            <LogIn size={48} className="text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-slate-900 mb-2">Ադմինիստրատիվ Մուտքել</h2>
            <p className="text-slate-600">Մուտքեք մուտքեք ձեր հաշվակի հաշվակի համարը</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Մածանուն</label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-slate-50"
                  placeholder="Մուտքեք մածանուն"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Գաղտնաբառ</label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-slate-50"
                  placeholder="Գաղտնաբառ"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-black uppercase tracking-wider hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Մուտքեք...</span>
                </>
              ) : (
                <>
                  <Shield size={20} />
                  <span>Մուտքել</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Default Credentials Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 p-4 bg-slate-50 rounded-xl text-xs text-slate-600"
          >
            <p className="font-medium mb-1">Տեստային մուտքեք (ժամային):</p>
            <div className="space-y-1">
              <p><span className="font-mono bg-slate-200 px-2 py-1 rounded">Մածանուն:</span> admin</p>
              <p><span className="font-mono bg-slate-200 px-2 py-1 rounded">Գաղտնաբառ:</span> iclone2026</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
