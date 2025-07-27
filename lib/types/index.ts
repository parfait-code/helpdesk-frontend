// User Types
export interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    company?: string
    phone?: string
    role: 'client' | 'admin' | 'support'
    avatar?: string
    createdAt: Date
    updatedAt: Date
}

// Ticket Types
export interface Ticket {
    id: string
    title: string
    description: string
    status: TicketStatus
    priority: TicketPriority
    category: TicketCategory
    userId: string
    assignedTo?: string
    createdAt: Date
    updatedAt: Date
    resolvedAt?: Date
    messages: TicketMessage[]
    attachments?: Attachment[]
}

export type TicketStatus = 'open' | 'in-progress' | 'waiting-for-customer' | 'resolved' | 'closed'
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical'
export type TicketCategory = 'helpdesk' | 'cloud' | 'infrastructure' | 'network' | 'security' | 'development' | 'other'

export interface TicketMessage {
    id: string
    ticketId: string
    userId: string
    message: string
    isInternal: boolean
    attachments?: Attachment[]
    createdAt: Date
}

export interface Attachment {
    id: string
    name: string
    url: string
    size: number
    type: string
}

// Statistics Types
export interface DashboardStats {
    openTickets: number
    inProgressTickets: number
    resolvedTickets: number
    averageResolutionTime: number // in hours
    firstContactResolutionRate: number // percentage
    customerSatisfactionRate: number // 1-5 scale
    slaComplianceRate: number // percentage
}

export interface TicketStats {
    total: number
    byStatus: Record<TicketStatus, number>
    byPriority: Record<TicketPriority, number>
    byCategory: Record<TicketCategory, number>
    trendsData: TrendData[]
}

export interface TrendData {
    date: string
    created: number
    resolved: number
}

// Service Types
export interface Service {
    id: string
    name: string
    description: string
    category: 'primary' | 'secondary'
    icon: string
    features: string[]
    isActive: boolean
}

// Notification Types
export interface Notification {
    id: string
    userId: string
    type: NotificationType
    title: string
    message: string
    relatedId?: string // ticket ID, message ID, etc.
    read: boolean
    createdAt: Date
}

export type NotificationType = 'ticket' | 'message' | 'system' | 'update' | 'reminder'

// Activity Types
export interface Activity {
    id: string
    userId: string
    action: ActivityAction
    targetType: 'ticket' | 'user' | 'system'
    targetId: string
    metadata?: Record<string, any>
    createdAt: Date
}

export type ActivityAction =
    | 'ticket.created'
    | 'ticket.updated'
    | 'ticket.assigned'
    | 'ticket.resolved'
    | 'ticket.closed'
    | 'ticket.reopened'
    | 'message.sent'
    | 'user.login'
    | 'user.logout'
    | 'user.updated'

// API Response Types
export interface ApiResponse<T> {
    success: boolean
    data?: T
    error?: ApiError
    pagination?: Pagination
}

export interface ApiError {
    code: string
    message: string
    field?: string
}

export interface Pagination {
    page: number
    limit: number
    total: number
    totalPages: number
}

// Form Types
export interface LoginForm {
    email: string
    password: string
    rememberMe: boolean
}

export interface RegisterForm {
    firstName: string
    lastName: string
    email: string
    phone?: string
    company?: string
    password: string
    confirmPassword: string
    acceptTerms: boolean
    newsletter: boolean
}

export interface TicketForm {
    title: string
    description: string
    category: TicketCategory
    priority: TicketPriority
    attachments?: File[]
}

export interface ContactForm {
    firstName: string
    lastName: string
    email: string
    phone?: string
    company?: string
    companySize?: string
    service: string
    urgency: 'low' | 'medium' | 'high' | 'critical'
    message: string
    acceptTerms: boolean
    newsletter: boolean
}

// Filter Types
export interface TicketFilters {
    status?: TicketStatus[]
    priority?: TicketPriority[]
    category?: TicketCategory[]
    dateRange?: {
        start: Date
        end: Date
    }
    search?: string
    assignedTo?: string
}

// Settings Types
export interface UserSettings {
    notifications: {
        email: boolean
        push: boolean
        ticketUpdates: boolean
        newsletter: boolean
    }
    theme: 'light' | 'dark' | 'system'
    language: 'fr' | 'en'
    timezone: string
}

// Knowledge Base Types
export interface KnowledgeArticle {
    id: string
    title: string
    slug: string
    content: string
    category: string
    tags: string[]
    views: number
    helpful: number
    notHelpful: number
    createdBy: string
    createdAt: Date
    updatedAt: Date
}

// Chat/Message Types
export interface Conversation {
    id: string
    participants: string[]
    lastMessage?: Message
    unreadCount: number
    createdAt: Date
    updatedAt: Date
}

export interface Message {
    id: string
    conversationId: string
    senderId: string
    content: string
    read: boolean
    attachments?: Attachment[]
    createdAt: Date
}