import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/login' || path === '/signup';

    const token = request.cookies.get('token')?.value || "";

    // !if user is logged in
    if (isPublicPath && token.length > 1) {

        return NextResponse.redirect(new URL('/', request.nextUrl))
    }
    // !if user is not logged in
    else if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

}


// !matcher
export const config = {
    matcher: [
        '/',
        '/profile/:path*',
        '/login',
        '/signup',
    ]
}