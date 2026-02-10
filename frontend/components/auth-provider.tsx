"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api, { setUnauthorizedCallback } from '@/lib/api';

interface User {
    id: string;
    email: string;
    role: 'ADMIN' | 'USER';
    name?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    login: () => { },
    logout: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchUser = async () => {
        try {
            console.log('Fetching current user session...');
            const res = await api.get('/auth/me');
            if (res.data) {
                console.log('Session restored for:', res.data.email);
                setUser(res.data);
            }
        } catch (error: any) {
            console.log('No active session found or session expired');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleUnauthorized = () => {
            console.log('AuthProvider: Global 401 captured. Clearing user state.');
            setUser(null);

            // Redirect to login if on a protected route
            if (typeof window !== 'undefined') {
                const pathname = window.location.pathname;
                const isPublicPage = pathname === '/' || pathname === '/login' || pathname === '/register' || pathname.startsWith('/preview') || pathname.startsWith('/[username]');
                if (!isPublicPage) {
                    router.push('/login');
                }
            }
        };

        setUnauthorizedCallback(handleUnauthorized);
        fetchUser();
    }, [router]);

    // Redirection check for protected pages when user is not logged in
    useEffect(() => {
        if (!loading && !user) {
            if (typeof window !== 'undefined') {
                const pathname = window.location.pathname;
                const isPublicPage = pathname === '/' || pathname === '/login' || pathname === '/register' || pathname.startsWith('/preview') || (pathname.length > 1 && !pathname.includes('/dashboard') && !pathname.includes('/admin') && !pathname.includes('/profile') && !pathname.includes('/websites'));
                // Note: the last condition is a broad guess for public username pages if they are at the root

                // Simpler approach: exactly check protected patterns
                const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/admin') || pathname.startsWith('/profile') || pathname.startsWith('/websites');

                if (isProtectedRoute) {
                    console.log('AuthProvider: Path is protected and no user found. Redirecting to login.');
                    router.push('/login');
                }
            }
        }
    }, [user, loading, router]);

    const login = (userData: User) => {
        console.log('AuthProvider: Logging in user:', userData.email, 'Role:', userData.role);
        setUser(userData);

        // Ensure redirection happens after state update
        if (userData.role === 'ADMIN') {
            console.log('Redirecting to admin dashboard');
            router.push('/admin/dashboard');
        } else {
            console.log('Redirecting to user dashboard');
            router.push('/dashboard');
        }
    };

    const logout = async () => {
        console.log('AuthProvider: Logging out...');
        try {
            await api.post('/auth/logout');
            setUser(null);
            router.push('/login');
        } catch (error) {
            console.error('Logout failed', error);
            // Fallback: clear state anyway
            setUser(null);
            router.push('/login');
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
