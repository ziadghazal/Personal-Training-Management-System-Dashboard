import React, { useState } from 'react';
import { User, Package } from '../types';
import Modal from './Modal';
import { SpinnerIcon } from './icons';

interface ClientFormProps {
  onSubmit: (client: User) => Promise<void>;
  onClose: () => void;
  client: User;
  packages: Package[];
  t: (key: string) => string;
}

const ClientForm: React.FC<ClientFormProps> = ({ onSubmit, onClose, client, packages, t }) => {
  const [packageId, setPackageId] = useState(client.packageId || '');
  const [sessionsLeft, setSessionsLeft] = useState(client.sessionsLeft || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({ ...client, packageId, sessionsLeft });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">{t('client_name')}</label>
        <input type="text" id="name" value={client.name} className="bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white text-sm rounded-lg block w-full p-2.5" disabled />
      </div>
       <div>
        <label htmlFor="package" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">{t('current_package')}</label>
        <select id="package" value={packageId} onChange={e => setPackageId(e.target.value)} className="bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" disabled={isSubmitting}>
          <option value="">{t('select_package')}</option>
          {packages.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>
       <div>
        <label htmlFor="sessionsLeft" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">{t('sessions_left')}</label>
        <input type="number" id="sessionsLeft" value={sessionsLeft} onChange={e => setSessionsLeft(parseInt(e.target.value, 10))} className="bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required min="0" disabled={isSubmitting} />
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white transition-colors" disabled={isSubmitting}>{t('cancel')}</button>
        <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center justify-center w-36" disabled={isSubmitting}>
            {isSubmitting ? <SpinnerIcon/> : t('save_changes')}
        </button>
      </div>
    </form>
  )
}

interface ClientsManagementProps {
  clients: User[];
  packages: Package[];
  onUpdateClient: (client: User) => Promise<void>;
  t: (key: string, options?: any) => string;
}

const ClientsManagement: React.FC<ClientsManagementProps> = ({ clients, packages, onUpdateClient, t }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const getPackageName = (packageId?: string) => {
    return packages.find(p => p.id === packageId)?.name || t('unsubscribed');
  };
  
  const openEditModal = (client: User) => {
    setEditingClient(client);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (client: User) => {
    await onUpdateClient(client);
    setIsModalOpen(false);
    setEditingClient(null);
  };

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t('clients_management_title')}</h1>
        <div className="relative">
            <input 
                type="text"
                placeholder={t('search_client_placeholder')}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 pe-10"
            />
            <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                <i className="fa-solid fa-search text-gray-400"></i>
            </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-300">
            <thead className="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">{t('client_name')}</th>
                <th scope="col" className="px-6 py-3">{t('city')}</th>
                <th scope="col" className="px-6 py-3">{t('current_package')}</th>
                <th scope="col" className="px-6 py-3">{t('sessions_left')}</th>
                <th scope="col" className="px-6 py-3">{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{client.name}</td>
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
                     <button className="text-green-500 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"><i className="fas fa-qrcode me-1"></i> {t('show_qr')}</button>
                    <button onClick={() => openEditModal(client)} className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"><i className="fas fa-edit me-1"></i> {t('edit')}</button>
                  </td>
                </tr>
              ))}
                {filteredClients.length === 0 && (
                    <tr>
                        <td colSpan={5} className="text-center py-8 text-gray-400 dark:text-gray-400 text-gray-500">
                            {t('no_clients_found')}
                        </td>
                    </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
      
      {editingClient && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`${t('modal_edit_client_title')}: ${editingClient.name}`}>
          <ClientForm 
            client={editingClient}
            packages={packages}
            onSubmit={handleFormSubmit}
            onClose={() => setIsModalOpen(false)}
            t={t}
          />
        </Modal>
      )}
    </div>
  );
};

export default ClientsManagement;