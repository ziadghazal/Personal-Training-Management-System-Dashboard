// This file is no longer the source of truth for data.
// The data has been moved to services/api.ts to be managed by the simulated API.
// This file is kept to avoid breaking imports in other files that might still reference its types,
// though ideally those would be moved to the types file.

import { User, Package, UserRole, TrainingType, Booking, BookingStatus } from '../types';

export const mockUsers: User[] = [];

export const mockPackages: Package[] = [];

export const mockBookings: Booking[] = [];
