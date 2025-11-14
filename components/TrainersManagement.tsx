import React, { useState } from 'react';
import { User } from '../types';
import Modal from './Modal';
import ConfirmationDialog from './ConfirmationDialog';

// Form Component
interface TrainerFormProps {
  onSubmit: (trainer: Omit<User, 'id' | 'role' | 'joinDate'> | User) => void;
  onClose: () => void;
  initialData?: User;
}

const TrainerForm: React.FC<TrainerFormProps> = ({ onSubmit, onClose, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [city, setCity] = useState(initialData?.city || '');
  const [specialization, setSpecialization] = useState(initialData?.specialization || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(initialData ? { ...initialData, name, city, specialization } : { name, city, specialization });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">اسم المدرب</label>
        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
      </div>
       <div>
        <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-300">المدينة</label>
        <input type="text" id="city" value={city} onChange={e => setCity(e.target.value)} className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
      </div>
       <div>
        <label htmlFor="specialization" className="block mb-2 text-sm font-medium text-gray-300">التخصص</label>
        <input type="text" id="specialization" value={specialization} onChange={e => setSpecialization(e.target.value)} className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition-colors">إلغاء</button>
        <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors">{initialData ? 'حفظ التغييرات' : 'إضافة مدرب'}</button>
      </div>
    </form>
  )
}


// Main Component
interface TrainersManagementProps {
  trainers: User[];
  onAddTrainer: (trainerData: Omit<User, 'id' | 'role' | 'joinDate'>) => void;
  onUpdateTrainer: (trainer: User) => void;
  onDeleteTrainer: (trainerId: string) => void;
}

const TrainersManagement: React.FC<TrainersManagementProps> = ({ trainers, onAddTrainer, onUpdateTrainer, onDeleteTrainer }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState<User | undefined>(undefined);
  const [deletingTrainer, setDeletingTrainer] = useState<User | null>(null);

  const openAddModal = () => {
    setEditingTrainer(undefined);
    setIsModalOpen(true);
  };
  
  const openEditModal = (trainer: User) => {
    setEditingTrainer(trainer);
    setIsModalOpen(true);
  };
  
  const handleFormSubmit = (trainerData: Omit<User, 'id' | 'role' | 'joinDate'> | User) => {
    if ('id' in trainerData) {
      onUpdateTrainer(trainerData);
    } else {
      onAddTrainer(trainerData);
    }
    setIsModalOpen(false);
    setEditingTrainer(undefined);
  };

  const handleDeleteConfirm = () => {
    if(deletingTrainer) {
      onDeleteTrainer(deletingTrainer.id);
      setDeletingTrainer(null);
    }
  }

  return (
    <div className="p-6 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">إدارة المدربين</h1>
        <button onClick={openAddModal} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors">
          <i className="fa-solid fa-plus mr-2"></i> إضافة مدرب جديد
        </button>
      </div>
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right text-gray-300">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">اسم المدرب</th>
                <th scope="col" className="px-6 py-3">المدينة</th>
                <th scope="col" className="px-6 py-3">التخصص</th>
                <th scope="col" className="px-6 py-3">تاريخ الانضمام</th>
                <th scope="col" className="px-6 py-3">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {trainers.map((trainer) => (
                <tr key={trainer.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{trainer.name}</td>
                  <td className="px-6 py-4">{trainer.city}</td>
                  <td className="px-6 py-4">{trainer.specialization}</td>
                  <td className="px-6 py-4">{trainer.joinDate}</td>
                  <td className="px-6 py-4 flex items-center gap-4">
                    <button onClick={() => openEditModal(trainer)} className="text-blue-400 hover:text-blue-300"><i className="fas fa-edit mr-1"></i> تعديل</button>
                    <button onClick={() => setDeletingTrainer(trainer)} className="text-red-400 hover:text-red-300"><i className="fas fa-trash-alt mr-1"></i> حذف</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingTrainer ? 'تعديل بيانات المدرب' : 'إضافة مدرب جديد'}>
          <TrainerForm 
            onSubmit={handleFormSubmit} 
            onClose={() => setIsModalOpen(false)} 
            initialData={editingTrainer}
          />
      </Modal>

      <ConfirmationDialog 
        isOpen={!!deletingTrainer}
        onClose={() => setDeletingTrainer(null)}
        onConfirm={handleDeleteConfirm}
        title="تأكيد الحذف"
        message={`هل أنت متأكد من رغبتك في حذف المدرب ${deletingTrainer?.name}؟ لا يمكن التراجع عن هذا الإجراء.`}
      />

    </div>
  );
};

export default TrainersManagement;
