import { NextRequest, NextResponse } from 'next/server';

// Routes qui nécessitent une authentification
const protectedRoutes = ['/dashboard'];

// Routes publiques (qui redirigent si déjà connecté)
const authRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Récupérer le token depuis les cookies (si vous l'utilisez) ou localStorage côté client
    const token = request.cookies.get('auth_token')?.value;

    // Vérifier si la route est protégée
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    );

    // Vérifier si c'est une route d'authentification
    const isAuthRoute = authRoutes.some(route =>
        pathname.startsWith(route)
    );

    // Si c'est une route protégée et qu'il n'y a pas de token, rediriger vers login
    if (isProtectedRoute && !token) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Si c'est une route d'auth et qu'il y a un token, rediriger vers dashboard
    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

// Configuration du matcher pour appliquer le middleware seulement aux routes nécessaires
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
    ],
};
