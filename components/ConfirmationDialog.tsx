import React from 'react';
import Modal from './Modal';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p className="text-gray-300 mb-6">{message}</p>
      <div className="flex justify-end gap-4">
        <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition-colors">
          إلغاء
        </button>
        <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors">
          <i className="fas fa-trash-alt mr-2"></i>
          تأكيد الحذف
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationDialog;
