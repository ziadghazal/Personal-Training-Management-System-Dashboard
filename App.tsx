import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TrainersManagement from './components/TrainersManagement';
import ClientsManagement from './components/ClientsManagement';
import PackagesManagement from './components/PackagesManagement';
import Settings from './components/Settings';
import ErrorBoundary from './components/ErrorBoundary';
import NotificationDropdown from './components/NotificationDropdown';
import Toast from './components/Toast';
import { BellIcon, SpinnerIcon, LanguageIcon } from './components/icons';
import { UserRole, Notification, User, Package, Booking } from './types';
import * as api from './services/api';
import i18n from './i18n';

type StatCardColors = {
  trainers: string;
  clients: string;
  packages: string;
  revenue: string;
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState(() => localStorage.getItem('currentView') || 'dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  
  const [users, setUsers] = useState<User[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' as 'success' | 'error' });
  const [statCardColors, setStatCardColors] = useState<StatCardColors>({
    trainers: 'bg-blue-500',
    clients: 'bg-green-500',
    packages: 'bg-yellow-500',
    revenue: 'bg-red-500',
  });
  const [theme, setTheme] = useState(() => (localStorage.getItem('theme') as 'light' | 'dark') || 'dark');
  const [language, setLanguage] = useState<'en' | 'ar'>(i18n.language as 'en' | 'ar');

  const t = i18n.t.bind(i18n);

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
    document.body.classList.toggle('bg-gray-100', theme === 'light');
    document.body.classList.toggle('text-gray-800', theme === 'light');
    document.body.classList.toggle('bg-gray-900', theme === 'dark');
    document.body.classList.toggle('text-gray-100', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    i18n.changeLanguage(language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const changeView = (view: string) => {
    setCurrentView(view);
    localStorage.setItem('currentView', view);
  };

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [usersData, packagesData, bookingsData] = await Promise.all([
        api.fetchUsers(),
        api.fetchPackages(),
        api.fetchBookings(),
      ]);
      setUsers(usersData);
      setPackages(packagesData);
      setBookings(bookingsData);
    } catch (err) {
      setError(t('error_loading_data'));
      showToast(t('error_loading_data'), 'error');
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const NOTIFICATION_THRESHOLD_SESSIONS = 2;

    const expiringClients = users.filter(
      (user) =>
        user.role === UserRole.Client &&
        user.sessionsLeft !== undefined &&
        user.sessionsLeft <= NOTIFICATION_THRESHOLD_SESSIONS
    );

    const generatedNotifications: Notification[] = expiringClients.map((client) => ({
      id: `notif-${client.id}`,
      clientId: client.id,
      clientName: client.name,
      packageName: packages.find(p => p.id === client.packageId)?.name || t('unknown_package'),
      sessionsLeft: client.sessionsLeft!,
    }));

    setNotifications(generatedNotifications);
  }, [users, packages, t]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, message, type });
  };
  
  const handleAddTrainer = async (trainerData: Omit<User, 'id' | 'role' | 'joinDate'>) => {
    try {
      await api.addTrainer(trainerData);
      await fetchData();
      showToast(t('toast_add_trainer_success'));
    } catch (err) {
      showToast((err as Error).message, 'error');
      throw err;
    }
  };

  const handleUpdateTrainer = async (updatedTrainer: User) => {
    try {
        await api.updateTrainer(updatedTrainer);
        await fetchData();
        showToast(t('toast_update_trainer_success'));
    } catch (err) {
        showToast((err as Error).message, 'error');
        throw err;
    }
  };

  const handleDeleteTrainer = async (trainerId: string) => {
    try {
      await api.deleteTrainer(trainerId);
      await fetchData();
      showToast(t('toast_delete_trainer_success'));
    } catch(err) {
       showToast((err as Error).message, 'error');
       throw err;
    }
  };
  
  const handleUpdateClient = async (updatedClient: User) => {
    try {
        await api.updateClient(updatedClient);
        await fetchData();
        showToast(t('toast_update_client_success'));
    } catch(err) {
        showToast((err as Error).message, 'error');
        throw err;
    }
  };

  const handleAddPackage = async (packageData: Omit<Package, 'id'>) => {
    try {
      await api.addPackage(packageData);
      await fetchData();
      showToast(t('toast_add_package_success'));
    } catch (err) {
        showToast((err as Error).message, 'error');
        throw err;
    }
  };

  const handleUpdatePackage = async (updatedPackage: Package) => {
    try {
      await api.updatePackage(updatedPackage);
      await fetchData();
      showToast(t('toast_update_package_success'));
    } catch(err) {
        showToast((err as Error).message, 'error');
        throw err;
    }
  };

  const handleDeletePackage = async (packageId: string) => {
    try {
      await api.deletePackage(packageId);
      await fetchData();
      showToast(t('toast_delete_package_success'));
    } catch (err) {
      showToast((err as Error).message, 'error');
      throw err;
    }
  };


  const handleSendReminder = (notificationId: string) => {
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
      setNotifications(notifications.filter((n) => n.id !== notificationId));
      showToast(`${t('toast_reminder_sent_to')} ${notification.clientName}`);
    }
  };

  const handleUpdateStatCardColors = (newColors: StatCardColors) => {
    setStatCardColors(newColors);
    showToast(t('toast_colors_updated'));
  };

  const renderView = useCallback(() => {
    const trainers = users.filter(u => u.role === UserRole.Trainer);
    const clients = users.filter(u => u.role === UserRole.Client);

    switch (currentView) {
      case 'dashboard':
        return <Dashboard 
                  users={users} 
                  packages={packages} 
                  bookings={bookings}
                  statCardColors={statCardColors}
                  onUpdateColors={handleUpdateStatCardColors}
                  t={t}
                />;
      case 'trainers':
        return <TrainersManagement 
                  trainers={trainers}
                  onAddTrainer={handleAddTrainer}
                  onUpdateTrainer={handleUpdateTrainer}
                  onDeleteTrainer={handleDeleteTrainer}
                  t={t}
                />;
      case 'clients':
        return <ClientsManagement 
                  clients={clients} 
                  packages={packages} 
                  onUpdateClient={handleUpdateClient}
                  t={t}
                />;
      case 'packages':
        return <PackagesManagement 
                  packages={packages}
                  onAddPackage={handleAddPackage}
                  onUpdatePackage={handleUpdatePackage}
                  onDeletePackage={handleDeletePackage}
                  t={t}
                />;
      case 'settings':
        return <Settings theme={theme} setTheme={setTheme} t={t}/>;
      default:
        return <Dashboard users={users} packages={packages} bookings={bookings} statCardColors={statCardColors} onUpdateColors={handleUpdateStatCardColors} t={t} />;
    }
  }, [currentView, users, packages, bookings, statCardColors, t]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  
  const MainContent = () => {
    if (isLoading) {
      return (
        <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
                <SpinnerIcon className="h-12 w-12 text-blue-500 mx-auto"/>
                <p className="mt-4 text-xl">{t('loading_data')}</p>
            </div>
        </div>
      );
    }
     if (error) {
      return (
        <div className="flex-1 flex items-center justify-center">
             <div className="text-center text-red-400">
                <i className="fa-solid fa-exclamation-triangle fa-3x mx-auto"></i>
                <p className="mt-4 text-xl">{error}</p>
                 <button onClick={fetchData} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                    {t('retry')}
                </button>
            </div>
        </div>
      );
    }
    return <main className="flex-1 overflow-x-hidden overflow-y-auto"><ErrorBoundary t={t}>{renderView()}</ErrorBoundary></main>;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <Sidebar currentView={currentView} setCurrentView={changeView} isSidebarOpen={isSidebarOpen} t={t} language={language} />
      <div className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? (language === 'ar' ? 'mr-64' : 'ml-64') : ''}`}>
        <div className="flex flex-col h-screen">
            <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center relative z-20">
              <button onClick={toggleSidebar} className="text-gray-800 dark:text-white text-xl">
                 <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
              </button>
              <div className="flex items-center gap-4">
                 <div className="relative">
                    <button
                        onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                        className="text-gray-800 dark:text-white text-xl"
                        aria-label="Change Language"
                    >
                        <LanguageIcon />
                    </button>
                 </div>
                 <button
                    onClick={() => setNotificationOpen(!isNotificationOpen)}
                    className="relative text-gray-800 dark:text-white text-xl"
                    aria-label="Notifications"
                 >
                    <BellIcon />
                    {notifications.length > 0 && (
                      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                        {notifications.length}
                      </span>
                    )}
                </button>
                <span className="text-gray-800 dark:text-white">{t('welcome_admin')}</span>
                <img className="h-10 w-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=200&h=200" alt="Admin Avatar" />
              </div>
            </header>
            
            <MainContent/>
        </div>
      </div>
        
      {isNotificationOpen && (
        <NotificationDropdown
          notifications={notifications}
          onSendReminder={handleSendReminder}
          onClose={() => setNotificationOpen(false)}
          t={t}
        />
      )}
      
      <Toast 
          message={toast.message} 
          show={toast.show} 
          onClose={() => setToast({ ...toast, show: false })}
          type={toast.type}
      />
    </div>
  );
};

export default App;