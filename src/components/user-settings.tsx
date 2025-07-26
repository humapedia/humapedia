'use client';
import { useState, useEffect } from 'react';
import { 
  UserIcon, 
  ShieldCheckIcon, 
  BellIcon, 
  CogIcon, 
  EyeIcon, 
  EyeSlashIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface UserSettings {
  profile: {
    name: string;
    email: string;
    avatar: string;
    bio: string;
    location: string;
    profession: string;
    company: string;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'friends';
    searchHistory: boolean;
    analyticsSharing: boolean;
    emailNotifications: boolean;
    pushNotifications: boolean;
  };
  preferences: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    timezone: string;
    currency: string;
  };
  security: {
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
    activeSessions: Array<{
      id: string;
      device: string;
      location: string;
      lastActive: string;
    }>;
  };
}

interface UserSettingsProps {
  userId?: string;
  onSettingsUpdate?: (settings: Partial<UserSettings>) => void;
}

export default function UserSettings({ userId = 'user-1', onSettingsUpdate }: UserSettingsProps) {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'privacy' | 'preferences' | 'security'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<UserSettings>>({});

  useEffect(() => {
    fetchUserSettings();
  }, [userId]);

  const fetchUserSettings = async () => {
    try {
      setIsLoading(true);
      // Mock API call - in real app, this would fetch from /api/user/settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockSettings: UserSettings = {
        profile: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          avatar: '/api/placeholder/150/150',
          bio: 'Software engineer passionate about building innovative solutions.',
          location: 'San Francisco, CA',
          profession: 'Software Engineer',
          company: 'Tech Corp'
        },
        privacy: {
          profileVisibility: 'public',
          searchHistory: true,
          analyticsSharing: false,
          emailNotifications: true,
          pushNotifications: false
        },
        preferences: {
          theme: 'system',
          language: 'en',
          timezone: 'America/Los_Angeles',
          currency: 'USD'
        },
        security: {
          twoFactorEnabled: false,
          lastPasswordChange: '2024-01-15T10:30:00Z',
          activeSessions: [
            {
              id: 'session-1',
              device: 'MacBook Pro',
              location: 'San Francisco, CA',
              lastActive: '2024-01-20T15:45:00Z'
            },
            {
              id: 'session-2',
              device: 'iPhone 15',
              location: 'San Francisco, CA',
              lastActive: '2024-01-20T14:30:00Z'
            }
          ]
        }
      };
      
      setSettings(mockSettings);
      setEditData(mockSettings);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      // Mock API call - in real app, this would update via /api/user/settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSettings(prev => prev ? { ...prev, ...editData } : null);
      setIsEditing(false);
      onSettingsUpdate?.(editData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save settings');
    }
  };

  const handleCancel = () => {
    setEditData(settings || {});
    setIsEditing(false);
  };

  const updateEditData = (section: keyof UserSettings, field: string, value: any) => {
    setEditData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'privacy', label: 'Privacy', icon: ShieldCheckIcon },
    { id: 'preferences', label: 'Preferences', icon: CogIcon },
    { id: 'security', label: 'Security', icon: ShieldCheckIcon }
  ];

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (error || !settings) {
    return (
      <div className="text-center py-12">
        <CogIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Failed to load settings</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
        <button
          onClick={fetchUserSettings}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Settings</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your account preferences and privacy</p>
        </div>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                <CheckIcon className="h-4 w-4 mr-2" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 flex items-center"
              >
                <XMarkIcon className="h-4 w-4 mr-2" />
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Edit Settings
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors",
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Profile Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editData.profile?.name || ''}
                  onChange={(e) => updateEditData('profile', 'name', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={editData.profile?.email || ''}
                  onChange={(e) => updateEditData('profile', 'email', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={editData.profile?.location || ''}
                  onChange={(e) => updateEditData('profile', 'location', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Profession
                </label>
                <input
                  type="text"
                  value={editData.profile?.profession || ''}
                  onChange={(e) => updateEditData('profile', 'profession', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  value={editData.profile?.company || ''}
                  onChange={(e) => updateEditData('profile', 'company', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bio
              </label>
              <textarea
                value={editData.profile?.bio || ''}
                onChange={(e) => updateEditData('profile', 'bio', e.target.value)}
                disabled={!isEditing}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
              />
            </div>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Privacy Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Profile Visibility</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Control who can see your profile</p>
                </div>
                <select
                  value={editData.privacy?.profileVisibility || 'public'}
                  onChange={(e) => updateEditData('privacy', 'profileVisibility', e.target.value)}
                  disabled={!isEditing}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="friends">Friends Only</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Search History</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Save your search history for quick access</p>
                </div>
                <button
                  onClick={() => updateEditData('privacy', 'searchHistory', !editData.privacy?.searchHistory)}
                  disabled={!isEditing}
                  className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                    editData.privacy?.searchHistory
                      ? "bg-blue-600"
                      : "bg-gray-200 dark:bg-gray-700",
                    !isEditing && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <span
                    className={cn(
                      "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                      editData.privacy?.searchHistory ? "translate-x-6" : "translate-x-1"
                    )}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Analytics Sharing</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Share anonymous usage data to improve the service</p>
                </div>
                <button
                  onClick={() => updateEditData('privacy', 'analyticsSharing', !editData.privacy?.analyticsSharing)}
                  disabled={!isEditing}
                  className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                    editData.privacy?.analyticsSharing
                      ? "bg-blue-600"
                      : "bg-gray-200 dark:bg-gray-700",
                    !isEditing && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <span
                    className={cn(
                      "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                      editData.privacy?.analyticsSharing ? "translate-x-6" : "translate-x-1"
                    )}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Receive email updates about your account</p>
                </div>
                <button
                  onClick={() => updateEditData('privacy', 'emailNotifications', !editData.privacy?.emailNotifications)}
                  disabled={!isEditing}
                  className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                    editData.privacy?.emailNotifications
                      ? "bg-blue-600"
                      : "bg-gray-200 dark:bg-gray-700",
                    !isEditing && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <span
                    className={cn(
                      "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                      editData.privacy?.emailNotifications ? "translate-x-6" : "translate-x-1"
                    )}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Preferences</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Theme
                </label>
                <select
                  value={editData.preferences?.theme || 'system'}
                  onChange={(e) => updateEditData('preferences', 'theme', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Language
                </label>
                <select
                  value={editData.preferences?.language || 'en'}
                  onChange={(e) => updateEditData('preferences', 'language', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="zh">Chinese</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Timezone
                </label>
                <select
                  value={editData.preferences?.timezone || 'America/Los_Angeles'}
                  onChange={(e) => updateEditData('preferences', 'timezone', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                >
                  <option value="America/Los_Angeles">Pacific Time</option>
                  <option value="America/New_York">Eastern Time</option>
                  <option value="Europe/London">London</option>
                  <option value="Asia/Tokyo">Tokyo</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Currency
                </label>
                <select
                  value={editData.preferences?.currency || 'USD'}
                  onChange={(e) => updateEditData('preferences', 'currency', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="JPY">JPY (¥)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Security Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security to your account</p>
                </div>
                <button
                  onClick={() => updateEditData('security', 'twoFactorEnabled', !editData.security?.twoFactorEnabled)}
                  disabled={!isEditing}
                  className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                    editData.security?.twoFactorEnabled
                      ? "bg-blue-600"
                      : "bg-gray-200 dark:bg-gray-700",
                    !isEditing && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <span
                    className={cn(
                      "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                      editData.security?.twoFactorEnabled ? "translate-x-6" : "translate-x-1"
                    )}
                  />
                </button>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Active Sessions</h4>
                <div className="space-y-3">
                  {editData.security?.activeSessions?.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{session.device}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{session.location}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">Last active: {new Date(session.lastActive).toLocaleDateString()}</p>
                      </div>
                      {isEditing && (
                        <button className="text-red-600 hover:text-red-700 text-sm">
                          Revoke
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 