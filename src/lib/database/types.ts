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