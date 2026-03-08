'use client'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Defs, LinearGradient, Stop } from 'recharts'

export default function OrdersAreaChart({ allOrders }) {

    // Խմբավորում ենք պատվերները ըստ օրերի
    const ordersPerDay = allOrders.reduce((acc, order) => {
        const date = new Date(order.createdAt).toLocaleDateString('hy-AM', { day: 'numeric', month: 'short' });
        acc[date] = (acc[date] || 0) + 1
        return acc
    }, {})

    // Ձևափոխում ենք Recharts-ի համար հարմար զանգվածի
    const chartData = Object.entries(ordersPerDay).map(([date, count]) => ({
        date,
        orders: count
    }))

    return (
        <div className="w-full h-[350px] bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-slate-900">Պատվերների վիճակագրություն</h3>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Օրական պատվերներ</p>
                </div>
                <div className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                    Live Updates
                </div>
            </div>

            <ResponsiveContainer width="100%" height="80%"> 
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    
                    <XAxis 
                        dataKey="date" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 10 }} 
                        dy={10}
                    />
                    
                    <YAxis 
                        allowDecimals={false} 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 10 }} 
                    />
                    
                    <Tooltip 
                        contentStyle={{ 
                            borderRadius: '16px', 
                            border: 'none', 
                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }}
                        itemStyle={{ color: '#16a34a' }}
                    />
                    
                    <Area 
                        type="monotone" 
                        dataKey="orders" 
                        stroke="#16a34a" 
                        strokeWidth={3} 
                        fillOpacity={1} 
                        fill="url(#colorOrders)" 
                        animationDuration={1500}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}