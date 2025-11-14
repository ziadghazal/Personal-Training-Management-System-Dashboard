import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { User, Package, UserRole, Booking, BookingStatus } from '../types';
import Modal from './Modal';
import { PaletteIcon } from './icons';
// Fix: Import i18n to access its 'language' property for date localization.
import i18n from '../i18n';

type StatCardColors = {
  trainers: string;
  clients: string;
  packages: string;
  revenue: string;
};

interface ColorFormProps {
  currentColors: StatCardColors;
  onSubmit: (newColors: StatCardColors) => void;
  onClose: () => void;
  t: (key: string) => string;
}

const ColorCustomizationForm: React.FC<ColorFormProps> = ({ currentColors, onSubmit, onClose, t }) => {
  const [colors, setColors] = useState<StatCardColors>(currentColors);

  const handleChange = (card: keyof StatCardColors, value: string) => {
    setColors(prev => ({ ...prev, [card]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(colors);
  };
  
  const cardLabels: Record<keyof StatCardColors, string> = {
      trainers: t('color_form_trainers'),
      clients: t('color_form_clients'),
      packages: t('color_form_packages'),
      revenue: t('color_form_revenue'),
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm text-gray-400 dark:text-gray-400 text-gray-600">
        {t('color_form_helper_text')} <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">bg-purple-600</code>.
      </p>
      {Object.keys(colors).map((key) => (
        <div key={key}>
          <label htmlFor={`color-${key}`} className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">{cardLabels[key as keyof StatCardColors]}</label>
          <input 
            type="text" 
            id={`color-${key}`} 
            value={colors[key as keyof StatCardColors]} 
            onChange={e => handleChange(key as keyof StatCardColors, e.target.value)} 
            className="bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-mono" 
            required 
          />
        </div>
      ))}
      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white transition-colors">{t('cancel')}</button>
        <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors">{t('save_changes')}</button>
      </div>
    </form>
  )
}

interface DashboardProps {
  users: User[];
  packages: Package[];
  bookings: Booking[];
  statCardColors: StatCardColors;
  onUpdateColors: (newColors: StatCardColors) => void;
  t: (key: string, options?: any) => string;
}

const StatCard: React.FC<{ title: string; value: string | number; icon: string; color: string }> = ({ title, value, icon, color }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex items-center">
    <div className={`p-4 rounded-full ${color} me-4`}>
        <i className={`${icon} fa-2x text-white`}></i>
    </div>
    <div>
      <h3 className="text-gray-500 dark:text-gray-400 text-lg font-medium">{title}</h3>
      <p className="text-3xl font-bold text-gray-800 dark:text-white">{value}</p>
    </div>
  </div>
);

const getStatusBadge = (status: BookingStatus, t: (key: string) => string) => {
    switch(status) {
        case BookingStatus.Confirmed:
            return <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-900 text-green-300">{t('status_confirmed')}</span>;
        case BookingStatus.Pending:
            return <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-yellow-900 text-yellow-300">{t('status_pending')}</span>;
        case BookingStatus.Cancelled:
            return <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-red-900 text-red-300">{t('status_cancelled')}</span>;
    }
}

const Dashboard: React.FC<DashboardProps> = ({ users, packages, bookings, statCardColors, onUpdateColors, t }) => {
    const [isColorModalOpen, setIsColorModalOpen] = useState(false);
    const totalTrainers = users.filter(u => u.role === UserRole.Trainer).length;
    const totalClients = users.filter(u => u.role === UserRole.Client).length;
    const totalPackages = packages.length;
    const totalRevenue = t('currency_format', { val: 45000 });

    const data = [
      { name: t('month_jan'), [t('chart_subscriptions')]: 30, [t('chart_revenue')]: 15000 },
      { name: t('month_feb'), [t('chart_subscriptions')]: 45, [t('chart_revenue')]: 22000 },
      { name: t('month_mar'), [t('chart_subscriptions')]: 50, [t('chart_revenue')]: 26000 },
      { name: t('month_apr'), [t('chart_subscriptions')]: 62, [t('chart_revenue')]: 31000 },
      { name: t('month_may'), [t('chart_subscriptions')]: 70, [t('chart_revenue')]: 38000 },
      { name: t('month_jun'), [t('chart_subscriptions')]: 85, [t('chart_revenue')]: 45000 },
    ];
    
    const handleColorFormSubmit = (newColors: StatCardColors) => {
      onUpdateColors(newColors);
      setIsColorModalOpen(false);
    }

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('dashboard_title')}</h1>
        <button 
          onClick={() => setIsColorModalOpen(true)} 
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2 bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-lg shadow-md"
        >
          <PaletteIcon className="h-5 w-5"/>
          <span>{t('customize_colors')}</span>
        </button>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title={t('stat_total_trainers')} value={totalTrainers} icon="fa-solid fa-dumbbell" color={statCardColors.trainers} />
        <StatCard title={t('stat_total_clients')} value={totalClients} icon="fa-solid fa-users" color={statCardColors.clients} />
        <StatCard title={t('stat_total_packages')} value={totalPackages} icon="fa-solid fa-box-archive" color={statCardColors.packages} />
        <StatCard title={t('stat_monthly_revenue')} value={totalRevenue} icon="fa-solid fa-sack-dollar" color={statCardColors.revenue} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">{t('chart_title')}</h2>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <BarChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis yAxisId="left" orientation="left" stroke="#9CA3AF" />
                <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563' }}
                  labelStyle={{ color: '#F9FAFB' }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey={t('chart_subscriptions')} fill="#3B82F6" />
                <Bar yAxisId="right" dataKey={t('chart_revenue')} fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <i className="fa-solid fa-calendar-check me-3 text-blue-400"></i>
            {t('upcoming_bookings')}
          </h2>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {bookings.sort((a,b) => new Date(a.bookingDate).getTime() - new Date(b.bookingDate).getTime()).map(booking => (
                <div key={booking.id} className="p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-gray-800 dark:text-white">{booking.clientName}</span>
                        {getStatusBadge(booking.status, t)}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t('with_trainer')}: <span className="text-gray-700 dark:text-gray-300">{booking.trainerName}</span>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        <i className="fa-regular fa-clock ml-2"></i>
                        {new Date(booking.bookingDate).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={isColorModalOpen} onClose={() => setIsColorModalOpen(false)} title={t('modal_customize_colors_title')}>
        <ColorCustomizationForm 
            currentColors={statCardColors}
            onSubmit={handleColorFormSubmit}
            onClose={() => setIsColorModalOpen(false)}
            t={t}
        />
      </Modal>

    </div>
  );
};

export default Dashboard;