import React from 'react';
import { Notification } from '../types';
import { BellIcon } from './icons';

interface NotificationDropdownProps {
  notifications: Notification[];
  onSendReminder: (notificationId: string) => void;
  onClose: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ notifications, onSendReminder, onClose }) => {
  return (
    <div className="absolute top-16 left-4 sm:left-auto sm:right-20 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">الإشعارات</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.id} className="p-4 border-b border-gray-700 hover:bg-gray-700/50">
              <p className="text-sm text-gray-300">
                <span className="font-bold text-white">{notification.clientName}</span> لديه{' '}
                <span className="font-bold text-yellow-400">{notification.sessionsLeft}</span>{' '}
                {notification.sessionsLeft > 1 ? 'حصص' : 'حصة'} متبقية في باقة{' '}
                <span className="font-semibold">{notification.packageName}</span>.
              </p>
              <button
                onClick={() => onSendReminder(notification.id)}
                className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white text-sm font-bold py-1 px-3 rounded-md transition-colors"
              >
                <i className="fab fa-whatsapp mr-2"></i> إرسال تذكير واتساب
              </button>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-400">
             <BellIcon className="h-8 w-8 mx-auto mb-2" />
            <p>لا توجد إشعارات جديدة.</p>
          </div>
        )}
      </div>
       <div className="p-2 text-center border-t border-gray-700">
        <button onClick={onClose} className="text-sm text-blue-400 hover:underline">
          إغلاق
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;
