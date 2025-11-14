import React, { useState } from 'react';
import { Package, TrainingType } from '../types';
import Modal from './Modal';
import ConfirmationDialog from './ConfirmationDialog';

// Form Component
interface PackageFormProps {
  onSubmit: (pkg: Omit<Package, 'id'> | Package) => void;
  onClose: () => void;
  initialData?: Package;
}

const PackageForm: React.FC<PackageFormProps> = ({ onSubmit, onClose, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [type, setType] = useState<TrainingType>(initialData?.type || TrainingType.Normal);
  const [sessions, setSessions] = useState(initialData?.sessions || 0);
  const [price, setPrice] = useState(initialData?.price || 0);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(initialData ? { ...initialData, name, type, sessions, price } : { name, type, sessions, price });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">اسم الباقة</label>
        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
      </div>
       <div>
        <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-300">نوع التدريب</label>
        <select id="type" value={type} onChange={e => setType(e.target.value as TrainingType)} className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          {Object.values(TrainingType).map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="sessions" className="block mb-2 text-sm font-medium text-gray-300">عدد الحصص</label>
          <input type="number" id="sessions" value={sessions} onChange={e => setSessions(parseInt(e.target.value, 10))} className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required min="0"/>
        </div>
         <div>
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-300">السعر (ريال)</label>
          <input type="number" id="price" value={price} onChange={e => setPrice(parseFloat(e.target.value))} className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required min="0" step="0.01"/>
        </div>
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition-colors">إلغاء</button>
        <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors">{initialData ? 'حفظ التغييرات' : 'إضافة باقة'}</button>
      </div>
    </form>
  )
}

// Main Component
interface PackagesManagementProps {
  packages: Package[];
  onAddPackage: (packageData: Omit<Package, 'id'>) => void;
  onUpdatePackage: (pkg: Package) => void;
  onDeletePackage: (packageId: string) => void;
}

const PackagesManagement: React.FC<PackagesManagementProps> = ({ packages, onAddPackage, onUpdatePackage, onDeletePackage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | undefined>(undefined);
  const [deletingPackage, setDeletingPackage] = useState<Package | null>(null);

  const openAddModal = () => {
    setEditingPackage(undefined);
    setIsModalOpen(true);
  };
  
  const openEditModal = (pkg: Package) => {
    setEditingPackage(pkg);
    setIsModalOpen(true);
  };
  
  const handleFormSubmit = (packageData: Omit<Package, 'id'> | Package) => {
    if ('id' in packageData) {
      onUpdatePackage(packageData);
    } else {
      onAddPackage(packageData);
    }
    setIsModalOpen(false);
    setEditingPackage(undefined);
  };

  const handleDeleteConfirm = () => {
    if(deletingPackage) {
      onDeletePackage(deletingPackage.id);
      setDeletingPackage(null);
    }
  }

  return (
    <div className="p-6 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">إدارة الباقات والأسعار</h1>
        <button onClick={openAddModal} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors">
          <i className="fa-solid fa-plus mr-2"></i> إضافة باقة جديدة
        </button>
      </div>
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right text-gray-300">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">اسم الباقة</th>
                <th scope="col" className="px-6 py-3">نوع التدريب</th>
                <th scope="col" className="px-6 py-3">عدد الحصص</th>
                <th scope="col" className="px-6 py-3">السعر (ريال)</th>
                <th scope="col" className="px-6 py-3">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{pkg.name}</td>
                  <td className="px-6 py-4">{pkg.type}</td>
                  <td className="px-6 py-4">{pkg.sessions}</td>
                  <td className="px-6 py-4 font-mono">{pkg.price.toFixed(2)}</td>
                  <td className="px-6 py-4 flex items-center gap-4">
                    <button onClick={() => openEditModal(pkg)} className="text-blue-400 hover:text-blue-300"><i className="fas fa-edit mr-1"></i> تعديل</button>
                    <button onClick={() => setDeletingPackage(pkg)} className="text-red-400 hover:text-red-300"><i className="fas fa-trash-alt mr-1"></i> حذف</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingPackage ? 'تعديل بيانات الباقة' : 'إضافة باقة جديدة'}>
        <PackageForm
          onSubmit={handleFormSubmit}
          onClose={() => setIsModalOpen(false)}
          initialData={editingPackage}
        />
      </Modal>

      <ConfirmationDialog 
        isOpen={!!deletingPackage}
        onClose={() => setDeletingPackage(null)}
        onConfirm={handleDeleteConfirm}
        title="تأكيد الحذف"
        message={`هل أنت متأكد من رغبتك في حذف باقة ${deletingPackage?.name}؟`}
      />
    </div>
  );
};

export default PackagesManagement;
