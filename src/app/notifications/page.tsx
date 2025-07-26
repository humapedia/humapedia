import NotificationCenter from '@/components/notification-center';

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Notifications
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Stay updated with important alerts, search results, and account notifications.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <NotificationCenter />
        </div>
      </div>
    </div>
  );
} 