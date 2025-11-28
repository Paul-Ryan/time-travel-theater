import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for TypeScript
export type Movie = {
  id: number
  title: string
  year: number
  duration: number // in minutes
  genre: string
  description: string
  poster_url?: string
  created_at: string
  updated_at: string
}

export type Showtime = {
  id: number
  movie_id: number
  show_date: string
  show_time: string
  theater_room: string
  available_seats: number
  total_seats: number
  price: number
  created_at: string
}

export type User = {
  id: string
  email: string
  full_name?: string
  created_at: string
}

export type Booking = {
  id: number
  user_id: string
  showtime_id: number
  seats: string[] // Array of seat numbers like ["A1", "A2"]
  total_price: number
  booking_status: 'confirmed' | 'cancelled' | 'pending'
  created_at: string
}

// Helper functions for common operations
export const movieService = {
  // Get all movies
  async getAllMovies() {
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .order('title')
    
    if (error) throw error
    return data as Movie[]
  },

  // Get movie with showtimes
  async getMovieWithShowtimes(movieId: number) {
    const { data, error } = await supabase
      .from('movies')
      .select(`
        *,
        showtimes (*)
      `)
      .eq('id', movieId)
      .single()
    
    if (error) throw error
    return data
  }
}

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
  }
}

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
  }
}

export const authService = {
  // Sign up
  async signUp(email: string, password: string, fullName?: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    })
    
    if (error) throw error
    return data
  },

  // Sign in
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Get current user
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  }
}