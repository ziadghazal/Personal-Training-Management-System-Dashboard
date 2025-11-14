import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
  type?: 'success' | 'error';
}

const Toast: React.FC<ToastProps> = ({ message, show, onClose, type = 'success' }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);
  
  const baseClasses = 'fixed bottom-5 right-5 text-white py-3 px-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out z-50';
  const stateClasses = show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0';
  const typeClasses = {
    success: 'bg-green-600',
    error: 'bg-red-600',
  };
  const iconClasses = {
    success: 'fa-solid fa-check-circle',
    error: 'fa-solid fa-exclamation-circle',
  }

  return (
    <div
      className={`${baseClasses} ${typeClasses[type]} ${stateClasses}`}
      role="alert"
    >
      <i className={`${iconClasses[type]} ml-2`}></i>
      {message}
    </div>
  );
};

export default Toast;
