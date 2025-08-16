import { apiClient, ApiResponse } from '@/lib/utils/api-client';
import { LoginCredentials, RegisterData, AuthResponse } from '@/lib/types/auth';

/**
 * Service d'authentification avec gestion du cache et localStorage
 */
export class AuthService {
    private static readonly TOKEN_KEY = 'auth_token';
    private static readonly REFRESH_TOKEN_KEY = 'refresh_token';
    private static readonly USER_KEY = 'user_data';

    /**
     * Connexion utilisateur
     */
    static async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
        try {
            // Utiliser les routes API Next.js pour éviter les problèmes CORS
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // Normaliser la réponse backend: certains services renvoient `accessToken` au lieu de `token`
                const token = result.data?.token || result.data?.accessToken || result.data?.access_token;
                const user = result.data?.user || result.data?.userData || result.data?.data || null;
                const refreshToken = result.data?.refreshToken || result.data?.refresh_token;

                const authPayload = {
                    token,
                    user,
                    refreshToken,
                } as AuthResponse;

                // Stocker les données d'authentification normalisées
                this.storeAuthData(authPayload);

                // Configurer le header d'authentification pour les requêtes futures si token présent
                if (token) {
                    apiClient.setAuthHeader(token);
                }

                return { success: true, data: authPayload };
            } else {
                // Si c'est un timeout et en développement, simuler une connexion réussie
                if (result.message?.includes('Timeout') && process.env.NODE_ENV === 'development') {
                    return this.simulateSuccessfulLogin(credentials);
                }

                return {
                    success: false,
                    error: {
                        message: result.message || 'Erreur lors de la connexion',
                        code: 'LOGIN_ERROR'
                    }
                };
            }
        } catch {
            // En mode développement, simuler une connexion réussie si les services ne répondent pas
            if (process.env.NODE_ENV === 'development') {
                return this.simulateSuccessfulLogin(credentials);
            }

            return {
                success: false,
                error: {
                    message: 'Erreur lors de la connexion',
                    code: 'LOGIN_ERROR'
                }
            };
        }
    }

    /**
     * Simuler une connexion réussie (mode développement seulement)
     */
    private static simulateSuccessfulLogin(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
        console.warn('⚠️ Mode développement: Simulation d\'une connexion réussie');

        // Simuler un token JWT simple (non sécurisé, uniquement pour le développement)
        const mockToken = btoa(JSON.stringify({
            email: credentials.email,
            exp: Math.floor(Date.now() / 1000) + 3600, // Expire dans 1 heure
            iat: Math.floor(Date.now() / 1000)
        }));

        const mockAuthData: AuthResponse = {
            token: mockToken,
            user: {
                id: '1',
                email: credentials.email,
                name: 'Utilisateur Test',
                role: 'user'
            },
            refreshToken: 'mock-refresh-token'
        };

        // Stocker les données d'authentification
        this.storeAuthData(mockAuthData);
        apiClient.setAuthHeader(mockAuthData.token);

        return Promise.resolve({ success: true, data: mockAuthData });
    }

    /**
     * Inscription utilisateur
     */
    static async register(userData: RegisterData): Promise<ApiResponse<AuthResponse>> {
        try {
            // Utiliser les routes API Next.js pour éviter les problèmes CORS
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                const token = result.data?.token || result.data?.accessToken || result.data?.access_token;
                const user = result.data?.user || result.data?.userData || result.data?.data || null;
                const refreshToken = result.data?.refreshToken || result.data?.refresh_token;

                const authPayload = {
                    token,
                    user,
                    refreshToken,
                } as AuthResponse;

                this.storeAuthData(authPayload);
                if (token) {
                    apiClient.setAuthHeader(token);
                }

                return { success: true, data: authPayload };
            } else {
                return {
                    success: false,
                    error: {
                        message: result.message || 'Erreur lors de l\'inscription',
                        code: 'REGISTER_ERROR'
                    }
                };
            }
        } catch {
            return {
                success: false,
                error: {
                    message: 'Erreur lors de l\'inscription',
                    code: 'REGISTER_ERROR'
                }
            };
        }
    }

    /**
     * Déconnexion utilisateur
     */
    static async logout(): Promise<void> {
        try {
            // Optionnel: appel API pour invalider le token côté serveur
            // await apiClient.post('/auth/logout');
        } catch (error) {
            console.warn('Erreur lors de la déconnexion côté serveur:', error);
        } finally {
            // Nettoyer les données locales
            this.clearAuthData();
            apiClient.clearAuthHeader();
        }
    }

    /**
     * Vérifier si l'utilisateur est connecté
     */
    static isAuthenticated(): boolean {
        if (typeof window === 'undefined') return false; // SSR safety

        const token = localStorage.getItem(this.TOKEN_KEY);
        return !!token && !this.isTokenExpired(token);
    }

    /**
     * Obtenir le token d'authentification
     */
    static getToken(): string | null {
        if (typeof window === 'undefined') return null; // SSR safety

        const token = localStorage.getItem(this.TOKEN_KEY);

        if (token && this.isTokenExpired(token)) {
            this.clearAuthData();
            return null;
        }

        return token;
    }

    /**
     * Obtenir les données utilisateur
     */
    static getCurrentUser() {
        if (typeof window === 'undefined') return null; // SSR safety

        try {
            const userData = localStorage.getItem(this.USER_KEY);
            return userData ? JSON.parse(userData) : null;
        } catch {
            return null;
        }
    }

    /**
     * Stocker les données d'authentification
     */
    private static storeAuthData(authData: AuthResponse): void {
        if (typeof window === 'undefined') return; // SSR safety

        try {
            // Normalize user object
            const user = authData.user || {};
            const normalizedUser = {
                id: user.id || user.userId || user._id || null,
                firstName: user.firstName || user.first_name || (user.name ? user.name.split(' ')[0] : '') || '',
                lastName: user.lastName || user.last_name || (user.name ? user.name.split(' ').slice(1).join(' ') : '') || '',
                name: user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || '',
                email: user.email || user.mail || user.username || '',
                role: user.role || user.roles || null,
                // keep original payload if needed
                raw: user
            };

            localStorage.setItem(this.TOKEN_KEY, authData.token || '');
            localStorage.setItem(this.USER_KEY, JSON.stringify(normalizedUser));

            if (authData.refreshToken) {
                localStorage.setItem(this.REFRESH_TOKEN_KEY, authData.refreshToken);
            }

            // Stocker aussi le token dans un cookie pour le middleware
            this.setCookie(this.TOKEN_KEY, authData.token, 7); // 7 jours d'expiration

            // Vérification rapide (debug) : s'assurer que le cookie est bien présent
            if (process.env.NODE_ENV === 'development') {
                const c = this.getCookie(this.TOKEN_KEY);
                if (!c) {
                    console.warn('Le cookie auth_token n\'a pas pu être lu immédiatement après sa création.');
                }
            }
        } catch (error) {
            console.warn('Erreur lors du stockage des données d\'authentification:', error);
        }
    }

    /**
     * Nettoyer les données d'authentification
     */
    private static clearAuthData(): void {
        if (typeof window === 'undefined') return; // SSR safety

        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.REFRESH_TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);

        // Supprimer aussi le cookie
        this.deleteCookie(this.TOKEN_KEY);
    }

    /**
     * Vérifier si le token est expiré
     */
    private static isTokenExpired(token: string): boolean {
        try {
            // Décoder le JWT pour vérifier l'expiration
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Date.now() / 1000;

            return payload.exp < currentTime;
        } catch {
            // Si on ne peut pas décoder le token, on considère qu'il est invalide
            return true;
        }
    }

    /**
     * Actualiser le token d'authentification
     */
    static async refreshToken(): Promise<boolean> {
        if (typeof window === 'undefined') return false; // SSR safety

        const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);

        if (!refreshToken) {
            return false;
        }

        try {
            const response = await apiClient.post<AuthResponse>('/auth/refresh', {
                refreshToken
            });

            if (response.success && response.data) {
                this.storeAuthData(response.data);
                apiClient.setAuthHeader(response.data.token);
                return true;
            }
        } catch (error) {
            console.warn('Erreur lors du refresh du token:', error);
        }

        this.clearAuthData();
        return false;
    }

    /**
     * Initialiser l'authentification au chargement de l'application
     */
    static initAuth(): void {
        if (typeof window === 'undefined') return; // SSR safety

        const token = this.getToken();
        if (token) {
            apiClient.setAuthHeader(token);
        }
    }

    /**
     * Définir un cookie
     */
    private static setCookie(name: string, value: string, days: number): void {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        // encoder la valeur pour éviter les caractères interdits dans les cookies
        const encodedValue = encodeURIComponent(value);
        let cookie = `${name}=${encodedValue};expires=${expires.toUTCString()};path=/;samesite=lax`;
        // Ajoute secure seulement en production
        if (window.location.protocol === 'https:') {
            cookie += ';secure';
        }
        document.cookie = cookie;
    }

    /**
     * Supprimer un cookie
     */
    private static deleteCookie(name: string): void {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
    }

    /**
     * Lire un cookie côté client (utilitaire debug)
     */
    static getCookie(name: string): string | null {
        if (typeof window === 'undefined') return null;
        const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
        return match ? decodeURIComponent(match[1]) : null;
    }
}

// Auto-initialisation lors de l'import
if (typeof window !== 'undefined') {
    AuthService.initAuth();
}
