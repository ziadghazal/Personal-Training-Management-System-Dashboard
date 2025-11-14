import { User, Package, UserRole, TrainingType, Booking, BookingStatus } from '../types';

export const mockUsers: User[] = [
  { id: 't1', name: 'أحمد محمود', role: UserRole.Trainer, city: 'الرياض', specialization: 'لياقة بدنية', joinDate: '2023-01-15' },
  { id: 't2', name: 'خالد الغامدي', role: UserRole.Trainer, city: 'جدة', specialization: 'EMS', joinDate: '2023-02-20' },
  { id: 't3', name: 'سارة عبد العزيز', role: UserRole.Trainer, city: 'الدمام', specialization: 'Platten', joinDate: '2023-03-10' },
  { id: 'c1', name: 'فاطمة علي', role: UserRole.Client, city: 'الرياض', packageId: 'p2', sessionsLeft: 6, joinDate: '2024-05-01' },
  { id: 'c2', name: 'محمد صالح', role: UserRole.Client, city: 'جدة', packageId: 'p3', sessionsLeft: 10, joinDate: '2024-05-15' },
  { id: 'c3', name: 'علي حسن', role: UserRole.Client, city: 'الرياض', packageId: 'p1', sessionsLeft: 2, joinDate: '2024-06-01' },
  { id: 'c4', name: 'نورة خالد', role: UserRole.Client, city: 'الدمام', packageId: 'p4', sessionsLeft: 1, joinDate: '2024-06-05' },
];

export const mockPackages: Package[] = [
  { id: 'p1', name: 'باقة البداية', type: TrainingType.Normal, sessions: 4, price: 400 },
  { id: 'p2', name: 'باقة اللياقة', type: TrainingType.Normal, sessions: 8, price: 750 },
  { id: 'p3', name: 'باقة EMS الذهبية', type: TrainingType.EMS, sessions: 12, price: 1500 },
  { id: 'p4', name: 'باقة Platten المكثفة', type: TrainingType.Platten, sessions: 4, price: 600 },
  { id: 'p5', name: 'باقة تجريبية', type: TrainingType.Normal, sessions: 1, price: 120 },
];

export const mockBookings: Booking[] = [
    { 
        id: 'b1', 
        clientId: 'c1',
        clientName: 'فاطمة علي',
        trainerId: 't1',
        trainerName: 'أحمد محمود',
        bookingDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // ~2 hours from now
        status: BookingStatus.Confirmed 
    },
    { 
        id: 'b2', 
        clientId: 'c2',
        clientName: 'محمد صالح',
        trainerId: 't2',
        trainerName: 'خالد الغامدي',
        bookingDate: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // ~4 hours from now
        status: BookingStatus.Confirmed 
    },
    { 
        id: 'b3', 
        clientId: 'c4',
        clientName: 'نورة خالد',
        trainerId: 't3',
        trainerName: 'سارة عبد العزيز',
        bookingDate: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // ~6 hours from now
        status: BookingStatus.Pending 
    },
];
