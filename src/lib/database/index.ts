// Re-export all database services and types
export { supabase } from './client';
export type { Movie, Showtime, User, Booking } from './types';

// Service exports
export { movieService } from './movies';
export { showtimeService } from './showtimes';
export { bookingService } from './bookings';
export { authService } from './auth';