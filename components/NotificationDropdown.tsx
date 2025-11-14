import React from 'react';
import { Notification } from '../types';
import { BellIcon } from './icons';

interface NotificationDropdownProps {
  notifications: Notification[];
  onSendReminder: (notificationId: string) => void;
  onClose: () => void;
  t: (key: string, options?: any) => string;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ notifications, onSendReminder, onClose, t }) => {
  return (
    <div className="absolute top-16 end-4 sm:end-20 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{t('notifications_title')}</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.id} className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-bold text-gray-800 dark:text-white">{notification.clientName}</span>{' '}
                {t('notification_body', { count: notification.sessionsLeft, packageName: notification.packageName })}
              </p>
              <button
                onClick={() => onSendReminder(notification.id)}
                className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white text-sm font-bold py-1 px-3 rounded-md transition-colors"
              >
                <i className="fab fa-whatsapp me-2"></i> {t('send_whatsapp_reminder')}
              </button>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
             <BellIcon className="h-8 w-8 mx-auto mb-2" />
            <p>{t('no_new_notifications')}</p>
          </div>
        )}
      </div>
       <div className="p-2 text-center border-t border-gray-200 dark:border-gray-700">
        <button onClick={onClose} className="text-sm text-blue-500 dark:text-blue-400 hover:underline">
          {t('close')}
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;