import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TrainersManagement from './components/TrainersManagement';
import ClientsManagement from './components/ClientsManagement';
import PackagesManagement from './components/PackagesManagement';
import NotificationDropdown from './components/NotificationDropdown';
import Toast from './components/Toast';
import { BellIcon } from './components/icons';
import { UserRole, Notification, User, Package } from './types';
import { mockUsers, mockPackages } from './data/mockData';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [packages, setPackages] = useState<Package[]>(mockPackages);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' as 'success' | 'error' });

  useEffect(() => {
    const expiringClients = users.filter(
      (user) => user.role === UserRole.Client && user.sessionsLeft && user.sessionsLeft <= 2
    );

    const generatedNotifications: Notification[] = expiringClients.map((client) => ({
      id: `notif-${client.id}`,
      clientId: client.id,
      clientName: client.name,
      packageName: packages.find(p => p.id === client.packageId)?.name || 'باقة غير معروفة',
      sessionsLeft: client.sessionsLeft!,
    }));

    setNotifications(generatedNotifications);
  }, [users, packages]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, message, type });
  };
  
  // --- CRUD Handlers ---

  const handleAddTrainer = (trainerData: Omit<User, 'id' | 'role' | 'joinDate'>) => {
    const newTrainer: User = {
      ...trainerData,
      id: `t${Date.now()}`,
      role: UserRole.Trainer,
      joinDate: new Date().toISOString().split('T')[0],
    };
    setUsers([...users, newTrainer]);
    showToast('تمت إضافة المدرب بنجاح');
  };

  const handleUpdateTrainer = (updatedTrainer: User) => {
    setUsers(users.map(user => user.id === updatedTrainer.id ? updatedTrainer : user));
    showToast('تم تحديث بيانات المدرب بنجاح');
  };

  const handleDeleteTrainer = (trainerId: string) => {
    setUsers(users.filter(user => user.id !== trainerId));
    showToast('تم حذف المدرب بنجاح');
  };
  
  const handleUpdateClient = (updatedClient: User) => {
    setUsers(users.map(user => user.id === updatedClient.id ? updatedClient : user));
    showToast('تم تحديث بيانات العميل بنجاح');
  };

  const handleAddPackage = (packageData: Omit<Package, 'id'>) => {
    const newPackage: Package = {
      ...packageData,
      id: `p${Date.now()}`,
    };
    setPackages([...packages, newPackage]);
    showToast('تمت إضافة الباقة بنجاح');
  };

  const handleUpdatePackage = (updatedPackage: Package) => {
    setPackages(packages.map(pkg => pkg.id === updatedPackage.id ? updatedPackage : pkg));
    showToast('تم تحديث بيانات الباقة بنجاح');
  };

  const handleDeletePackage = (packageId: string) => {
    setPackages(packages.filter(pkg => pkg.id !== packageId));
    showToast('تم حذف الباقة بنجاح');
  };


  const handleSendReminder = (notificationId: string) => {
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
      setNotifications(notifications.filter((n) => n.id !== notificationId));
      showToast(`تم إرسال تذكير إلى ${notification.clientName}`);
    }
  };

  const renderView = useCallback(() => {
    const trainers = users.filter(u => u.role === UserRole.Trainer);
    const clients = users.filter(u => u.role === UserRole.Client);

    switch (currentView) {
      case 'dashboard':
        return <Dashboard users={users} packages={packages}/>;
      case 'trainers':
        return <TrainersManagement 
                  trainers={trainers}
                  onAddTrainer={handleAddTrainer}
                  onUpdateTrainer={handleUpdateTrainer}
                  onDeleteTrainer={handleDeleteTrainer}
                />;
      case 'clients':
        return <ClientsManagement 
                  clients={clients} 
                  packages={packages} 
                  onUpdateClient={handleUpdateClient}
                />;
      case 'packages':
        return <PackagesManagement 
                  packages={packages}
                  onAddPackage={handleAddPackage}
                  onUpdatePackage={handleUpdatePackage}
                  onDeletePackage={handleDeletePackage}
                />;
      default:
        return <Dashboard users={users} packages={packages}/>;
    }
  }, [currentView, users, packages]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} isSidebarOpen={isSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gray-800 shadow-md p-4 flex justify-between items-center">
          <button onClick={toggleSidebar} className="text-white text-xl">
             <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
          <div className="flex items-center gap-4">
             <button
                onClick={() => setNotificationOpen(!isNotificationOpen)}
                className="relative text-white text-xl"
                aria-label="Notifications"
             >
                <BellIcon />
                {notifications.length > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {notifications.length}
                  </span>
                )}
            </button>
            <span className="text-white">مرحباً, مدير النظام</span>
            <img className="h-10 w-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=200&h=200" alt="Admin Avatar" />
          </div>
        </header>
        
        {isNotificationOpen && (
          <NotificationDropdown
            notifications={notifications}
            onSendReminder={handleSendReminder}
            onClose={() => setNotificationOpen(false)}
          />
        )}
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900">
          {renderView()}
        </main>
        
        <Toast 
            message={toast.message} 
            show={toast.show} 
            onClose={() => setToast({ ...toast, show: false })}
            type={toast.type}
        />
      </div>
    </div>
  );
};

export default App;