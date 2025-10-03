# Time Travel Theater
This project is a fictional movie theater website showing movies that would have been playing at this time twenty seven years ago. It has showtimes for the current week, six screens in different size theaters, a checkout to buy tickets (which doesn't work because you can't buy tickets for a non-existant theater), and a concessions menu. It's a fun way to see what movies were popular several years ago.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Routes

### MVP Route Structure

**Public Pages**
- `/` - Homepage with featured movies and current week showtimes
- `/movies` - Browse all movies currently playing (from 1998)
- `/movies/[id]` - Individual movie details page with synopsis, cast, and showtimes
- `/showtimes` - Weekly schedule view across all 6 screens
- `/theaters` - Information about the 6 different sized theaters
- `/concessions` - Concessions menu with 1998 pricing

**Booking Flow**
- `/tickets/select` - Movie and showtime selection
- `/tickets/seats` - Seat selection for chosen theater
- `/tickets/checkout` - Order summary and payment (non-functional)
- `/tickets/confirmation` - Booking confirmation page

**Utility Pages**
- `/about` - About the Time Travel Theater concept
- `/contact` - Contact information (fictional)
- `/404` - Custom not found page

### API Routes (if needed)
- `/api/movies` - Get movies data (1998 releases)
- `/api/showtimes` - Get current week showtimes
- `/api/theaters` - Get theater configurations
- `/api/concessions` - Get concessions menu

### Theater Screens
The 6 different sized theaters will be referenced throughout the booking flow:
1. **Screen 1** - Large (200 seats)
2. **Screen 2** - Large (200 seats) 
3. **Screen 3** - Medium (150 seats)
4. **Screen 4** - Medium (150 seats)
5. **Screen 5** - Small (100 seats)
6. **Screen 6** - Small (100 seats)

## Database Schema

### MVP Database Structure

**Movies Table**
```sql
movies {
  id: string (primary key)
  title: string
  year: number (1998)
  genre: string[]
  rating: string (G, PG, PG-13, R)
  runtime_minutes: number
  synopsis: text
  director: string
  cast: string[]
  poster_url: string
  trailer_url?: string
  release_date: date
  created_at: timestamp
  updated_at: timestamp
}
```

**Theaters Table**
```sql
theaters {
  id: number (1-6, primary key)
  name: string ("Screen 1", "Screen 2", etc.)
  size: string ("Small", "Medium", "Large")
  total_seats: number (100, 150, or 200)
  rows: number
  seats_per_row: number
  created_at: timestamp
}
```

**Showtimes Table**
```sql
showtimes {
  id: string (primary key)
  movie_id: string (foreign key -> movies.id)
  theater_id: number (foreign key -> theaters.id)
  show_date: date
  show_time: time
  price: decimal (1998 pricing: $4.50-$7.50)
  available_seats: number
  created_at: timestamp
}
```

**Seats Table**
```sql
seats {
  id: string (primary key)
  theater_id: number (foreign key -> theaters.id)
  row: string (A, B, C, etc.)
  number: number (1, 2, 3, etc.)
  seat_type: string ("standard", "accessible")
  created_at: timestamp
}
```

**Bookings Table** _(Non-functional, for demo purposes)_
```sql
bookings {
  id: string (primary key)
  showtime_id: string (foreign key -> showtimes.id)
  customer_name: string
  customer_email: string
  total_amount: decimal
  booking_status: string ("confirmed", "cancelled")
  booking_reference: string
  created_at: timestamp
}
```

**Booking_Seats Table**
```sql
booking_seats {
  id: string (primary key)
  booking_id: string (foreign key -> bookings.id)
  seat_id: string (foreign key -> seats.id)
  ticket_type: string ("adult", "child", "senior")
  price: decimal
}
```

**Concessions Table**
```sql
concessions {
  id: string (primary key)
  name: string
  category: string ("snacks", "drinks", "candy")
  description: text
  price: decimal (1998 pricing)
  image_url?: string
  available: boolean
  created_at: timestamp
}
```

### Sample 1998 Data Structure

**Featured Movies** (Popular 1998 releases):
- Titanic, Armageddon, Saving Private Ryan, There's Something About Mary
- The Truman Show, Rush Hour, Deep Impact, Godzilla, etc.

**Theater Configuration**:
- Screens 1-2: Large theaters (200 seats, 15 rows, ~13 seats/row)
- Screens 3-4: Medium theaters (150 seats, 12 rows, ~12 seats/row)  
- Screens 5-6: Small theaters (100 seats, 10 rows, 10 seats/row)

**1998 Pricing**:
- Matinee: $4.50
- Evening: $7.50
- Senior/Child: $4.00
- Popcorn: $3.50 (small), $4.50 (large)
- Soda: $2.75 (small), $3.75 (large)

## Tech

This project is built with modern web technologies:

### Core Framework
- **[Next.js 15.5.2](https://nextjs.org)** - React framework with App Router
- **[React 19.1.0](https://react.dev)** - UI library with latest features
- **[TypeScript 5](https://www.typescriptlang.org)** - Type-safe JavaScript

### Styling & UI
- **[Tailwind CSS 4](https://tailwindcss.com)** - Utility-first CSS framework
- **[PostCSS](https://postcss.org)** - CSS processing with Tailwind integration

### Development Tools
- **[ESLint 9](https://eslint.org)** - Code linting with flat config
- **[TypeScript ESLint](https://typescript-eslint.io)** - TypeScript-specific linting rules
- **[React ESLint Plugin](https://github.com/jsx-eslint/eslint-plugin-react)** - React-specific linting
- **[pnpm](https://pnpm.io)** - Fast, disk space efficient package manager

### Build & Performance
- **[Turbopack](https://turbo.build/pack)** - Next-generation bundler for fast builds
- **[Geist Font](https://vercel.com/font)** - Optimized font loading

### Key Features
- ⚡ **Fast builds** with Turbopack
- 🎨 **Modern styling** with Tailwind CSS v4
- 📱 **Responsive design** ready
- 🔧 **Type safety** with TypeScript
- 🧹 **Code quality** with ESLint flat config
- 📦 **Efficient package management** with pnpm
