// Application constants
export const APP_NAME = 'Humapedia';
export const APP_DESCRIPTION = 'A collaborative internet human encyclopedia';
export const APP_VERSION = '1.0.0';

// API endpoints
export const API_ENDPOINTS = {
  FACE_SEARCH: '/api/face-search',
  TEXT_SEARCH: '/api/text-search',
  CREDITS: '/api/credits',
  PROFILES: '/api/profiles',
  SEARCH_HISTORY: '/api/search-history',
} as const;

// Search constants
export const SEARCH_CONSTANTS = {
  FACE_SEARCH_COST: 3,
  TEXT_SEARCH_COST: 0,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  MAX_RESULTS_PER_PAGE: 20,
  DEFAULT_SEARCH_DELAY: 300, // ms
} as const;

// Credit pricing
export const CREDIT_PRICING = {
  SMALL: { amount: 10, price: 4.99, savings: 0 },
  MEDIUM: { amount: 30, price: 12.99, savings: 2.97 },
  LARGE: { amount: 100, price: 29.99, savings: 19.01 },
  ENTERPRISE: { amount: 500, price: 99.99, savings: 149.51 },
} as const;

// Payment methods
export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  PAYPAL: 'paypal',
  STRIPE: 'stripe',
} as const;

// User roles
export const USER_ROLES = {
  USER: 'user',
  PREMIUM: 'premium',
  ADMIN: 'admin',
} as const;

// Search filters
export const SEARCH_FILTERS = {
  LOCATIONS: [
    'San Francisco, CA',
    'New York, NY',
    'Seattle, WA',
    'Los Angeles, CA',
    'Chicago, IL',
    'Austin, TX',
    'Boston, MA',
    'Denver, CO',
    'Portland, OR',
    'Miami, FL',
  ],
  PROFESSIONS: [
    'Software Engineer',
    'Data Scientist',
    'Product Manager',
    'UX Designer',
    'Marketing Director',
    'Sales Manager',
    'Business Analyst',
    'DevOps Engineer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Mobile Developer',
    'Data Analyst',
    'Machine Learning Engineer',
    'UI Designer',
    'Graphic Designer',
    'Content Writer',
    'Project Manager',
    'Scrum Master',
    'QA Engineer',
  ],
  COMPANIES: [
    'Tech Corp',
    'AI Solutions',
    'Innovation Labs',
    'Design Studio',
    'Global Marketing',
    'Startup Inc',
    'Enterprise Solutions',
    'Digital Agency',
    'Consulting Group',
    'Research Institute',
  ],
} as const;

// Error messages
export const ERROR_MESSAGES = {
  INSUFFICIENT_CREDITS: 'Insufficient credits for this operation',
  INVALID_FILE_TYPE: 'Invalid file type. Please upload a valid image.',
  FILE_TOO_LARGE: 'File size exceeds the maximum limit of 10MB',
  SEARCH_FAILED: 'Search failed. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'An internal server error occurred.',
  PAYMENT_FAILED: 'Payment failed. Please try again.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  SEARCH_COMPLETED: 'Search completed successfully',
  CREDITS_PURCHASED: 'Credits purchased successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  SEARCH_SAVED: 'Search saved to history',
  PAYMENT_SUCCESSFUL: 'Payment processed successfully',
} as const;

// Validation rules
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\+]?[1-9][\d]{0,15}$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  BIO_MAX_LENGTH: 500,
  COMPANY_MAX_LENGTH: 100,
  LOCATION_MAX_LENGTH: 100,
} as const;

// UI constants
export const UI_CONSTANTS = {
  ANIMATION_DURATION: 300,
  TOAST_DURATION: 5000,
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 100,
  INFINITE_SCROLL_THRESHOLD: 100,
  MODAL_BACKDROP_OPACITY: 0.5,
  SIDEBAR_WIDTH: 280,
  HEADER_HEIGHT: 64,
  FOOTER_HEIGHT: 80,
} as const;

// Theme constants
export const THEME_CONSTANTS = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'humapedia-theme',
  USER_PREFERENCES: 'humapedia-user-preferences',
  SEARCH_HISTORY: 'humapedia-search-history',
  CREDITS: 'humapedia-credits',
  AUTH_TOKEN: 'humapedia-auth-token',
  USER_ID: 'humapedia-user-id',
} as const;

// Route paths
export const ROUTES = {
  HOME: '/',
  SEARCH: '/search',
  CREDITS: '/credits',
  ABOUT: '/about',
  TIMELINE: '/timeline',
  CULTURES: '/cultures',
  ACHIEVEMENTS: '/achievements',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  HELP: '/help',
  CONTACT: '/contact',
  PRIVACY: '/privacy',
  TERMS: '/terms',
} as const;

// Social media links
export const SOCIAL_LINKS = {
  GITHUB: 'https://github.com/your-username/humapedia',
  TWITTER: 'https://twitter.com/humapedia',
  LINKEDIN: 'https://linkedin.com/company/humapedia',
  DISCORD: 'https://discord.gg/humapedia',
  YOUTUBE: 'https://youtube.com/@humapedia',
} as const;

// Contact information
export const CONTACT_INFO = {
  EMAIL: 'support@humapedia.org',
  PHONE: '+1-555-0123',
  ADDRESS: '123 Innovation Street, Tech City, TC 12345',
  BUSINESS_HOURS: 'Monday - Friday, 9:00 AM - 6:00 PM EST',
} as const;

// Feature flags
export const FEATURE_FLAGS = {
  ENABLE_FACE_SEARCH: true,
  ENABLE_TEXT_SEARCH: true,
  ENABLE_CREDIT_SYSTEM: true,
  ENABLE_PAYMENT: true,
  ENABLE_SOCIAL_LOGIN: false,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_ANALYTICS: true,
  ENABLE_AI_FEATURES: true,
} as const;

// Analytics events
export const ANALYTICS_EVENTS = {
  SEARCH_PERFORMED: 'search_performed',
  FACE_SEARCH_USED: 'face_search_used',
  TEXT_SEARCH_USED: 'text_search_used',
  CREDITS_PURCHASED: 'credits_purchased',
  PROFILE_VIEWED: 'profile_viewed',
  RESULT_CLICKED: 'result_clicked',
  FILTER_APPLIED: 'filter_applied',
  ERROR_OCCURRED: 'error_occurred',
} as const;

// Cache keys
export const CACHE_KEYS = {
  USER_PROFILE: 'user_profile',
  SEARCH_RESULTS: 'search_results',
  CREDIT_BALANCE: 'credit_balance',
  SEARCH_HISTORY: 'search_history',
  USER_PREFERENCES: 'user_preferences',
} as const;

// HTTP status codes
export const HTTP_STATUS = {
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
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const; 