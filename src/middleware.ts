import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware function to handle authentication redirects
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const publicPaths = ['/login', '/signup', '/verifyemail'];
    const isPublicPath = publicPaths.includes(path);
    const token = request.cookies.get('token');

    // Redirect authenticated users away from public paths
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Redirect unauthenticated users to login page from protected paths
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // If no redirection is needed, allow the request to proceed
    return NextResponse.next();
}

// Matcher configuration to specify which paths the middleware should apply to
export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
        '/profile/:path*',
        '/verifyemail'
    ]
}
