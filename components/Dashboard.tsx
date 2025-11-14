import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { User, Package, UserRole } from '../types';

interface DashboardProps {
  users: User[];
  packages: Package[];
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

const Dashboard: React.FC<DashboardProps> = ({ users, packages }) => {
    const totalTrainers = users.filter(u => u.role === UserRole.Trainer).length;
    const totalClients = users.filter(u => u.role === UserRole.Client).length;
    const totalPackages = packages.length;
    const totalRevenue = "45,000 ريال"; // Mock data

  return (
    <div className="p-6 md:p-8 space-y-8">
      <h1 className="text-3xl font-bold text-white">لوحة التحكم الرئيسية</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="إجمالي المدربين" value={totalTrainers} icon="fa-solid fa-dumbbell" color="bg-blue-500" />
        <StatCard title="إجمالي العملاء" value={totalClients} icon="fa-solid fa-users" color="bg-green-500" />
        <StatCard title="إجمالي الباقات" value={totalPackages} icon="fa-solid fa-box-archive" color="bg-yellow-500" />
        <StatCard title="الأرباح الشهرية" value={totalRevenue} icon="fa-solid fa-sack-dollar" color="bg-red-500" />
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
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
    </div>
  );
};

export default Dashboard;
