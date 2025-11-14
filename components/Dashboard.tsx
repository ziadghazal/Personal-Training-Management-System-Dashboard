import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { User, Package, UserRole, Booking, BookingStatus } from '../types';
import Modal from './Modal';
import { PaletteIcon } from './icons';

// Define a type for the colors object for better type safety
type StatCardColors = {
  trainers: string;
  clients: string;
  packages: string;
  revenue: string;
};

// New Form Component for Color Customization
interface ColorFormProps {
  currentColors: StatCardColors;
  onSubmit: (newColors: StatCardColors) => void;
  onClose: () => void;
}

const ColorCustomizationForm: React.FC<ColorFormProps> = ({ currentColors, onSubmit, onClose }) => {
  const [colors, setColors] = useState<StatCardColors>(currentColors);

  const handleChange = (card: keyof StatCardColors, value: string) => {
    setColors(prev => ({ ...prev, [card]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(colors);
  };
  
  const cardLabels: Record<keyof StatCardColors, string> = {
      trainers: 'بطاقة المدربين',
      clients: 'بطاقة العملاء',
      packages: 'بطاقة الباقات',
      revenue: 'بطاقة الأرباح',
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm text-gray-400">
        أدخل أسماء أصناف Tailwind CSS للألوان (مثال: <code className="bg-gray-700 px-1 rounded">bg-purple-600</code>).
      </p>
      {Object.keys(colors).map((key) => (
        <div key={key}>
          <label htmlFor={`color-${key}`} className="block mb-2 text-sm font-medium text-gray-300">{cardLabels[key as keyof StatCardColors]}</label>
          <input 
            type="text" 
            id={`color-${key}`} 
            value={colors[key as keyof StatCardColors]} 
            onChange={e => handleChange(key as keyof StatCardColors, e.target.value)} 
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-mono" 
            required 
          />
        </div>
      ))}
      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition-colors">إلغاء</button>
        <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors">حفظ التغييرات</button>
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
}

const data = [
  { name: 'يناير', "اشتراكات": 30, "أرباح": 15000 },
  { name: 'فبراير', "اشتراكات": 45, "أرباح": 22000 },
  { name: 'مارس', "اشتراكات": 50, "أرباح": 26000 },
  { name: 'أبريل', "اشتراكات": 62, "أرباح": 31000 },
  { name: 'مايو', "اشتراكات": 70, "أرباح": 38000 },
  { name: 'يونيو', "اشتراكات": 85, "أرباح": 45000 },
];

const StatCard: React.FC<{ title: string; value: string | number; icon: string; color: string }> = ({ title, value, icon, color }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center">
    <div className={`p-4 rounded-full ${color} mr-4`}>
        <i className={`${icon} fa-2x text-white`}></i>
    </div>
    <div>
      <h3 className="text-gray-400 text-lg font-medium">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  </div>
);

const getStatusBadge = (status: BookingStatus) => {
    switch(status) {
        case BookingStatus.Confirmed:
            return <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-900 text-green-300">مؤكد</span>;
        case BookingStatus.Pending:
            return <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-yellow-900 text-yellow-300">قيد الانتظار</span>;
        case BookingStatus.Cancelled:
            return <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-red-900 text-red-300">ملغي</span>;
    }
}

const Dashboard: React.FC<DashboardProps> = ({ users, packages, bookings, statCardColors, onUpdateColors }) => {
    const [isColorModalOpen, setIsColorModalOpen] = useState(false);
    const totalTrainers = users.filter(u => u.role === UserRole.Trainer).length;
    const totalClients = users.filter(u => u.role === UserRole.Client).length;
    const totalPackages = packages.length;
    const totalRevenue = "45,000 ريال"; // Mock data
    
    const handleColorFormSubmit = (newColors: StatCardColors) => {
      onUpdateColors(newColors);
      setIsColorModalOpen(false);
    }


  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">لوحة التحكم الرئيسية</h1>
        <button 
          onClick={() => setIsColorModalOpen(true)} 
          className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-lg shadow-md"
        >
          <PaletteIcon className="h-5 w-5"/>
          <span>تخصيص الألوان</span>
        </button>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="إجمالي المدربين" value={totalTrainers} icon="fa-solid fa-dumbbell" color={statCardColors.trainers} />
        <StatCard title="إجمالي العملاء" value={totalClients} icon="fa-solid fa-users" color={statCardColors.clients} />
        <StatCard title="إجمالي الباقات" value={totalPackages} icon="fa-solid fa-box-archive" color={statCardColors.packages} />
        <StatCard title="الأرباح الشهرية" value={totalRevenue} icon="fa-solid fa-sack-dollar" color={statCardColors.revenue} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">نظرة عامة على الاشتراكات والأرباح</h2>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <BarChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis yAxisId="left" orientation="left" stroke="#9CA3AF" />
                <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563' }}
                  labelStyle={{ color: '#F9FAFB' }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="اشتراكات" fill="#3B82F6" />
                <Bar yAxisId="right" dataKey="أرباح" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming Bookings */}
        <div className="lg:col-span-1 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
            <i className="fa-solid fa-calendar-check mr-3 text-blue-400"></i>
            الحجوزات القادمة
          </h2>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {bookings.sort((a,b) => new Date(a.bookingDate).getTime() - new Date(b.bookingDate).getTime()).map(booking => (
                <div key={booking.id} className="p-4 bg-gray-700/50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-white">{booking.clientName}</span>
                        {getStatusBadge(booking.status)}
                    </div>
                    <p className="text-sm text-gray-400">
                        مع المدرب: <span className="text-gray-300">{booking.trainerName}</span>
                    </p>
                    <p className="text-sm text-gray-400">
                        <i className="fa-regular fa-clock ml-2"></i>
                        {new Date(booking.bookingDate).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={isColorModalOpen} onClose={() => setIsColorModalOpen(false)} title="تخصيص ألوان البطاقات الإحصائية">
        <ColorCustomizationForm 
            currentColors={statCardColors}
            onSubmit={handleColorFormSubmit}
            onClose={() => setIsColorModalOpen(false)}
        />
      </Modal>

    </div>
  );
};

export default Dashboard;