import React, { useState } from 'react';
import { Package, TrainingType } from '../types';
import Modal from './Modal';
import ConfirmationDialog from './ConfirmationDialog';
import { SpinnerIcon } from './icons';

interface PackageFormProps {
  onSubmit: (pkg: Omit<Package, 'id'> | Package) => Promise<void>;
  onClose: () => void;
  initialData?: Package;
  t: (key: string) => string;
}

const PackageForm: React.FC<PackageFormProps> = ({ onSubmit, onClose, initialData, t }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [type, setType] = useState<TrainingType>(initialData?.type || TrainingType.Normal);
  const [sessions, setSessions] = useState(initialData?.sessions || 0);
  const [price, setPrice] = useState(initialData?.price || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
        await onSubmit(initialData ? { ...initialData, name, type, sessions, price } : { name, type, sessions, price });
    } catch(error) {
        console.error(error);
    } finally {
        setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">{t('package_name')}</label>
        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required disabled={isSubmitting}/>
      </div>
       <div>
        <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">{t('training_type')}</label>
        <select id="type" value={type} onChange={e => setType(e.target.value as TrainingType)} className="bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" disabled={isSubmitting}>
          {Object.values(TrainingType).map(t_type => <option key={t_type} value={t_type}>{t(t_type as string)}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="sessions" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">{t('number_of_sessions')}</label>
          <input type="number" id="sessions" value={sessions} onChange={e => setSessions(parseInt(e.target.value, 10))} className="bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required min="0" disabled={isSubmitting}/>
        </div>
         <div>
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">{t('price_sar')}</label>
          <input type="number" id="price" value={price} onChange={e => setPrice(parseFloat(e.target.value))} className="bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required min="0" step="0.01" disabled={isSubmitting}/>
        </div>
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white transition-colors" disabled={isSubmitting}>{t('cancel')}</button>
        <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center justify-center w-36" disabled={isSubmitting}>
            {isSubmitting ? <SpinnerIcon /> : (initialData ? t('save_changes') : t('add_package'))}
        </button>
      </div>
    </form>
  )
}

interface PackagesManagementProps {
  packages: Package[];
  onAddPackage: (packageData: Omit<Package, 'id'>) => Promise<void>;
  onUpdatePackage: (pkg: Package) => Promise<void>;
  onDeletePackage: (packageId: string) => Promise<void>;
  t: (key: string, options?: any) => string;
}

const PackagesManagement: React.FC<PackagesManagementProps> = ({ packages, onAddPackage, onUpdatePackage, onDeletePackage, t }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | undefined>(undefined);
  const [deletingPackage, setDeletingPackage] = useState<Package | null>(null);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const openAddModal = () => {
    setEditingPackage(undefined);
    setIsModalOpen(true);
  };
  
  const openEditModal = (pkg: Package) => {
    setEditingPackage(pkg);
    setIsModalOpen(true);
  };
  
  const handleFormSubmit = async (packageData: Omit<Package, 'id'> | Package) => {
    if ('id' in packageData) {
      await onUpdatePackage(packageData);
    } else {
      await onAddPackage(packageData);
    }
    setIsModalOpen(false);
    setEditingPackage(undefined);
  };

  const handleDeleteConfirm = async () => {
    if(deletingPackage) {
      setIsConfirmingDelete(true);
      try {
        await onDeletePackage(deletingPackage.id);
        setDeletingPackage(null);
      } catch (error) {
        // Parent shows toast
      } finally {
        setIsConfirmingDelete(false);
      }
    }
  }

  return (
    <div className="p-6 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t('packages_management_title')}</h1>
        <button onClick={openAddModal} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors">
          <i className="fa-solid fa-plus me-2"></i> {t('add_new_package')}
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-300">
            <thead className="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">{t('package_name')}</th>
                <th scope="col" className="px-6 py-3">{t('training_type')}</th>
                <th scope="col" className="px-6 py-3">{t('number_of_sessions')}</th>
                <th scope="col" className="px-6 py-3">{t('price_sar')}</th>
                <th scope="col" className="px-6 py-3">{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{pkg.name}</td>
                  <td className="px-6 py-4">{t(pkg.type as string)}</td>
                  <td className="px-6 py-4">{pkg.sessions}</td>
                  <td className="px-6 py-4 font-mono">{pkg.price.toFixed(2)}</td>
                  <td className="px-6 py-4 flex items-center gap-4">
                    <button onClick={() => openEditModal(pkg)} className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"><i className="fas fa-edit me-1"></i> {t('edit')}</button>
                    <button onClick={() => setDeletingPackage(pkg)} className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"><i className="fas fa-trash-alt me-1"></i> {t('delete')}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingPackage ? t('modal_edit_package_title') : t('modal_add_package_title')}>
        <PackageForm
          onSubmit={handleFormSubmit}
          onClose={() => setIsModalOpen(false)}
          initialData={editingPackage}
          t={t}
        />
      </Modal>

      <ConfirmationDialog 
        isOpen={!!deletingPackage}
        onClose={() => setDeletingPackage(null)}
        onConfirm={handleDeleteConfirm}
        title={t('confirm_delete_title')}
        message={t('confirm_delete_package_message', { name: deletingPackage?.name })}
        isConfirming={isConfirmingDelete}
        t={t}
      />
    </div>
  );
};

export default PackagesManagement;