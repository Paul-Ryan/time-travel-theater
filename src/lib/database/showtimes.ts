import { supabase } from './client';
import type { Showtime } from './types';

export const showtimeService = {
  // Get showtimes for today
  async getTodaysShowtimes() {
    const today = new Date().toISOString().split('T')[0]
    
    const { data, error } = await supabase
      .from('showtimes')
      .select(`
        *,
        movies (title, genre, duration)
      `)
      .eq('show_date', today)
      .order('show_time')
    
    if (error) throw error
    return data
  },

  // Get showtimes for a specific movie
  async getMovieShowtimes(movieId: number) {
    const { data, error } = await supabase
      .from('showtimes')
      .select('*')
      .eq('movie_id', movieId)
      .gte('show_date', new Date().toISOString().split('T')[0])
      .order('show_date, show_time')
    
    if (error) throw error
    return data as Showtime[]
  },

  // Get showtime by ID
  async getShowtimeById(showtimeId: number) {
    const { data, error } = await supabase
      .from('showtimes')
      .select(`
        *,
        movies (title, genre, duration, poster_url)
      `)
      .eq('id', showtimeId)
      .single()
    
    if (error) throw error
    return data
  },

  // Get showtimes for a specific date
  async getShowtimesByDate(date: string) {
    const { data, error } = await supabase
      .from('showtimes')
      .select(`
        *,
        movies (title, genre, duration, poster_url)
      `)
      .eq('show_date', date)
      .order('show_time')
    
    if (error) throw error
    return data
  },

  // Get upcoming showtimes (next 7 days)
  async getUpcomingShowtimes(days: number = 7) {
    const today = new Date().toISOString().split('T')[0]
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);
    const endDate = futureDate.toISOString().split('T')[0]
    
    const { data, error } = await supabase
      .from('showtimes')
      .select(`
        *,
        movies (title, genre, duration, poster_url)
      `)
      .gte('show_date', today)
      .lte('show_date', endDate)
      .order('show_date, show_time')
    
    if (error) throw error
    return data
  },

  // Check seat availability for a showtime
  async checkSeatAvailability(showtimeId: number, requestedSeats: number) {
    const { data, error } = await supabase
      .from('showtimes')
      .select('available_seats, total_seats')
      .eq('id', showtimeId)
      .single()
    
    if (error) throw error
    
    return {
      available: data.available_seats >= requestedSeats,
      availableSeats: data.available_seats,
      totalSeats: data.total_seats
    }
  }
}