export default function MoviesPage() {
  // Placeholder movie data
  const nowPlaying = [
    {
      id: 1,
      title: "Back to the Future",
      year: 1985,
      duration: "116 min",
      genre: "Sci-Fi, Adventure",
      showtimes: ["2:00 PM", "5:30 PM", "8:45 PM"],
      poster: "/api/placeholder/300/450",
      description: "A teenager is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his friend Dr. Emmett Brown."
    },
    {
      id: 2,
      title: "Groundhog Day",
      year: 1993,
      duration: "101 min",
      genre: "Comedy, Fantasy",
      showtimes: ["1:15 PM", "4:20 PM", "7:30 PM"],
      poster: "/api/placeholder/300/450",
      description: "A narcissistic, self-centered weatherman finds himself in a time loop on Groundhog Day."
    },
    {
      id: 3,
      title: "The Terminator",
      year: 1984,
      duration: "107 min",
      genre: "Sci-Fi, Action",
      showtimes: ["3:45 PM", "6:15 PM", "9:00 PM"],
      poster: "/api/placeholder/300/450",
      description: "A cyborg assassin is sent back in time to kill the mother of humanity's future savior."
    },
    {
      id: 4,
      title: "12 Monkeys",
      year: 1995,
      duration: "129 min",
      genre: "Sci-Fi, Thriller",
      showtimes: ["2:30 PM", "6:00 PM", "9:15 PM"],
      poster: "/api/placeholder/300/450",
      description: "In a future world devastated by disease, a convict is sent back in time to gather information about the man-made virus."
    },
    {
      id: 5,
      title: "About Time",
      year: 2013,
      duration: "123 min",
      genre: "Romance, Comedy",
      showtimes: ["1:00 PM", "4:45 PM", "8:00 PM"],
      poster: "/api/placeholder/300/450",
      description: "A young man discovers he can travel back in time and tries to improve his life."
    },
    {
      id: 6,
      title: "Looper",
      year: 2012,
      duration: "119 min",
      genre: "Sci-Fi, Action",
      showtimes: ["2:15 PM", "5:45 PM", "8:30 PM"],
      poster: "/api/placeholder/300/450",
      description: "In 2074, when the mob wants to get rid of someone, the target is sent into the past, where a looper kills and disposes of them."
    }
  ];

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {nowPlaying.map((movie) => (
            <div 
              key={movie.id} 
              className="bg-black/5 dark:bg-white/5 rounded-lg overflow-hidden border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-colors"
            >
              {/* Movie Poster Placeholder */}
              <div className="aspect-[2/3] bg-gradient-to-br from-black/10 to-black/20 dark:from-white/10 dark:to-white/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-black/20 dark:bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🎬</span>
                  </div>
                  <p className="text-sm text-black/60 dark:text-white/60">Movie Poster</p>
                </div>
              </div>

              {/* Movie Info */}
              <div className="p-6">
                <div className="mb-3">
                  <h3 className="text-xl font-semibold mb-1">{movie.title}</h3>
                  <p className="text-sm text-black/60 dark:text-white/60">
                    {movie.year} • {movie.duration} • {movie.genre}
                  </p>
                </div>

                <p className="text-sm text-black/70 dark:text-white/70 mb-4 line-clamp-3">
                  {movie.description}
                </p>

                {/* Showtimes */}
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Showtimes Today:</p>
                  <div className="flex flex-wrap gap-2">
                    {movie.showtimes.map((time, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-foreground text-background text-sm rounded-full font-medium"
                      >
                        {time}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Book Button */}
                <button className="w-full bg-foreground text-background hover:bg-black/80 dark:hover:bg-white/80 transition-colors py-2 px-4 rounded-md font-medium">
                  Select Tickets
                </button>
              </div>
            </div>
          ))}
        </div>

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
