import React from 'react';
import Modal from './Modal';
import { SpinnerIcon } from './icons';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isConfirming?: boolean;
  t: (key: string) => string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onClose, onConfirm, title, message, isConfirming = false, t }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
      <div className="flex justify-end gap-4">
        <button 
          onClick={onClose} 
          className="px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white transition-colors"
          disabled={isConfirming}
        >
          {t('cancel')}
        </button>
        <button 
          onClick={onConfirm} 
          className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors flex items-center justify-center w-36"
          disabled={isConfirming}
        >
          {isConfirming ? <SpinnerIcon /> : <><i className="fas fa-trash-alt me-2"></i> <span>{t('confirm_delete')}</span></>}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationDialog;