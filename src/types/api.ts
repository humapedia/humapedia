// API Types for Humapedia Platform

// API Endpoints
export const API_ENDPOINTS = {
  // Search APIs
  FACE_SEARCH: '/api/face-search',
  TEXT_SEARCH: '/api/text-search',
  
  // Profile APIs
  PROFILES: '/api/profiles',
  PROFILE_BY_ID: (id: string) => `/api/profiles/${id}`,
  
  // Credit APIs
  CREDITS: '/api/credits',
  CREDIT_PACKAGES: '/api/credits/packages',
  CREDIT_HISTORY: '/api/credits/history',
  
  // Search History APIs
  SEARCH_HISTORY: '/api/search-history',
  SEARCH_HISTORY_BY_ID: (id: string) => `/api/search-history/${id}`,
  
  // Analytics APIs
  ANALYTICS: '/api/analytics',
  ANALYTICS_OVERVIEW: '/api/analytics/overview',
  ANALYTICS_TRENDS: '/api/analytics/trends',
  
  // Notification APIs
  NOTIFICATIONS: '/api/notifications',
  NOTIFICATION_BY_ID: (id: string) => `/api/notifications/${id}`,
  
  // User Settings APIs
  USER_SETTINGS: '/api/settings',
  USER_PROFILE: '/api/settings/profile',
  USER_PRIVACY: '/api/settings/privacy',
  USER_PREFERENCES: '/api/settings/preferences',
  USER_SECURITY: '/api/settings/security',
  
  // Authentication APIs
  AUTH_LOGIN: '/api/auth/login',
  AUTH_LOGOUT: '/api/auth/logout',
  AUTH_REGISTER: '/api/auth/register',
  AUTH_REFRESH: '/api/auth/refresh',
  AUTH_VERIFY: '/api/auth/verify',
  
  // File Upload APIs
  UPLOAD_AVATAR: '/api/upload/avatar',
  UPLOAD_IMAGE: '/api/upload/image',
  
  // Contact & Support APIs
  CONTACT: '/api/contact',
  SUPPORT: '/api/support',
  FEEDBACK: '/api/feedback',
} as const;

// HTTP Methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// API Request Types
export interface ApiRequestConfig {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string | number | boolean>;
  timeout?: number;
  retries?: number;
}

export interface ApiRequestOptions {
  signal?: AbortSignal;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  mode?: RequestMode;
  redirect?: RequestRedirect;
  referrer?: string;
  referrerPolicy?: ReferrerPolicy;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
  timestamp: Date;
  requestId?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
  field?: string;
  timestamp: Date;
  requestId?: string;
}

export interface PaginatedApiResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Search API Types
export interface FaceSearchApiRequest {
  image: File | string;
  filters?: {
    location?: string;
    profession?: string;
    company?: string;
    tags?: string[];
    ageRange?: [number, number];
    experienceLevel?: 'entry' | 'mid' | 'senior' | 'executive';
  };
}

export interface TextSearchApiRequest {
  query: string;
  filters?: {
    location?: string;
    profession?: string;
    company?: string;
    tags?: string[];
    ageRange?: [number, number];
    experienceLevel?: 'entry' | 'mid' | 'senior' | 'executive';
  };
  page?: number;
  limit?: number;
  sortBy?: 'relevance' | 'name' | 'location' | 'profession';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchApiResponse {
  results: Array<{
    profile: {
      id: string;
      name: string;
      email: string;
      avatar?: string;
      bio?: string;
      location?: string;
      profession?: string;
      company?: string;
      socialLinks?: {
        linkedin?: string;
        twitter?: string;
        github?: string;
        website?: string;
        instagram?: string;
        facebook?: string;
      };
      createdAt: Date;
      updatedAt: Date;
      isPublic: boolean;
      tags: string[];
    };
    confidence: number;
    matchReason?: string;
    highlightedFields?: string[];
  }>;
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  searchId: string;
  creditsUsed: number;
}

// Profile API Types
export interface ProfileApiRequest {
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  profession?: string;
  company?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
    instagram?: string;
    facebook?: string;
  };
  isPublic: boolean;
  tags: string[];
}

export interface ProfileApiResponse {
  profile: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    bio?: string;
    location?: string;
    profession?: string;
    company?: string;
    socialLinks?: {
      linkedin?: string;
      twitter?: string;
      github?: string;
      website?: string;
      instagram?: string;
      facebook?: string;
    };
    createdAt: Date;
    updatedAt: Date;
    isPublic: boolean;
    tags: string[];
  };
}

// Credit API Types
export interface CreditPackageApiResponse {
  packages: Array<{
    id: string;
    name: string;
    credits: number;
    price: number;
    currency: string;
    description: string;
    popular?: boolean;
    discount?: number;
  }>;
}

export interface CreditBalanceApiResponse {
  balance: {
    current: number;
    total: number;
    used: number;
  };
  history: Array<{
    id: string;
    type: 'purchase' | 'usage' | 'refund' | 'bonus';
    amount: number;
    description: string;
    timestamp: Date;
    packageId?: string;
    searchId?: string;
  }>;
}

export interface PurchaseCreditsApiRequest {
  packageId: string;
  paymentMethod: 'credit_card' | 'paypal' | 'stripe';
  paymentToken?: string;
}

// Analytics API Types
export interface AnalyticsApiResponse {
  overview: {
    totalSearches: number;
    totalUsers: number;
    totalProfiles: number;
    averageConfidence: number;
    creditsUsed: number;
    creditsPurchased: number;
  };
  topSearches: Array<{
    query: string;
    count: number;
    type: 'face' | 'text';
  }>;
  topLocations: Array<{
    location: string;
    count: number;
    percentage: number;
  }>;
  topProfessions: Array<{
    profession: string;
    count: number;
    percentage: number;
  }>;
  topCompanies: Array<{
    company: string;
    count: number;
    percentage: number;
  }>;
  dailyActivity: Array<{
    date: string;
    searches: number;
    users: number;
    newProfiles: number;
  }>;
  searchTrends: Array<{
    period: string;
    faceSearches: number;
    textSearches: number;
    totalSearches: number;
  }>;
}

// Search History API Types
export interface SearchHistoryApiResponse {
  entries: Array<{
    id: string;
    type: 'face' | 'text';
    query?: string;
    imageUrl?: string;
    filters?: {
      location?: string;
      profession?: string;
      company?: string;
      tags?: string[];
      ageRange?: [number, number];
      experienceLevel?: 'entry' | 'mid' | 'senior' | 'executive';
    };
    resultsCount: number;
    creditsUsed: number;
    timestamp: Date;
  }>;
  stats: {
    totalSearches: number;
    faceSearches: number;
    textSearches: number;
    totalCreditsUsed: number;
    averageResults: number;
    mostUsedFilters: string[];
  };
}

// Notification API Types
export interface NotificationApiResponse {
  notifications: Array<{
    id: string;
    type: 'search_result' | 'credit_low' | 'system' | 'update' | 'security';
    title: string;
    message: string;
    read: boolean;
    timestamp: Date;
    actionUrl?: string;
    actionText?: string;
    priority: 'low' | 'medium' | 'high';
  }>;
  unreadCount: number;
}

export interface MarkNotificationReadApiRequest {
  notificationId: string;
  read: boolean;
}

// User Settings API Types
export interface UserSettingsApiResponse {
  profile: {
    displayName: string;
    email: string;
    bio: string;
    location: string;
    profession: string;
    company: string;
    avatar: string;
    isPublic: boolean;
  };
  privacy: {
    showEmail: boolean;
    showLocation: boolean;
    showProfession: boolean;
    showCompany: boolean;
    allowFaceSearch: boolean;
    allowTextSearch: boolean;
    dataRetentionDays: number;
  };
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    timezone: string;
    emailNotifications: boolean;
    pushNotifications: boolean;
    searchHistoryEnabled: boolean;
    analyticsEnabled: boolean;
  };
  security: {
    twoFactorEnabled: boolean;
    lastPasswordChange: Date;
    loginHistory: Array<{
      id: string;
      timestamp: Date;
      ipAddress: string;
      userAgent: string;
      location: string;
      success: boolean;
    }>;
    activeSessions: Array<{
      id: string;
      device: string;
      browser: string;
      ipAddress: string;
      lastActive: Date;
      createdAt: Date;
    }>;
  };
}

// Authentication API Types
export interface LoginApiRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterApiRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface AuthApiResponse {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  token: string;
  refreshToken: string;
  expiresAt: Date;
}

// File Upload API Types
export interface FileUploadApiRequest {
  file: File;
  type: 'avatar' | 'image';
  metadata?: Record<string, any>;
}

export interface FileUploadApiResponse {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
  uploadedAt: Date;
}

// Contact & Support API Types
export interface ContactApiRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: 'general' | 'support' | 'feedback' | 'bug' | 'feature';
}

export interface SupportApiRequest {
  category: string;
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  attachments?: File[];
}

// Error Codes
export const API_ERROR_CODES = {
  // Authentication Errors
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  TOKEN_INVALID: 'TOKEN_INVALID',
  
  // Validation Errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  REQUIRED_FIELD: 'REQUIRED_FIELD',
  INVALID_FORMAT: 'INVALID_FORMAT',
  FIELD_TOO_LONG: 'FIELD_TOO_LONG',
  FIELD_TOO_SHORT: 'FIELD_TOO_SHORT',
  
  // Resource Errors
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  RESOURCE_DELETED: 'RESOURCE_DELETED',
  
  // Search Errors
  INSUFFICIENT_CREDITS: 'INSUFFICIENT_CREDITS',
  INVALID_IMAGE: 'INVALID_IMAGE',
  SEARCH_FAILED: 'SEARCH_FAILED',
  
  // Rate Limiting
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
  
  // Server Errors
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  DATABASE_ERROR: 'DATABASE_ERROR',
  
  // File Upload Errors
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  UPLOAD_FAILED: 'UPLOAD_FAILED',
} as const;

// API Status Codes
export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const; 