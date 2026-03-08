'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { getMessages } from '@/lib/storage'
import { Mail, Phone, User, Search, Filter, Reply, Trash2, CheckCircle, Clock } from 'lucide-react'
import { AuthProvider, useAuth } from '@/components/admin/AdminAuth'

function AdminMessagesContent() {
    const { logout } = useAuth()
    const messages = useSelector(state => state.messages?.list || getMessages())
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    
    useEffect(() => {
        setTimeout(() => setLoading(false), 500)
    }, [])
    
    const filteredMessages = messages.filter(message => {
        const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            message.subject.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'all' || message.status === statusFilter
        return matchesSearch && matchesStatus
    })
    
    const totalMessages = messages.length
    const unreadMessages = messages.filter(m => m.status === 'unread').length
    
    const handleMarkAsRead = (messageId) => {
        const allMessages = getMessages()
        const updatedMessages = allMessages.map(msg => 
            msg.id === messageId ? { ...msg, status: 'read' } : msg
        )
        localStorage.setItem('iclone_messages', JSON.stringify(updatedMessages))
        window.location.reload()
    }
    
    const handleDelete = (messageId) => {
        if (confirm('Համոզված եք, որ ուզում եք ջնջել այս հաղորակը?')) {
            const allMessages = getMessages()
            const updatedMessages = allMessages.filter(msg => msg.id !== messageId)
            localStorage.setItem('iclone_messages', JSON.stringify(updatedMessages))
            window.location.reload()
        }
    }
    
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }
    
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Հաճատարների Հարցեր</h1>
                    <button onClick={logout} className="px-6 py-3 bg-slate-900 text-white rounded-xl font-black uppercase tracking-wider hover:bg-slate-800 transition-colors">Ելք</button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-600"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600 mb-1">Ընդհաման հաղորակներ</p>
                                <p className="text-3xl font-black text-slate-900">{totalMessages}</p>
                            </div>
                            <Mail size={32} className="text-green-600" />
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-600"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600 mb-1">Չկարդած հաղորակներ</p>
                                <p className="text-3xl font-black text-slate-900">{unreadMessages}</p>
                            </div>
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">!</span>
                            </div>
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-purple-600"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600 mb-1">Պատասացման պատաս</p>
                                <p className="text-3xl font-black text-slate-900">24 ժամ</p>
                            </div>
                            <Clock size={32} className="text-purple-600" />
                        </div>
                    </motion.div>
                </div>

                {/* Filters */}
                <div className="flex flex-col lg:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Փնտրել հաղորակներ..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 w-full" 
                        />
                    </div>
                    <select 
                        value={statusFilter} 
                        onChange={(e) => setStatusFilter(e.target.value)} 
                        className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                    >
                        <option value="all">Բոլոր հաղորակները</option>
                        <option value="unread">Չկարդած</option>
                        <option value="read">Կարդած</option>
                    </select>
                </div>

                {/* Messages List */}
                {filteredMessages.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20"
                    >
                        <Mail size={64} className="text-slate-300 mx-auto mb-6" />
                        <h3 className="text-xl font-black text-slate-900 mb-4">Հաղորակներ չեն գտնվել</h3>
                        <p className="text-slate-600">Փորձեք փոխեք որոնումները կամ փորձեք</p>
                    </motion.div>
                ) : (
                    <div className="space-y-6">
                        {filteredMessages.map((message, index) => (
                            <motion.div 
                                key={message.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
                                    message.status === 'unread' ? 'border-l-4 border-blue-600' : ''
                                }`}
                            >
                                {/* Message Header */}
                                <div className="bg-slate-900 text-white p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <p className="text-sm text-slate-400 mb-1">Ուղարակիչ</p>
                                            <p className="text-lg font-black truncate">{message.subject}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {message.status === 'unread' && (
                                                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                                            )}
                                            <span className="text-sm text-slate-400">
                                                {new Date(message.createdAt).toLocaleDateString('hy-AM')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Message Content */}
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                        {/* Customer Info */}
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                                <User size={16} className="text-green-600" />
                                                Հաճատարի Տվյալք
                                            </h4>
                                            <div className="space-y-1 text-sm">
                                                <p className="font-medium text-slate-900">{message.name}</p>
                                                <p className="text-slate-600">{message.email}</p>
                                                <p className="text-slate-600">{message.phone}</p>
                                            </div>
                                        </div>
                                        
                                        {/* Message Preview */}
                                        <div className="md:col-span-2">
                                            <h4 className="font-bold text-slate-900 mb-3">Հաղորակի բովանակը</h4>
                                            <p className="text-slate-600 text-sm line-clamp-3">
                                                {message.message}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Actions */}
                                    <div className="flex gap-3 pt-4 border-t border-slate-200">
                                        <button 
                                            onClick={() => handleMarkAsRead(message.id)}
                                            disabled={message.status === 'read'}
                                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <CheckCircle size={16} />
                                            Նշակել կարդած
                                        </button>
                                        
                                        <button 
                                            onClick={() => handleDelete(message.id)}
                                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                            Ջնջել
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default function AdminMessages() {
    return (
        <AuthProvider>
            <AdminMessagesContent />
        </AuthProvider>
    )
}
