import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/login'
    },
    providers: [],
    callbacks: {
        authorized({auth, request: {nextUrl}}) {
            const isLoggedIn = !!auth?.user;
            const isDashboard = nextUrl.pathname.startsWith('/dashboard');

            if(isDashboard) {
                if(isLoggedIn) return true
                return false
            } else if(isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl))
            }

            return true
        }
    }
} satisfies NextAuthConfig