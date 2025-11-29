import { movieService } from "@/lib/supabase";
import MovieCard from "@/components/MovieCard";

export default async function MoviesPage() {
  let movies;
  
  try {
    movies = await movieService.getAllMoviesWithShowtimes();
  } catch (error) {
    console.error('Error fetching movies:', error);
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Failed to load movies. Please try again later.</p>
          <a 
            href="/movies"
            className="bg-foreground text-background px-4 py-2 rounded-md"
          >
            Retry
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-black/5 dark:bg-white/5 border-b border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Time Travel Theater</h1>
              <p className="text-black/60 dark:text-white/60 mt-1">Now Playing</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-black/60 dark:text-white/60">Today</p>
              <p className="font-semibold">{new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Featured Movies</h2>
          <p className="text-black/70 dark:text-white/70">
            Experience the magic of time travel through cinema. All showtimes are for today.
          </p>
        </div>

        {/* Movies Grid */}
        {movies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-black/50 dark:text-white/50">No movies are currently playing.</p>
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-black/5 dark:bg-white/5 rounded-lg p-6 border border-black/10 dark:border-white/10">
            <h3 className="text-lg font-semibold mb-2">Experience Time Travel Cinema</h3>
            <p className="text-black/70 dark:text-white/70 mb-4">
              Step into different eras and witness the evolution of storytelling through our carefully curated selection of time-travel films.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-black/10 dark:bg-white/10 px-3 py-1 rounded-full">Digital Projection</span>
              <span className="bg-black/10 dark:bg-white/10 px-3 py-1 rounded-full">Dolby Surround</span>
              <span className="bg-black/10 dark:bg-white/10 px-3 py-1 rounded-full">Comfortable Seating</span>
              <span className="bg-black/10 dark:bg-white/10 px-3 py-1 rounded-full">Concessions Available</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
