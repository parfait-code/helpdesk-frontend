import { ApiResponse, ApiError } from '@/lib/types/auth';

// Configuration de l'API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// Types d'erreurs HTTP
const HTTP_STATUS = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
    NETWORK_ERROR: 0,
} as const;

// Configuration par défaut pour fetch
const defaultFetchOptions: RequestInit = {
    headers: {
        'Content-Type': 'application/json',
    },
};

/**
 * Utilitaire pour les appels API avec gestion d'erreurs et retry
 */
class ApiClient {
    private baseUrl: string;
    private defaultOptions: RequestInit;

    constructor(baseUrl: string = API_BASE_URL) {
        this.baseUrl = baseUrl;
        this.defaultOptions = {
            ...defaultFetchOptions,
        };
    }

    /**
     * Gestion centralisée des erreurs API
     */
    private handleApiError(status: number, message: string): ApiError {
        switch (status) {
            case HTTP_STATUS.BAD_REQUEST:
                return { message: 'Données invalides', code: 'INVALID_DATA' };
            case HTTP_STATUS.UNAUTHORIZED:
                return { message: 'Session expirée, veuillez vous reconnecter', code: 'UNAUTHORIZED' };
            case HTTP_STATUS.FORBIDDEN:
                return { message: 'Accès non autorisé', code: 'FORBIDDEN' };
            case HTTP_STATUS.NOT_FOUND:
                return { message: 'Ressource non trouvée', code: 'NOT_FOUND' };
            case HTTP_STATUS.INTERNAL_ERROR:
                return { message: 'Erreur serveur, veuillez réessayer', code: 'SERVER_ERROR' };
            case HTTP_STATUS.NETWORK_ERROR:
                return { message: 'Erreur de connexion, vérifiez votre réseau', code: 'NETWORK_ERROR' };
            default:
                return { message: message || 'Une erreur inattendue s\'est produite', code: 'UNKNOWN_ERROR' };
        }
    }

    /**
     * Méthode de base pour les requêtes avec retry et timeout
     */
    private async request<T>(
        endpoint: string,
        options: RequestInit = {},
        retries: number = 2
    ): Promise<ApiResponse<T>> {
        const url = `${this.baseUrl}${endpoint}`;
        const controller = new AbortController();

        // Timeout de 10 secondes
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        try {
            const response = await fetch(url, {
                ...this.defaultOptions,
                ...options,
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            const contentType = response.headers.get('content-type');
            let data: unknown;

            if (contentType?.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text();
            } if (!response.ok) {
                // Si c'est une erreur 5xx et qu'il reste des tentatives, retry
                if (response.status >= 500 && retries > 0) {
                    await new Promise(resolve => setTimeout(resolve, 1000)); // Délai d'1 seconde
                    return this.request(endpoint, options, retries - 1);
                }

                const error = this.handleApiError(
                    response.status,
                    (data as { message?: string })?.message || String(data)
                );
                return { success: false, error };
            }

            return { success: true, data: data as T };
        } catch (err) {
            clearTimeout(timeoutId);

            if (err instanceof Error) {
                if (err.name === 'AbortError') {
                    return {
                        success: false,
                        error: { message: 'La requête a pris trop de temps', code: 'TIMEOUT' }
                    };
                }

                // Retry pour les erreurs réseau
                if (retries > 0 && (err.message.includes('fetch') || err.message.includes('network'))) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    return this.request(endpoint, options, retries - 1);
                }
            }

            return {
                success: false,
                error: this.handleApiError(HTTP_STATUS.NETWORK_ERROR, 'Erreur de connexion')
            };
        }
    }

    /**
     * GET request
     */
    async get<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { ...options, method: 'GET' });
    }

    /**
     * POST request
     */
    async post<T>(endpoint: string, data?: Record<string, unknown>, options?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    /**
     * PUT request
     */
    async put<T>(endpoint: string, data?: Record<string, unknown>, options?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        });
    }    /**
     * DELETE request
     */
    async delete<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { ...options, method: 'DELETE' });
    }

    /**
     * Définir les headers d'authentification
     */
    setAuthHeader(token: string) {
        this.defaultOptions.headers = {
            ...this.defaultOptions.headers,
            Authorization: `Bearer ${token}`,
        };
    }

    /**
     * Supprimer les headers d'authentification
     */
    clearAuthHeader() {
        const headers = this.defaultOptions.headers as Record<string, string>;
        delete headers.Authorization;
        this.defaultOptions.headers = headers;
    }
}

// Instance singleton de l'API client
export const apiClient = new ApiClient();

// Export du type pour usage externe
export type { ApiResponse, ApiError };
