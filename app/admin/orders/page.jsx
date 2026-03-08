'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { Package, Truck, CheckCircle, Clock, Search, Filter, ArrowRight } from 'lucide-react'
import { AuthProvider, useAuth } from '@/components/admin/AdminAuth'

function AdminOrdersContent() {
    const { logout } = useAuth()
    const orders = useSelector(state => state.orders.list)
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    
    useEffect(() => {
        setTimeout(() => setLoading(false), 500)
    }, [])
    
    const getStatusIcon = (status) => {
        switch (status) {
            case 'ORDER_PLACED':
                return <Clock size={20} className="text-blue-600" />
            case 'PROCESSING':
                return <Package size={20} className="text-yellow-600" />
            case 'SHIPPED':
                return <Truck size={20} className="text-purple-600" />
            case 'DELIVERED':
                return <CheckCircle size={20} className="text-green-600" />
            default:
                return <Clock size={20} className="text-slate-600" />
        }
    }
    
    const getStatusText = (status) => {
        switch (status) {
            case 'ORDER_PLACED':
                return 'Ստացվեց է'
            case 'PROCESSING':
                return 'Մշակվում է'
            case 'SHIPPED':
                return 'Ուղափոխանքվեց է'
            case 'DELIVERED':
                return 'Հասցվեց է'
            default:
                return 'Գործընթակվում է'
        }
    }
    
    const handleStatusToggle = async (orderId, newStatus) => {
        try {
            const allOrders = getOrders()
            const updatedOrders = allOrders.map(order => 
                order.id === orderId ? { ...order, status: newStatus } : order
            )
            localStorage.setItem('iclone_orders', JSON.stringify(updatedOrders))
            
            // Update Redux store
            dispatch({ type: 'orders/setOrders', payload: updatedOrders })
            
            console.log('📋 Order status updated:', orderId, newStatus)
        } catch (error) {
            console.error('Error updating order status:', error)
            alert('Սխալ պատվերատվության կարգավորում')
        }
    }
    
    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            order.items?.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter
        return matchesSearch && matchesStatus
    })
    
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
    const totalOrders = orders.length
    
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
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Պայմանակների կառավարում</h1>
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
                                <p className="text-sm text-slate-600 mb-1">Ընդհաման պատվերատվություններ</p>
                                <p className="text-3xl font-black text-slate-900">{totalOrders}</p>
                            </div>
                            <Package size={32} className="text-green-600" />
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
                                <p className="text-sm text-slate-600 mb-1">Ընդհաման եկամուտ</p>
                                <p className="text-3xl font-black text-slate-900">{totalRevenue.toLocaleString()} ֏</p>
                            </div>
                            <div className="text-blue-600 text-2xl font-bold">֏</div>
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
                                <p className="text-sm text-slate-600 mb-1">Միջին պատվերատվություններ</p>
                                <p className="text-3xl font-black text-slate-900">
                                    {orders.filter(o => o.status === 'ORDER_PLACED').length}
                                </p>
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
                            placeholder="Փնտրել պատվերատվություններ..." 
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
                        <option value="all">Բոլոր կարգավորները</option>
                        <option value="ORDER_PLACED">Ստացվեց է</option>
                        <option value="PROCESSING">Մշակվում է</option>
                        <option value="SHIPPED">Ուղափոխանքվեց է</option>
                        <option value="DELIVERED">Հասցվեց է</option>
                    </select>
                </div>

                {/* Orders List */}
                {filteredOrders.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20"
                    >
                        <Package size={64} className="text-slate-300 mx-auto mb-6" />
                        <h3 className="text-xl font-black text-slate-900 mb-4">Պայմանակներ չեն գտնվել</h3>
                        <p className="text-slate-600">Փորձեք փոխեք որոնումները կամ փորձեք</p>
                    </motion.div>
                ) : (
                    <div className="space-y-6">
                        {filteredOrders.map((order, index) => (
                            <motion.div 
                                key={order.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                            >
                                {/* Order Header */}
                                <div className="bg-slate-900 text-white p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-slate-400 mb-1">Պայմանակ #{order.id}</p>
                                            <p className="text-lg font-black">{order.total.toLocaleString()} ֏</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getStatusIcon(order.status)}
                                            <span className="font-bold">{getStatusText(order.status)}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Order Details */}
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Items */}
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-3">Ապրանքներ ({order.items?.length || 0})</h4>
                                            <div className="space-y-2">
                                                {order.items?.slice(0, 3).map((item, itemIndex) => (
                                                    <div key={itemIndex} className="flex gap-3 text-sm">
                                                        <img 
                                                            src={item.images?.[0] || '/placeholder-product.jpg'} 
                                                            alt={item.name} 
                                                            className="w-12 h-12 object-cover rounded-lg" 
                                                        />
                                                        <div className="flex-1">
                                                            <p className="font-medium text-slate-900">{item.name}</p>
                                                            <p className="text-slate-600">{item.price.toLocaleString()} ֏ × {item.quantity}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                                {order.items?.length > 3 && (
                                                    <p className="text-slate-600 text-sm">+{order.items.length - 3} այլ ապրանք...</p>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {/* Customer Info */}
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-3">Հաճատարի տվյալներ</h4>
                                            {order.address && (
                                                <div className="space-y-1 text-sm">
                                                    <p className="font-medium">{order.address.name}</p>
                                                    <p className="text-slate-600">{order.address.street}</p>
                                                    <p className="text-slate-600">{order.address.city}, {order.address.phone}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 pt-4 border-t border-slate-200">
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs text-slate-500">
                                                Պայմանակը ստացվել է՝ {new Date(order.createdAt).toLocaleString('hy-AM')}
                                            </p>
                                            <div className="flex gap-2">
                                                {order.status !== 'DELIVERED' && (
                                                    <button 
                                                        onClick={() => handleStatusToggle(order.id, 'DELIVERED')}
                                                        className="px-3 py-1 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700 transition-colors"
                                                    >
                                                        Հասցվեց է
                                                    </button>
                                                )}
                                                {order.status === 'ORDER_PLACED' && (
                                                    <button 
                                                        onClick={() => handleStatusToggle(order.id, 'PROCESSING')}
                                                        className="px-3 py-1 bg-yellow-600 text-white rounded-lg text-xs font-medium hover:bg-yellow-700 transition-colors"
                                                    >
                                                        Մշակվում
                                                    </button>
                                                )}
                                                {order.status === 'PROCESSING' && (
                                                    <button 
                                                        onClick={() => handleStatusToggle(order.id, 'SHIPPED')}
                                                        className="px-3 py-1 bg-purple-600 text-white rounded-lg text-xs font-medium hover:bg-purple-700 transition-colors"
                                                    >
                                                        Ուղափոխանքել
                                                    </button>
                                                )}
                                            </div>
                                        </div>
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

export default function AdminOrders() {
    return (
        <AuthProvider>
            <AdminOrdersContent />
        </AuthProvider>
    )
}
