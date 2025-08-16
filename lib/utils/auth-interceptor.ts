import { AuthService } from './auth-service';

/**
 * Interceptor pour gérer automatiquement les erreurs d'authentification
 */
export class AuthInterceptor {
    private static instance: AuthInterceptor;
    private originalFetch: typeof fetch;

    private constructor() {
        this.originalFetch = window.fetch;
        this.setupFetchInterceptor();
    }

    static getInstance(): AuthInterceptor {
        if (!AuthInterceptor.instance) {
            AuthInterceptor.instance = new AuthInterceptor();
        }
        return AuthInterceptor.instance;
    }

    private setupFetchInterceptor() {
        window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
            // Ajouter automatiquement le token d'authentification si disponible
            const token = AuthService.getToken();

            if (token && init?.headers) {
                const headers = new Headers(init.headers);
                if (!headers.has('Authorization')) {
                    headers.set('Authorization', `Bearer ${token}`);
                }
                init.headers = headers;
            }

            try {
                const response = await this.originalFetch(input, init);

                // Si le token a expiré (401), essayer de le rafraîchir
                if (response.status === 401) {
                    const refreshed = await AuthService.refreshToken();

                    if (refreshed) {
                        // Retry la requête avec le nouveau token
                        const newToken = AuthService.getToken();
                        if (newToken && init?.headers) {
                            const headers = new Headers(init.headers);
                            headers.set('Authorization', `Bearer ${newToken}`);
                            init.headers = headers;
                            return this.originalFetch(input, init);
                        }
                    } else {
                        // Rediriger vers la page de connexion
                        window.location.href = '/login';
                    }
                }

                return response;
            } catch (error) {
                throw error;
            }
        };
    }

    restore() {
        window.fetch = this.originalFetch;
    }
}

// Auto-initialisation si dans le navigateur
if (typeof window !== 'undefined') {
    AuthInterceptor.getInstance();
}
