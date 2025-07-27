// Application constants
export const APP_NAME = 'HelpDesk Pro'
export const APP_VERSION = '1.0.0'
export const APP_DESCRIPTION = 'Solution complète de support technique et services IT'

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
export const API_TIMEOUT = 30000 // 30 seconds

// Authentication
export const AUTH_TOKEN_KEY = 'auth_token'
export const REFRESH_TOKEN_KEY = 'refresh_token'
export const USER_DATA_KEY = 'user_data'

// Routes
export const ROUTES = {
    // Public routes
    HOME: '/',
    SERVICES: '/services',
    CONTACT: '/contact',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',

    // Private routes
    DASHBOARD: '/dashboard',
    TICKETS: '/dashboard/tickets',
    NEW_TICKET: '/dashboard/tickets/new',
    TICKET_DETAIL: (id: string) => `/dashboard/tickets/${id}`,
    STATS: '/dashboard/stats',
    PROFILE: '/dashboard/profile',
    SETTINGS: '/dashboard/settings',
    HELP: '/dashboard/help',
    KNOWLEDGE: '/dashboard/knowledge',
    MESSAGES: '/dashboard/messages',
    NOTIFICATIONS: '/dashboard/notifications',
    ACTIVITY: '/dashboard/activity'
} as const

// Ticket Status Labels
export const TICKET_STATUS_LABELS = {
    'open': 'Ouvert',
    'in-progress': 'En cours',
    'waiting-for-customer': 'En attente client',
    'resolved': 'Résolu',
    'closed': 'Fermé'
} as const

// Ticket Priority Labels
export const TICKET_PRIORITY_LABELS = {
    'low': 'Basse',
    'medium': 'Moyenne',
    'high': 'Haute',
    'critical': 'Critique'
} as const

// Ticket Category Labels
export const TICKET_CATEGORY_LABELS = {
    'helpdesk': 'HelpDesk',
    'cloud': 'Cloud',
    'infrastructure': 'Infrastructure',
    'network': 'Réseau',
    'security': 'Sécurité',
    'development': 'Développement',
    'other': 'Autre'
} as const

// Service Categories
export const SERVICE_CATEGORIES = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary'
} as const

// Company Size Options
export const COMPANY_SIZE_OPTIONS = [
    '1-10 employés',
    '11-50 employés',
    '51-200 employés',
    '201-500 employés',
    '500+ employés'
] as const

// Urgency Levels
export const URGENCY_LEVELS = [
    { value: 'low', label: 'Faible - Sous 1 semaine', color: 'success' },
    { value: 'medium', label: 'Moyenne - Sous 3 jours', color: 'warning' },
    { value: 'high', label: 'Élevée - Sous 24h', color: 'danger' },
    { value: 'critical', label: 'Critique - Immédiat', color: 'danger' }
] as const

// Date Formats
export const DATE_FORMATS = {
    SHORT: 'DD/MM/YYYY',
    LONG: 'DD MMMM YYYY',
    WITH_TIME: 'DD/MM/YYYY HH:mm',
    TIME_ONLY: 'HH:mm',
    RELATIVE: 'relative' // for "il y a X minutes"
} as const

// Pagination
export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    LIMITS: [10, 25, 50, 100]
} as const

// File Upload
export const FILE_UPLOAD = {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_TYPES: [
        'image/jpeg',
        'image/png',
        'image/gif',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/plain'
    ],
    MAX_FILES: 5
} as const

// Validation Rules
export const VALIDATION = {
    PASSWORD_MIN_LENGTH: 8,
    PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_REGEX: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{3,6}$/
} as const

// Error Messages
export const ERROR_MESSAGES = {
    REQUIRED: 'Ce champ est requis',
    INVALID_EMAIL: 'Email invalide',
    INVALID_PHONE: 'Numéro de téléphone invalide',
    PASSWORD_TOO_SHORT: 'Le mot de passe doit contenir au moins 8 caractères',
    PASSWORD_TOO_WEAK: 'Le mot de passe doit contenir des majuscules, minuscules, chiffres et caractères spéciaux',
    PASSWORDS_NOT_MATCH: 'Les mots de passe ne correspondent pas',
    TERMS_REQUIRED: 'Vous devez accepter les conditions d\'utilisation',
    GENERIC_ERROR: 'Une erreur est survenue. Veuillez réessayer.',
    NETWORK_ERROR: 'Erreur de connexion. Vérifiez votre connexion internet.',
    UNAUTHORIZED: 'Vous n\'êtes pas autorisé à effectuer cette action',
    SESSION_EXPIRED: 'Votre session a expiré. Veuillez vous reconnecter.'
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
    TICKET_CREATED: 'Ticket créé avec succès',
    TICKET_UPDATED: 'Ticket mis à jour avec succès',
    TICKET_RESOLVED: 'Ticket marqué comme résolu',
    PROFILE_UPDATED: 'Profil mis à jour avec succès',
    PASSWORD_CHANGED: 'Mot de passe modifié avec succès',
    MESSAGE_SENT: 'Message envoyé avec succès',
    SETTINGS_SAVED: 'Paramètres sauvegardés'
} as const

// Chart Colors
export const CHART_COLORS = {
    primary: '#0070F3',
    secondary: '#00D9FF',
    success: '#17C964',
    warning: '#F5A524',
    danger: '#F31260',
    default: '#969696'
} as const

// Notification Settings
export const NOTIFICATION_DURATION = 5000 // 5 seconds

// Cache Keys
export const CACHE_KEYS = {
    USER_PROFILE: 'user_profile',
    TICKETS: 'tickets',
    STATS: 'dashboard_stats',
    NOTIFICATIONS: 'notifications',
    KNOWLEDGE_BASE: 'knowledge_base'
} as const

// Local Storage Keys
export const STORAGE_KEYS = {
    THEME: 'theme',
    LANGUAGE: 'language',
    SIDEBAR_COLLAPSED: 'sidebar_collapsed',
    RECENT_SEARCHES: 'recent_searches'
} as const