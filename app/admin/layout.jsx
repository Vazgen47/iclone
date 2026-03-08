'use client'
import { usePathname } from 'next/navigation'
import { AuthProvider, useAuth } from '@/components/admin/AdminAuth'
import AdminLayout from "@/components/admin/AdminLayout";

function AuthenticatedAdminLayout({ children }) {
    const { isAuthenticated, loading } = useAuth()
    const pathname = usePathname()

    // Don't show layout for login page
    if (pathname === '/admin/login') {
        return children
    }

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                <div className="text-white text-xl">Բեռնում...</div>
            </div>
        )
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        if (typeof window !== 'undefined') {
            window.location.href = '/admin/login'
        }
        return null
    }

    return <AdminLayout>{children}</AdminLayout>
}

export default function RootAdminLayout({ children }) {
    return (
        <AuthProvider>
            <AuthenticatedAdminLayout>
                {children}
            </AuthenticatedAdminLayout>
        </AuthProvider>
    );
}
