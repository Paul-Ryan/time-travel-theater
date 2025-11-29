import { supabase } from './client';
import type { Booking } from './types';

export const bookingService = {
  // Create a new booking
  async createBooking(booking: Omit<Booking, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('bookings')
      .insert(booking)
      .select()
      .single()
    
    if (error) throw error
    return data as Booking
  },

  // Get user bookings
  async getUserBookings(userId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        showtimes (
          *,
          movies (title, poster_url)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get booking by ID
  async getBookingById(bookingId: number, userId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        showtimes (
          *,
          movies (title, poster_url, genre, duration)
        )
      `)
      .eq('id', bookingId)
      .eq('user_id', userId)
      .single()
    
    if (error) throw error
    return data
  },

  // Update booking status
  async updateBookingStatus(bookingId: number, userId: string, status: 'confirmed' | 'cancelled' | 'pending') {
    const { data, error } = await supabase
      .from('bookings')
      .update({ booking_status: status })
      .eq('id', bookingId)
      .eq('user_id', userId)
      .select()
      .single()
    
    if (error) throw error
    return data as Booking
  },

  // Cancel a booking
  async cancelBooking(bookingId: number, userId: string) {
    return this.updateBookingStatus(bookingId, userId, 'cancelled')
  },

  // Get user's active bookings (confirmed and pending)
  async getUserActiveBookings(userId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        showtimes (
          *,
          movies (title, poster_url)
        )
      `)
      .eq('user_id', userId)
      .in('booking_status', ['confirmed', 'pending'])
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get upcoming bookings for user
  async getUserUpcomingBookings(userId: string) {
    const today = new Date().toISOString().split('T')[0]
    
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        showtimes!inner (
          *,
          movies (title, poster_url)
        )
      `)
      .eq('user_id', userId)
      .eq('booking_status', 'confirmed')
      .gte('showtimes.show_date', today)
      .order('showtimes(show_date, show_time)')
    
    if (error) throw error
    return data
  },

  // Get booking statistics for a user
  async getUserBookingStats(userId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select('booking_status, total_price')
      .eq('user_id', userId)
    
    if (error) throw error
    
    const stats = data.reduce((acc, booking) => {
      acc.total++;
      acc.totalSpent += booking.total_price;
      
      // Type-safe status counting
      if (booking.booking_status === 'confirmed') acc.confirmed++;
      else if (booking.booking_status === 'cancelled') acc.cancelled++;
      else if (booking.booking_status === 'pending') acc.pending++;
      
      return acc;
    }, {
      total: 0,
      confirmed: 0,
      cancelled: 0,
      pending: 0,
      totalSpent: 0
    });
    
    return stats;
  }
}