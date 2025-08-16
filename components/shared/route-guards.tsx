import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/lib/utils/auth-service";

interface ProtectedRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
}

/**
 * Composant pour protéger les routes nécessitant une authentification
 */
export function ProtectedRoute({
    children,
    redirectTo = "/login",
}: ProtectedRouteProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const authenticated = AuthService.isAuthenticated();

                if (!authenticated) {
                    // Tenter de rafraîchir le token
                    const refreshed = await AuthService.refreshToken();

                    if (!refreshed) {
                        router.push(redirectTo);
                        return;
                    }
                }

                setIsAuthenticated(true);
            } catch (error) {
                console.warn(
                    "Erreur lors de la vérification d'authentification:",
                    error
                );
                router.push(redirectTo);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [router, redirectTo]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}

interface PublicRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
}

/**
 * Composant pour les routes publiques (login, register) qui redirigent si déjà connecté
 */
export function PublicRoute({
    children,
    redirectTo = "/dashboard",
}: PublicRouteProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const authenticated = AuthService.isAuthenticated();

            if (authenticated) {
                router.push(redirectTo);
                return;
            }

            setShouldRender(true);
            setIsLoading(false);
        };

        checkAuth();
    }, [router, redirectTo]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!shouldRender) {
        return null;
    }

    return <>{children}</>;
}
