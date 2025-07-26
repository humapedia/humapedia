// Core Types for Humapedia Platform

// User Profile Types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  profession?: string;
  company?: string;
  socialLinks?: SocialLinks;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
  tags: string[];
  experience?: Experience[];
  education?: Education[];
  skills?: string[];
}

export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  gpa?: number;
}

// Search Types
export interface SearchFilters {
  location?: string;
  profession?: string;
  company?: string;
  tags?: string[];
  ageRange?: [number, number];
  experienceLevel?: 'entry' | 'mid' | 'senior' | 'executive';
}

export interface FaceSearchRequest {
  image: File | string; // File for upload, string for base64
  filters?: SearchFilters;
}

export interface TextSearchRequest {
  query: string;
  filters?: SearchFilters;
  page?: number;
  limit?: number;
}

export interface SearchResult {
  profile: UserProfile;
  confidence: number; // 0-1 for face search
  matchReason?: string;
  highlightedFields?: string[];
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  searchId: string;
  creditsUsed: number;
}

// Credit System Types
export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  currency: string;
  description: string;
  popular?: boolean;
  discount?: number;
}

export interface CreditBalance {
  current: number;
  total: number;
  used: number;
  history: CreditTransaction[];
}

export interface CreditTransaction {
  id: string;
  type: 'purchase' | 'usage' | 'refund' | 'bonus';
  amount: number;
  description: string;
  timestamp: Date;
  packageId?: string;
  searchId?: string;
}

// Analytics Types
export interface AnalyticsData {
  overview: AnalyticsOverview;
  topSearches: TopSearch[];
  topLocations: TopLocation[];
  topProfessions: TopProfession[];
  topCompanies: TopCompany[];
  dailyActivity: DailyActivity[];
  searchTrends: SearchTrend[];
}

export interface AnalyticsOverview {
  totalSearches: number;
  totalUsers: number;
  totalProfiles: number;
  averageConfidence: number;
  creditsUsed: number;
  creditsPurchased: number;
}

export interface TopSearch {
  query: string;
  count: number;
  type: 'face' | 'text';
}

export interface TopLocation {
  location: string;
  count: number;
  percentage: number;
}

export interface TopProfession {
  profession: string;
  count: number;
  percentage: number;
}

export interface TopCompany {
  company: string;
  count: number;
  percentage: number;
}

export interface DailyActivity {
  date: string;
  searches: number;
  users: number;
  newProfiles: number;
}

export interface SearchTrend {
  period: string;
  faceSearches: number;
  textSearches: number;
  totalSearches: number;
}

// Search History Types
export interface SearchHistoryEntry {
  id: string;
  type: 'face' | 'text';
  query?: string;
  imageUrl?: string;
  filters?: SearchFilters;
  resultsCount: number;
  creditsUsed: number;
  timestamp: Date;
  results?: SearchResult[];
}

export interface SearchHistoryStats {
  totalSearches: number;
  faceSearches: number;
  textSearches: number;
  totalCreditsUsed: number;
  averageResults: number;
  mostUsedFilters: string[];
}

// Notification Types
export interface Notification {
  id: string;
  type: 'search_result' | 'credit_low' | 'system' | 'update' | 'security';
  title: string;
  message: string;
  read: boolean;
  timestamp: Date;
  actionUrl?: string;
  actionText?: string;
  priority: 'low' | 'medium' | 'high';
}

// User Settings Types
export interface UserSettings {
  profile: ProfileSettings;
  privacy: PrivacySettings;
  preferences: PreferenceSettings;
  security: SecuritySettings;
}

export interface ProfileSettings {
  displayName: string;
  email: string;
  bio: string;
  location: string;
  profession: string;
  company: string;
  avatar: string;
  isPublic: boolean;
}

export interface PrivacySettings {
  showEmail: boolean;
  showLocation: boolean;
  showProfession: boolean;
  showCompany: boolean;
  allowFaceSearch: boolean;
  allowTextSearch: boolean;
  dataRetentionDays: number;
}

export interface PreferenceSettings {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  timezone: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  searchHistoryEnabled: boolean;
  analyticsEnabled: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  lastPasswordChange: Date;
  loginHistory: LoginHistory[];
  activeSessions: ActiveSession[];
}

export interface LoginHistory {
  id: string;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  location: string;
  success: boolean;
}

export interface ActiveSession {
  id: string;
  device: string;
  browser: string;
  ipAddress: string;
  lastActive: Date;
  createdAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Error Types
export interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: any;
}

export interface SearchComponentProps extends BaseComponentProps {
  onSearch: (results: SearchResponse) => void;
  onError: (error: string) => void;
  loading?: boolean;
}

export interface ProfileCardProps extends BaseComponentProps {
  profile: UserProfile;
  showActions?: boolean;
  onView?: (profile: UserProfile) => void;
  onContact?: (profile: UserProfile) => void;
}

// Form Types
export interface SearchFormData {
  query: string;
  location: string;
  profession: string;
  company: string;
  tags: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Utility Types
export type Theme = 'light' | 'dark' | 'auto';
export type SearchType = 'face' | 'text';
export type NotificationType = 'search_result' | 'credit_low' | 'system' | 'update' | 'security';
export type NotificationPriority = 'low' | 'medium' | 'high';
export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'executive';

// Constants
export const SEARCH_TYPES = {
  FACE: 'face' as const,
  TEXT: 'text' as const,
} as const;

export const THEMES = {
  LIGHT: 'light' as const,
  DARK: 'dark' as const,
  AUTO: 'auto' as const,
} as const;

export const NOTIFICATION_TYPES = {
  SEARCH_RESULT: 'search_result' as const,
  CREDIT_LOW: 'credit_low' as const,
  SYSTEM: 'system' as const,
  UPDATE: 'update' as const,
  SECURITY: 'security' as const,
} as const;

export const EXPERIENCE_LEVELS = {
  ENTRY: 'entry' as const,
  MID: 'mid' as const,
  SENIOR: 'senior' as const,
  EXECUTIVE: 'executive' as const,
} as const; 