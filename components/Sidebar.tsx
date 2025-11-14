
import React from 'react';
import { DashboardIcon, TrainersIcon, ClientsIcon, PackagesIcon, ReportsIcon, SettingsIcon } from './icons';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  isSidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isSidebarOpen }) => {
  const navItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: DashboardIcon },
    { id: 'trainers', label: 'إدارة المدربين', icon: TrainersIcon },
    { id: 'clients', label: 'إدارة العملاء', icon: ClientsIcon },
    { id: 'packages', label: 'إدارة الباقات', icon: PackagesIcon },
    { id: 'reports', label: 'التقارير المالية', icon: ReportsIcon },
    { id: 'settings', label: 'الإعدادات', icon: SettingsIcon },
  ];

  const baseClasses = 'flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-500 hover:bg-opacity-80 focus:bg-blue-500 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-white focus:text-white active:text-gray-900 outline-none';
  const activeClasses = 'bg-blue-600 text-white shadow-md';

  return (
    <aside className={`bg-gray-800 text-white h-screen transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-0 overflow-hidden'}`}>
      <div className="p-4 mb-2">
        <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-white">
          نظام التدريب
        </h5>
      </div>
      <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`${baseClasses} ${currentView === item.id ? activeClasses : 'text-gray-300'}`}
          >
            <div className="grid place-items-center me-4">
              <item.icon className="h-5 w-5" />
            </div>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
