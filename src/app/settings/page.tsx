import UserSettings from '@/components/user-settings';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account settings, privacy preferences, and security options.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <UserSettings />
        </div>
      </div>
    </div>
  );
} 