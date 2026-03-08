'use client'
import { motion } from 'framer-motion'
import { Package, ShoppingCart, MessageSquare, TrendingUp, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { AuthProvider, useAuth } from '@/components/admin/AdminAuth'
import { createTestProducts } from '@/lib/cleanSlate'

function AdminDashboardContent() {
    const { logout } = useAuth()
    const products = useSelector(state => state.product.list)
    const orders = useSelector(state => state.orders.list)
    const messages = useSelector(state => state.messages?.list || [])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        setTimeout(() => setLoading(false), 500)
    }, [])
    
    // Calculate real stats
    const totalProducts = products.length
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
    const totalOrders = orders.length
    const totalMessages = messages.length
    const recentOrders = orders.slice(-5).reverse()
    const pendingOrders = orders.filter(o => o.status === 'ORDER_PLACED').length
    
    const dashboardCardsData = [
        { 
            title: 'Ապրանքներ', 
            value: totalProducts, 
            icon: Package, 
            color: 'text-blue-500', 
            bg: 'bg-blue-50',
            href: '/admin/products'
        },
        { 
            title: 'Եկամուտ', 
            value: `${totalRevenue.toLocaleString()} ֏`, 
            icon: TrendingUp, 
            color: 'text-green-500', 
            bg: 'bg-green-50',
            href: '/admin/orders'
        },
        { 
            title: 'Պատվերներ', 
            value: totalOrders, 
            icon: ShoppingCart, 
            color: 'text-purple-500', 
            bg: 'bg-purple-50',
            href: '/admin/orders'
        },
        { 
            title: 'Հաղորդագրություններ', 
            value: totalMessages, 
            icon: MessageSquare, 
            color: 'text-orange-500', 
            bg: 'bg-orange-50',
            href: '/admin/messages'
        },
    ]
    
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
                    <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">IClone EVN Կառավարում</h1>
                    <button onClick={logout} className="px-6 py-3 bg-slate-900 text-white rounded-xl font-black uppercase tracking-wider hover:bg-slate-800 transition-colors">Ելք</button>
                </div>

                {/* Welcome Message */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-green-600 to-slate-900 rounded-2xl p-8 text-white mb-8"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-black mb-2">Բարջավեղ, Արտյոմ</h2>
                            <p className="text-green-100">Կառավարումը թարմանային է՝ {new Date().toLocaleDateString('hy-AM', { weekday: 'long' })}</p>
                        </div>
                        <div className="text-4xl text-green-100">👋</div>
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {dashboardCardsData.map((card, index) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className={`${card.bg} rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300`}
                        >
                            <Link href={card.href} className="block">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-medium text-slate-600">{card.title}</h3>
                                    <div className={`p-2 rounded-lg ${card.bg}`}>
                                        <card.icon size={20} className={card.color} />
                                    </div>
                                </div>
                                <p className={`text-3xl font-black ${card.color}`}>{card.value}</p>
                                {card.href !== '/admin/products' && (
                                    <div className="flex items-center gap-2 mt-2 text-sm text-slate-600">
                                        <span>Դիտել ավելիք</span>
                                        <ArrowRight size={16} />
                                    </div>
                                )}
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Recent Orders */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-2xl p-8 shadow-lg"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-black text-slate-900">Վերջին Պայմանակներ</h3>
                        <Link 
                            href="/admin/orders" 
                            className="text-green-600 font-bold hover:text-green-700 transition-colors flex items-center gap-2"
                        >
                            Տեստ բոլորը
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                    
                    {recentOrders.length === 0 ? (
                        <div className="text-center py-12">
                            <ShoppingCart size={48} className="text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-600">Դեռ պատվերատվություններ չկան</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {recentOrders.map((order, index) => (
                                <motion.div 
                                    key={order.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors"
                                >
                                    <div className="flex-1">
                                        <p className="font-medium text-slate-900">Պայմանակ #{order.id}</p>
                                        <p className="text-sm text-slate-600">
                                            {order.items?.length || 0} ապրանք • {order.total.toLocaleString()} ֏
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            order.status === 'DELIVERED' ? 'bg-green-100 text-green-600' :
                                            order.status === 'SHIPPED' ? 'bg-purple-100 text-purple-600' :
                                            order.status === 'PROCESSING' ? 'bg-yellow-100 text-yellow-600' :
                                            'bg-blue-100 text-blue-600'
                                        }`}>
                                            {order.status === 'DELIVERED' ? 'Հասցվեց է' :
                                             order.status === 'SHIPPED' ? 'Ուղափոխանքվեց է' :
                                             order.status === 'PROCESSING' ? 'Մշակվում է' :
                                             'Ստացվեց է'}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Quick Actions */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white text-center shadow-lg"
                    >
                        <h3 className="text-lg font-black mb-2">Նոր Ապրանք</h3>
                        <Link 
                            href="/admin/products" 
                            className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors"
                        >
                            <Package size={20} />
                            Ստեղծագրել
                        </Link>
                    </motion.div>
                    
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-6 text-white text-center shadow-lg"
                    >
                        <h3 className="text-lg font-black mb-2">Կարգավարում</h3>
                        <p className="text-green-100 mb-4">{pendingOrders} Սպասացված պատվերատվություններ</p>
                        <Link 
                            href="/admin/orders" 
                            className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors"
                        >
                            <TrendingUp size={20} />
                            Տեստ բոլորը
                        </Link>
                    </motion.div>
                    
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        onClick={() => {
                            const testProducts = createTestProducts()
                            window.location.reload()
                        }}
                        className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-6 text-white text-center shadow-lg cursor-pointer"
                    >
                        <h3 className="text-lg font-black mb-2">Տեստ Ապրանք</h3>
                        <p className="text-orange-100 mb-4">Լրացնել 3 թեստային ապրանքներ</p>
                        <div className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-bold">
                            <Package size={20} />
                            <span>Ստեղծագրել</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default function AdminDashboard() {
    return (
        <AuthProvider>
            <AdminDashboardContent />
        </AuthProvider>
    )
}
