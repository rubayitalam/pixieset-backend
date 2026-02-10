import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    // Protected routes
    const isAdminRoute = pathname.startsWith('/admin');
    const isDashboardRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/websites') || pathname.startsWith('/profile');
    const isAuthRoute = pathname === '/login' || pathname === '/register';

    if (!token) {
        if (isAdminRoute || isDashboardRoute) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    if (token) {
        if (isAuthRoute) {
            // We don't know the role here easily without decoding the JWT,
            // but for simplicity, we can redirect to /dashboard and let then
            // the client side or layout handle further redirection if admin.
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/dashboard/:path*',
        '/websites/:path*',
        '/profile/:path*',
        '/login',
        '/register',
    ],
};
