import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/lib/utils/auth-service';
import { LoginCredentials, RegisterData } from '@/lib/types/auth';

/**
 * Hook pour gérer l'état d'authentification
 */
export function useAuth() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const login = useCallback(async (credentials: LoginCredentials, rememberMe?: boolean) => {
        setIsLoading(true);
        setError('');

        try {
            const response = await AuthService.login(credentials);

            if (response.success) {
                // Si "se souvenir de moi" n'est pas coché, on peut configurer une expiration plus courte
                // Cette logique peut être ajustée selon vos besoins
                if (rememberMe && typeof window !== 'undefined') {
                    localStorage.setItem('rememberMe', 'true');
                }

                // Redirection vers le dashboard
                router.push('/dashboard');
                return { success: true };
            } else {
                const errorMessage = response.error?.message || 'Erreur lors de la connexion';
                setError(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch {
            const errorMessage = 'Une erreur inattendue s\'est produite';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    const register = useCallback(async (userData: RegisterData) => {
        setIsLoading(true);
        setError('');

        try {
            const response = await AuthService.register(userData);

            if (response.success) {
                // Redirection vers le dashboard après inscription
                router.push('/dashboard');
                return { success: true };
            } else {
                const errorMessage = response.error?.message || 'Erreur lors de l\'inscription';
                setError(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch {
            const errorMessage = 'Une erreur inattendue s\'est produite';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    const logout = useCallback(async () => {
        try {
            await AuthService.logout();
            router.push('/login');
        } catch (err) {
            console.warn('Erreur lors de la déconnexion:', err);
            // Même en cas d'erreur, on redirige vers la page de connexion
            router.push('/login');
        }
    }, [router]);

    const clearError = useCallback(() => {
        setError('');
    }, []);

    return {
        login,
        register,
        logout,
        isLoading,
        error,
        clearError,
        isAuthenticated: AuthService.isAuthenticated(),
        currentUser: AuthService.getCurrentUser(),
    };
}

/**
 * Hook pour la validation des formulaires d'authentification
 */
export function useAuthValidation() {
    const validateEmail = useCallback((email: string): string => {
        if (!email) {
            return "L'email est requis";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return "Email invalide";
        }
        return '';
    }, []);

    const validatePassword = useCallback((password: string): string => {
        if (!password) {
            return "Le mot de passe est requis";
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
            return "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et 8 caractères";
        }
        return '';
    }, []);

    const validateName = useCallback((name: string, fieldName: string): string => {
        if (!name) {
            return `${fieldName} est requis`;
        }
        if (name.length < 2) {
            return `${fieldName} doit contenir au moins 2 caractères`;
        }
        if (name.length > 50) {
            return `${fieldName} ne peut pas dépasser 50 caractères`;
        }
        return '';
    }, []);

    const validateConfirmPassword = useCallback((password: string, confirmPassword: string): string => {
        if (!confirmPassword) {
            return "La confirmation du mot de passe est requise";
        }
        if (password !== confirmPassword) {
            return "Les mots de passe ne correspondent pas";
        }
        return '';
    }, []);

    const getPasswordCriteria = useCallback((password: string) => {
        return {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            digit: /\d/.test(password),
        };
    }, []);

    return {
        validateEmail,
        validatePassword,
        validateName,
        validateConfirmPassword,
        getPasswordCriteria,
    };
}
