// Types pour l'authentification
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
}

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface AuthResponse {
    user: User;
    token: string;
    refreshToken?: string;
}

export interface ApiError {
    message: string;
    code?: string;
    details?: Record<string, string>;
}

export interface ApiResponse<T = any> {
    data?: T;
    error?: ApiError;
    success: boolean;
}
