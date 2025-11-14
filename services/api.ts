// Fix: Import BookingStatus enum to use its members for type safety.
import { User, Package, Booking, UserRole, TrainingType, BookingStatus } from '../types';

// --- MOCK DATABASE ---
// In a real application, this data would live in a database.
// We are mutating this data in memory to simulate backend operations.
let users: User[] = [
  { id: 't1', name: 'أحمد محمود', role: UserRole.Trainer, city: 'الرياض', specialization: 'لياقة بدنية', joinDate: '2023-01-15' },
  { id: 't2', name: 'خالد الغامدي', role: UserRole.Trainer, city: 'جدة', specialization: 'EMS', joinDate: '2023-02-20' },
  { id: 't3', name: 'سارة عبد العزيز', role: UserRole.Trainer, city: 'الدمام', specialization: 'Platten', joinDate: '2023-03-10' },
  { id: 'c1', name: 'فاطمة علي', role: UserRole.Client, city: 'الرياض', packageId: 'p2', sessionsLeft: 6, joinDate: '2024-05-01' },
  { id: 'c2', name: 'محمد صالح', role: UserRole.Client, city: 'جدة', packageId: 'p3', sessionsLeft: 10, joinDate: '2024-05-15' },
  { id: 'c3', name: 'علي حسن', role: UserRole.Client, city: 'الرياض', packageId: 'p1', sessionsLeft: 2, joinDate: '2024-06-01' },
  { id: 'c4', name: 'نورة خالد', role: UserRole.Client, city: 'الدمام', packageId: 'p4', sessionsLeft: 1, joinDate: '2024-06-05' },
];

let packages: Package[] = [
  { id: 'p1', name: 'باقة البداية', type: TrainingType.Normal, sessions: 4, price: 400 },
  { id: 'p2', name: 'باقة اللياقة', type: TrainingType.Normal, sessions: 8, price: 750 },
  { id: 'p3', name: 'باقة EMS الذهبية', type: TrainingType.EMS, sessions: 12, price: 1500 },
  { id: 'p4', name: 'باقة Platten المكثفة', type: TrainingType.Platten, sessions: 4, price: 600 },
  { id: 'p5', name: 'باقة تجريبية', type: TrainingType.Normal, sessions: 1, price: 120 },
];

// Fix: Use BookingStatus enum members instead of string literals to satisfy TypeScript's type checking.
let bookings: Booking[] = [
    { id: 'b1', clientId: 'c1', clientName: 'فاطمة علي', trainerId: 't1', trainerName: 'أحمد محمود', bookingDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), status: BookingStatus.Confirmed },
    { id: 'b2', clientId: 'c2', clientName: 'محمد صالح', trainerId: 't2', trainerName: 'خالد الغامدي', bookingDate: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), status: BookingStatus.Confirmed },
    { id: 'b3', clientId: 'c4', clientName: 'نورة خالد', trainerId: 't3', trainerName: 'سارة عبد العزيز', bookingDate: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), status: BookingStatus.Pending },
];


const SIMULATED_DELAY = 700; // ms

// Guarantee success by removing any possibility of failure.
const simulateRequest = <T>(data: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return a copy to prevent direct mutation of the source
      resolve(JSON.parse(JSON.stringify(data)));
    }, SIMULATED_DELAY);
  });
};

// --- API FUNCTIONS ---

export const fetchUsers = () => simulateRequest(users);
export const fetchPackages = () => simulateRequest(packages);
export const fetchBookings = () => simulateRequest(bookings);

export const addTrainer = (trainerData: Omit<User, 'id' | 'role' | 'joinDate'>): Promise<User> => {
    const newTrainer: User = {
      ...trainerData,
      id: `t${Date.now()}`,
      role: UserRole.Trainer,
      joinDate: new Date().toISOString().split('T')[0],
    };
    users = [...users, newTrainer];
    return simulateRequest(newTrainer);
};

export const updateTrainer = (updatedTrainer: User): Promise<User> => {
    users = users.map(user => user.id === updatedTrainer.id ? updatedTrainer : user);
    return simulateRequest(updatedTrainer);
};

export const deleteTrainer = (trainerId: string): Promise<{ id: string }> => {
    users = users.filter(user => user.id !== trainerId);
    return simulateRequest({ id: trainerId });
};

export const updateClient = (updatedClient: User): Promise<User> => {
    users = users.map(user => user.id === updatedClient.id ? updatedClient : user);
    return simulateRequest(updatedClient);
};

export const addPackage = (packageData: Omit<Package, 'id'>): Promise<Package> => {
    const newPackage: Package = {
      ...packageData,
      id: `p${Date.now()}`,
    };
    packages = [...packages, newPackage];
    return simulateRequest(newPackage);
};

export const updatePackage = (updatedPackage: Package): Promise<Package> => {
    packages = packages.map(pkg => pkg.id === updatedPackage.id ? updatedPackage : pkg);
    return simulateRequest(updatedPackage);
};

export const deletePackage = (packageId: string): Promise<{ id: string }> => {
    packages = packages.filter(pkg => pkg.id !== packageId);
    return simulateRequest({ id: packageId });
};