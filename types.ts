export enum UserRole {
  Admin = 'admin',
  Trainer = 'trainer',
  Client = 'client',
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  city?: string;
  specialization?: string; // For trainers
  packageId?: string; // For clients
  sessionsLeft?: number; // For clients
  joinDate: string;
}

export enum TrainingType {
  Normal = 'عادي',
  EMS = 'EMS',
  Platten = 'Platten',
}

export interface Package {
  id: string;
  name: string;
  type: TrainingType;
  sessions: number;
  price: number;
  trainerId?: string; // For custom pricing
}

export interface Notification {
  id: string;
  clientId: string;
  clientName: string;
  packageName: string;
  sessionsLeft: number;
}

export enum BookingStatus {
  Confirmed = 'مؤكد',
  Pending = 'قيد الانتظار',
  Cancelled = 'ملغي',
}

export interface Booking {
  id: string;
  clientId: string;
  clientName: string;
  trainerId: string;
  trainerName: string;
  bookingDate: string; // ISO string
  status: BookingStatus;
}
