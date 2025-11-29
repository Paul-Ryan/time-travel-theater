"use client";

import type { Movie, Showtime } from "@/lib/database";

type MovieWithShowtimes = Movie & {
  showtimes: Showtime[];
};

interface MovieCardProps {
  movie: MovieWithShowtimes;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const formatShowtime = (showtime: Showtime) => {
    const time = new Date(`2000-01-01T${showtime.show_time}`);
    return time.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDuration = (minutes: number) => {
    return `${minutes} min`;
  };

  return (
    <div className="bg-black/5 dark:bg-white/5 rounded-lg overflow-hidden border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-colors">
      {/* Movie Poster Placeholder */}
      <div className="aspect-[2/3] bg-gradient-to-br from-black/10 to-black/20 dark:from-white/10 dark:to-white/20 flex items-center justify-center">
        {movie.poster_url ? (
          <img 
            src={movie.poster_url} 
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-black/20 dark:bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">🎬</span>
            </div>
            <p className="text-sm text-black/60 dark:text-white/60">Movie Poster</p>
          </div>
        )}
      </div>

      {/* Movie Info */}
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-xl font-semibold mb-1">{movie.title}</h3>
          <p className="text-sm text-black/60 dark:text-white/60">
            {movie.year} • {formatDuration(movie.duration)} • {movie.genre}
          </p>
        </div>

        <p className="text-sm text-black/70 dark:text-white/70 mb-4 line-clamp-3">
          {movie.description}
        </p>

        {/* Showtimes */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Upcoming Showtimes:</p>
          {movie.showtimes.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {movie.showtimes.slice(0, 3).map((showtime, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-foreground text-background text-sm rounded-full font-medium"
                  title={`${showtime.show_date} - $${showtime.price}`}
                >
                  {formatShowtime(showtime)}
                </span>
              ))}
              {movie.showtimes.length > 3 && (
                <span className="px-3 py-1 bg-black/10 dark:bg-white/10 text-sm rounded-full">
                  +{movie.showtimes.length - 3} more
                </span>
              )}
            </div>
          ) : (
            <p className="text-sm text-black/50 dark:text-white/50">No showtimes available</p>
          )}
        </div>

        {/* Book Button */}
        <button 
          className="w-full bg-foreground text-background hover:bg-black/80 dark:hover:bg-white/80 transition-colors py-2 px-4 rounded-md font-medium disabled:opacity-50"
          disabled={movie.showtimes.length === 0}
        >
          {movie.showtimes.length > 0 ? 'Select Tickets' : 'Coming Soon'}
        </button>
      </div>
    </div>
  );
}