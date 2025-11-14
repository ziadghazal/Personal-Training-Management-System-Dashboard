import React, { useState } from 'react';
import { User } from '../types';
import Modal from './Modal';
import ConfirmationDialog from './ConfirmationDialog';
import { SpinnerIcon } from './icons';

interface TrainerFormProps {
  onSubmit: (trainer: Omit<User, 'id' | 'role' | 'joinDate'> | User) => Promise<void>;
  onClose: () => void;
  initialData?: User;
  t: (key: string) => string;
}

const TrainerForm: React.FC<TrainerFormProps> = ({ onSubmit, onClose, initialData, t }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [city, setCity] = useState(initialData?.city || '');
  const [specialization, setSpecialization] = useState(initialData?.specialization || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const trainerData = initialData ? { ...initialData, name, city, specialization } : { name, city, specialization };
      await onSubmit(trainerData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">{t('trainer_name')}</label>
        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required disabled={isSubmitting} />
      </div>
       <div>
        <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">{t('city')}</label>
        <input type="text" id="city" value={city} onChange={e => setCity(e.target.value)} className="bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required disabled={isSubmitting} />
      </div>
       <div>
        <label htmlFor="specialization" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">{t('specialization')}</label>
        <input type="text" id="specialization" value={specialization} onChange={e => setSpecialization(e.target.value)} className="bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required disabled={isSubmitting} />
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white transition-colors" disabled={isSubmitting}>{t('cancel')}</button>
        <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center justify-center w-36" disabled={isSubmitting}>
          {isSubmitting ? <SpinnerIcon/> : (initialData ? t('save_changes') : t('add_trainer'))}
        </button>
      </div>
    </form>
  )
}

interface TrainersManagementProps {
  trainers: User[];
  onAddTrainer: (trainerData: Omit<User, 'id' | 'role' | 'joinDate'>) => Promise<void>;
  onUpdateTrainer: (trainer: User) => Promise<void>;
  onDeleteTrainer: (trainerId: string) => Promise<void>;
  t: (key: string, options?: any) => string;
}

const TrainersManagement: React.FC<TrainersManagementProps> = ({ trainers, onAddTrainer, onUpdateTrainer, onDeleteTrainer, t }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState<User | undefined>(undefined);
  const [deletingTrainer, setDeletingTrainer] = useState<User | null>(null);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const openAddModal = () => {
    setEditingTrainer(undefined);
    setIsModalOpen(true);
  };
  
  const openEditModal = (trainer: User) => {
    setEditingTrainer(trainer);
    setIsModalOpen(true);
  };
  
  const handleFormSubmit = async (trainerData: Omit<User, 'id' | 'role' | 'joinDate'> | User) => {
    if ('id' in trainerData) {
      await onUpdateTrainer(trainerData);
    } else {
      await onAddTrainer(trainerData);
    }
    setIsModalOpen(false);
    setEditingTrainer(undefined);
  };

  const handleDeleteConfirm = async () => {
    if(deletingTrainer) {
      setIsConfirmingDelete(true);
      try {
        await onDeleteTrainer(deletingTrainer.id);
        setDeletingTrainer(null);
      } catch (error) {
        // Error toast is shown by parent
      } finally {
        setIsConfirmingDelete(false);
      }
    }
  }

  return (
    <div className="p-6 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t('trainers_management_title')}</h1>
        <button onClick={openAddModal} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors">
          <i className="fa-solid fa-plus me-2"></i> {t('add_new_trainer')}
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-300">
            <thead className="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">{t('trainer_name')}</th>
                <th scope="col" className="px-6 py-3">{t('city')}</th>
                <th scope="col" className="px-6 py-3">{t('specialization')}</th>
                <th scope="col" className="px-6 py-3">{t('join_date')}</th>
                <th scope="col" className="px-6 py-3">{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {trainers.map((trainer) => (
                <tr key={trainer.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{trainer.name}</td>
                  <td className="px-6 py-4">{trainer.city}</td>
                  <td className="px-6 py-4">{trainer.specialization}</td>
                  <td className="px-6 py-4">{trainer.joinDate}</td>
                  <td className="px-6 py-4 flex items-center gap-4">
                    <button onClick={() => openEditModal(trainer)} className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"><i className="fas fa-edit me-1"></i> {t('edit')}</button>
                    <button onClick={() => setDeletingTrainer(trainer)} className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"><i className="fas fa-trash-alt me-1"></i> {t('delete')}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingTrainer ? t('modal_edit_trainer_title') : t('modal_add_trainer_title')}>
          <TrainerForm 
            onSubmit={handleFormSubmit} 
            onClose={() => setIsModalOpen(false)} 
            initialData={editingTrainer}
            t={t}
          />
      </Modal>

      <ConfirmationDialog 
        isOpen={!!deletingTrainer}
        onClose={() => setDeletingTrainer(null)}
        onConfirm={handleDeleteConfirm}
        title={t('confirm_delete_title')}
        message={t('confirm_delete_trainer_message', { name: deletingTrainer?.name })}
        isConfirming={isConfirmingDelete}
        t={t}
      />

    </div>
  );
};

export default TrainersManagement;