import { supabase } from './client';
import type { Movie, Showtime } from './types';

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

  // Get all movies with their showtimes in one query
  async getAllMoviesWithShowtimes() {
    const { data, error } = await supabase
      .from('movies')
      .select(`
        *,
        showtimes!inner (
          id,
          movie_id,
          show_date,
          show_time,
          theater_room,
          available_seats,
          total_seats,
          price,
          created_at
        )
      `)
      .gte('showtimes.show_date', new Date().toISOString().split('T')[0])
      .order('title')
    
    if (error) throw error
    
    // Sort showtimes for each movie on the client side
    const moviesWithSortedShowtimes = data.map(movie => ({
      ...movie,
      showtimes: movie.showtimes.sort((a: Showtime, b: Showtime) => {
        const dateCompare = a.show_date.localeCompare(b.show_date);
        if (dateCompare !== 0) return dateCompare;
        return a.show_time.localeCompare(b.show_time);
      })
    }));
    
    return moviesWithSortedShowtimes as (Movie & { showtimes: Showtime[] })[]
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
  },

  // Get single movie by ID
  async getMovieById(movieId: number) {
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .eq('id', movieId)
      .single()
    
    if (error) throw error
    return data as Movie
  },

  // Search movies by title
  async searchMovies(searchTerm: string) {
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .ilike('title', `%${searchTerm}%`)
      .order('title')
    
    if (error) throw error
    return data as Movie[]
  },

  // Get movies by year range
  async getMoviesByYearRange(startYear: number, endYear: number) {
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .gte('year', startYear)
      .lte('year', endYear)
      .order('year', { ascending: false })
    
    if (error) throw error
    return data as Movie[]
  }
}