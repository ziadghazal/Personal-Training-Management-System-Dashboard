import React, { useState, useEffect } from 'react';
import { User, Package } from '../types';
import Modal from './Modal';

// Form Component
interface ClientFormProps {
  onSubmit: (client: User) => void;
  onClose: () => void;
  client: User;
  packages: Package[];
}

const ClientForm: React.FC<ClientFormProps> = ({ onSubmit, onClose, client, packages }) => {
  const [packageId, setPackageId] = useState(client.packageId || '');
  const [sessionsLeft, setSessionsLeft] = useState(client.sessionsLeft || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...client, packageId, sessionsLeft });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">اسم العميل</label>
        <input type="text" id="name" value={client.name} className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5" disabled />
      </div>
       <div>
        <label htmlFor="package" className="block mb-2 text-sm font-medium text-gray-300">الباقة الحالية</label>
        <select id="package" value={packageId} onChange={e => setPackageId(e.target.value)} className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          <option value="">اختر باقة</option>
          {packages.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>
       <div>
        <label htmlFor="sessionsLeft" className="block mb-2 text-sm font-medium text-gray-300">الحصص المتبقية</label>
        <input type="number" id="sessionsLeft" value={sessionsLeft} onChange={e => setSessionsLeft(parseInt(e.target.value, 10))} className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required min="0" />
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition-colors">إلغاء</button>
        <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors">حفظ التغييرات</button>
      </div>
    </form>
  )
}

// Main Component
interface ClientsManagementProps {
  clients: User[];
  packages: Package[];
  onUpdateClient: (client: User) => void;
}

const ClientsManagement: React.FC<ClientsManagementProps> = ({ clients, packages, onUpdateClient }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<User | null>(null);

  const getPackageName = (packageId?: string) => {
    return packages.find(p => p.id === packageId)?.name || 'غير مشترك';
  };
  
  const openEditModal = (client: User) => {
    setEditingClient(client);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (client: User) => {
    onUpdateClient(client);
    setIsModalOpen(false);
    setEditingClient(null);
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">إدارة العملاء</h1>
      </div>
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right text-gray-300">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">اسم العميل</th>
                <th scope="col" className="px-6 py-3">المدينة</th>
                <th scope="col" className="px-6 py-3">الباقة الحالية</th>
                <th scope="col" className="px-6 py-3">الحصص المتبقية</th>
                <th scope="col" className="px-6 py-3">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{client.name}</td>
                  <td className="px-6 py-4">{client.city}</td>
                  <td className="px-6 py-4">{getPackageName(client.packageId)}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ${
                        client.sessionsLeft && client.sessionsLeft > 5 ? 'bg-green-900 text-green-300' : 
                        client.sessionsLeft && client.sessionsLeft > 2 ? 'bg-yellow-900 text-yellow-300' : 'bg-red-900 text-red-300'
                    }`}>
                      {client.sessionsLeft}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center gap-4">
                     <button className="text-green-400 hover:text-green-300"><i className="fas fa-qrcode mr-1"></i> عرض QR</button>
                    <button onClick={() => openEditModal(client)} className="text-blue-400 hover:text-blue-300"><i className="fas fa-edit mr-1"></i> تعديل</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {editingClient && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`تعديل بيانات: ${editingClient.name}`}>
          <ClientForm 
            client={editingClient}
            packages={packages}
            onSubmit={handleFormSubmit}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default ClientsManagement;
