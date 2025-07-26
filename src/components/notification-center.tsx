'use client';
import { useState, useEffect } from 'react';
import { 
  BellIcon, 
  CheckIcon, 
  XMarkIcon, 
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { cn, formatDate } from '@/lib/utils';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  action?: {
    label: string;
    url: string;
  };
}

interface NotificationCenterProps {
  userId?: string;
  onNotificationRead?: (notificationId: string) => void;
  onNotificationDismiss?: (notificationId: string) => void;
}

export default function NotificationCenter({ 
  userId = 'user-1', 
  onNotificationRead, 
  onNotificationDismiss 
}: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, [userId]);

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      // Mock API call - in real app, this would fetch from /api/notifications
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockNotifications: Notification[] = [
        {
          id: '1',
          type: 'success',
          title: 'Face Search Completed',
          message: 'Your face search for "John Smith" found 3 matching profiles.',
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
          read: false,
          action: {
            label: 'View Results',
            url: '/search?type=face&query=john+smith'
          }
        },
        {
          id: '2',
          type: 'info',
          title: 'Credits Added',
          message: 'Your account has been credited with 50 search credits.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
          read: false
        },
        {
          id: '3',
          type: 'warning',
          title: 'Low Credit Balance',
          message: 'You have less than 10 credits remaining. Consider purchasing more.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
          read: true,
          action: {
            label: 'Buy Credits',
            url: '/credits'
          }
        },
        {
          id: '4',
          type: 'error',
          title: 'Search Failed',
          message: 'Your recent face search could not be completed. Please try again.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
          read: true
        },
        {
          id: '5',
          type: 'success',
          title: 'Profile Updated',
          message: 'Your profile information has been successfully updated.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
          read: true
        }
      ];
      
      setNotifications(mockNotifications);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load notifications');
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      // Mock API call - in real app, this would update via /api/notifications/:id/read
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, read: true }
            : notification
        )
      );
      
      onNotificationRead?.(notificationId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark notification as read');
    }
  };

  const dismissNotification = async (notificationId: string) => {
    try {
      // Mock API call - in real app, this would delete via /api/notifications/:id
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
      onNotificationDismiss?.(notificationId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to dismiss notification');
    }
  };

  const markAllAsRead = async () => {
    try {
      // Mock API call - in real app, this would update all notifications
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, read: true }))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark all notifications as read');
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <InformationCircleIcon className="h-5 w-5 text-blue-500" />;
    }
  };

  const filteredNotifications = showUnreadOnly 
    ? notifications.filter(notification => !notification.read)
    : notifications;

  const unreadCount = notifications.filter(notification => !notification.read).length;

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <BellIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Failed to load notifications</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
        <button
          onClick={fetchNotifications}
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
        <div className="flex items-center space-x-2">
          <BellIcon className="h-6 w-6 text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Notifications</h2>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowUnreadOnly(!showUnreadOnly)}
            className={cn(
              "px-3 py-1 text-sm rounded-lg transition-colors",
              showUnreadOnly 
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" 
                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            )}
          >
            Unread Only
          </button>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Mark All Read
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <div className="text-center py-12">
          <BellIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {showUnreadOnly ? 'No unread notifications' : 'No notifications'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {showUnreadOnly 
              ? 'You\'re all caught up! Check back later for new notifications.'
              : 'You\'ll see important updates and alerts here.'
            }
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                "bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 transition-all",
                !notification.read && "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20"
              )}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {notification.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {notification.message}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          {formatDate(notification.timestamp)}
                        </span>
                        {!notification.read && (
                          <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                            New
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1 ml-4">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                          title="Mark as read"
                        >
                          <CheckIcon className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => dismissNotification(notification.id)}
                        className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                        title="Dismiss"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {notification.action && (
                    <div className="mt-3">
                      <a
                        href={notification.action.url}
                        className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200 dark:text-blue-400 dark:bg-blue-900 dark:hover:bg-blue-800"
                      >
                        {notification.action.label}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredNotifications.length} of {notifications.length} notifications
          </p>
        </div>
      )}
    </div>
  );
} 